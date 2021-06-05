import React, { useState, useEffect } from "react";
import BrandLogo from "./../../assets/images/brand-logo.jpg";
import "./Nav.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfilePic from "./../../assets/images/profile.png";

import { logoutUser } from "./../../store/actions/authActions";

const Navbar = (props) => {
  console.log(props, "in Navbar");
  const [showDetails, setShowDetails] = useState(false);
  const logoutUserHandler = () => {
    props.logoutUser();
    console.log(props, "in logout");
    if (!props.isAuthenticated) {
      props.history.push("/login");
    }
  };

  const showUserDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="container">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <Link to="home" className="navbar-brand">
          <img
            src={BrandLogo}
            alt=""
            className="img-thumbnail img-fluid"
            width={65}
            height={40}
          />
        </Link>
        <ul className="navbar-nav" id="top-nav-items">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
          {props.isAuthenticated ? (
            <>
              <li className="nav-item mr-3 align-self-center">
                <Link to="/dashboard">
                  <img
                    src={ProfilePic}
                    alt=""
                    className="img-fluid"
                    width={50}
                    height={40}
                  />
                </Link>
              </li>
              <li
                className="nav-item mr-3 align-self-center text-white user-details"
                onClick={showUserDetails}
              >
                <strong>Hello, {props.user.name}</strong>{" "}
                <span className="profile-down">
                  <i class="fa fa-caret-down" aria-hidden="true"></i>
                </span>
                {showDetails ? (
                  <div className="userinfo">
                    <div className="userinfo-wrapper">
                      <p className="userinfo-item name">{props.user.name}</p>
                      <p
                        className="userinfo-item logout-link"
                        onClick={logoutUserHandler}
                      >
                        <i class="fa fa-sign-out" aria-hidden="true"></i>
                        Logout
                      </p>
                    </div>
                  </div>
                ) : null}
              </li>
            </>
          ) : (
            <>
              {" "}
              <li className="nav-item mr-3 align-self-center">
                <Link
                  to="/login"
                  className="nav-link btn btn-secondary btn-sm text-white"
                  exact
                >
                  Sign In
                </Link>
              </li>
              <li className="nav-item align-self-center">
                <Link
                  to="/register"
                  className="nav-link btn btn-info btn-sm text-white"
                  exact
                >
                  Join now
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="navbar-nav ml-auto" id="bottom-nav-items">
          <li className="nav-item">
            <Link to="/home" className="nav-link" exact>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" exact>
              Options
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" exact>
              Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" exact>
              Developers
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" exact>
              Support
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link" exact>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = {
  logoutUser: logoutUser,
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
