import { useEffect, useState } from "react";
// import Header from './Header/Header.jsx'
// import Subbody from './Subbody/Subbody.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { FaHeart } from 'react-icons/fa';
import "../Home.css";

function ManageProducts() {
	const navigate = useNavigate();
	const [products, setproducts] = useState([]);
	const [isApproved, setisApproved] = useState();
	// const [refresh,setrefresh]= useState(false);
	// const [likedproducts, setlikedproducts] = useState([]);
	// const [search, setsearch] = useState('');
	// const [issearch, setissearch] = useState(false);

	// useEffect(() => {
	//     if (!localStorage.getItem('token')) {
	//         navigate('/login');
	//     }

	// }, [])
	const fetchProduct = () => {
		const url = "http://localhost:4000/get-products";

		axios
			.get(url)
			.then((res) => {
				if (res.data.products) {
					const approvalStatus = {};
					setproducts(res.data.products);
					res.data.products.forEach((product) => {
						approvalStatus[product._id] = product.isApproved;
					});
					setApprovedProducts(approvalStatus);
				}
			})
			.catch((err) => {
				console.log(err);
				alert("SERVER ERROR");
			});
	};
	useEffect(() => {
		fetchProduct();
		// const url2 = 'http://localhost:4000/liked-products';
		// let data = { userId: localStorage.getItem('userId') }
		// axios.post(url2, data)
		//     .then((res) => {
		//         console.log(res);
		//         if (res.data.products) {
		//             setlikedproducts(res.data.products);
		//         }
		//     })
		//     .catch((err) => {
		//         console.log(err);
		//         alert("SERVER ERROR");
		//     })
	}, []);

	// const handlesearch = (value) => {
	//     // console.log("hh",value);

	//     setsearch(value);
	// }

	// const handleClick = () => {
	//     const url = 'http://localhost:4000/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');

	//     axios.get(url)
	//         .then((res) => {
	//             console.log(res.data);
	//             setproducts(res.data.products);
	//             setissearch(true);
	//         })
	//         .catch((err) => {

	//             alert("Error in Searching");
	//         })

	//     // console.log('products',products);
	//     // let filteredProducts=products.filter((item)=>{
	//     //     if(item.pname.toLowerCase().includes(search.toLowerCase())||item.pdesc.toLowerCase().includes(search.toLowerCase())||item.category.toLowerCase().includes(search.toLowerCase())){
	//     //         return item;
	//     //     }
	//     // })
	//     // setproducts(filteredProducts)
	// }

	// const handleLike = (productId, e) => {
	//     e.stopPropagation();
	//     let userId = localStorage.getItem('userId');
	//     if (!userId) {
	//         alert('Please Login first.')
	//         return;
	//     }

	//     console.log('userId', "productId", productId, userId);

	//     const url = 'http://localhost:4000/like-product';
	//     const data = { userId, productId };
	//     axios.post(url, data)
	//         .then((res) => {
	//             if (res.data.message) {
	//                 alert("WishList Successfully");
	//                 setrefresh(!refresh);
	//             }

	//         })
	//         .catch((err) => {

	//             alert("Error in Like");
	//         })
	// }

	// const handleDisLike = (productId, e) => {
	//     e.stopPropagation();
	//     let userId = localStorage.getItem('userId');
	//     if (!userId) {
	//         alert('Please Login first.')
	//         return;
	//     }

	//     console.log('userId', "productId", productId, userId);

	//     const url = 'http://localhost:4000/dislike-product';
	//     const data = { userId, productId };
	//     axios.post(url, data)
	//         .then((res) => {
	//             if (res.data.message) {
	//                 alert("Removed from WishList Successfully");
	//                 setrefresh(!refresh);
	//             }

	//         })
	//         .catch((err) => {

	//             alert("Error in Like");
	//         })
	// }

	const handleApprove = (productId) => {
		// Update the approval status in the database
		axios
			.post(`http://localhost:4000/approve-product/${productId}`)
			.then((res) => {
				// Handle success (optional)
				console.log("Product approved successfully");
				setisApproved(true);
				// You may choose to refresh the product list or update the state accordingly
			})
			.catch((err) => {
				// Handle error (optional)
				console.error("Error approving product", err);
			});
	};

	const handleProduct = (id) => {
		navigate("/product/" + id);
	};

	const [approvedProducts, setApprovedProducts] = useState({});

	const handleApprovalToggle = (id) => {
		setApprovedProducts((prevState) => ({
			...prevState,
			[id]: !prevState[id],
		}));
		handleApprove(id);
	};

	const handleDelete = (pid) => {
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
						fetchProduct();
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
			{/* <Header search={search} handlesearch={handlesearch} handleClick={handleClick} /> */}
			{/* {!issearch && <Subbody />} */}
			{/* {issearch && <h5>SEARCH RESULT:</h5>} */}
			{/* {issearch && products && products.length === 0 && <h5>No Result</h5>} */}

			{
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{products &&
						products.length > 0 &&
						products.map((item, index) => (
							<div
								key={item._id}
								className="bg-white shadow-lg rounded-lg overflow-hidden">
								<img
									className="w-full h-60 object-cover object-center"
									src={"http://localhost:4000/" + item.pimage}
									alt={item.pname}
									onError={(e) => (e.target.src = "path/to/placeholder.jpg")}
								/>
								<div className="p-4">
									<p className="text-lg font-semibold">
										{item.pname} | {item.category}
									</p>
									<p className="text-green-600">{item.pdesc}</p>
									<h3 className="text-xl text-green-600">₹{item.price}/-</h3>
									<button
										onClick={() => handleApprovalToggle(item._id)}
										className={`mt-4 py-2 px-4 rounded transition duration-300 ${
											approvedProducts[item._id]
												? "bg-red-500 hover:bg-red-600 text-white"
												: "bg-green-500 hover:bg-green-600 text-white"
										}`}>
										{approvedProducts[item._id]
											? "Disapprove Product"
											: "Approve Product"}
									</button>
									<button
										onClick={() => handleDelete(item._id)}
										className={`mt-4 ml-8 py-2 px-4 rounded transition duration-300 bg-red-500 hover:bg-red-600 text-white`}>
										{"Delete"}
									</button>
								</div>
							</div>
						))}
				</div>
			}
		</div>
	);
}

export default ManageProducts;
