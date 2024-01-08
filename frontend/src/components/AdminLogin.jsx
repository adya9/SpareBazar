
import './Login/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AdminLogin() {
    const navigate = useNavigate();
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = (e) => {
        e.preventDefault();  // Prevent the default form submit action
        console.log({ username, password });

        const url = 'http://localhost:4000/admin-login';
        const data = { username, password };

        axios.post(url, data)
            .then((res) => {
                console.log(res.data);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('role', res.data.role); // Store the role
                    navigate('/admin-page');
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.error(err);
                alert("Login failed. Please check your credentials and try again.");
            });
    }

    return (
        <div className="container">
            <h1>ADMIN LOGIN</h1>
            <form onSubmit={handleApi}>
                <input className="form-control" type="text" placeholder="Enter your Email ID" value={username} onChange={(e) => setusername(e.target.value)} required />
                <input className="form-control" type="password" placeholder="Enter your Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                <button className="btn" type="submit">LOGIN</button>
            </form>
        </div>
    )
}

export default AdminLogin;
