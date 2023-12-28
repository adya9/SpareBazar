import './Login/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function AdminLogin() {

    const navigate = useNavigate()
   
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        console.log({ username, password });

        const url = 'http://localhost:4000/admin-login';
        const data = { username, password };

        axios.post(url, data)
            .then((res) => {  
                console.log(res.data);
                if (res.data.message) {
                    alert(res.data.message);
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        localStorage.setItem('username', res.data.username);
                        navigate('/admin-page');
                      
                    }

                }
            })
            .catch((err) => {
                console.log(err);
                alert("Server ERROR");
            })
    }
    return (
        <div>
            <div className="container">
                <h1>ADMIN LOGIN</h1>

                {/* <form> */}
                    <input className="form-control" type="text" placeholder="Enter your Email ID" value={username} onChange={(e) => { setusername(e.target.value) }} required />
                    <input className="form-control" type="text" placeholder="Enter your Password" value={password} onChange={(e) => { setpassword(e.target.value) }} required />
                    <button className="btn" onClick={handleApi}>LOGIN</button>
                
                {/* </form> */}
            </div>
        </div>
    )
}

export default AdminLogin;