import React, { useContext } from "react";
import Navbar_sales from "../components/sales_nav";
import { pathContext } from "../components/pathContext";
import axios from "axios";

export default function Commit_sales(props) {
  const { currentUser } = useContext(pathContext);
  const [obj_array, setObj] = React.useState([""]);

  React.useEffect(() => {
    dataReaquest();
  }, []);

  function dataReaquest() {
    axios
      .post("http://localhost:80/phpAPI/getProducts.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        console.log(response.data);
        setObj(response.data);
      });
  }

  const map_array = obj_array.map((item) => {
    if (item[1] > 0) {
      return (
        <option value={item[0]}>
          P_name: {item[0]}, Vol: {item[1]}, B_price: {item[2]}
        </option>
      );
    }
  });

  return (
    <div className="commit_cont">
      <Navbar_sales />
      <div className="commit_div">
        <h1>Commit sales</h1>
        <div className="commit_form_cont">
          <form className="commit_form" onSubmit={props.whenCommitSubmit}>
            <input
              type="text"
              name="customer"
              placeholder="Customer"
              className="prod_prop"
              onChange={props.whenCommitChange}
            />
            <select
              name="prod_name"
              onChange={props.whenCommitChange}
              style={{
                height: "55px",
                border: "0px solid black",
                borderRadius: "5px",
                fontSize: "22px",
                paddingLeft: "15px",
              }}
            >
              <option value="">Select product</option>
              {map_array}
            </select>
            <input
              type="number"
              name="unit_price"
              placeholder="Unit price (include tax 15%)"
              className="prod_prop"
              onChange={props.whenCommitChange}
            />
            <input
              type="number"
              name="volume"
              placeholder="Volume"
              className="prod_prop"
              onChange={props.whenCommitChange}
            />

            <button style={{ marginLeft: "-460px" }}>Commit</button>
          </form>
          {props.commitChk == 0 && (
            <h2 style={{ color: "green", marginTop: "40px" }}>
              Commit Successful
            </h2>
          )}
          {props.commitChk == 1 && (
            <h2 style={{ color: "red", marginTop: "40px" }}>
              Commit Unsuccessful
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
