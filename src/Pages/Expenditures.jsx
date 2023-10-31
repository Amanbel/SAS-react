import React, { useContext } from "react";
import Navbar from "../components/nav";
import Expense_list from "../components/expense_list";
import axios from "axios";
import { pathContext } from "../components/pathContext";
import { CSVLink } from "react-csv";

export default function Expend() {
  const { currentUser } = useContext(pathContext);
  const [obj_array, setObj] = React.useState([]);

  React.useEffect(() => {
    fetchExpense();
  }, []);

  function fetchExpense() {
    axios
      .post("http://localhost:80/phpAPI/requestExpList.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        setObj(response.data);
      });
  }

  const mapped_comp = obj_array.map((item) => {
    return <Expense_list key={item[1]} {...item} />;
  });
  return (
    <div className="main_cont">
      <Navbar />
      <div className="expend_cls">
        <h1>Product Expenses</h1>
        <CSVLink
          data={obj_array}
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            width: "160px",
            height: "36px",
            padding: "10px",
            textDecoration: "none",
            border: "0px solid black",
            fontSize: "17px",
            background: "#1fcf3c",
            color: "white",
            cursor: "pointer",
          }}
        >
          Export Excel
        </CSVLink>
        <div className="expend_list">
          <div className="expend_list_header">
            <h3>Date</h3>
            <h3>Product Id</h3>
            <h3>Product Name</h3>
            <h3>Volume</h3>
            <h3>Unit price</h3>
            <h3>Shipping cost</h3>
            <h3>Total Expense</h3>
          </div>
          {mapped_comp}
        </div>
      </div>
    </div>
  );
}
