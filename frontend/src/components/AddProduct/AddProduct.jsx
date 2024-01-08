import { useEffect,useState } from 'react';
import Header from '../Header/Header';
import './AddProduct.css';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct(){
    const navigate=useNavigate();

    const [pname,setpname]=useState('');
    const [pdesc,setpdesc]=useState('');
    const [price,setprice]=useState('');
    const [category,setcategory]=useState('');
    const [pimage,setpimage]=useState('');
    const [priceNegotiable, setPriceNegotiable] = useState(false);
    const [whatsappNumber,setwhatsappNumber]=useState('91');
    const [address,setaddress]=useState('');


    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            navigate('/login');
        }

    },[])

    const handleApi=()=>{

        navigator.geolocation.getCurrentPosition((position)=>{
            // console.log(position.coords.latitude)
            // console.log(position.coords.longitude)

            const formData=new FormData();
            formData.append('plat',position.coords.latitude)
            formData.append('plong',position.coords.longitude)
            formData.append('pname',pname)
            formData.append('pdesc',pdesc)
            formData.append('price',price)
            formData.append('whatsappNumber',whatsappNumber)
            formData.append('category',category)
            formData.append('pimage',pimage)
            formData.append('userId',localStorage.getItem('userId'))

            formData.append('priceNegotiable', priceNegotiable);
            formData.append('address',address);

            
            const url='http://localhost:4000/add-product';
            axios.post(url,formData)
            .then((res)=>{
                console.log(res);
                if(res.data.message)
                {
                    alert(res.data.message);
                    navigate('/')
                }
    
            })
            .catch((err)=>{
                console.log(err);
            })
        })

    
    }

    return(
        <div>
           <Header/>
           <div className="container">
                <h1>ADD PRODUCT</h1>

                {/* <form method="post"> */}
                    {/* <label className='addproduct-label'>PRODUCT NAME</label> */}
                    <input className="form-control" type="text" placeholder="Enter the Product Name" value={pname} onChange={(e)=>{setpname(e.target.value)}} required />
                    <textarea className="form-control" type="text" placeholder="Enter the Product Description" value={pdesc} onChange={(e)=>{setpdesc(e.target.value)}} required />
                    <input className="form-control" type="number" placeholder="Enter the Product Price" value={price} onChange={(e)=>{setprice(e.target.value)}} required />
                    <input className="form-control" type="number" placeholder="Enter Your WhatsApp Number" value={whatsappNumber} onChange={(e)=>{setwhatsappNumber(e.target.value)}} required />
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
                     <input className="form-control" type="text" placeholder="Enter the city and state Name" value={address} onChange={(e)=>{setaddress(e.target.value)}} required />
                    <label className='addproduct-label'>Upload Image</label>
                    <input className="form-control" type="file" placeholder="Upload Image"   onChange={(e)=>{setpimage(e.target.files[0])}} required />
                    <button className="btn btn-primary" onClick={handleApi}>ADD</button>
                  
                {/* </form> */}
            </div>
             
        </div>
    )
}

export default AddProduct;