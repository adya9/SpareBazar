import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import io from 'socket.io-client';
let socket;

function ProductDetail() {
    const [product, setproduct] = useState();
    const [user, setuser] = useState();
    const [msg,setmsg]=useState();
    const [msgs,setmsgs]=useState([]);

    const p = useParams();
    console.log(p.productId);

    useEffect(()=>{
        socket=io('http://localhost:4000');
        socket.on('connect',()=>{
            console.log('con');
        })
    },[])


    useEffect(()=>{
      
        socket.on('getMsg',(data)=>{
            // console.log(data,"data");
            // if(product && product._id)
            // {
                const _data=data.filter((item,index)=>{
                    console.log(item,localStorage.getItem('productId'),"jjj");
                    return item.productId === p.productId;
                })
                console.log(_data,"_data");
                setmsgs(_data);
            // }
          
        
        })
        // msgs,localStorage.getItem('productId'),
    },[p.productId])
  
     
       

    const handleSend=()=>{
        const data={ username:localStorage.getItem('username') ,msg,productId:localStorage.getItem('productId')}
        console.log(data,"data");
        socket.emit('sendMsg',data);
        setmsg('');
    }

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;

        axios.get(url)
            .then((res) => {
                console.log(res);
                if (res.data.product) {
                    setproduct(res.data.product);
                    localStorage.setItem('productId',res.data.product._id)
                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            })
    }, [])

    const handleContact=(addedBy)=>{
        console.log('id',addedBy);
        const url = 'http://localhost:4000/get-user/' + addedBy;

        axios.get(url)
            .then((res) => {
                console.log(res);
                if (res.data.user) {
                    setuser(res.data.user);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            })
    }


    return (
        <div>
            <Header />
            <div className="d flex justify-content-between flex-wrap">
                {product && <div>
                    <div>
                        <img width="400px" height="400px" src={'http://localhost:4000/' + product.pimage} alt=""></img>
                        <h4>{product.pdesc}</h4>
                        
                    </div>
                    <div>
                        {product.pname}<br/>
                        {product.price}<br/>
                        {product.priceNegotiable}
                        {<h4><a href={`https://wa.me/${product.whatsappNumber}`} target="_blank" rel="noopener noreferrer">WhatsApp Link</a></h4> }
                        <button onClick={()=>handleContact(product.addedBy)}>SHOW User Details</button>
                        {user && user.name && <h4>{user.name}</h4>}
                        
                       
                    </div>
                    <div>
                        CHATS
                        {
                            msgs && msgs.length>0 && msgs.map((item,index)=>{
                                if(item.username===localStorage.getItem('username'))
                                {
                                    return(
                                        <p key={item._id} style={{marginRight:'100px',background:'aqua',borderRadius:'5px'}}>{item.username}:{item.msg}</p>
                                    )

                                }
                                if(item.username!==localStorage.getItem('username'))
                                {
                                    return(
                                        <p key={item._id} style={{marginLeft:'100px',background:'#282c34',borderRadius:'5px',color:"white"}}>{item.username}:{item.msg}</p>
                                    )

                                }
                            })
                        }
                        <input value={msg} onChange={(e)=>setmsg(e.target.value)} className="form-control" type="text" />
                        <button onClick={handleSend} className="btn btn-primary">SEND</button>
                    </div>
                     
                </div>

                }

            </div>

        </div>
    )
}

export default ProductDetail;