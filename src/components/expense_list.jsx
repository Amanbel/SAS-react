import React from "react";

export default function Expense_list(props) {
  return (
    <div className="each_items">
      <div>{props[0]}</div>
      <div>{props[1]}</div>
      <div>{props[2]}</div>
      <div>{props[3]}</div>
      <div>{props[4]}</div>
      <div>{props[5]}</div>
      <div>{props[6]}</div>
    </div>
  );
}
