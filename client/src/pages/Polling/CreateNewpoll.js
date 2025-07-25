import "./CreateNewpoll.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBolt,
  faTrashAlt,
  faSpider,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

import React from "react";

import { useNavigate } from "react-router-dom";
const showError = (value, error) => value.trim().length === 0 && error;

const CreatenewPoll = () => {
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
    // You can use a library like uuid to generate unique IDs
    // For simplicity, this example uses a basic approach
    return Math.random().toString(36).substring(2);
  };

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/v1/general/createnewpoll", {
        question: question,
        options: options.map((opt) => ({
          id: opt.id,
          options: opt.option,
          count: 0,
        })),
      });
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
    <div className="ui-outer ">
      <div className="ui-container py-5 px-5">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mx-auto">
            <div className="d-flex justify-content-between flex-column flex-md-row align-items-baseline">
              <div>
                <h3>Create Poll</h3>
                <p className="mt-4 mb-0 text-large text-secondary font-medium">
                  Complete below fields to create a poll
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="d-flex flex-column">
                <label className="mb-3 w-100 font-weight-bold content-text">
                  Poll Question
                </label>
                <TextField
                  type="text"
                  id="question"
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  className=" py-3 rounded-lg px-3 bg-light inputfield focus-shadow  focus-outline-none  border "
                  placeholder="Enter your question here..."
                />
              </div>

              {options.map((option, index) => (
                <div className="options mt-2 flex-column " key={index}>
                  <div className=" mb-3">
                    <div className="d-flex flex-column">
                      <label className="mb-3 w-100 content-text font-weight-bold">
                        Option {index + 1}
                      </label>
                      <div className="">
                        <TextField
                          name="options"
                          className=" py-3 rounded-lg px-3 bg-light inputfield focus-shadow  focus-outline-none  border "
                          placeholder={"Option" + (index + 1)}
                          value={option.option}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          required
                        />
                        <button
                          hidden={options.length === 1}
                          onClick={() => removeOption(index)}
                          className=" delete ml-2"
                        >
                          <FontAwesomeIcon
                            className=" text-danger"
                            icon={faTrashAlt}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="px-5 py-3  bg-dark rounded-lg font-weight-bold  border-0 text-white "
              >
                <span className="mr-3">
                  Add another option
                  <FontAwesomeIcon className="ml-2" icon={faPlus} />
                </span>
              </button>
            </div>
            <div className=" mt-5 pt-3 ">
              <button
                type="submit"
                className="px-5 py-3 bg-success text-white font-weight-bold border-0 rounded-lg"
              >
                <FontAwesomeIcon className="mr-2" icon={faBolt} />
                Create your poll
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatenewPoll;