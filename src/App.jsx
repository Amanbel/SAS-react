import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Inventory from "./Pages/inventory";
import Sales_orders from "./Pages/Sales_order";
import Expend from "./Pages/Expenditures";
import Sales_tax from "./Pages/sales_tax";
import Add_prod from "./Pages/Add_product";
import Login from "./Pages/login_page";
import Signup from "./Pages/signup_page";
import { pathContext } from "./components/pathContext";
import Commit_sales from "./Pages/commit_sales";
import Sold_items from "./Pages/sold_items";
import axios from "axios";
import { v1 as uuidv1 } from "uuid";
import Managestaff from "./Pages/managestaff";

export default function App() {
  const [path_var, setPath] = React.useState("/dashboard");
  const [currentUser, setCurrent] = React.useState(null);
  const navigate = useNavigate();
  const [ErrStyle, setErr] = React.useState(0);
  const [SignupData, setSignData] = React.useState({
    comp_id: uuidv1(),
    company: "",
    first_name: "",
    last_name: "",
    Email: "",
    password: "",
    con_password: "",
  });
  const [LoginData, setLoginData] = React.useState({
    Email: "",
    password: "",
    page: "owners_list",
  });
  const [invData, setInv] = React.useState({
    prod_id: "",
    date: "",
    supplier: "",
    location: "",
    product_name: "",
    unit_price: "",
    volume: "",
    shipping_cost: "",
  });

  const [invUpdate, setUpdate] = React.useState({
    date: "",
    supplier: "",
    location: "",
    product_name: "",
    unit_price: "",
    volume: "",
    shipping_cost: "",
  });

  const [staffInfo, setStaff] = React.useState({
    staffId: uuidv1(),
    ownerId: "",
    first_name: "",
    last_name: "",
    Email: "",
    password: "",
  });

  const [commitInfo, setCommit] = React.useState({
    date: "",
    staffId: "",
    customer: "",
    prod_name: "",
    unit_price: "",
    volume: "",
  });

  function whenLogin(event) {
    const { name, value } = event.target;
    setLoginData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function whenChange(event) {
    const { name, value } = event.target;

    setSignData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function whenSignupSubmit(event) {
    event.preventDefault();
    if (
      SignupData.Email != "" &&
      SignupData.company != "" &&
      SignupData.con_password != "" &&
      SignupData.password != "" &&
      SignupData.first_name != "" &&
      SignupData.last_name != ""
    ) {
      if (SignupData.password == SignupData.con_password) {
        axios
          .post("http://localhost:80/phpAPI/Signup.php/save", SignupData)
          .then((response) => {
            console.log(response.data);
            if (response.data.recived == 1) {
              navigate("/");
              setErr(0);
            } else {
              setErr(1);
            }
          });
      }
    } else {
      setErr(2);
    }
  }

  function whenLoginSubmit(event) {
    event.preventDefault();

    if (LoginData.Email != "" && LoginData.password != "") {
      axios
        .post("http://localhost:80/phpAPI/LoginSubmit.php/save", LoginData)
        .then((response) => {
          console.log(response.data);
          if (response.data.success == 0) {
            if (LoginData.page == "owners_list") {
              navigate("/dashboard");
              setCurrent(response.data.ID);
              setErr(0);
            } else if (LoginData.page == "sales_managers") {
              navigate("/commit sales");
              setCurrent(response.data.ID);
              setErr(0);
            }
          } else {
            setErr(1);
          }
        });
    } else {
      setErr(2);
    }
  }
  function whenAddChange(event) {
    const { name, value } = event.target;
    const date = new Date();
    // console.log(date.getDate())
    setInv((prev) => {
      return {
        ...prev,
        prod_id: uuidv1().slice(0, 13),
        date: date.toISOString().split("T")[0],
        comp_id: currentUser,
        [name]: value,
      };
    });
  }

  function whenUpdateChange(event) {
    const { name, value } = event.target;
    const date = new Date();
    // console.log(date.getDate())
    setInv((prev) => {
      return {
        ...prev,
        date: date.toISOString().split("T")[0],
        comp_id: currentUser,
        [name]: value,
      };
    });
  }

  function whenUpdatingProd(event) {
    event.preventDefault();

    if (
      invData.location != "" &&
      invData.product_name != "" &&
      invData.shipping_cost != "" &&
      invData.supplier != "" &&
      invData.unit_price != "" &&
      invData.volume != ""
    ) {
      axios
        .post("http://localhost:80/phpAPI/inventorySubmit.php/save", invData)
        .then((response) => {
          if (response.data.success != 1) {
            setInv((prev) => {
              return {
                ...prev,
                prod_id: uuidv1().slice(0, 13),
              };
            });
            setErrOut(0);
            navigate("/inventory");
          } else {
            setErrOut(1);
          }
        });
    }
  }

  const [errOut, setErrOut] = React.useState(3);
  function whenAddingProd(event) {
    event.preventDefault();

    if (
      invData.location != "" &&
      invData.product_name != "" &&
      invData.shipping_cost != "" &&
      invData.supplier != "" &&
      invData.unit_price != "" &&
      invData.volume != ""
    ) {
      axios
        .post("http://localhost:80/phpAPI/inventorySubmit.php/save", invData)
        .then((response) => {
          if (response.data.success != 1) {
            setInv((prev) => {
              return {
                ...prev,
                prod_id: uuidv1().slice(0, 13),
              };
            });
            setErrOut(0);
            navigate("/inventory");
          } else {
            setErrOut(1);
          }
        });
    }
  }

  function whenStaffChange(event) {
    const { name, value } = event.target;

    setStaff((prev) => {
      return {
        ...prev,
        staffId: uuidv1(),
        ownerId: currentUser,
        [name]: value,
      };
    });
  }

  function whenStaffSubmit(event) {
    event.preventDefault();

    if (
      staffInfo.Email != "" &&
      staffInfo.first_name != "" &&
      staffInfo.last_name != "" &&
      staffInfo.password != ""
    ) {
      axios
        .post("http://localhost:80/phpAPI/staffReg.php/save", staffInfo)
        .then((response) => {
          console.log(response.data);
        });
    }
  }

  function whenCommitChange(event) {
    const { name, value } = event.target;
    const date = new Date();

    setCommit((prev) => {
      return {
        ...prev,
        date: date.toISOString().split("T")[0],
        staffId: currentUser,
        [name]: value,
      };
    });
  }
  const [commitChk, setCommitChk] = React.useState(3);
  function whenCommitSubmit(event) {
    event.preventDefault();

    if (
      commitInfo.customer != "" &&
      commitInfo.prod_name != "" &&
      commitInfo.unit_price != "" &&
      commitInfo.volume != ""
    ) {
      axios
        .post("http://localhost:80/phpAPI/commitSales.php/save", commitInfo)
        .then((response) => {
          console.log(response.data);
          if (response.data.success == 0) {
            setCommitChk(0);
          } else {
            setCommitChk(1);
          }
        });
    }
  }

  const [Name, setName] = React.useState("");
  function passName(name) {
    setName(name);
  }

  return (
    <div>
      <pathContext.Provider
        value={{
          setLoginData,
          setCurrent,
          currentUser,
          setCommit,
          errOut,
          Name,
          passName
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <pathContext.Provider
                value={{ path_var, whenLogin, whenLoginSubmit, ErrStyle, LoginData }}
              >
                <Login />
              </pathContext.Provider>
            }
          />
          <Route
            path="/Sign up"
            element={
              <Signup
                whenChange={whenChange}
                whenSignupSubmit={whenSignupSubmit}
                Errstyle={ErrStyle}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sales" element={<Sales_orders />} />
          <Route path="/expenses" element={<Expend />} />
          <Route path="/Sales tax" element={<Sales_tax />} />
          <Route
            path="/inventory/add_product"
            element={
              <Add_prod
                whenAddChange={whenAddChange}
                whenAddingProd={whenAddingProd}
              />
            }
          />
          <Route
            path="/commit sales"
            element={
              <Commit_sales
                whenCommitChange={whenCommitChange}
                whenCommitSubmit={whenCommitSubmit}
                commitChk={commitChk}
              />
            }
          />
          <Route path="/sold items" element={<Sold_items />} />
          <Route
            path="/staff"
            element={
              <Managestaff
                whenStaffChange={whenStaffChange}
                whenStaffSubmit={whenStaffSubmit}
              />
            }
          />
        </Routes>
      </pathContext.Provider>
    </div>
  );
}
