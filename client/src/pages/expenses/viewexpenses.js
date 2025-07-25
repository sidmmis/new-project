import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import viewexpenses from "../Complain/viewcomplain.jpg";

const Viewexpenses = () => {
  const [Allexpenses, setAllexpenses] = useState([]);
  const [auth, setAuth] = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptCount, setReceiptCount] = useState(0);

  const GetAllexpenses = async () => {
    try {
      const response = await axios.get("/api/v1/general/viewexpenses");
      setAllexpenses(response.data);
      setReceiptCount(response.data.length);
    } catch (error) {
      console.error("Error fetching all user data:", error);
    }
  };

  useEffect(() => {
    GetAllexpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${viewexpenses})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        >
          Expenses
        </h1>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Allexpenses.map((item, index) => (
            <div
              key={item._id}
              style={{
                width: "30%",
                margin: "10px",
                border: "1px solid #000",
                padding: "10px",
                boxShadow: "12px 6px 15px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4 style={{ fontWeight: "bold" }}>
                Receipt No.: {receiptCount + index + 1}
              </h4>
              <div
                style={{
                  marginBottom: "20px",
                  border: "1px solid #000",
                  padding: "10px",
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Food: {item.food}</h4>
                <h4 style={{ fontWeight: "bold" }}>General: {item.general}</h4>
                <h4 style={{ fontWeight: "bold" }}>Dairy: {item.dairy}</h4>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  border: "1px solid #000",
                  padding: "10px",
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>Spoon: {item.spoon}</h4>
                <h4 style={{ fontWeight: "bold" }}>Plates: {item.plates}</h4>
                <h4 style={{ fontWeight: "bold" }}>Glass: {item.glass}</h4>
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  border: "1px solid #000",
                  padding: "10px",
                }}
              >
                <h4 style={{ fontWeight: "bold" }}>
                  Description: {item.description}
                </h4>
              </div>
              <h4 style={{ fontWeight: "bold" }}>
                Date: {new Date(item.createdAt).toLocaleDateString()}
              </h4>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Viewexpenses;
