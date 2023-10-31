import React, { useContext } from "react";
import Navbar from "../components/nav";
import { pathContext } from "../components/pathContext";

export default function Add_prod(props) {
  const { errOut } = useContext(pathContext);
  return (
    <div className="main_cont">
      <Navbar />
      <div className="Add_cls">
        <h1>Add product</h1>
        <div className="prod_input_info">
          <form className="prod_form" onSubmit={props.whenAddingProd}>
            <input
              type="text"
              name="supplier"
              placeholder="Supplier"
              className="prod_prop"
              onChange={props.whenAddChange}
            />
            <input
              type="text"
              name="product_name"
              placeholder="Product name"
              className="prod_prop"
              onChange={props.whenAddChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Storage Location"
              className="prod_prop"
              onChange={props.whenAddChange}
            />
            <input
              type="number"
              name="unit_price"
              placeholder="Unit price"
              className="prod_prop"
              onChange={props.whenAddChange}
            />
            <input
              type="number"
              name="volume"
              placeholder="Volume"
              className="prod_prop"
              onChange={props.whenAddChange}
            />
            <input
              type="number"
              name="shipping_cost"
              placeholder="shipping cost"
              className="prod_prop"
              onChange={props.whenAddChange}
            />

            <button className="add_btn">Add</button>
            {errOut == 1 && (
              <h3 style={{ color: "red" }}>product already in inventory</h3>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
