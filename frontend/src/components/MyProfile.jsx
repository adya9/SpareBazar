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




import { useEffect, useState } from "react";
import Header from "./Header/Header";
import axios from "axios";
import EditProfile from './EditProfile';

function MyProfile() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  
  useEffect(() => {

    let url = 'http://localhost:4000/my-profile/' + localStorage.getItem('userId');
    axios.get(url)
      .then((res) => {
        console.log(res.data);
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

  // const handleEditClick = () => {
  //   setEditMode(true);
  // };

  // const handleSaveClick = () => {
  //   // Add logic to save edited user information
  //   setEditMode(false);
  // };

  return (
    <div >
      <Header />
      {/* <h5 className="text-center">User Profile</h5> */}

      {error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div className="d-flex flex-row">
          {/* <div className="col-6">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th>USERNAME</th>
                  <th>FULL NAME</th>
                  <th>ABOUT ME</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.about}</td>
                </tr>
              </tbody>
            </table>
          </div> */}


<div className="card border-primary mb-3">
  <div className="card-header">User Information</div>
  <div className="card-body">
 
    <p className="card-text">Username: {user.username}</p>
    <p className="card-text">Name: {user.name|| 'N/A'}</p>
    <p className="card-text">Phone: {user.phone|| 'N/A'}</p>
    <p className="card-text">About Me: {user.about|| 'N/A'}</p>
  </div>
</div>
          <div className="col-6">
            <EditProfile  />
            {/* <AddProduct/> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;