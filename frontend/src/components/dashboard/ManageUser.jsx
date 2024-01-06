import { useEffect, useState } from "react";
import axios from "axios";
import "../Home.css";
import Dashboard from "./Dashboard";

function ManageUsers() {
	const [users, setusers] = useState([]);

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
	}, []);

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
		}
		fetchUsers();
	};

	return (
		<div>
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
