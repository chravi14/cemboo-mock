import React, { useRef, useState } from "react";
import "./Dashboard.css";
import SideMenu from "./SideMenu/SideMenu";

import MainDashboard from "./../../components/DashboardItems/MainDashboard/MainDashboard";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Videos from "../../components/DashboardItems/Videos/Videos";
import { connect } from "react-redux";
import { logoutUser } from "./../../store/actions/authActions";

const Dashboard = (props) => {
  const { url } = useRouteMatch();
  const [navOpen, setNavOpen] = useState(true);

  const logoutHandler = (e) => {
    e.preventDefault();
    props.logoutUser();
  };

  const sideNavToggleHandler = (isOpen) => {
    setNavOpen(!isOpen);
  };

  const toggleClass = navOpen ? " open" : "";

  return (
    <div className="dashboard" id="dashboard">
      <div className={`side-menu${toggleClass}`}>
        <SideMenu
          logoutHandler={logoutHandler}
          sideNavToggle={sideNavToggleHandler}
        />
      </div>
      <div className={`main-wrapper${toggleClass}`}>
        <div className="dashboard-wrapper-content">
          <Switch>
            <Route path={`${url}/videos/`}>
              <Videos />
            </Route>
            <Route path={`${url}/`} exact>
              <MainDashboard />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  logoutUser: logoutUser,
};

export default connect(null, mapDispatchToProps)(Dashboard);
