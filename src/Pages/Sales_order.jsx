import React, { useContext } from "react";
import Navbar from "../components/nav";
import Sales_list from "../components/sales_list";
import Chart from "react-apexcharts";
import axios from "axios";
import { pathContext } from "../components/pathContext";
import { CSVLink } from "react-csv";

export default function Sales_orders() {
  const { currentUser } = useContext(pathContext);
  const [obj_array, setObj] = React.useState([]);
  const [state, setState] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 35, 40, 60, 70, 91],
      },
    ],
  });

  React.useEffect(() => {
    dataReaquest();
  }, []);

  function dataReaquest() {
    axios
      .post("http://localhost:80/phpAPI/requestOrders.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        const newArr = [];
        const xaxis = [];

        for (let i = 0; i < response.data.length; i++) {
          xaxis.push(i);
          newArr.push(response.data[i][6]);
        }
        setState((prev) => {
          return {
            ...prev,
            options: {
              chart: {
                id: "basic-bar",
              },
              xaxis: {
                categories: xaxis,
              },
            },
            series: [
              {
                name: "series-1",
                data: newArr,
              },
            ],
          };
        });
        setObj(response.data);
      });
  }

  const map_array = obj_array.map((item, index) => {
    return <Sales_list key={index} {...item} />;
  });

  return (
    <div className="main_cont">
      <Navbar />
      <div className="sales_ord_cls">
        <h1>Sales orders</h1>

        <div className="sales_data">
          <div className="btn_and_graph">
            <div className="G_sold_prod">
              <h2>Sold products</h2>
              <Chart
                options={state.options}
                series={state.series}
                type="line"
                width="420"
              />
            </div>
          </div>
        </div>
        <CSVLink
          data={obj_array}
          style={{
            marginTop: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            width: "160px",
            height: "36px",
            padding: "10px",
            // alignSelf: "flex-end",
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
        <div className="sales_list">
          <div className="sales_list_header">
            <h3>Date</h3>
            <h3>product Id</h3>
            <h3>Product Name</h3>
            <h3>Unit price</h3>
            <h3>Sales Volume</h3>
            <h3>Net sales</h3>
            <h3>Gross sales</h3>
          </div>
          <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            {map_array}
          </div>
        </div>
      </div>
    </div>
  );
}
