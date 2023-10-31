import React from "react";
import Navbar_sales from "../components/sales_nav";
import axios from "axios";
import { useContext } from "react";
import { pathContext } from "../components/pathContext";

export default function Sold_items() {
  const { currentUser } = useContext(pathContext);
  const [obj_array, setObj] = React.useState([]);

  React.useEffect(() => {
    dataReaquest();
  }, []);

  function dataReaquest() {
    axios
      .post("http://localhost:80/phpAPI/requestSales.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        setObj(response.data);
      });
  }

  const map_array =
    Object.keys(obj_array).length != 0 &&
    obj_array.map((item) => {
      return (
        <div className="each_items">
          <div>{item[0]}</div>
          <div>{item[1]}</div>
          <div>{item[2]}</div>
          <div>{item[3]}</div>
          <div>{item[4]}</div>
          <div>{item[5]}</div>
          <div>{item[6]}</div>
        </div>
      );
    });

  return (
    <div className="main_cont">
      <Navbar_sales />
      <div className="sold_cont">
        <h1>Sold Items</h1>
        <div className="inve_list sell_div">
          <div className="sold_list_header">
            <h3>Date</h3>
            <h3>Product Id</h3>
            <h3>Buyer</h3>
            <h3>Product Name</h3>
            <h3>Sales volume</h3>
            <h3>Unit price</h3>
            <h3>Total sales</h3>
          </div>
          {Object.keys(obj_array).length != 0 && map_array}
        </div>
      </div>
    </div>
  );
}
