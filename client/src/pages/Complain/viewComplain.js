import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import Header from "./../../components/Layout/Header";
import viewcomplain from "./viewcomplain.jpg";

const View = () => {
  const [complain, setComplain] = useState([]);
  const [auth, setAuth] = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleApproveComplain = async (id) => {
    try {
      const response = await axios.put(`/api/v1/general/resolvecomplain/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error in resolving complain data:", error);
    }
  };

  const Getcomplain = async () => {
    try {
      const response = await axios.get("/api/v1/general/viewcomplain");
      setComplain(response.data);
    } catch (error) {
      console.error("Error fetching complain data:", error);
    }
  };

  const handleCardHover = (index) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  useEffect(() => {
    Getcomplain();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${viewcomplain})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Complaints
        </h1>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {complain.map((c, index) => (
            <Card
              key={c.reg}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              onClick={handleCardLeave}
              style={{
                width: "30%", // Adjust the width for three cards in a row
                margin: "1.5%",
                boxSizing: "border-box",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "transform 0.3s ease-in-out",
                transform: `scale(${hoveredCard === index ? 1.05 : 1})`, // Use template string here
                height: "300px",
                background:
                  "linear-gradient(120deg, bisque 60%, rgb(255, 231, 222) 88%, rgb(255, 211, 195) 40%, rgba(255, 127, 80, 0.603) 48%)",
                color: "coral",
                fontWeight: "bold",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  marginLeft: "20px",
                  marginTop: "20px",
                }}
              >
                <h5 style={{ fontWeight: "bold" }}>
                  Name: <span style={{ fontWeight: "normal" }}> {c.name}</span>{" "}
                </h5>
                <hr />

                <h5 style={{ fontWeight: "bold" }}>
                  Reg No.:{" "}
                  <span style={{ fontWeight: "normal" }}> {c.reg}</span>{" "}
                </h5>
                <hr />
                <h5 style={{ fontWeight: "bold" }}>
                  Complain:{" "}
                  <span style={{ fontWeight: "normal" }}> {c.complain}</span>{" "}
                </h5>
                <hr />

                {auth?.user?.role === 1 ? (
                  c.resolve === "1" ? (
                    <p style={{ fontWeight: "bold" }}>Status: Resolved</p>
                  ) : (
                    <>
                      <Button onClick={() => handleApproveComplain(c._id)}>
                        Approve Complain
                      </Button>
                      <div></div>
                    </>
                  )
                ) : c.resolve === "0" ? (
                  <div>
                    <h5 style={{ fontWeight: "bold" }}>
                      Status:{" "}
                      <span style={{ fontWeight: "normal" }}> Unresolved</span>
                    </h5>
                  </div>
                ) : (
                  <div>
                    <h5 style={{ fontWeight: "bold" }}>
                      Status:{" "}
                      <span style={{ fontWeight: "normal" }}> Resolved</span>
                    </h5>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
