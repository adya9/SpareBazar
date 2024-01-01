import React from "react";
import ManageProducts from "./dashboard/ManageProducts";
import Dashboard from "./dashboard/Dashboard";

export default function AdminPage() {
	return <Dashboard children={<ManageProducts />} />;
}
