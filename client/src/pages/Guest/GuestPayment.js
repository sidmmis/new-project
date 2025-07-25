import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";
const GuestPayment = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [instance, setInstance] = useState("");
  const [clientToken, setClientToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/api/v1/general/guestdetail?email=${getQueryEmail()}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/general/braintree");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      console.log("Attempting payment...");
      const { nonce } = await instance.requestPaymentMethod();
      console.log("Nonce received:", nonce);
      const { data } = await axios.post("/api/v1/general/braintree/payment", {
        nonce,
        totalamount: userData.numberOfDays * 120,
        guestid: userData._id, // Pass total amount instead of {userData.numberOfDays}
      });
      console.log("Payment response:", data);
      setLoading(false);
      navigate(`/guestreceipt?guests=${userData._id}`);

      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.error("Error processing payment:", error);
      setLoading(false);
    }
  };

  // Function to get the email from the query parameters
  const getQueryEmail = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("email");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {userData ? (
        <div style={{ textAlign: "center" }}>
          <h1>Hey! {userData.name}, Make Payment Here!!!</h1>
          <h3>
            Your total Amount:
            {userData.numberOfDays * 120}
          </h3>

          {/* Display other user data as needed */}
        </div>
      ) : (
        <div>No data found for this email address</div>
      )}

      {!clientToken && <p>Please wait...</p>}
      {clientToken && (
        <DropIn
          options={{
            authorization: clientToken,
            paypal: {
              flow: "vault",
            },
          }}
          onInstance={(instance) => setInstance(instance)}
        />
      )}

      <button
        className="btn btn-primary"
        onClick={handlePayment}
        disabled={!instance}
      >
        {loading ? "Processing ...." : "Make Payment"}
      </button>
    </div>
  );
};

export default GuestPayment;
