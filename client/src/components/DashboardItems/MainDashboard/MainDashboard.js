import React from "react";
import "./MainDashboard.css";
import { Link } from "react-router-dom";

const MainDashboard = (props) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h3>Dashboard</h3>
      </div>
      <div className="dashboard-content">
        <div className="welcome">
          <h3 class="welcome">Welcome , User name goes here</h3>

          <div className="recent-uploads">
            <h3 className="subtitle">Recent Uploads</h3>
            <p>You don't have any uploaded content.</p>
            <p>
              Please click{" "}
              <Link className="text-white" to="/dashboard/videos">
                here
              </Link>
              to start uploading content
            </p>
          </div>
        </div>

        <div className="usage-details">
          <h3 className="subtitle">Usage Information</h3>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
