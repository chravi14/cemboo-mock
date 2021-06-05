import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Authentication.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "./../../store/actions/authActions";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    console.log(this.props.history, "in Register component");
    this.onChange = this.onChange.bind(this);
    // this.registerHandler = this.registerHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  registerHandler = (event) => {
    event.preventDefault();
    const userObj = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    console.log(userObj);
    this.props.registerUser(userObj, this.props.history);
  };
  render() {
    const errorMessages = Object.keys(this.state.errors).map((el) => {
      return (
        <div
          key={el}
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          {this.state.errors[el]}
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    });
    return (
      <div className="auth-container">
        <h2 className="section-title">Sign Up</h2>
        <form className="reg-form">
          {errorMessages.length > 0 && (
            <div className="row">
              <div className="col-md-12">{errorMessages}</div>
            </div>
          )}
          <div className="form-group row">
            <div className="col-md-4 offset-md-1">
              <label htmlFor="name" className="col-form-label">
                Name
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                id="name"
                value={this.state.name}
                className="form-control"
                placeholder="Enter name"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4 offset-md-1">
              <label htmlFor="email" className="col-form-label">
                Email Address
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="email"
                id="email"
                value={this.state.email}
                className="form-control"
                placeholder="Enter Email address"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4 offset-md-1">
              <label htmlFor="password" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                id="password"
                value={this.state.password}
                className="form-control"
                placeholder="Enter password"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-4 offset-md-1">
              <label htmlFor="password2" className="col-form-label">
                Confirm Password
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="password2"
                id="password2"
                value={this.state.password2}
                className="form-control"
                placeholder="Confirm Password"
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 offset-md-5">
              <button
                type="submit"
                className="btn btn-info btn-register"
                onClick={this.registerHandler}
              >
                Register
              </button>
            </div>
          </div>
        </form>
        <div className="row mt-2">
          <div className="col-md-12 offset-md-5">
            <p className="login-link">
              Already Registered?{" "}
              <Link to="/login" className="btn-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
    errors: state.errorReducer["errors"],
  };
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapDispatchToProps = {
  registerUser: registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
