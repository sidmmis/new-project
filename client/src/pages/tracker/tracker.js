import React, { useState } from "react";
import "../../styles/tracker.css";
import { useEffect } from "react";
const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState("00.00");
  const [comment, setComment] = useState("");

  const calculateBMI = () => {
    if (height === "" || weight === "") {
      alert("Please fill out the input fields!");
      return;
    }

    // BMI = weight in KG / (height in m * height in m)
    const heightInMeters = height / 100;
    let BMI = weight / (heightInMeters * heightInMeters);
    BMI = BMI.toFixed(2);

    setResult(BMI);

    let status = "";
    if (BMI < 18.5) {
      status = "Underweight";
    } else if (BMI >= 18.5 && BMI < 25) {
      status = "Healthy";
    } else if (BMI >= 25 && BMI < 30) {
      status = "Overweight";
    } else {
      status = "Obese";
    }

    setComment(`Comment: you are ${status}`);
  };
  useEffect(() => {
    // Add the class to the body element when the component mounts
    document.body.classList.add("page-specific-body");

    // Remove the class from the body element when the component unmounts
  }, []);
  return (
    <div className="container">
      <div className="box">
        <h1>BMI Calculator</h1>
        <div className="content">
          <div className="input">
            <label htmlFor="height">Height(cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="input">
            <label htmlFor="weight">Weight(kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <button id="calculate" onClick={calculateBMI}>
            Calculate BMI
          </button>
        </div>
        <div className="result">
          <p>Your BMI is</p>
          <div id="result">{result}</div>
          <p className="comment">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
