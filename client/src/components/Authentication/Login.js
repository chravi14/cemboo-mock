import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./Authentication.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "./../../store/actions/authActions";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      visible: false,
    };
    console.log(this.props);
  }

  onDismiss = () =>
    this.setState({
      visible: false,
    });

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        visible: true,
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  loginHandler = (e) => {
    e.preventDefault();
    const userObj = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(userObj);
    this.props.loginUser(userObj);
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
        <h2 className="section-title">Sign In</h2>
        <form className="section-form">
          {errorMessages.length > 0 && (
            <div className="row">
              <div className="col-md-12">{errorMessages}</div>
            </div>
          )}
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
          <div className="row align-items-center">
            <div className="col-md-3 offset-md-5">
              <button
                type="submiy"
                className="btn btn-info btn-Login"
                onClick={this.loginHandler}
              >
                Login
              </button>
            </div>
            <div className="col-md-4">
              <p className="forgot-pwd mt-2">
                <Link to="/register" className="btn-link">
                  Forgot Password?
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div className="row mt-2">
          <div className="col-md-12 offset-md-5">
            <p className="login-link">
              Don't have an account ?{" "}
              <Link to="/register" className="btn-link">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
};
const mapStateToProps = (state) => ({
  auth: state.authReducer,
  errors: state.errorReducer["errors"],
});
export default connect(mapStateToProps, { loginUser })(withRouter(Login));
