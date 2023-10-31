import React, { useContext } from "react";
import Navbar from "../components/nav";
import Sales_tax_list from "../components/sales_tax_list";
import axios from "axios";
import { pathContext } from "../components/pathContext";
import { CSVLink } from "react-csv";

export default function Sales_tax() {
  const { currentUser } = useContext(pathContext);
  const [obj_array, setObj] = React.useState([]);

  React.useEffect(() => {
    dataReaquest();
  }, []);

  function dataReaquest() {
    axios
      .post("http://localhost:80/phpAPI/requestTax.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        console.log(response.data);
        setObj(response.data);
      });
  }

  const map_array = obj_array.map((item, index) => {
    return <Sales_tax_list key={index} {...item} />;
  });

  return (
    <div className="main_cont">
      <Navbar />
      <div className="tax_cls">
        <h1>Sales Tax</h1>
        <div className="extra_info">
          <div className="top_desc">
            <h2>VAT</h2>
            <hr></hr>
            <h3>15%</h3>
          </div>
        </div>
        <CSVLink
          data={obj_array}
          style={{
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
        <div className="inve_list">
          <div className="tax_info_list_header">
            <h3>Date</h3>
            <h3>Product Id</h3>
            <h3>Product Name</h3>
            <h3>Revenue</h3>
            <h3>Expense</h3>
            <h3>Tax</h3>
            <h3>Net income/profits</h3>
          </div>
          {map_array}
        </div>
      </div>
    </div>
  );
}
