// import React from 'react';
// import ReactDOM from 'react-dom/client';

// import App from './App';
// import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import './index.css';

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
  // Route,
  // Link,
} from "react-router-dom";

import Home from './components/Home.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import AddProduct from './components/AddProduct/AddProduct.jsx';
import LikedProducts from './components/LikedProducts.jsx';
import ProductDetail from './components/ProductDetail/ProductDetail.jsx';
import MyProducts from './components/MyProducts.jsx';
import MyProfile from './components/MyProfile.jsx';
import EditProduct from './components/EditProduct.jsx';
import EditProfile from './components/EditProfile.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminPage from './components/AdminPage.jsx';
import ManageUsersPage from './components/dashboard/ManageUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "/about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login/>),
  },
  {
    path: "/admin-login",
    element: (<AdminLogin/>),
  },
  {
    path: "/admin-page",
    element: (<AdminPage/>),
  },
  {
    path: "/signup",
    element: (<Signup/>),
  },
  {
    path: "/add-product",
    element: (<AddProduct/>),
  },
  {
    path: "/edit-product/:productId",
    element: (<EditProduct/>),
  },
  {
    path: "/edit-profile/:userId",
    element: (<EditProfile/>),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts/>),
  },
  {
    path: "/product/:productId",
    element: (<ProductDetail/>),
  },
  {
    path: "/my-products",
    element: (<MyProducts/>),
  },
  {
    path: "/my-profile",
    element: (<MyProfile/>),
  },
  {path: "/admin-page/manage-users",
  element: (<ManageUsersPage/>),}
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);