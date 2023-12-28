import './Signup.css';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Signup(){

    const navigate= useNavigate();

    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [name,setname]=useState('');
    const [phone,setphone]=useState('');
    const [about,setabout]=useState('');
    // console.log({username,password});
    const handleApi=()=>{
        console.log({username,password});
 
        const url='http://localhost:4000/signup';
        const data={username,password,name,phone,about};

        axios.post(url,data)
        .then((res)=>{
            console.log(res.data) 
            if(res.data.message)
            {
                alert(res.data.message);
                console.log('Redirecting to /signin');
                navigate('/login');
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("SERVER ERROR");
        })

    }
    
    return(
        <div>
            <div className="container">
                <h1>SIGNUP</h1>

                {/* <form> */}
                    <span>Username <span id="asteric">*</span></span>
                    <input className="form-control" type="email" placeholder="Enter your Email ID" value={username} onChange={(e)=>{setusername(e.target.value)}} required/>
                    <span>Password <span id="asteric">*</span></span>
                    <input className="form-control" type="text" placeholder="Enter your Password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required/>
                    <span>Name <span id="asteric">*</span></span>
                    <input className="form-control" type="text" placeholder="Enter your Name" value={name} onChange={(e)=>{setname(e.target.value)}} required/>
                    <span>Phone Number <span id="asteric">*</span></span>
                    <input className="form-control" type="number" placeholder="Enter your Phone Number" value={phone} onChange={(e)=>{setphone(e.target.value)}} required/>
                    <span>About Yourself</span>
                    <textarea className="form-control" type="text" placeholder="About Yourself" value={about} onChange={(e)=>{setabout(e.target.value)}}/>
                    
                    <button className="btn"   onClick={handleApi} >SIGNUP</button>
                {/* </form> */}
              
            </div>       
        </div>
    )
}

export default Signup;