import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function EditProfile({ user }) {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [about, setAbout] = useState(user.about || "");

  // No need to fetch user data here if it's being passed down as props

  const handleApi = () => {
    const userId = localStorage.getItem("userId");
    const url = `http://localhost:4000/edit-profile/${userId}`;
    const data = {
      name,
      phone,
      about,
    };

    axios
      .post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        alert("Error in updating");
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <label className=" block text-lg text-black">Name</label>
          <input
            className="w-full p-2 rounded-md bg-white text-black border border-gray-600"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font- text-black">Phone Number</label>
          <input
            className="w-full p-2 rounded-md bg-white text-black border border-gray-600"
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-normal text-black">
            About Yourself
          </label>
          <textarea
            className="w-full p-2 rounded-md bg-white text-black border border-gray-600"
            placeholder="About yourself"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <button
          className="w-full p-2 text-white bg-[#800080] rounded-md hover:bg-[#800060] transition duration-200"
          onClick={handleApi}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
