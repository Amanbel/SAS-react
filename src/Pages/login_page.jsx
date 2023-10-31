import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { pathContext } from "../components/pathContext";

export default function Login() {
  const { whenLogin, whenLoginSubmit, ErrStyle, LoginData } = useContext(pathContext);
  const navigate = useNavigate()

  return (
    <div className="login_div">
      <div className="login_comp">
        <h1 className="welcome_login">Welcome back</h1>
        <form className="login_form" onSubmit={whenLoginSubmit}>
          <h1>SAS</h1>
          <input
            type="email"
            name="Email"
            placeholder="Email Address"
            onChange={whenLogin}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={whenLogin}
          />
          <select name="page" id="page_login" onChange={whenLogin}>
            <option value="owners_list">Proprietor</option>
            <option value="sales_managers">Sales manager</option>
          </select>
          {ErrStyle == 1 && (
            <h4 style={{ color: "red" }}>Wrong Email/password</h4>
          )}
          {ErrStyle == 2 && (
            <h4 style={{ color: "red" }}>Empty Email/password</h4>
          )}
          <button type="button" onClick={()=>{
            if (LoginData.page == "owners_list"){
              navigate("/dashboard")
            } else if (LoginData.page == "sales_managers") {
              navigate("/commit sales")
            }
          }
          }
            >Log in</button>
          <p>
            Don't have an account, create <br></br> one here
            <Link to="/Sign up">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
