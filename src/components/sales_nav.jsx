import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { pathContext } from "./pathContext";

export default function Navbar_sales() {
  const { setCommit, setLoginData } = useContext(pathContext);
  return (
    <div className="nav_bar">
      <h1>SAS</h1>
      <ul>
        <li>
          <i
            class="fa-solid fa-floppy-disk"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/commit sales">Commit sales</Link>
        </li>
        <li>
          <i
            class="fa-solid fa-shop"
            style={{
              marginRight: "20px",
            }}
          ></i>
          <Link to="/sold items">Sold items</Link>
        </li>
        <li
          className="log_out_sales"
          onClick={() => {
            setCommit((prev) => {
              return {
                ...prev,
                date: "",
                staffId: "",
                customer: "",
                prod_name: "",
                unit_price: "",
                volume: "",
              };
            });
            setLoginData((prev) => {
              return {
                ...prev,
                Email: "",
                password: "",
                page: "owners_list",
              };
            });
          }}
        >
          <i
            class="fa-solid fa-left-long"
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
