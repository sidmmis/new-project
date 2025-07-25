import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { deepPurple, purple } from "@mui/material/colors";
import "./../user/viewuser.css";
import viewcomplain from "./../Complain/viewcomplain.jpg";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Viewfeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [totalFoodRating, setTotalFoodRating] = useState(0);
  const [totalServiceRating, setTotalServiceRating] = useState(0);

  const getFeedback = async () => {
    try {
      const response = await axios.get("/api/v1/general/viewfeedback");
      setFeedback(response.data);

      setTotalFeedback(response.data.length);
      setTotalStudent(
        response.data.reduce((total, item) => {
          return total + (item.name ? 1 : 0);
        }, 0)
      );

      setTotalFoodRating(
        response.data.reduce((total, item) => {
          return total + (item.foodRating ? parseInt(item.foodRating) : 0);
        }, 0)
      );

      setTotalServiceRating(
        response.data.reduce((total, item) => {
          return (
            total + (item.serviceRating ? parseInt(item.serviceRating) : 0)
          );
        }, 0)
      );
    } catch (error) {
      console.error("Error fetching feedback data:", error);
    }
  };

  useEffect(() => {
    getFeedback();
    // eslint-disable-next-line
  }, []);

  // Calculate the average food rating in percentage and round to two decimal places
  let averageFoodRatingPercentage =
    Math.round((totalFoodRating / totalFeedback / 5.0) * 100 * 100) / 100;

  // Calculate the remaining food rating percentage and round to two decimal places
  let remainingFoodRatingPercentage =
    Math.round((100 - averageFoodRatingPercentage) * 100) / 100;

  // Calculate the average service rating in percentage and round to two decimal places
  let averageServiceRatingPercentage =
    Math.round((totalServiceRating / totalFeedback / 5.0) * 100 * 100) / 100;

  // Calculate the remaining service rating percentage and round to two decimal places
  let remainingServiceRatingPercentage =
    Math.round((100 - averageServiceRatingPercentage) * 100) / 100;

  const lightBlueShades = [
    "#336BFF",
    "#33FFD4",
    "#9F33FF",
    "#FF33E6",
    "#ADD8E6",
    "#87CEEB",
    "#00BFFF",
    "#1E90FF",
    "#6495ED",
  ];

  const FoodData = [
    {
      data: [
        {
          id: 0,
          value: averageFoodRatingPercentage,
          name: "positive Food Rating (%)",
          color: "#336BFF",
        },
        {
          id: 1,
          value: remainingFoodRatingPercentage,
          name: "negative Food Rating (%)",
          color: "#33FFD4",
        },
      ],
    },
  ];

  const ServiceData = [
    {
      data: [
        {
          id: 0,
          value: averageServiceRatingPercentage,
          name: "Positive Service Rating (%)",
          color: "#9F33FF", // Choose a color for average service rating
        },
        {
          id: 1,
          value: remainingServiceRatingPercentage,
          name: "negative Food Rating (%)",
          color: "#FF33E6", // Choose a color for the remaining part
        },
      ],
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${viewcomplain})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div style={{ margin: "auto" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
          }}
        >
          Upcoming Feedback
        </h1>

        {totalFeedback === 0 ? (
          <p>No upcoming feedback available</p>
        ) : (
          <div>
            <Row className="justify-content-center">
              {/* Display the Average Food Rating Pie Chart */}
              <Col
                md={6}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  marginRight: 30,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "20px",
                  minWidth: "300px",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <PieChart width={300} height={300}>
                  <Pie
                    data={FoodData[0].data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {FoodData[0].data.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Col>

              {/* Display the Average Service Rating Pie Chart */}
              <Col
                md={6}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  marginLeft: 30,
                  padding: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  minWidth: "300px",
                  maxWidth: "400px",
                  width: "100%",
                }}
              >
                <PieChart width={300} height={300}>
                  <Pie
                    data={ServiceData[0].data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {ServiceData[0].data.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Col>
            </Row>

            <Row className="justify-content-center">
              {feedback.map((item, index) => (
                <Col key={index} md={4} className="mb-4">
                  <div
                    className="flip-card"
                    style={{
                      width: 400,
                      margin: "0 auto", // Center the card horizontally
                    }}
                  >
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <p className="title"></p>
                        <strong>Name: {item.name || "No Name"}</strong>
                        <br />
                        <strong>Food Rating: {item.foodRating}</strong>
                        <br />
                        <strong>Service Rating: {item.serviceRating}</strong>
                      </div>
                      <div className="flip-card-back">
                        <p className="title"></p>
                        <strong>Feedback: {item.feedback}</strong>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewfeedback;
