import React, { useContext } from "react";
import Inventory_list from "../components/inventory_list";
import { Link } from "react-router-dom";
import Navbar from "../components/nav";
import { pathContext } from "../components/pathContext";
import axios from "axios";
import { CSVLink } from "react-csv";

export default function Inventory() {
  const { currentUser } = useContext(pathContext);
  const [obj_array, setObj] = React.useState([]);
  const [itemInfo, setItem] = React.useState({
    name: "",
    supplier: "",
    volume: "",
    stock: "",
    location: "",
  });
  const [ref, setRef] = React.useState(0);

  React.useEffect(() => {
    dataReaquest();
  }, [ref]);

  function dataReaquest() {
    axios
      .post("http://localhost:80/phpAPI/requestList.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        console.log(response.data);
        setObj(response.data);
      });
  }

  function whenInvDelete(inv_id) {
    axios
      .post("http://localhost:80/phpAPI/deleteInv.php/save", {
        toDel: inv_id,
        userId: currentUser,
      })
      .then((response) => {
        // console.log(response.data);
      });
  }

  function onDisplay(Name, Supplier, Volume, Stock, Location) {
    setItem((prev) => {
      return {
        name: Name,
        supplier: Supplier,
        volume: Volume,
        stock: Stock,
        location: Location,
      };
    });
  }

  function volUpdate(id) {
    const volume = prompt("Enter Updated inventory volume");
    axios
      .post("http://localhost:80/phpAPI/updateVol.php/save", {
        userId: currentUser,
        prodId: id,
        vol: volume,
      })
      .then((response) => {
        console.log(response.data);
        setRef(ref + 1);
      });
  }

  const map_array =
    Object.keys(obj_array).length != 0
      ? obj_array.map((item, index) => {
          return (
            <Inventory_list key={index} delete={whenInvDelete} {...item} />
          );
        })
      : [];

  return (
    <div className="main_cont">
      <Navbar />
      <div className="invent_cls">
        <div className="invent_top">
          <h1 className="inv_title">Inventory</h1>
          <button>
            <Link to="/inventory/add_product">Add product</Link>
          </button>
        </div>
        <div className="item_desc">
          {itemInfo.name ? (
            <h1
              style={{
                color: "burlywood",
                fontSize: "45px",
                marginBottom: "17px",
              }}
            >
              {itemInfo.name}
            </h1>
          ) : (
            <h1>Product Name</h1>
          )}
          <h2>Supplier</h2>
          <h2>Volume</h2>
          <h2>Stock status</h2>
          <ul className="loc_list">
            <h3 style={{ fontSize: "25px" }}>Location</h3>
            <li>{itemInfo.location}</li>
          </ul>
          <div className="inv_values">
            <h4>{itemInfo.supplier}</h4>
          </div>
          <div className="inv_values">
            <h4>{itemInfo.volume}</h4>
          </div>
          <div className="inv_values">
            <h4>{itemInfo.stock}</h4>
          </div>
        </div>
        <button
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            width: "160px",
            height: "36px",
            border: "0px solid black",
            fontSize: "17px",
            background: "#00daff",
            marginLeft: "75px",
          }}
          onClick={dataReaquest}
        >
          Refresh
        </button>

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
            marginLeft: "75px",
            cursor: "pointer",
          }}
        >
          Export Excel
        </CSVLink>

        <div className="inve_list">
          <div className="inv_list_header">
            <h3>Product Id</h3>
            <h3>product Name</h3>
            <h3>Location</h3>
            <h3>Volume</h3>
            <h3>Unit price</h3>
            <h3>Inventory value</h3>
          </div>
          <pathContext.Provider value={{ whenInvDelete, onDisplay, volUpdate }}>
            {map_array}
          </pathContext.Provider>
        </div>
      </div>
    </div>
  );
}
