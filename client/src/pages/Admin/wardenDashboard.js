import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "../user/Dashboard.css";
import { Link } from "react-router-dom";
import View from "./../Complain/viewComplain";

const WardenDashboard = () => {
  return (
    <Layout>
      <div
        style={{
          background: "#F9F6EE",
          minHeight: "92vh",
        }}
      >
        <div className="ag-format-container">
          <div className="ag-courses_box">
            {/* card 1 */}
            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/manureq"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Menu Update Request</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Check and update Mess Menu!!!
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
                <div className="ag-courses-item_title">View Complain</div>
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
                to="/dashboard/warden/createnewpoll"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Create Poll</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Create Poll Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 4 */}
            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/pollresult"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Poll Result</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View Poll Result Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 5 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/viewfeedback"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">View Feedback</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View All feedbacks Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 6 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/viewuser"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Students Detail</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View Details of Students Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 7 */}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/viewpayments"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Payments</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View All Payments Here!!!
                  </span>
                </div>
              </Link>
            </div>

            {/* card 8*/}

            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/viewexpenses"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Mess Expenses</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    View Mess Expenses Here!!!
                  </span>
                </div>
              </Link>
            </div>
            {/* card -9 */}
            <div className="ag-courses_item">
              <Link
                to="/dashboard/warden/createnotice"
                className="ag-courses-item_link"
              >
                <div className="ag-courses-item_bg" />
                <div className="ag-courses-item_title">Create Notice</div>
                <div className="ag-courses-item_date-box">
                  <span className="ag-courses-item_date">
                    Create Notice here!!!
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

export default WardenDashboard;
