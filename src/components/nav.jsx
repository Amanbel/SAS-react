import React from "react";
import { Link } from "react-router-dom";
import { pathContext } from "./pathContext";

export default function Navbar() {
  const { setLoginData, setCurrent } = React.useContext(pathContext);
  return (
    <div className="nav_bar">
      <h1>SAS</h1>
      <ul>
        <li>
          <i
            className="fa-solid fa-chart-line"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <i
            className="fa-solid fa-warehouse"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/inventory">Inventory</Link>
        </li>
        <li>
          <i
            className="fa-solid fa-truck-fast"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/sales">Sales</Link>
        </li>
        <li>
          <i
            className="fa-solid fa-arrow-trend-down"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/expenses">Product Expenses</Link>
        </li>
        <li>
          <i
            className="fa-regular fa-file-lines"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/Sales tax">Sales Tax</Link>
        </li>
        <li>
          <i
            class="fa-solid fa-people-group"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/staff">Manage Staff</Link>
        </li>
        <li
          className="log_out"
          onClick={() => {
            setLoginData((prev) => {
              return {
                ...prev,
                Email: "",
                password: "",
                page: "owners_list",
              };
            });
            setCurrent(null);
          }}
        >
          <i
            className="fa-solid fa-left-long"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/">Log out</Link>
        </li>
      </ul>
    </div>
  );
}
