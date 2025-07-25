import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import backgroundImage from "./complain.jpeg";
import "./complain.css";

const AnimatedForm = () => {
  const [auth, setAuth] = useAuth();
  const name = auth?.user?.name;
  const [complain, setComplain] = useState("");
  const [reg, setReg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const res = await axios.post("/api/v1/general/complain", {
        name,
        reg,
        complain,
      });

      navigate("/dashboard/student/viewcomplain");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="form-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form style={{ height: "300px" }}>
        <div className="form-group">
          <label htmlFor="name">Name : </label>
          <input type="text" id="name" placeholder=" " value={name} />
        </div>

        <div className="form-group">
          <label htmlFor="reg">Reg No. : </label>
          <input
            type="text"
            id="reg"
            placeholder=" "
            value={reg}
            onChange={(e) => setReg(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="complain">Complain : </label>
          <input
            type="text"
            id="complain"
            placeholder=" "
            value={complain}
            onChange={(e) => setComplain(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AnimatedForm;
