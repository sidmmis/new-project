// Feedback.js
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import "./feedback.css";
import feedbacks from "./feedback.jpg";
import { Link } from "react-router-dom";

const Feedback = () => {
  const [auth, setAuth] = useAuth();
  const [foodRating, setFoodRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();

  const handleFoodChange = (newValue) => {
    setFoodRating(newValue);
  };

  const handleServiceChange = (newValue) => {
    setServiceRating(newValue);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const name = auth?.user?.name;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/v1/general/feedback", {
        foodRating,
        serviceRating,
        feedback,
        name,
      });

      navigate("/dashboard/student");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div
        className="main-class"
        style={{
          backgroundImage: `url(${feedbacks})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "673px",
        }}
      >
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <h4 className="title1">Feedback Form</h4>

            <div className="rating">
              <label style={{ fontSize: "1.5rem" }}>Food:</label>
              <Rating
                name="foodRating"
                value={foodRating}
                onChange={(event, newValue) => handleFoodChange(newValue)}
              />
            </div>

            <div className="rating">
              <label style={{ fontSize: "1.5rem" }}>Service:</label>
              <Rating
                name="serviceRating"
                value={serviceRating}
                onChange={(event, newValue) => handleServiceChange(newValue)}
              />
            </div>

            <div className="feedback">
              <textarea
                id="feedback"
                name="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                placeholder="Write your feedback here..."
              />
            </div>

            <div className="btn-group">
              <button type="submit" className="btn submit">
                Submit
              </button>
              <Link to="/dashboard/student" className="btn cancel">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
