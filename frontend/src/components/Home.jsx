import { useEffect, useState } from "react";
import Header from "./Header/Header.jsx";
import Subbody from "./Subbody/Subbody.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import "./Home.css";

function Home() {
	const navigate = useNavigate();
	const [products, setproducts] = useState([]);
	const [refresh, setrefresh] = useState(false);
	const [likedproducts, setlikedproducts] = useState([]);
	const [search, setsearch] = useState("");
	const [issearch, setissearch] = useState(false);

	useEffect(() => {
		const url = "http://localhost:4000/get-products";

		axios
			.get(url)
			.then((res) => {
				console.log(res);
				if (res.data.products) {
					setproducts(res.data.products);
				}
			})
			.catch((err) => {
				console.log(err);
				alert("SERVER ERROR");
			});

		const url2 = "http://localhost:4000/liked-products";
		let data = { userId: localStorage.getItem("userId") };
		axios
			.post(url2, data)
			.then((res) => {
				console.log(res);
				if (res.data.products) {
					setlikedproducts(res.data.products);
				}
			})
			.catch((err) => {
				console.log(err);
				alert("SERVER ERROR");
			});
	}, [refresh]);

	const handlesearch = (value) => {

		setsearch(value);
	};

	const handleClick = () => {
		const url =
			"http://localhost:4000/search?search=" +
			search +
			"&loc=" +
			localStorage.getItem("userLoc");

		axios
			.get(url)
			.then((res) => {
				console.log(res.data);
				setproducts(res.data.products);
				setissearch(true);
			})
			.catch((err) => {
				alert("Error in Searching");
			});

	};

	const handleLike = (productId, e) => {
		e.stopPropagation();
		let userId = localStorage.getItem("userId");
		if (!userId) {
			alert("Please Login first.");
			return;
		}

		console.log("userId", "productId", productId, userId);

		const url = "http://localhost:4000/like-product";
		const data = { userId, productId };
		axios
			.post(url, data)
			.then((res) => {
				if (res.data.message) {
					alert("WishList Successfully");
					setrefresh(!refresh);
				}
			})
			.catch((err) => {
				alert("Error in Like");
			});
	};

	const handleDisLike = (productId, e) => {
		e.stopPropagation();
		let userId = localStorage.getItem("userId");
		if (!userId) {
			alert("Please Login first.");
			return;
		}

		console.log("userId", "productId", productId, userId);

		const url = "http://localhost:4000/dislike-product";
		const data = { userId, productId };
		axios
			.post(url, data)
			.then((res) => {
				if (res.data.message) {
					alert("Removed from WishList Successfully");
					setrefresh(!refresh);
				}
			})
			.catch((err) => {
				alert("Error in Like");
			});
	};

	const handleProduct = (id) => {
		navigate("/product/" + id);
	};

	return (
		<div>
			<Header
				search={search}
				handlesearch={handlesearch}
				handleClick={handleClick}
			/>
			{!issearch && <Subbody />}
			{issearch && <h5>SEARCH RESULT:</h5>}
			{issearch && products && products.length === 0 && <h5>No Result</h5>}
			{issearch && (
				<div className="d-flex justify-content-center flex-wrap">
					{/* <h2>MY PRODUCTS</h2> */}
					{products &&
						products.length > 0 &&
						products.map((item, index) => {
							return (
								<div
									onClick={() => handleProduct(item._id)}
									key={item._id}
									className="card m-3">
									<div
										className="icon-container"
										onClick={(e) => handleLike(item._id, e)}>
										{likedproducts.find(
											(likedItem) => likedItem._id === item._id,
										) ? (
											<FaHeart className="red-icons" />
										) : (
											<FaHeart className="icons" />
										)}
										{/* <FaHeart className='icons'/> */}
									</div>
									<div>
										<img
											width="300px"
											height="300px"
											src={"http://localhost:4000/" + item.pimage}
											alt=""
										/>
										<p className="p-2">
											{item.pname} | {item.category}
										</p>
										<p className="p-2 text-success">{item.pdesc} </p>
										<h3 className="p-2 text-success">₹{item.price}/- </h3>
									</div>
								</div>
							);
						})}
				</div>
			)}
			{!issearch && (
				<div className="d-flex justify-content-center flex-wrap">
					{/* <h2>MY PRODUCTS</h2> */}
					{products &&
						products.length > 0 &&
						products
							.filter((item) => item.isApproved)
							.map((item, index) => {
								return (
									<div
										onClick={() => handleProduct(item._id)}
										key={item._id}
										className="card m-3">
										<div className="icon-container">
											{/* <FaHeart className='icons'/> */}
											{likedproducts.find(
												(likedItem) => likedItem._id === item._id,
											) ? (
												<FaHeart
													onClick={(e) => handleDisLike(item._id, e)}
													className="red-icons"
												/>
											) : (
												<FaHeart
													onClick={(e) => handleLike(item._id, e)}
													className="icons"
												/>
											)}
										</div>

										<img
											width="300px"
											height="300px"
											src={"http://localhost:4000/" + item.pimage}
											alt=""
										/>
										<p className="p-2">
											{item.pname} | {item.category}
										</p>
										<p className="p-2 text-success">{item.pdesc} </p>
										<h3 className="p-2 text-success">₹{item.price}/- </h3>
									</div>
								);
							})}
				</div>
			)}
		</div>
	);
}

export default Home;
