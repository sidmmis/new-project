import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "../user/Dashboard.css";
import { NavLink } from "react-router-dom";
const AccountantDashboard = () => {
  return (
    <Layout>
      <div
        style={{
          background: "#F9F6EE",
          minHeight: "92vh",
        }}
      >
        <h1>accountant Page</h1>

        <div className="ag-format-container">
          <div className="ag-courses_box">
            {/* card 1 */}
            <div className="ag-courses_item">
              <Link
                to="/dashboard/accountant/expenses"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Update Expenses...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Update Mess Expenses Here!!!
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

export default AccountantDashboard;
