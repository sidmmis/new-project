import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import Table from "react-bootstrap/Table";
import back from "./images/usermenu.jpg";
import Messmenu from "./../Messmenu/Messmenu";

const UserMenu = () => {
  const [menuData, setMenuData] = useState([]);

  const Getmenu = () => {
    axios
      .get("/api/v1/auth/getmenu")
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  };

  useEffect(() => {
    Getmenu();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div style={{ backgroundImage: `url(${back})`, backgroundSize: "cover" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "40px",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Mess Menu</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table
            striped
            bordered
            hover
            variant="dark"
            style={{
              width: "800px",
              marginTop: "10px",
              height: "70vh",
              borderRadius: "8px",
            }}
          >
            <thead>
              <tr
                style={{ height: "80px", fontSize: "2rem", overflowX: "auto" }}
              >
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
        </div>
      </div>
    </Layout>
  );
};

export default UserMenu;
