import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Expenses.css";
import guest from "./../Guest/guest.jpg";
import { useEffect } from "react";

const Expenses = () => {
  const [food, setFood] = useState("");
  const [general, setGeneral] = useState("");
  const [dairy, setDairy] = useState("");
  const [spoon, setSpoon] = useState("");
  const [plates, setPlates] = useState("");
  const [glass, setGlass] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/general/expenses", {
        food,
        general,
        dairy,
        spoon,
        plates,
        glass,
        description,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/dashboard/accountant");
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Layout title="Expenses">
      <div
        style={{
          backgroundImage: `url(${guest})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div id="notice1-form">
          <form onSubmit={handleSubmit}>
            <h4 className="title" style={{ marginBottom: "10px" }}>
              Expenses Form
            </h4>
            <div className="mb-3">
              <input
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter expenses on food & veg"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={general}
                onChange={(e) => setGeneral(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter expenses on general item"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={dairy}
                onChange={(e) => setDairy(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter expenses on dairy products"
                required
                autoFocus
              />
            </div>
            Utensils Information:
            <div className="mb-3">
              <input
                type="text"
                value={spoon}
                onChange={(e) => setSpoon(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter the count of spoon"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={plates}
                onChange={(e) => setPlates(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter the count of plates"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={glass}
                onChange={(e) => setGlass(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter the count of glass"
                required
                autoFocus
              />
            </div>
            <div className="mb-3">
              <label>Enter Note:</label>
              <input
                type="text"
                id="userInput"
                name="userInput"
                value={description}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Expenses;
