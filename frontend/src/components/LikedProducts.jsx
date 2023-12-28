import { useEffect, useState } from 'react';
import Header from './Header/Header.jsx'
import Subbody from './Subbody/Subbody.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {FaHeart,FaRegHeart} from 'react-icons/fa';
import './Home.css';

function LikedProducts() {
    const navigate = useNavigate();
    const [products, setproducts] = useState([]);
    const [search,setsearch]=useState('');
    const [refresh,setrefresh]= useState(false);
    const [likedproducts, setlikedproducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/login');
    //     }

    // }, [])

    // useEffect(() => {
    //     const url = 'http://localhost:4000/liked-products';
    //     let data={userId:localStorage.getItem('userId')};
    //     axios.get(url,data)
    //         .then((res) => {
    //             if (res.data.products) {
    //                 setproducts(res.data.products);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert("SERVER ERROR");
    //         })
    // }, [])
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/liked-products', { userId: localStorage.getItem('userId') });
                setproducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching liked products:', error);
                alert('Server error while fetching liked products');
            }
        };

        fetchData();

        
        const url2 = 'http://localhost:4000/liked-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url2, data)
            .then((res) => {
                console.log(res);
                if (res.data.products) {
                    setlikedproducts(res.data.products);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            })
    }, [refresh,search]);


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
    
    // const handleLike=(productId,e)=>{
    //     e.stopPropagation();
    //     let userId = localStorage.getItem('userId');
    //     if (!userId) {
    //         alert('Please Login first.')
    //         return;
    //     }

        
    //     console.log('userId',"productId",productId,userId);

    //     const url = 'http://localhost:4000/like-product';
    //     const data={userId,productId};
    //     axios.post(url,data)
    //         .then((res) => {
    //             if(res.data.message)
    //             {
    //                 setrefresh(!refresh);
    //             }
               
    //         })
    //         .catch((err) => {
                
    //             alert("Error in Like");
    //         })
    // }

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Please Login first.')
            return;
        }

        console.log('userId', "productId", productId, userId);

        const url = 'http://localhost:4000/dislike-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    alert("Removed from WishList Successfully");
                    setrefresh(!refresh);
                }

            })
            .catch((err) => {

                alert("Error in Like");
            })
    }

    const handleProduct=(id)=>{
        navigate('/product/'+id);
    }

    

    return (
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick}/>
            {/* <Subbody /> */}
            <div className='d-flex justify-content-center flex-wrap center-message'>
                {/* <h2>MY PRODUCTS</h2> */}
                {loading && <p>Loading...</p>}
                {!loading && products.length === 0 && <p>No Liked products.</p>}
                {products && products.length > 0 &&
                    products.map((item, index) => {

                        return (
                            <div onClick={()=>handleProduct(item._id)} key={item._id}  className="card m-3">
                               <div className='icon-container' >
                                    {/* <FaHeart className='icons'/> */}
                                    {
                                        likedproducts.find((likedItem) => likedItem._id === item._id) ?
                                         <FaHeart onClick={(e) => handleDisLike(item._id, e)} className='red-icons' /> : 
                                         <FaHeart  className='icons' />


                                    }

                                </div>
                                
                                <img width="300px" height="300px" src={'http://localhost:4000/' + item.pimage} />
                                <p className='p-2'>{item.pname} | {item.category}</p>
                                <p className='p-2 text-success'>{item.pdesc} </p>
                                <h3 className='p-2 text-success'>₹{item.price}/- </h3>

                            </div>
                        )
                    })}

            </div>


        </div>
    )
}

export default LikedProducts;