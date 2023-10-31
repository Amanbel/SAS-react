import React from "react";
import { useContext } from "react";
import { pathContext } from "./pathContext";
import { Link } from "react-router-dom";

export default function Inventory_list(props) {
  const { whenInvDelete, onDisplay, passName, volUpdate } =
    useContext(pathContext);
  const style = props[4] <= 0 ? { background: "red" } : {};
  const Delstyle =
    props[4] <= 0
      ? { color: "white", cursor: "pointer" }
      : { color: "red", cursor: "pointer" };

  return (
    <div
      className="each_items"
      style={style}
      onClick={() => {
        let stock = "Unknown";

        if (props[4] > 80) {
          stock = "Full";
        } else if (props[4] <= 80 && props[4] > 20) {
          stock = "partially Full";
        } else if (props[4] <= 20 && props[4] > 0) {
          stock = "Running Out";
        } else if (props[4] <= 0) {
          stock = "Empty";
        }
        onDisplay(props[1], props[2], props[4], stock, props[3]);
      }}
    >
      <div>{props[0]}</div>
      <div>{props[1]}</div>
      <div>{props[3]}</div>
      <div>{props[4]}</div>
      <div>{props[5]}</div>
      <div style={{ width: "50px", marginRight: "-80px" }}>{props[6]}</div>

      <div style={{ marginRight: "-100px", color: "red" }}>
        <i
          class="fa-solid fa-trash"
          style={Delstyle}
          onClick={() => {
            whenInvDelete(props[0]);
          }}
        ></i>
      </div>
      <button
        style={{
          margin: "0 -70px 0 -40px",
          background: "inherit",
          border: "0 solid black",
        }}
        onClick={() => {
          volUpdate(props[0]);
        }}
      >
        <i class="fa-regular fa-pen-to-square" style={{ color: "purple" }}></i>
      </button>
    </div>
  );
}
