import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ id: "", option: "" }]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = { id: generateId(), option: value };
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { id: generateId(), option: "" }]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  const generateId = () => {
    
    return Math.random().toString(36).substring(2);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "/api/v1/general/createpoll/6553624bbfc0d80c5fb69522",
        {
          question: question,
          options: options.map((opt) => ({
            id: opt.id,
            options: opt.option,
            count: 0,
          })),
        }
      );
      console.log("Poll created successfully:", response.data);
      navigate("/dashboard/warden");
    } catch (error) {
      console.error("Error creating poll:", error);
      // Handle errors here
    }
    console.log("Question:", question);
    console.log("Options:", options);
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto" }}>
  
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <label
          htmlFor="question"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Poll Question:
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "16px",
            boxSizing: "border-box",
          }}
        />

        <label
          htmlFor="options"
          style={{ display: "block", marginBottom: "8px" }}
        >
          Options:
        </label>
        {options.map((option, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <input
              type="text"
              value={option.option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              style={{
                width: "calc(100% - 40px)",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
            <button
              type="button"
              onClick={() => removeOption(index)}
              style={{ marginLeft: "10px", padding: "8px" }}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Add Option
        </button>

        <button
          type="submit"
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
