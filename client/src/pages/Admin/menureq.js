import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Card, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import menuupdate from "./menuupdate.jpg";

const Menureq = () => {
  const [menuRequests, setMenuRequests] = useState([]);
  const [comments, setComments] = useState({});
  const [menuData, setMenuData] = useState([]);

  const Getmenu = async () => {
    try {
      await axios
        .get("/api/v1/auth/getmenu") // Replace with the actual API endpoint
        .then((response) => {
          setMenuData(response.data);
        });
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  const fetchMenuRequests = async () => {
    try {
      const response = await axios.get("/api/v1/general/viewmessreq");
      setMenuRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching menu requests:", error.message);
    }
  };

  useEffect(() => {
    Getmenu();
    fetchMenuRequests();
  }, []);

  const handleAction = async (menuRequestId) => {
    try {
      await axios.put("/api/v1/general/approvemenureq", {
        menuRequestId,
        comment: comments[menuRequestId] || "", // Get the comment from the state
      });
      // Reload the page after removing the request
      window.location.reload();
    } catch (error) {
      console.error("Error fetching menu requests:", error.message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${menuupdate})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          position: "relative",
          top: "60px",
        }}
      >
        {/* First Column - Menu Requests */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
            overflowY: "auto", // Add overflowY for vertical scrollbar
            maxHeight: "600px", // Set a fixed height for the card
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>
            Menu Requests
          </h2>
          <hr />
          {menuRequests.map(
            (item, index) =>
              item.status === "0" && (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <ol
                    style={{
                      border: "3px solid #ccc",
                      listStyle: "none",
                      width: "40%",

                      padding: 0,
                      marginTop: "30px",
                      borderRadius: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item.managerreq.map((request, reqIndex) => (
                      <li key={reqIndex}>{request}</li>
                    ))}
                  </ol>

                  <TextField
                    id={`comment-${item._id}`}
                    label="Enter comments..."
                    type="search"
                    variant="standard"
                    style={{ width: "200px", marginLeft: "300px" }}
                    value={comments[item._id] || ""}
                    onChange={(e) =>
                      setComments({ ...comments, [item._id]: e.target.value })
                    }
                  />

                  {/* Clickable buttons for approve and reject */}
                  <Button
                    onClick={() => handleAction(item._id)}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </div>
              )
          )}
        </div>

        {/* Second Column - Table */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>Mess Menu</h2>
          <Table
            striped
            responsive
            bordered
            hover
            variant="dark"
            style={{
              width: "100%",
              height: "65vh",
            }}
          >
            <thead>
              <tr style={{ height: "80px", fontSize: "2rem" }}>
                <th>Day</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
            </thead>
            <tbody>
              {menuData.map((menu) => (
                <tr key={menu.dayOfWeek}>
                  <td>{menu.dayOfWeek}</td>
                  <td>{menu.breakfast}</td>
                  <td>{menu.lunch}</td>
                  <td>{menu.dinner}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Menureq;
