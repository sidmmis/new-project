import React from "react";
import "./../../styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import { useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import backImage from "./profile.jpg";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [auth, setAuth] = useAuth();
  const [singleUser, setSingleUser] = useState(null);
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);

  const currUser = auth.user;

  const fetchData = async () => {
    if (auth.user && auth.user._id) {
      try {
        const response = await axios.get(
          `/api/v1/general/myprofile?userId=${auth.user._id}`
        );
        setSingleUser(response.data);
        setPhone(response.data.phone);
        setYear(response.data.year);
        setLoading(false);

        // Fetch avatar using the user ID
        // const avatarResponse = await axios.get(
        //   `/api/v1/general/avatar` // Assuming the avatar endpoint is based on the user ID
        // );
        // setAvatar(avatarResponse.data.avatar);
      } catch (error) {
        console.error("Error fetching user data or avatar:", error);
        setLoading(false);
      }
    }
  };

  const fetchAvatar = async () => {
    try {
      const response = await axios.get(
        `/api/v1/general/avatar?userId=${auth.user._id}`
      );
      setAvatarUrl(response.data.avatar);
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchAvatar();
  }, [auth.user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSave = async () => {
    if (phone.length !== 10) {
      window.alert("Phone number should be exactly 10 digits long.");
      return;
    }
    try {
      const id = singleUser._id;
      const response = await axios.put(
        `/api/v1/general/updateProfile/${id}`,
        { phone, year },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile data saved:", response.data);
      window.alert("Profile updated successfully!!!");
    } catch (error) {
      window.alert("Profile is not updated");
      console.error("Error saving profile data:", error);
    }
  };

  const handleUpdatePhoto = async () => {
    try {
      // Convert the selected image to base64 string
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1]; // Get the base64 string excluding the data:image/png;base64,
        // Send the base64 image string to the backend
        axios
          .put(`/api/v1/general/updatePhoto/${singleUser._id}`, { base64Image })
          .then((response) => {
            console.log("Photo updated successfully", response.data);
            window.alert("Photo updated successfully!!!,Refresh your page...");
          })
          .catch((error) => {
            console.error("Error updating photo:", error);
            window.alert("Failed to update photo");
          });
      };
      reader.readAsDataURL(avatar);
    } catch (error) {
      console.error("Error updating photo:", error);
      window.alert("Failed to update photo");
    }
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div
      className="profile-container"
      style={{
        marginTop: "0px",
        backgroundImage: `url(${backImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="profile-wrapper">
          <div className="left-side">
            {avatarUrl && (
              <img
                style={{
                  borderRadius: "100%",
                  height: "250px",
                  width: "250px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Add box-shadow here
                }}
                src={`data:image/jpeg;base64,${avatarUrl}`}
                alt="Avatar"
              />
            )}
            <div className="button-containerr" style={{ marginBottom: "10px" }}>
              <div style={{ marginLeft: "10px" }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleUpdatePhoto}
              style={{ marginLeft: "36px" }}
            >
              Upload Photo
            </Button>
          </div>

          <div className="right-side">
            <div className="containerr">
              <div className="title" style={{ color: "black" }}>
                Update Profile
              </div>
              <div className="content">
                <form action="#" onSubmit={handleSave}>
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">Name</span>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        value={currUser.name}
                        readOnly
                      />
                    </div>
                    <div className="input-box">
                      <span className="details">Registration Number</span>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        value={singleUser ? singleUser.reg : ""}
                        readOnly
                      />
                    </div>
                    <div className="input-box">
                      <span className="details">Email</span>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        value={currUser.email}
                        readOnly
                      />
                    </div>
                    <div className="input-box">
                      <span className="details">Phone Number</span>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        value={phone}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    <div className="input-box">
                      <span className="details">Year</span>
                      <select
                        className="form-control form-control-lg"
                        value={year}
                        onChange={handleYearChange}
                      >
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                    <div className="input-box">
                      <span className="details">Hostel</span>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        value={currUser.hostel}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="button">
                    <input type="submit" value="Save" />
                  </div>

                  <NavLink to="/dashboard/student/profile/payment">
                    <button type="button" className="btn btn-danger btn-lg">
                      Payment
                    </button>
                  </NavLink>
                  {singleUser && singleUser.paid === "1" ? (
                    <span
                      style={{
                        margin: "0 10px",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Status: Paid{singleUser.verified ? " and Verified" : ""}
                    </span>
                  ) : (
                    <span
                      style={{
                        margin: "0 10px",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      Status: Unpaid
                    </span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
