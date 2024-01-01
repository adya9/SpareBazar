import { useEffect, useState } from "react";
// import Header from './Header/Header.jsx'
// import Subbody from './Subbody/Subbody.jsx'
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { FaHeart } from 'react-icons/fa';
import "../Home.css";
import Dashboard from "./Dashboard";

function ManageUsers() {
	const navigate = useNavigate();
	const [users, setusers] = useState([]);
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
	const fetchUsers = () => {
		const url = "http://localhost:4000/get-users";

		axios
			.get(url)
			.then((res) => {
				console.log(res);
				if (res.data) {
					setusers(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				alert("SERVER ERROR");
			});
	};
	useEffect(() => {
		fetchUsers();
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
	};

	const handleDeleteUser = (uId) => {
		const url = "http://localhost:4000/delete-user";
		const data = { uId };
		// Confirmation dialog
		if (window.confirm("Are you sure you want to delete this user?")) {
			// Add your delete logic here
			axios
				.delete(url, { data })
				.then((res) => {
					console.log("User deleted successfully");
				})
				.catch((err) => {
					console.error("Error deleting user", err);
				});
			// Example: deleteUserAPI(userId).then(...).catch(...)
		}
		fetchUsers();
	};

	return (
		<div>
			{/* <Header search={search} handlesearch={handlesearch} handleClick={handleClick} /> */}
			{/* {!issearch && <Subbody />} */}
			{/* {issearch && <h5>SEARCH RESULT:</h5>} */}
			{/* {issearch && products && products.length === 0 && <h5>No Result</h5>} */}

			{
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{users &&
						users.length > 0 &&
						users.map((user, index) => (
							<div
								key={user._id}
								className="bg-white shadow-lg rounded-lg overflow-hidden">
								<div className="p-4">
									<h3 className="text-lg font-semibold">{user.name}</h3>
									<p className="text-green-600">{user.username}</p>
									<p className="text-gray-600">{user.phone}</p>
									<p className="text-gray-600">{user.about}</p>
									<button
										onClick={() => handleDeleteUser(user._id)}
										className="mt-4 py-2 px-4 rounded transition duration-300 bg-red-500 hover:bg-red-600 text-white">
										Delete User
									</button>
								</div>
							</div>
						))}
				</div>
			}
		</div>
	);
}

function ManageUsersPage() {
	return <Dashboard children={<ManageUsers />} />;
}

export default ManageUsersPage;
