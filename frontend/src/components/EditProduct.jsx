import { useEffect,useState, useSyncExternalStore } from 'react';
import Header from './Header/Header';
import './AddProduct/AddProduct.css';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct(){
    const p=useParams();
    console.log(p);
    const navigate=useNavigate();

    const [pname,setpname]=useState('');
    const [pdesc,setpdesc]=useState('');
    const [price,setprice]=useState('');
    const [category,setcategory]=useState('');
    const [pimage,setpimage]=useState('');
    const [poldimage,setpoldimage]=useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [isSold, setIsSold] = useState(false);
    const [whatsappNumber,setwhatsappNumber]=useState();
    const [address, setaddress]=useState('');
    

    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login');
        }

    },[])

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/' + p.productId;

        axios.get(url)
            .then((res) => {
             
                if (res.data.product) {
                    console.log(res.data.product);
                    let product=res.data.product;
                    setpname(product.pname);
                    setpdesc(product.pdesc);
                    setprice(product.price);
                    setwhatsappNumber(product.whatsappNumber);
                    setcategory(product.category);
                    setpoldimage(product.pimage);
                    setPriceNegotiable(product.priceNegotiable);
                    setIsSold(product.isSold);
                    setaddress(product.address);

                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            })
    }, [])

    const handleApi=()=>{

            const formData=new FormData();
           
            formData.append('pid',p.productId)
            formData.append('pname',pname)
            formData.append('pdesc',pdesc)
            formData.append('price',price)
            formData.append('whatsappNumber',whatsappNumber)
            formData.append('category',category)
            formData.append('pimage',pimage)
            formData.append('userId',localStorage.getItem('userId'))
            formData.append('priceNegotiable', priceNegotiable);
            formData.append('isSold', isSold);
            formData.append('address',setaddress);
            
            const url='http://localhost:4000/edit-product';
            axios.post(url,formData)
            .then((res)=>{
                console.log(res);
                if(res.data.message)
                {
                    alert(res.data.message);
                    navigate('/my-products')
                }
    
            })
            .catch((err)=>{
                console.log(err);
            })
        

    
    }

    return(
        <div>
           <Header/>
           <div className="container">
                <h1>EDIT PRODUCT</h1>

                {/* <form method="post"> */}
                    {/* <label className='addproduct-label'>PRODUCT NAME</label> */}
                    <input className="form-control" type="text" placeholder="Enter the Product Name" value={pname} onChange={(e)=>{setpname(e.target.value)}} required />
                    <textarea className="form-control" type="text" placeholder="Enter the Product Description" value={pdesc} onChange={(e)=>{setpdesc(e.target.value)}} required />
                    <input className="form-control" type="number" placeholder="Enter the Product Price" value={price} onChange={(e)=>{setprice(e.target.value)}} required />
                    <input className="form-control" type="number" placeholder="Enter your Whatsapp Number" value={whatsappNumber} onChange={(e)=>{setwhatsappNumber(e.target.value)}} required />
                    <label className='addproduct-label'>Select Category</label>
                    <select className="form-control" required value={category} onChange={(e)=>{setcategory(e.target.value)}}>
                        <option>Interior Parts</option>
                        <option>Body and Exterior Parts</option>
                        <option>Electrical Parts</option>
                        <option>Engine Parts</option>
                        <option>Other</option>
                    </select>
                    <label className='addproduct-label negotiable-label'>
              <input
                type="radio"
                value="negotiable"
                checked={priceNegotiable === 'negotiable'}
                onChange={() => setPriceNegotiable('negotiable')}
              >
             </input>
             Price Negotiable
            </label>

            <label className='addproduct-label non-negotiable-label'>
              <input
                type="radio"
                value="non-negotiable"
                checked={priceNegotiable === 'non-negotiable'}
                onChange={() => setPriceNegotiable('non-negotiable')}
              />
              Price Non-Negotiable
            </label>

            <br></br><br></br>

        
                  
            <label className='addproduct-label negotiable-label'>
              <input
                type="radio"
                value="YES"
                checked={isSold === 'YES'}
                onChange={() => setIsSold('YES')}
              >
             </input>
             Product Sold YES
            </label>

            <label className='addproduct-label non-negotiable-label'>
              <input
                type="radio"
                value="NO"
                checked={isSold === 'NO'}
                onChange={() => setIsSold('NO')}
              />
              Product Sold NO
            </label>
                     <br></br><br></br>
                     <input className="form-control" type="text" placeholder="Enter the city and state Name" value={address} onChange={(e)=>{setaddress(e.target.value)}} required />
                    <label className='addproduct-label'>Upload Image</label>
                    <input style={{width:'50%'}} className="form-control" type="file" placeholder="Upload Image"   onChange={(e)=>{setpimage(e.target.files[0])}} required />
                    <img src={'http://localhost:4000/'+poldimage} width={150} height={150}/><br></br>
                    <button className="btn btn-primary" onClick={handleApi}>UPDATE</button>
                  
                {/* </form> */}
            </div>
             
        </div>
    )
}

export default EditProduct;