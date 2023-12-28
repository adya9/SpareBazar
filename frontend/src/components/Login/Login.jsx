import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Login() {

    const navigate = useNavigate()
   
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const handleApi = () => {
        console.log({ username, password });

        const url = 'http://localhost:4000/login';
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
                        navigate('/');
                      
                    }

                }
            })
            .catch((err) => {
                console.log(err);
                alert("SR ERROR");
            })
    }
    return (
        <div>
            <div className="container">
                <h1>LOGIN</h1>

                {/* <form> */}
                    <input className="form-control" type="text" placeholder="Enter your Email ID" value={username} onChange={(e) => { setusername(e.target.value) }} required />
                    <input className="form-control" type="text" placeholder="Enter your Password" value={password} onChange={(e) => { setpassword(e.target.value) }} required />
                    <button className="btn" onClick={handleApi}>LOGIN</button>
                    <p>Not Having An Account <Link to="/signup">Signup</Link></p>
                {/* </form> */}
            </div>
        </div>
    )
}

export default Login;