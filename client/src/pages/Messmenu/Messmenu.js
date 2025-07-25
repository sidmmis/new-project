// export default Messmenu;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

import Layout from "../../components/Layout/Layout";
import Table from "react-bootstrap/Table";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Placeholder } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import menuupdate from "../Admin/menuupdate.jpg";

const Messmenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [updatedtext, setUpdatedtext] = useState("");
  const [updatedText, setUpdatedText] = useState("");
  const [value, setValue] = useState([]);
  const [combinedValues, setCombinedValues] = useState([]);
  const [menuRequests, setMenuRequests] = useState([]);

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
    // Fetch menu data from your backend API
    Getmenu();
    fetchMenuRequests();
    //eslint-disable-next-line
  }, []);

  // for selecting weekday for update menu
  const handleChange = (event) => {
    setDay(event.target.value);
  };

  //aprove req to warden
  const aproveReqtoWarden = async () => {
    try {
      const response = await axios.post("/api/v1/general/menureqsend", {
        combinedValues,
      });
      // Reload the page after removing the request
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.error("Error Sending req:", error.message); // Log the error message
      console.error("Error Details:", error); // Log the entire error object for more details
    }
  };

  // for selecting time for update menu
  const handleChangetime = (event) => {
    setTime(event.target.value);
  };

  const updatemenu = async () => {
    // Update the value state properly
    axios
      .post("/api/v1/auth/updatemenu", { day, time, updatedtext }) // Replace with the actual API endpoint
      .then((response) => {
        Getmenu();
        setUpdatedText(updatedtext); // Set the updated text to be displayed

        const newCombinedValue = `${day ? day : ""}  ${time ? time : ""} ${
          updatedtext ? updatedtext : ""
        }`;

        // Add the new combined value to the array
        setCombinedValues((prevValues) => [
          ...prevValues,
          newCombinedValue + ",",
        ]);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  };
  //button for verified req;
  const handleRemoveRequest = (id) => {
    axios
      .delete("/api/v1/general/deletereq")
      .then((response) => {
        console.log(response.data);
        // Reload the page after removing the request
        window.location.reload();
      })
      .catch((error) => {
        // Handle error response from the server
        console.error("Error:", error);
      });
  };

  return (
    <Layout>
      <div
        style={{
          backgroundImage: `url(${menuupdate})`,
          backgroundSize: "cover",
          minHeight: "92vh",
        }}
      >
        <div
          style={{
            display: "flex",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
            position: "relative",
            top: "20px",
            width: "95%",
            marginLeft: "50px",
          }}
        >
          <Table
            striped
            responsive
            bordered
            hover
            variant="dark"
            style={{
              marginTop: "40px",
              marginLeft: "20px",
              width: "90.8%",
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

          <div
            style={{
              marginLeft: "20px",
              width: "25%",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              height: "65vh",
              marginTop: "40px",
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Select day</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={day}
                label="select day"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Sunday"}>Sunday</MenuItem>
                <MenuItem value={"Monday"}>Monday</MenuItem>
                <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                <MenuItem value={"Thursday"}>Thursday</MenuItem>
                <MenuItem value={"Friday"}>Friday</MenuItem>
                <MenuItem value={"Saturday"}>Saturday</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Select time</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={time}
                label="select time"
                onChange={handleChangetime}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"lunch"}>Lunch</MenuItem>
                <MenuItem value={"dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>

            <div></div>

            <TextField
              id="standard-multiline-flexible"
              label="Enter updated menu"
              multiline
              maxRows={4}
              variant="filled"
              value={updatedtext}
              style={{ marginLeft: "7px" }}
              onChange={(e) => {
                setUpdatedtext(e.target.value);
              }}
            />

            {/* message field  */}
            <div style={{ marginLeft: "7px", marginTop: "20px" }}>
              <div>
                {/* Display the combined updated and previous values in a single input box */}

                <TextField
                  id="standard-multiline-static"
                  value={combinedValues.join("\n")}
                  label="Updated Items..."
                  multiline
                  rows={4}
                  defaultValue="Default Value"
                  variant="standard"
                  style={{ width: "60%" }}
                  onChange={(e) => {
                    setCombinedValues(e.target.value.split("\n"));
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <Button variant="outlined" color="success" onClick={updatemenu}>
                Update
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={aproveReqtoWarden}
                endIcon={<SendIcon />}
              >
                Approve Request
              </Button>
            </div>
          </div>

          <div
            style={{
              marginLeft: "20px",
              width: "35%",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
              height: "65vh",
              marginTop: "40px",
              overflowY: "auto", // Add overflowY for vertical scrollbar
              maxHeight: "600px", // Set a fixed height for the card
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              Warden Reply
            </p>
            {menuRequests.map(
              (item, index) =>
                item.status === "1" && (
                  <div key={index}>
                    <h3>Manager Requests:</h3>
                    <ul>
                      {item.managerreq.map((request, reqIndex) => (
                        <li key={reqIndex}>{request}</li>
                      ))}
                    </ul>
                    <h5>Comment: </h5>

                    <p
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        height: "60px",
                        width: "35%",
                        padding: "3px",
                      }}
                    >
                      {item.wardenmessage}
                    </p>

                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleRemoveRequest(item._id)}
                    >
                      Done
                    </Button>
                    <hr />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messmenu;
