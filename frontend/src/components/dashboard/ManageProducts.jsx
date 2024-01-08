import { useEffect, useState } from "react";
import axios from "axios";
import "../Home.css";

function ManageProducts() {
	const [products, setproducts] = useState([]);

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
	}, []);

	const handleApprove = (productId) => {
		// Update the approval status in the database
		axios
			.post(`http://localhost:4000/approve-product/${productId}`)
			.then((res) => {
				// Handle success (optional)
				console.log("Product approved successfully");
				// You may choose to refresh the product list or update the state accordingly
			})
			.catch((err) => {
				// Handle error (optional)
				console.error("Error approving product", err);
			});
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
									<h3 className="text-xl text-black-800">Product SOLD : {item.isSold}</h3>
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
