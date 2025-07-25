import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../user/Dashboard.css";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

const ManagerDashboard = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    // Fetch menu data from your backend API
    axios
      .get("/api/v1/auth/getmenu") // Replace with the actual API endpoint
      .then((response) => {
        setMenuData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  return (
    <Layout>
      <div
        style={{
          background: "#F9F6EE",
          minHeight: "92vh",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Manager Panel</h1>

        <div className="ag-format-container">
          <div className="ag-courses_box">
            {/* card1 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/manager/updatemenu"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Update Mess Menu...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Update mess menu Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card2 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/manager/recipe"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">CheckOut Recipe...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Explore New Recipes Here!!!
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ManagerDashboard;
