// import { useEffect, useState } from "react";

// import Header from "./Header/Header";
// import axios from "axios";

// function MyProfile() {
//     const [user, setuser] = useState({});

//     useEffect(() => {

//         let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
//         axios.get(url)
//             .then((res) => {
//                 console.log(res.data);
//                 if (res.data.user) {
//                     setuser(res.data.user);
//                 }
//             })
//             .catch((err) => {
//                 alert('server Error');
//             })

//     }, [])


//     return (

//         <div>
//             <Header />
//             <h5 className="text-center">user profile</h5>

//             <table className="table table-dark">
//                 <thead>
//                     <tr>
//                         <td>USERNAME</td>

//                     </tr>

//                 </thead>
//                 <tbody>

//                     <tr>
//                         <td>{user.username}</td>
//                     </tr>

//                 </tbody>

//             </table>
//         </div>
//     )
// }

// export default MyProfile;

// import { useEffect, useState } from "react";
// import Header from "./Header/Header";
// import axios from "axios";

// function MyProfile() {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
//     axios.get(url)
//       .then((res) => {
//         console.log(res.data);
//         if (res.data.message === 'success') {
//           setUser(res.data.user);
//         } else {
//           setError('User not found');
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setError('Server Error');
//       });
//   }, []);

//   return (
//     <div>
//       <Header/>
//       <h5 className="text-center">User Profile</h5>

//       {error ? (
//         <p className="text-danger">{error}</p>
//       ) : (
//         <table className="table table-dark">
//           <thead>
//             <tr>
//               <th>USERNAME</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{user.username}</td>
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default MyProfile;



import { useEffect, useState } from 'react';
import axios from 'axios';
import EditProfile from './EditProfile';
import Header from './Header/Header';
import './Header/Header.css';


function MyProfile() {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                if (res.data.message === 'success') {
                    setUser(res.data.user);
                } else {
                    setError('User not found');
                }
            })
            .catch((err) => {
                console.error(err);
                setError('Server Error');
            });
    }, []);

    return (
    
    <>
    <Header />
        <div className="bg-white min-h-screen flex items-center justify-center">
            {error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="container mx-auto shadow-none px-4">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 mb-4 lg:mb-0">
                            <div className="bg-white p-6 rounded-lg shadow-inner drop-shadow">
                                <h3 className="text-xl text-black font-semibold border-b border-gray-700 pb-4 mb-6">User Information</h3>
                                <p className="text-black text-sm mb-2">Username: {user.username || 'N/A'}</p>
                                <p className="text-black text-sm mb-2">Name: {user.name || 'N/A'}</p>
                                <p className="text-black text-sm mb-2">Phone: {user.phone || 'N/A'}</p>
                                <p className="text-black text-sm">About Me: {user.about || 'N/A'}</p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 px-4">
                            <div className="bg-white p-6 rounded-lg drop-shadow shadow-inner">
                                <h3 className="text-xl text-black font-semibold border-b border-gray-700 pb-4 mb-6">Edit Profile</h3>
                                <EditProfile user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

</>
    );
  
}

export default MyProfile;
