// import './Signup.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

function EditProfile(){

    const navigate= useNavigate();

    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');
    const [name,setname]=useState('');
    const [phone,setphone]=useState('');
    const [about,setabout]=useState('');



    useEffect(() => {
        const url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');

        axios.get(url)
            .then((res) => {
             
                if (res.data.user) {
                    console.log(res.data.user);
                    let product=res.data.user;
                    setname(product.name);
                    setphone(product.phone);
                    setabout(product.about);
                    
                }
            })
            .catch((err) => {
                console.log(err);
                alert("SERVER ERROR");
            })
    }, [])

    // console.log({username,password});
    const handleApi=()=>{
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:4000/edit-profile/`+localStorage.getItem('userId');;
        const data = {
            name: name,
            phone: phone,
            about: about,
          };
      
        axios.post(url,data)
        .then((res)=>{
            console.log(res);
            if(res.data.message)
            {
                alert(res.data.message);
                navigate('/my-profile')
            }

        })
        .catch((err)=>{
            alert('error in updating');
            console.log(err);
        })

    }
    
    return(
        <div>
            <div className="container">
                <h3>EDIT DETAILS</h3>

                {/* <form> */}
                    <span>Name <span id="asteric"></span></span>
                    <input className="form-control" type="text" placeholder="Enter your Name" value={name} onChange={(e)=>{setname(e.target.value)}} required/>
                    <span>Phone Number <span id="asteric"></span></span>
                    <input className="form-control" type="number" placeholder="Enter your Phone Number" value={phone} onChange={(e)=>{setphone(e.target.value)}} required/>
                    <span>About Yourself</span>
                    <textarea className="form-control" type="text" placeholder="About Yourself" value={about} onChange={(e)=>{setabout(e.target.value)}}/>
                    
                    <button className="btn"   onClick={handleApi} >UPDATE</button>
                {/* </form> */}
              
            </div>       
        </div>
    )
}

export default EditProfile;