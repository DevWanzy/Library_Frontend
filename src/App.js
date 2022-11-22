import {
  faBell,
  faFingerprint,
  faSignOutAlt,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import libstaff from "./components/staff";
import Login from "./components/login";
import Navbar from "./components/navbar";
//import Seats from "./components/seats";
import Students from "./components/students";
import cn from "./Constants";
import home from "./components/home";

function App() {
  const [userlogged, setuserlogged] = useState({ logged: false, user: {} });
  const [pstate, setpstate] = useState(false);
  const [tr, settr] = useState(false);
  const [stdDev, setStdDev] = useState(0);
  const [resp, setresp] = useState({ error: false, details: "Click again" });

  useEffect(() => {
    fetch(`${cn.backendUrl}/auth/currentuser`, {
      method: "POST",
      headers: { auth_token: localStorage.getItem("auth_token") },
    }).then(async (r) => {
      setpstate(true);
      let u = await r.json();
      if (r.ok) setuserlogged({ logged: true, user: u });
    });
  }, [tr]);

  if (pstate && stdDev === 2) {
    if (userlogged.logged) {
      return (
        <BrowserRouter>
          <div className="backbody">
            <div className="y-bg"></div>
            <div className="w-bg"></div>
            <div className="container">
              <Navbar user={userlogged.user} />
              <div className="content">
                <div className="user">
                  <img src="illustrations/maleavatar.svg" alt="" />
                  <div className="info">
                    <span className="nspan">
                      {userlogged.user.name.toUpperCase()}
                    </span>
                    <span className="level-span">
                      {userlogged.user.level.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ padding: ".5rem" }}>
                    <FontAwesomeIcon size="1x" icon={faBell} />
                  </div>
                  <div style={{ padding: ".5rem" }}>
                    <FontAwesomeIcon size="1x" icon={faUser} />
                  </div>
                  <div style={{ padding: ".5rem" }}>
                    <FontAwesomeIcon
                      size="1x"
                      icon={faSignOutAlt}
                      onClick={() => {
                        localStorage.clear();
                        setuserlogged({ logged: false });
                        settr(!tr);
                      }}
                    />
                  </div>
                  {/*<div style={{ backgroundColor: "white", borderRadius: 5, padding: ".5rem", display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", color:"maroon"}}>
                    <FontAwesomeIcon size="1x" icon={faSignOutAlt} />
                    <span style={{fontSize:10}}>Log Out</span>
                  </div>*/}
                </div>
                <Switch>
                  <Route exact path="/home" component={home} />
                  <Route path="/students" component={Students} />
                  <Route path="/staff" component={libstaff} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      );
    } else {
      return (
        <Login
          handleLogin={async (u, p) => {
            fetch(`${cn.backendUrl}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: u, password: p }),
            }).then(async (r) => {
              if (r.ok) {
                let u = await r.json();
                localStorage.setItem("auth_token", u.auth_token);
                settr(!tr);
              } else {
                let er = await r.text();
                setresp({ error: true, details: er });
              }
            });
          }}
          loginResponse={resp}
        />
      );
    }
  } else if (stdDev === 1) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ marginBottom: 5, fontSize: "xx-large" }}>
          Students Portal
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="login-input">
            <label htmlFor="">Select A Floor</label>
            <select
              onChange={(e) => {
                document.querySelector("#avseats").innerHTML = "";
                fetch(
                  `${cn.backendUrl}/assign/availableinfloor/${e.target.value}`
                ).then(async (ss) => {
                  if (ss.ok) {
                    let s = await ss.json();
                    s.forEach((seat) => {
                      document.querySelector(
                        "#avseats"
                      ).innerHTML += `<option value="${seat.no}">${seat.no} - ${seat.description}</option>`;
                    });
                  } else {
                    let s = await ss.text();
                    alert("Error Assigning Seat\n\n" + s);
                  }
                });
              }}
            >
              <option value="Ground Floor">Ground Floor</option>
              <option value="First Floor">First Floor</option>
              <option value="Second Floor">Second Floor</option>
            </select>
          </div>
          <div className="login-input">
            <label htmlFor="">Select A Seat</label>
            <select id="avseats"></select>
          </div>
          <input id="asreg" style={{ marginBottom: 10 }} />
          <FontAwesomeIcon
            onClick={() => {
              fetch(`${cn.backendUrl}/assign/self`, {
                method: "POST",
                headers: {
                  auth_token: localStorage.getItem("auth_token"),
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  seat: document.querySelector("#avseats").value,
                  regno: document.querySelector("#asreg").value,
                }),
              }).then(async (r) => {
                if (r.ok) {
                  let s = await r.text();
                  alert(`Seat Assigned Successfuly\n\nDetails:\n${s}`);
                } else {
                  let s = await r.text();
                  alert(
                    `Sorry, We CANNOT assign you a seat at this time\n\nReason\n${s}`
                  );
                }
              });
            }}
            icon={faFingerprint}
            size="4x"
            style={{
              color: "black",
              border: "solid 2.5px yellowgreen",
              width: 150,
              height: 150,
              padding: 20,
              marginBottom: 10,
            }}
          />
          <span style={{ fontSize: "small" }}>Kindly Scan your finger.</span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ marginBottom: 5, fontSize: "xx-large" }}>
          Kindly Select the Target
        </span>
        <div className="options">
          <button
            className="button-default"
            style={{ marginRight: 10 }}
            onClick={() => setStdDev(1)}
          >
            <FontAwesomeIcon
              icon={faUserGraduate}
              style={{ marginRight: 10 }}
            />
            Students Device
          </button>
          <button className="button-cancel" onClick={() => setStdDev(2)}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: 10 }} />
            Staff Device
          </button>
        </div>
      </div>
    );
  }
}

export default App;
