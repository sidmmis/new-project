import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { Radio } from "@mui/material";
import "./Viewpoll.css";
import Button from "@mui/material/Button";
import back from "./back.jpg";

import PollIcon from "@mui/icons-material/Poll";

import { RadioGroup, FormControlLabel } from "@mui/material";

const Viewpoll = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: "", options: "", count: "" }]);
  const [selectedOption, setSelectedOption] = useState({});
  const [pollId, setPollId] = useState("");
  const [validuser, setValidUser] = useState(0);
  const username = auth?.user?.name;

  useEffect(() => {
    // Fetch existing poll data if pollId is provided

    const fetchPollData = async () => {
      try {
        const response = await axios.get("/api/v1/general/getPoll");
        const pollData = response.data;
        setQuestion(pollData.question);
        setOptions(pollData.options);
        setPollId(pollData._id);
        const userExists = pollData.votedUsers.includes(username);
        if (userExists) {
          setValidUser(1);
        }
      } catch (error) {
        console.error("Error fetching poll data:", error);
        // Handle errors here
      }
    };
    fetchPollData();
  }, []);

  // when submit button is clicked
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(options[selectedOption]);
    try {
      const response = await axios.post("/api/v1/general/submitPoll", {
        selectedOption: options[selectedOption],
        username,
      });
      toast.success("Poll submitted successfully");
      console.log("Poll updated successfully:", response.data);

      navigate("/dashboard/student");
    } catch (error) {
      toast.error("Error submitting poll");
      console.error("Error submitting poll:", error);
    }
  };
  console.log(`your id is${validuser}`);
  return (
    <div
      style={{
        backgroundImage: `url(${back})`,
        backgroundSize: "cover",
        minHeight: "85vh",
        marginTop: "0px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "50px",
        }}
      >
        <div className="wrappers">
          {validuser === 0 && pollId ? (
            <form onSubmit={handleSubmit} className="poll-area">
              <p style={{ fontWeight: "bold", marginTop: 10, fontSize: 30 }}>
                {question} ?{" "}
              </p>
              <hr />

              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={selectedOption}
                onChange={(event) => setSelectedOption(event.target.value)}
              >
                {options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={index}
                    control={<Radio />}
                    label={
                      <>
                        {`${option.options} `}
                        <PollIcon style={{ marginLeft: "160px" }} />
                        {` (${option.count})`}
                      </>
                    }
                  />
                ))}
              </RadioGroup>

              <hr />

              <Button type="submit" variant="outlined">
                Vote
              </Button>
            </form>
          ) : validuser === 1 ? (
            <p style={{ fontWeight: "bold" }}>
              You have done polling!!! See you soon 🙋🏻‍♂️.
            </p>
          ) : (
            <p>No poll available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Viewpoll;
