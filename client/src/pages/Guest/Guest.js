import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import guest from "./guest.jpg";
import "./Guest.css";
const GuestForm = () => {
  const navigate = useNavigate();
  const [guestData, setGuestData] = useState({
    name: "",
    contactNumber: "",
    email: "", // Add email field
    startDate: "",
    numberOfDays: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFields = Object.values(guestData).some((value) => value === "");

    if (guestData.contactNumber.length !== 10) {
      window.alert("Contact number should be exactly 10 digits long.");
      return;
    }
    try {
      const res = await axios.post("/api/v1/general/guests", guestData);
      if (res.data) {
        window.alert("Make Payment Now!!! ");
        navigate(`/guest/payment?email=${guestData.email}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setGuestData({ ...guestData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${guest})`,
          backgroundSize: "cover",
          minHeight: "100vh",
        }}
      >
        <div id="guest-form" style={{ marginTop: "0px" }}>
          <form onSubmit={handleSubmit}>
            <h4 className="title" style={{ marginBottom: "20px" }}>
              FILL UP YOUR DETAILS
            </h4>
            <div className="mb-3">
              <input
                type="text"
                id="exampleInputName"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                id="exampleInputEmail"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                id="exampleInputContactNo"
                name="contactNumber"
                placeholder="Enter your contact number"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                id="exampleInputStartDate"
                name="startDate"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                id="exampleInputNumberOfDays"
                name="numberOfDays"
                placeholder="Enter number of days"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                id="exampleInputTotalPayment"
                name="totalPayment"
                value={120 * guestData.numberOfDays} // Display total payment
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h4 className="title" style={{ marginBottom: "10px" }}>
              Mess Instructions
            </h4>
            <ol>
              <li>Breakfast: 7:00 AM - 9:00 AM (Price: ₹20 per day)</li>
              <li>Lunch: 12:00 PM - 2:00 PM (Price: ₹60 per day)</li>
              <li>Dinner: 6:00 PM - 8:00 PM (Price: ₹60 per day)</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestForm;
