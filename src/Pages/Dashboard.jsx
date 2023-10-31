import React, { useContext } from "react";
import Chart from "react-apexcharts";
import Navbar from "../components/nav";
import axios from "axios";
import { pathContext } from "../components/pathContext";

export default function Dashboard() {
  const { currentUser } = useContext(pathContext);
  const [totalSale, setTotSale] = React.useState(0);
  const [totalProf, setTotProf] = React.useState(0);
  const [totalCost, setTotCost] = React.useState(0);
  const [totProd, setTotProd] = React.useState(0);
  const [prodArr, setProdArr] = React.useState([""]);
  const [state, setState] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 40, 50, 35, 91],
      },
    ],
  });
  const [state_two, setStateTwo] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 60, 50, 49, 60, 70, 91],
      },
    ],
  });
  const [state_four, setStateFour] = React.useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          30, 40,
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 32, 40, 50, 49, 60, 70, 91],
      },
    ],
  });

  React.useEffect(() => {
    getRevandProf();
  }, []);

  function getRevandProf() {
    axios
      .post("http://localhost:80/phpAPI/requestRev.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        // console.log(response.data);
        const RevArr = [];
        const ProArr = [];
        const xaxis = [];
        let tot_sale = 0;
        let tot_prof = 0;

        setTotProd(response.data.length);

        for (let i = 0; i < response.data.length; i++) {
          xaxis.push(i);
          RevArr.push(response.data[i][0]);
          tot_sale += Number(response.data[i][0]);
          ProArr.push(response.data[i][1]);
          tot_prof += Number(response.data[i][1]);
        }
        setTotSale(tot_sale);
        setTotProf(tot_prof);
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
                data: RevArr,
              },
            ],
          };
        });

        setStateTwo((prev) => {
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
                data: ProArr,
              },
            ],
          };
        });

        // console.log(RevArr, ProArr);
      });
  }

  React.useEffect(() => {
    getCost();
  }, []);

  function getCost() {
    axios
      .post("http://localhost:80/phpAPI/requestCost.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        console.log(response.data);
        const CostArr = [];
        const xaxis = [];
        let tot_cost = 0;

        for (let i = 0; i < response.data.length; i++) {
          xaxis.push(i);
          CostArr.push(response.data[i][0]);
          tot_cost += Number(response.data[i][0]);
        }

        setTotCost(tot_cost);

        setStateFour((prev) => {
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
                data: CostArr,
              },
            ],
          };
        });
      });
  }
  React.useEffect(() => {
    requestProducts();
  }, []);

  function requestProducts() {
    axios
      .post("http://localhost:80/phpAPI/requestProdCount.php/save", {
        userId: currentUser,
      })
      .then((response) => {
        // console.log(response.data);
        setProdArr(response.data);
      });
  }

  const prods = prodArr.map((item) => {
    return (
      <tr key={item[1]}>
        <td>
          <b>{item[3]}</b>
        </td>
        <td>{item[2]}</td>
      </tr>
    );
  });

  return (
    <div className="main_cont">
      <Navbar />
      <div className="dash_cls">
        <h1>Welcome to SAS, User</h1>
        {/* <select id="dash_date">
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select> */}
        <div className="graphs_div">
          <div className="dash_items G_revenue">
            <h2>Revenue</h2>
            <div>
              <Chart
                options={state.options}
                series={state.series}
                type="line"
                width="430"
              />
            </div>
          </div>
          <div className="dash_items G_profits">
            <h2>Gross profits</h2>
            <div>
              <Chart
                options={state_two.options}
                series={state_two.series}
                type="line"
                width="430"
              />
            </div>
          </div>
          {/* <div className="dash_items G_income">
            <h2>Gross income</h2>
            <div>
              <Chart
                options={state_three.options}
                series={state_three.series}
                type="line"
                width="430"
              />
            </div>
          </div> */}
          <div className="dash_items indecator_table">
            <h2
              style={{
                background: "#898989",
                padding: "10px 0 10px 10px",
                borderRadius: "8px 8px 0 0 ",
                color: "white",
              }}
            >
              Key performance indicators
            </h2>
            <table className="kpi_table">
              <tr>
                <td>
                  <b>Total Sales</b>
                </td>
                <td>{totalSale}</td>
              </tr>
              <tr>
                <td>
                  <b>Total costs</b>
                </td>
                <td>{totalCost}</td>
              </tr>
              <tr>
                <td>
                  <b>Total Profits</b>
                </td>
                <td>{totalProf}</td>
              </tr>
              <tr>
                <td>
                  <b>products sold</b>
                </td>
                <td>{totProd}</td>
              </tr>
            </table>
          </div>
          <div className="dash_items G_costs">
            <h2>Costs</h2>
            <div>
              <Chart
                options={state_four.options}
                series={state_four.series}
                type="line"
                width="430"
              />
            </div>
          </div>
          <div className="dash_items oredered_table">
            <div className="order_info">
              <h3>Orderd product</h3>
              <h3>Customer</h3>
            </div>
            <div style={{ maxHeight: "260px", overflowY: "scroll" }}>
              <table className="kpi_table">{prods}</table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
