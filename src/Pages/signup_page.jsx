import React from "react";
import Working from "../images/working_man.png";
import { Link } from "react-router-dom";

export default function Signup(props) {
  const style =
    props.Errstyle != 0
      ? { outline: "1px solid red", outlineOffset: "-3px" }
      : {};
  return (
    <div className="signup_cont">
      <div className="welcome_div">
        <h1>Welcome to SAS</h1>
        <p>
          SAS can enable you to visualize your data with charts and tables,
          which can improve<br></br> the data gathering time span of the
          company, proprietors can know view sales and tax<br></br> reports with
          a click of a button.
        </p>
        <img alt="cartoon image" src={Working} />
      </div>
      <div>
        <form className="signup_div" onSubmit={props.whenSignupSubmit}>
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            onChange={props.whenChange}
            style={style}
          />
          <select name="actor">
            <option>Proprietor</option>
          </select>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={props.whenChange}
            style={style}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={props.whenChange}
            style={style}
          />
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            onChange={props.whenChange}
            style={style}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={props.whenChange}
            style={style}
          />
          <input
            type="password"
            name="con_password"
            placeholder="Confirm Password"
            onChange={props.whenChange}
            style={style}
          />
          {props.Errstyle == 1 && (
            <h4
              style={{ color: "red", marginLeft: "180px", marginRight: "auto" }}
            >
              Database already exists
            </h4>
          )}
          {props.Errstyle == 2 && (
            <h4
              style={{ color: "red", marginLeft: "180px", marginRight: "auto" }}
            >
              Field required
            </h4>
          )}
          <button>Signup</button>
          <p>
            Already have an account<br></br>
            <Link to="/">Log in</Link> here
          </p>
        </form>
      </div>
    </div>
  );
}
