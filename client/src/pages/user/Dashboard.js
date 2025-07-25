import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Dashboard.css";
import View from "./../Complain/viewComplain";
import Feedback from "./../feedback/feedback";
import Nutrition from "./../Nutrition/nutrition";
const Dashboard = () => {
  return (
    <Layout>
      <div
        style={{
          background: "#F9F6EE",
        }}
      >
        <div className="ag-format-container">
          <div className="ag-courses_box">
            {/* card 1 */}
            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/complain"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Complain...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Register Your Complain Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card2 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/viewcomplain"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">View Complain...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View All Complains Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 3 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/getmenu"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Mess Menu...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View Your Daily Meals Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 4 */}
            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/viewpoll"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Poll...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">Poll Here!!!</span>
                </div>
              </Link>
            </div>

            {/* card 5 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/feedback"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Feedback...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Give your feedback Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 6 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/nutrition"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Nutrition...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Check food Nutrition Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 7 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/tracker"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">BMI Tracker...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Map your Health Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 8*/}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/student/profile"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Profile...</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View your Profile Here!!!
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
export default Dashboard;
