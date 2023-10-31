import React from "react";
import Navbar from "../components/nav";
import { useContext } from "react";
import { pathContext } from "../components/pathContext";
import axios from "axios";

export default function Managestaff(props) {
  const { currentUser } = useContext(pathContext);
  const [Emps, setEmps] = React.useState([]);

  React.useEffect(() => {
    getEmployees();
  }, []);

  function getEmployees() {
    axios
      .post("http://localhost:80/phpAPI/getEmployees.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        setEmps(response.data);
      });
  }

  function whenEmpDelete(man_id) {
    axios
      .post("http://localhost:80/phpAPI/deleteEmp.php/save", { toDel: man_id })
      .then((response) => {});
  }

  const mapped = Emps.map((item) => {
    return (
      <div className="each_items">
        <div>{item.first_name}</div>
        <div>{item.last_name}</div>
        <div>{item.email}</div>
        <div style={{ marginRight: "-50px", width: "40px" }}>
          {item.password}
        </div>
        <div
          style={{
            width: "15px",
            marginRight: "-90px",
            marginLeft: "-90px",
            color: "red",
          }}
          onClick={() => {
            whenEmpDelete(item.manager_id);
          }}
        >
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>
    );
  });

  return (
    <div className="main_cont">
      <Navbar />
      <div
        style={{
          margin: "40px 0 0 40px",
        }}
      >
        <h1>Add sales Managers</h1>
        <form
          onSubmit={props.whenStaffSubmit}
          className="staff_form"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            onChange={props.whenStaffChange}
            style={{ padding: "0 0 0 20px" }}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            onChange={props.whenStaffChange}
            style={{ padding: "0 0 0 20px" }}
          />
          <input
            type="email"
            name="Email"
            placeholder="Email"
            onChange={props.whenStaffChange}
            style={{ padding: "0 0 0 20px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={props.whenStaffChange}
            style={{ padding: "0 0 0 20px" }}
          />
          <button>Register</button>
        </form>

        <button
          style={{
            marginTop: "40px",
            width: "160px",
            borderRadius: "6px",
            height: "36px",
            border: "0px solid black",
            fontSize: "17px",
            background: "#00daff",
          }}
          onClick={getEmployees}
        >
          Refresh
        </button>
        <div className="inve_list">
          <div className="inv_list_header" style={{ marginTop: "10px" }}>
            <h3>First Name</h3>
            <h3>Last Name</h3>
            <h3>Email</h3>
            <h3>Password</h3>
          </div>
          {mapped}
        </div>
      </div>
    </div>
  );
}
