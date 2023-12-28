import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
// import axios from 'axios';

function Header({ user, ...props }) {

    const [loc, setLoc] = useState(null);
    const [showOver, setshowOver] = useState(false);
    // const [usernameInitial, setUsernameInitial] = useState('');

    const navigate = useNavigate();

    // useEffect(() => {
    //     // Retrieve username from local storage and extract the first letter
    //     const storedUsername = localStorage.getItem('username');
    //     if (storedUsername) {
    //         setUsernameInitial(storedUsername.charAt(0).toUpperCase());
    //     }
    // }, []);



    // useEffect(() => {

    //     let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
    //       // Replace '/api/user/' with your actual API endpoint
    //       axios.get(url)
    //         .then(response => {
    //           const userData = response.data;
    //           const { username } = userData;
    //           console.log("username",username);
    //           if (username) {

    //             setUsernameInitial(username.charAt(0).toUpperCase());
    //           }
    //         })
    //         .catch(error => {
    //           console.error('Error fetching user data:', error);
    //         });

    //   }, []);

    // useEffect(() => {
    //     if (user && user.username) {
    //       setUsernameInitial(user.username.charAt(0).toUpperCase());
    //     }
    //   }, [user]);


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    let locations = [
        {
            "latitude": 28.6139,
            "longitude": 77.2090,
            "placeName": "New Delhi,Delhi"
        },
        {
            "latitude": 19.0760,
            "longitude": 72.8777,
            "placeName": "Mumbai,Maharastra"
        },
        {
            "latitude": 12.0225043,
            "longitude": 79.8486953,
            "placeName": "Pondicherry"

        },
    ]


    const placeholderImageUrl = 'https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg';

    return (
        <div>
            <div className="header_">
                <div className="header_logo">
                <Link to="/"  style={{ textDecoration: 'none' }}>
                    <span className="logo_s">S<span className="logo_b">B</span></span>
                </Link>
                </div>
                <div className="header_s">
                    <select value={loc} onChange={(e) => {
                        localStorage.setItem('userLoc', e.target.value);
                        setLoc(e.target.value);
                    }}>
                        {
                            locations.map((item, index) => {
                                return (
                                    <option value={`${item.latitude},${item.longitude}`}>
                                        {item.placeName}
                                    </option>

                                )
                            })
                        }

                    </select>
                </div>
                <div className="header_s">
                    {/* <span className="header_first">I am Header</span> */}
                    <input type="text" value={props && props.search} onChange={(e) => props.handlesearch && props.handlesearch(e.target.value)} placeholder='SEARCH'></input>
                    <button className="btnnn" onClick={() => props.handleClick && props.handleClick()}><FaSearch /></button>
                </div>
                <div className="header_search">
                    {/* {!!localStorage.getItem('token')&& <Link to="/add-product"><button className="btnn">ADD-PRODUCT</button></Link>}
                    {!!localStorage.getItem('token')&& <Link to="/liked-products"><button className="btnn">Like</button></Link>}
                    {!localStorage.getItem('token')?
                    <Link to="/login"><button className="btnn">LOGIN</button></Link>:<button onClick={handleLogout} className="btnn">LOGOUT</button>}
                    <Link to="login"><button class="btnn">LOGIN</button></Link> */}

                    {/* <div
                  onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#002f34',
                        width: '40px',
                        height: '40px',
                        color: '#fff',
                        fontSize: '14px',
                        borderRadius: '50%'
                    }} >  A </div> */}

                    {/* <div
                        onClick={() => {
                            setshowOver(!showOver);
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#002f34',
                            width: '40px',
                            height: '40px',
                            color: '#fff',
                            fontSize: '14px',
                            borderRadius: '50%',
                        }}
                    >
                        {usernameInitial}
                    </div> */}


                    <div
                        onClick={() => {
                            setshowOver(!showOver);
                        }}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#002f34',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden', // Ensure the image doesn't overflow
                        }}
                    >
                        {/* Always display the dummy placeholder image */}
                        <img
                            src={placeholderImageUrl}
                            alt="Placeholder"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>

                    {showOver && <div style={{
                        // minHeight: '100px',
                        // width: '200px',
                        // background: '#eee',
                        // position: 'absolute',
                        // top: '0',
                        // right: '0',
                        // zIndex: 1,
                        // marginTop: '50px',
                        // marginRight: '50px',
                        // color: 'red',
                        // fontSize: '14px',
                        // background: '#002f34',
                        // borderRadius: '7px'

                        minHeight: '100px',
                        width: '200px',
                        background: '#eee',
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        zIndex: 1,
                        marginTop: '50px',
                        marginRight: '50px',
                        fontSize: '14px',
                        borderRadius: '7px',
                        overflow: 'hidden', // Ensure overflow is hidden
                    }}>
                        <div style={{ margin: '8px' }}>
                            {!!localStorage.getItem('token') &&
                                <Link to="/my-profile" style={{ textDecoration: 'none' }}>
                                    <button className="btnn" style={{ width: '100%' }}>PROFILE  </button>
                                </Link>}
                        </div>
                        <div style={{ margin: '8px' }}>
                            {!!localStorage.getItem('token') &&
                                <Link to="/add-product" style={{ textDecoration: 'none' }}>
                                    <button className="btnn" style={{ width: '100%' }}>ADD PRODUCT  </button>
                                </Link>}
                        </div>
                        <div style={{ margin: '8px' }}>
                            {!!localStorage.getItem('token') &&
                                <Link to="/liked-products" style={{ textDecoration: 'none' }}>
                                    <button className="btnn" style={{ width: '100%' }}> FAVOURITES  </button>
                                </Link>}
                        </div>
                        <div style={{ margin: '8px' }}>
                            {!!localStorage.getItem('token') &&
                                <Link to="/my-products" style={{ textDecoration: 'none' }}>
                                    <button className="btnn" style={{ width: '100%' }}>MY PRODUCT  </button>
                                </Link>}
                        </div>
                        <div style={{ margin: '8px' }}>
                            {!localStorage.getItem('token') ?
                                // <Link to="/login">  LOGIN </Link> 
                                <Link to="/login" style={{ textDecoration: 'none' }}>
                                    <button className="btnn" style={{ width: '100%' }}>
                                        LOGIN
                                    </button>
                                </Link> :
                                <button className="btnn" onClick={handleLogout} style={{ width: '100%' }}> LOGOUT </button>}
                        </div>



                    </div>}
                </div>
            </div>

        </div>


        // </div>
    )
}

export default Header;