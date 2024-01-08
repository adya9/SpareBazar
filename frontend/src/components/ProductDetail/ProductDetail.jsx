import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import io from "socket.io-client";
import "./ProductDetail.css"; // Make sure this path is correct
let socket;

function ProductDetail() {
  const [product, setproduct] = useState();
  const [user, setuser] = useState();
  const [msg, setmsg] = useState("");
  const [msgs, setmsgs] = useState([]);

  const p = useParams();

  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("getMsg", (data) => {
      const filteredData = data.filter(
        (item) => item.productId === p.productId
      );
      setmsgs(filteredData);
    });
  }, [p.productId]);
  useEffect(() => {
    const url = "http://localhost:4000/get-product/" + p.productId;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setproduct(res.data.product);
          localStorage.setItem("productId", res.data.product._id);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SERVER ERROR");
      });
  }, [p.productId]);

  const handleSend = () => {
    const data = {
      username: localStorage.getItem("username"),
      msg,
      productId: localStorage.getItem("productId"),
    };
    socket.emit("sendMsg", data);
    setmsg("");
  };

  const handleContact = (addedBy) => {
    const url = "http://localhost:4000/get-user/" + addedBy;
    axios
      .get(url)
      .then((res) => {
        if (res.data.user) {
          setuser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("SERVER ERROR");
      });
  };

  const redirectToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${product.whatsappNumber}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        {product && (
          <div>
            <div>
              <div class="max-w-2xl mx-auto p-4 flex ">
                <div class="flex-none">
                  <div class="bg-white rounded-lg border border-gray-300">
                    <div class="text-black text-center product-display">
                      <img
                        src={"http://localhost:4000/" + product.pimage}
                        alt={product.pname}
                      />
                    </div>
                  </div>
                </div>

                <div class="ml-8 flex-grow">
                  <h1 class="text-xl font-semibold mb-2">{product.pname}</h1>
                  <p class="mb-4">
                    <h4>{product.pdesc}</h4>
                  </p>
                  <p class="text-lg font-semibold mb-2">
                    Price : {product.price}
                  </p>
                  <p class="text-lg font-semibold mb-6">
                    {/* {product.priceNegotiable
                      ? "Price is negotiable"
                      : "Fixed price"} */}
                      Price is : {product.priceNegotiable}
                  </p>
                  <p class="text-lg font-semibold mb-6">
                    {/* {product.priceNegotiable
                      ? "Price is negotiable"
                      : "Fixed price"} */}
                      Location is : {product.address}
                  </p>
                  <div className="flex justify-start">
                    {/* <p className="flex justify-center p-2">
        <FaWhatsapp size={30} style={{ color: 'green' }} />

        </p> */}
                    <button
                      className=" shadow  text-green-600 p-2 font-medium  rounded"
                      onClick={redirectToWhatsApp}
                    >
                      Chat with Seller
                    </button>

                    <button class="bg-[#800080] text-white mx-3 px-4 py-2 rounded hover:bg-[#800060] transition-colors">
                      Buy Now
                    </button>
                  </div>
                  <div>
                    <button
                      className="mt-3 bg-white hover:bg-gray-500 text-black font-bold py-2 px-4 rounded cursor-pointer"
                      onClick={() => handleContact(product.addedBy)}
                    >
                      Show User Details
                    </button>

                    {user && (
                      <div className="mt-4 bg-gray-100 p-4 rounded shadow">
                        <h4 className="font-semibold">
                          Name: <span className="font-normal">{user.name}</span>
                        </h4>
                        <h4 className="font-semibold">
                          Phone:{" "}
                          <span className="font-normal">{user.phone}</span>
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Use This chat code, for now i have commented it.*/}

            <div className="chat-section">
                            <h2 className="text-black font-bold">QUERY BOX</h2>
                            {msgs.map((item, index) => (
                                <p key={item._id} className={`chat-message ${item.username === localStorage.getItem('username') ? 'user-message' : 'other-message'}`}>
                                    {item.username}: {item.msg}
                                </p>
                            ))}
                            <div className="input-section">
                                <input value={msg} onChange={(e) => setmsg(e.target.value)} type="text" />
                                <button onClick={handleSend}>SEND</button>
                            </div>
                        </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
