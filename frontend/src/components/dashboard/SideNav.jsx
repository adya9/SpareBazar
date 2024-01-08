import React from "react";
import { FaUsers, FaFileAlt, FaPowerOff } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Map of links to display in the side navigation.

const links = [
	{
		name: "Manage Product",
		href: "/admin-page",
		icon: FaFileAlt,
	},
	{ name: "Manage User", href: "/admin-page/manage-users", icon: FaUsers },
];

function NavLinks() {
	return (
		<div className="flex flex-col p-3 w-full">
			{links.map((link) => (
				<a
					key={link.name}
					href={link.href}
					className="flex items-center h-12 px-4 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-blue-200 mt-2">
					<link.icon
						className="w-5 h-5 mr-2"
						aria-hidden="true"
					/>
					<span>{link.name}</span>
				</a>
			))}
		</div>
	);
}

export default function SideNav() {
	const [userRole, setUserRole] = useState(localStorage.getItem("role"));
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		setUserRole(null); // Immediately update the userRole state to null

		navigate("/");
	};

	return (
		<div className="flex h-screen flex-col items-center bg-gray-100 m-2 shadow-lg w-64">
			<div className="flex items-center justify-center w-full h-20  bg-[#800080] rounded-lg shadow-md">
				{/* Replace with your actual logo */}
				<a
					href="/"
					className="text-xl p-2 font-bold text-white">
					SpareBazar
				</a>
			</div>
			<NavLinks />
			<form className="mt-auto w-full  px-4 mb-5">
				<button
					onClick={handleLogout}
					className="flex  items-center justify-center h-12 w-full gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium text-gray-700 hover:bg-blue-200 mt-2">
					<FaPowerOff className="w-5 h-5" />
					<span>Sign Out</span>
				</button>
			</form>
		</div>
	);
}
