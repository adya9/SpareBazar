import { useEffect, useState } from 'react';
import Header from './Header/Header.jsx'
import Subbody from './Subbody/Subbody.jsx'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FaHeart,FaRegHeart} from 'react-icons/fa';
import './MyProduct.css';

function MyProducts() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [search,setsearch]=useState('');
    const [refresh,setrefresh]=useState(false);
    const [loading, setLoading] = useState(true);
    // const [isSold, setIsSold] = useState(false);

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login');
    //     }

    // }, [])

    useEffect(() => {
        const url = 'http://localhost:4000/my-products';
        let data={userId:localStorage.getItem('userId')};
        axios.post(url,data)
            .then((res) => {
                if (res.data.products) {
                    setproducts(res.data.products);
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            })
    }, [refresh])
    

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.post('http://localhost:4000/my-products', { userId: localStorage.getItem('userId') });
    //             setproducts(response.data.products);
    //         } catch (error) {
    //             console.error('Error fetching liked products:', error);
    //             alert('Server error while fetching liked products');
    //         }
    //     };

    //     fetchData();
    // }, [refresh,search]);


    const handlesearch=(value)=>{
        console.log("hh",value);
        setsearch(value);
    }

    const handleClick=()=>{
        console.log('products',products);
        let filteredProducts=products.filter((item)=>{
            if(item.pname.toLowerCase().includes(search.toLowerCase())||item.pdesc.toLowerCase().includes(search.toLowerCase())||item.category.toLowerCase().includes(search.toLowerCase())){
                return item;
            }
        })
        setproducts(filteredProducts)
    }
    
    const handleLike=(productId)=>{
        let userId=localStorage.getItem('userId');
        console.log('userId',"productId",productId,userId);

        const url = 'http://localhost:4000/like-product';
        const data={userId,productId};
        axios.post(url,data)
            .then((res) => {
                if(res.data.message)
                {
                    alert("WishList Successfully");
                }
               
            })
            .catch((err) => {
                
                alert("Error in Like");
            })
    }

    const handleProduct=(id)=>{
        navigate('/product/'+id);
    }

    // const handleDel=(pid)=>{
    //     console.log(pid);
    //     if(!localStorage.getItem('userId'))
    //     {
    //         alert('please login first')
    //         return;
    //     }
    //     const url='http://localhost:4000/delete-product';
    //     const data={
    //         pid,
    //         userId:localStorage.getItem('userId')
    //     }
    //     axios.post(url,data)
    //     .then((res)=>{
    //         if(res.data.message)
    //         {
    //             alert('Successfully Deleted');
    //             setrefresh(!refresh);
    //         }
    //     })
    //     .catch((err)=>{
    //         alert('server error in delete')
    //     })
    // }

    const handleDel= (pid) => {
		const url = "http://localhost:4000/delete-product";
		const data = { pid };
		if (window.confirm("Are you sure you want to delete this product?")) {
			axios
				.delete(url, { data })
				.then((res) => {
					console.log(res.data);
					if (res.data.message) {
						console.log(res.data.message);
						console.log("Product Deleted Successfully");
                        setrefresh(!refresh);
					}
				})
				.catch((err) => {
					console.log(err);
					console.log("Product Deleted Successfully");
				});
		}
	};

    

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            {/* <Subbody /> */}
            <div className='d-flex justify-content-center flex-wrap center-message'>
                {/* <h2>MY PRODUCTS</h2> */}

                {loading && <p>Loading...</p>}
        {!loading && products.length === 0 && <p>You have not added any product.</p>}
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            // onClick={()=>handleProduct(item._id)}
                            <div  key={item._id}  className="card m-3">
                                {/* <div className='icon-container' onClick={()=>handleLike(item._id)}>
                                    <FaHeart className='icons'/>

                                </div> */}
                                
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.pimage} />
                                <p className='p-2'>{item.pname} | {item.category}</p>
                                <p className='p-2 text-success'>{item.pdesc} </p>
                                <h3 className='p-2 text-success'>₹{item.price}/- </h3>
                                {/* <label className="block text-lg font-normal text-black">
                    Is Sold:
                    <input 
                        type="checkbox" 
                        checked={isSold} 
                        onChange={() => setIsSold(!isSold)} 
                    />
                </label> */}
                                
                                <div className='button-container'>
                                <p>
                                    <Link to={ `/edit-product/${item._id}` }><button className='edit-link'>EDIT</button></Link>
                                </p>
                               
                                <button onClick={()=>handleDel(item._id)} id='del' className='delete-btn'>DELETE</button>
                                </div>

                            </div>
                            
                        )
                    })}

            </div>


        </div>
    )
}

export default MyProducts;