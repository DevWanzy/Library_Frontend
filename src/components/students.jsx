import React, { useState, useEffect } from "react";

import SearchBar from "../custom/searchbar";
import cons from "../Constants";
import Modal from "../custom/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

function Students() {
  const [search, setsearch] = useState("");
  const [students, setstudents] = useState({ status: 0, data: [] });
  const [showmodal, setshowmodal] = useState(false);
  // eslint-disable-next-line
  const [tr, settr] = useState(false);

  useEffect(() => {
    fetch(`${cons.backendUrl}/students`, {
      method: "GET",
      headers: { auth_token: localStorage.getItem("auth_token") },
    }).then(async (s) => {
      if (s.ok) {
        let ss = await s.json();
        setstudents({ status: 2, data: ss });
      } else {
        let ss = await s.json();
        setstudents({ status: 1, data: ss });
      }
    });
  }, [tr]);

  return (
    <>
      <Modal
        show={showmodal}
        title="Add Students"
        handleClose={() => setshowmodal(false)}
      >
        <div style={{ padding: "1rem" }}>
          <div id="studentresponse"></div>
          <div className="login-input">
            <label htmlFor="regno">Registration Number</label>
            <input id="regno" type="text" autoComplete="false" />
          </div>
          <div className="login-input">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" />
          </div>
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              justifyContent: "space-evenly",
            }}
          >
            <div
              className="login-input"
              style={{ flex: "3", marginRight: ".5rem" }}
            >
              <label htmlFor="course">Course</label>
              <select
                id="course"
                type="text"
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  width: 250,
                }}
              >
                <option>Bsc Information Technology</option>
                <option>Bsc Software Engineering</option>
                <option>Bsc Geographical Information Systems</option>
                <option>Bsc Business Management</option>
              </select>
            </div>
            <div className="login-input" style={{ flex: "1", width: 250 }}>
              <label htmlFor="expiry">Expiry</label>
              <input type="number" id="expiry" />
            </div>
          </div>
          Contact Information
          <div
            style={{
              display: "flex",
              overflow: "hidden",
              justifyContent: "space-evenly",
            }}
          >
            <div className="login-input" style={{ width: "250px" }}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" />
            </div>
            <div className="login-input" style={{ width: "250px" }}>
              <label htmlFor="phone">Phone</label>
              <input id="phone" type="text" />
            </div>
          </div>
          Biometrics
          <div className="login-input">
            <FontAwesomeIcon icon={faFingerprint} size="4x" />
          </div>
          <div className="options">
            <button
              className="button-default"
              onClick={() => {
                fetch(`${cons.backendUrl}/students`, {
                  method: "POST",
                  headers: {
                    auth_token: localStorage.getItem("auth_token"),
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    regno: document.querySelector("#regno").value,
                    name: document.querySelector("#name").value,
                    email: document.querySelector("#email").value,
                    course: document.querySelector("#course").value,
                    phone: document.querySelector("#phone").value,
                    expiry: document.querySelector("#expiry").value,
                  }),
                }).then(async (rr) => {
                  if (rr.ok) {
                    let r = await rr.json();
                    console.log(r);
                    alert("Student Registered");
                    settr(!tr);
                  } else {
                    let r = await rr.text();
                    alert(`Student Not Added\n\nReason: ${r}`);
                  }
                });
              }}
            >
              Add Student
            </button>
            <button
              className="button-cancel"
              style={{ marginLeft: 10 }}
              onClick={() => setshowmodal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <div className="title">Students</div>
      <SearchBar
        placeholder="Search students..."
        searchData={(d) => setsearch(d.toUpperCase())}
      />
      <div
        style={{
          display: "flex",
          padding: ".1rem",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "small",
        }}
      >
        <button
          style={{ fontSize: "small" }}
          onClick={() => setshowmodal(true)}
          className="button-default"
        >
          Add Student
        </button>
      </div>
      <div className="students-list">
        {students.status === 0 ? (
          <>Please Wait</>
        ) : students.status === 1 ? (
          <>{students.data}</>
        ) : (
          <table style={{ margin: ".5rem", fontSize: "small" }}>
            <tr style={{ fontWeight: "bolder" }}>
              <td className="std-head">RegNo</td>
              <td
                className="std-head"
                onClick={() => {
                  students.data.sort((a, b) => a - b);
                }}
              >
                Name
              </td>
              <td className="std-head">Email</td>
              <td className="std-head">Course</td>
              <td className="std-head">Phone</td>
              <td className="std-head">Expiry</td>
            </tr>
            {students.data
              .filter(
                (s) =>
                  s.regno.includes(search) ||
                  s.name.includes(search) ||
                  s.phone.includes(search) ||
                  s.email.toUpperCase().includes(search)
              )
              .map((std) => (
                <tr className="std-row">
                  <td className="std-item">{std.regno}</td>
                  <td className="std-item">{std.name}</td>
                  <td className="std-item">{std.email}</td>
                  <td className="std-item">{std.course}</td>
                  <td className="std-item">{std.phone}</td>
                  <td className="std-item" style={{ textAlign: "end" }}>
                    {std.expiry}
                  </td>
                </tr>
              ))}
            <tr style={{ background: "black", color: "white" /*"#f9b917"*/ }}>
              <td colSpan="6" style={{ textAlign: "center", padding: ".5rem" }}>
                <div>{`${students.data.length.toLocaleString()} Students`}</div>
              </td>
            </tr>
          </table>
        )}
      </div>
    </>
  );
}

export default Students;
