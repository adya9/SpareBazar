// import { useEffect, useState } from 'react';
// // import Header from './Header/Header.jsx'
// // import Subbody from './Subbody/Subbody.jsx'
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import { FaHeart } from 'react-icons/fa';
// import './Home.css';

// function AdminPage() {
//     const navigate = useNavigate();
//     const [products, setproducts] = useState([]);
//     // const [refresh,setrefresh]= useState(false);
//     // const [likedproducts, setlikedproducts] = useState([]);
//     // const [search, setsearch] = useState('');
//     // const [issearch, setissearch] = useState(false);

//     // useEffect(() => {
//     //     if (!localStorage.getItem('token')) {
//     //         navigate('/login');
//     //     }

//     // }, [])

//     useEffect(() => {
//         const url = 'http://localhost:4000/get-products';

//         axios.get(url)
//             .then((res) => {
//                 console.log(res);
//                 if (res.data.products) {
//                     setproducts(res.data.products);
//                 }
//             })
//             .catch((err) => {
//                 console.log(err);
//                 alert("SERVER ERROR");
//             })


//         // const url2 = 'http://localhost:4000/liked-products';
//         // let data = { userId: localStorage.getItem('userId') }
//         // axios.post(url2, data)
//         //     .then((res) => {
//         //         console.log(res);
//         //         if (res.data.products) {
//         //             setlikedproducts(res.data.products);
//         //         }
//         //     })
//         //     .catch((err) => {
//         //         console.log(err);
//         //         alert("SERVER ERROR");
//         //     })
//     }, [])

//     // const handlesearch = (value) => {
//     //     // console.log("hh",value);

//     //     setsearch(value);
//     // }

//     // const handleClick = () => {
//     //     const url = 'http://localhost:4000/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');

//     //     axios.get(url)
//     //         .then((res) => {
//     //             console.log(res.data);
//     //             setproducts(res.data.products);
//     //             setissearch(true);
//     //         })
//     //         .catch((err) => {

//     //             alert("Error in Searching");
//     //         })


//     //     // console.log('products',products);
//     //     // let filteredProducts=products.filter((item)=>{
//     //     //     if(item.pname.toLowerCase().includes(search.toLowerCase())||item.pdesc.toLowerCase().includes(search.toLowerCase())||item.category.toLowerCase().includes(search.toLowerCase())){
//     //     //         return item;
//     //     //     }
//     //     // })
//     //     // setproducts(filteredProducts)
//     // }

//     // const handleLike = (productId, e) => {
//     //     e.stopPropagation();
//     //     let userId = localStorage.getItem('userId');
//     //     if (!userId) {
//     //         alert('Please Login first.')
//     //         return;
//     //     }

//     //     console.log('userId', "productId", productId, userId);

//     //     const url = 'http://localhost:4000/like-product';
//     //     const data = { userId, productId };
//     //     axios.post(url, data)
//     //         .then((res) => {
//     //             if (res.data.message) {
//     //                 alert("WishList Successfully");
//     //                 setrefresh(!refresh);
//     //             }

//     //         })
//     //         .catch((err) => {

//     //             alert("Error in Like");
//     //         })
//     // }

//     // const handleDisLike = (productId, e) => {
//     //     e.stopPropagation();
//     //     let userId = localStorage.getItem('userId');
//     //     if (!userId) {
//     //         alert('Please Login first.')
//     //         return;
//     //     }

//     //     console.log('userId', "productId", productId, userId);

//     //     const url = 'http://localhost:4000/dislike-product';
//     //     const data = { userId, productId };
//     //     axios.post(url, data)
//     //         .then((res) => {
//     //             if (res.data.message) {
//     //                 alert("Removed from WishList Successfully");
//     //                 setrefresh(!refresh);
//     //             }

//     //         })
//     //         .catch((err) => {

//     //             alert("Error in Like");
//     //         })
//     // }
    
//     const handleApprove = (productId) => {
//         // Update the approval status in the database
//         axios
//           .put(`http://localhost:4000/approve-product/${productId}`)
//           .then((res) => {
//             // Handle success (optional)
//             console.log("Product approved successfully");
//             // You may choose to refresh the product list or update the state accordingly
//           })
//           .catch((err) => {
//             // Handle error (optional)
//             console.error("Error approving product", err);
//           });
//       };

//     const handleProduct = (id) => {
//         navigate('/product/' + id);
//     }

//     return (
//         <div>
//             {/* <Header search={search} handlesearch={handlesearch} handleClick={handleClick} /> */}
//             {/* {!issearch && <Subbody />} */}
//             {/* {issearch && <h5>SEARCH RESULT:</h5>} */}
//             {/* {issearch && products && products.length === 0 && <h5>No Result</h5>} */}

//             {<div className='d-flex justify-content-center flex-wrap'>
//                 {/* <h2>MY PRODUCTS</h2> */}
//                 {products && products.length > 0 &&
//                     products.map((item, index) => {

//                         return (
//                             // onClick={() => handleProduct(item._id)}
//                             <div  key={item._id} className="card m-3">


//                                 <img width="300px" height="300px" src={'http://localhost:4000/' + item.pimage} alt="" />
//                                 <p className='p-2'>{item.pname} | {item.category}</p>
//                                 <p className='p-2 text-success'>{item.pdesc} </p>
//                                 <h3 className='p-2 text-success'>₹{item.price}/- </h3>

//                                 {!item.isApproved && (
//                                     <button onClick={() => handleApprove(item._id)}>Approve Product</button>
//                                 )}

//                             </div>
//                         )
//                     })}

//             </div>}


//         </div>
//     )
// }

// export default AdminPage;


import React from 'react';
import SideNav from './SideNav'; // Adjust the import path as needed

export default function Layout({ children }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}

