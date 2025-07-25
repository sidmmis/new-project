import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";
import pollback from "./pollback.jpg";
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

const PollResult = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: "", options: "", count: "" }]);
  const [pollId, setPollId] = useState("");

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await axios.get("/api/v1/general/getPoll");
        const pollData = response.data;
        setQuestion(pollData.question);
        setOptions(pollData.options);
        setPollId(pollData._id);
      } catch (error) {
        console.error("Error fetching poll data:", error);
      }
    };
    fetchPollData();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.delete(`/api/v1/general/deletepoll/${pollId}`);
      navigate("/dashboard/warden");
    } catch (error) {
      console.error("Error deleting poll:", error);
    }
  };

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

  const barChartData = options.map((option, index) => ({
    name: option.options,
    count: option.count,
    color: lightBlueShades[index % lightBlueShades.length],
  }));

  // Map the colors to pieChartData
  const pieChartData = options.map((option, index) => ({
    name: option.options,
    value: option.count,
    color: lightBlueShades[index % lightBlueShades.length],
  }));

  return (
    <div
      style={{
        backgroundImage: `url(${pollback})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
          Poll Result Visualization
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 10,
          }}
        >
          <h3>Question: {question}</h3>
        </div>

        {pollId ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                margin: "10px",
                minWidth: "300px",
                maxWidth: "400px",
                width: "100%",
              }}
            >
              <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
              <BarChart
                width={300}
                height={300}
                data={barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>

            <div
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "20px",
                margin: "10px",
                minWidth: "300px",
                maxWidth: "400px",
                width: "100%",
              }}
            >
              <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </div>
        ) : (
          <p>No poll available</p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            margintop: 50,
          }}
        >
          <Button onClick={handleSubmit} variant="contained">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PollResult;
