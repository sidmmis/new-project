import React, { useEffect, useState } from "react";
import image from "./qrcode.jpeg";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true); // Added loading state
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  let userid = auth.user;

  useEffect(() => {
    if (auth.user) {
      userid = userid._id;
      setLoading(false); // Set loading to false when auth.user is defined
      console.log(userid);
    }
  }, [auth.user]); // Include auth.user in the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if userid is defined
    if (!userid) {
      console.error("User ID is undefined");
      return;
    }

    try {
      console.log(userid);
      const paymentData = new FormData();
      // paymentData.append("userid", userid);
      paymentData.append("description", description);
      paymentData.append("photo", photo);
      console.log(paymentData);

      const { data } = axios.post(
        `/api/v1/general/payment/${userid._id}`,
        paymentData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending FormData
          },
        }
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        window.alert("Uploaded successfully");
        navigate("/dashboard/student/profile");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      {loading ? ( // Display a loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Make payment and upload your screenshot below!!!</h1>

          {/* Image */}
          <img
            src={image}
            alt="Description"
            style={{
              display: "block",
              margin: "0 auto",
              height: 200,
              width: 200,
            }}
          />

          {/* Upload File Input */}


          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12" style={{marginTop:"20px"}}>
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>

          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  width={"200px"}
                  className="img img-responsive"
                />
              </div>
            )}
          </div>

          <div>
            {/* Input box */}
            <input
              type="text"
              value={description}
              onChange={handleInputChange}
              placeholder="Enter the Remark"
              style={{ marginTop: "20px", height: 50, width: 180 }}
            />
          </div>

          {/* Submit Button */}
          <button
            style={{ marginTop: "20px" }}
            className="btn btn-success"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;
