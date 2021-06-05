import React, { useState } from "react";
import "./SideMenu.css";

import { NavLink } from "react-router-dom";

const SideMenu = (props) => {
  const [hideClass, setHideClass] = useState(false);

  const toggleSideMenu = () => {
    setHideClass(!hideClass);
    props.sideNavToggle(!hideClass);
  };
  const hidden = hideClass ? " hidden" : "";
  return (
    <div className="sidemenu-wrapper">
      <section>
        <div className="row">
          <div className="main-title col-md-1">
            <i
              class="fa fa-th-list"
              aria-hidden="true"
              onClick={toggleSideMenu}
            ></i>
          </div>
          <div className={`col-md-10${hidden}`}>
            <h3>
              <li className="list-group-item">
                <NavLink to="/dashboard" activeClassName="is-active">
                  Cemboo
                </NavLink>
              </li>
            </h3>
          </div>
        </div>
      </section>

      <section>
        <div className="row">
          <div className="col-md-1">
            <i class="fa fa-video-camera" aria-hidden="true"></i>
          </div>
          <div className={`col-md-10${hidden}`}>
            <ul className="list-group">
              <li className="list-group-item pt-0">
                <NavLink to="/dashboard/videos" activeClassName="is-active">
                  Videos
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to="/videos" activeClassName="is-active">
                  Playlists
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to="/playlists" activeClassName="is-active">
                  Live Channels
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="col-md-1">
            <i class="fa fa-play" aria-hidden="true"></i>
          </div>
          <div className={`col-md-10${hidden}`}>
            <ul className="list-group">
              <li className="list-group-item pt-0">
                <NavLink to="/players" activeClassName="is-active">
                  Players
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to="/videos" activeClassName="is-active">
                  Ad Support
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to="/playlists" activeClassName="is-active">
                  Analytics
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="row">
          <div className="col-md-1">
            <i class="fa fa-user" aria-hidden="true"></i>
          </div>
          <div className={`col-md-10${hidden}`}>
            <ul className="list-group">
              <li className="list-group-item pt-0">
                <NavLink to="/profile" activeClassName="is-active">
                  Profile
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink to="/videos" activeClassName="is-active">
                  Settings
                </NavLink>
              </li>
              <li className="list-group-item">
                <NavLink
                  to="/logout"
                  onClick={props.logoutHandler}
                  activeClassName="is-active"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SideMenu;
