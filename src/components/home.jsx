import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./home.css";
import cons from "../Constants";

function Home() {
  const [studentNo, setStudentNo] = useState("");
  return (
    <div className="home">
      <div className="title">Dashboard</div>
      <div className="signout">
        <div className="login-input">
          <label htmlFor="soRegno">Enter Registration Number</label>
          <input
            onChange={(e) => setStudentNo(e.target.value)}
            style={{ fontSize: "x-large", padding: "5px 0" }}
            type="text"
            id="soRegno"
          />
          <div
            className="button-default small"
            onClick={() => {
              fetch(`${cons.backendUrl}/studentsattendance/signout`, {
                method: "POST",
                headers: {
                  auth_token: localStorage.getItem("auth_token"),
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  regno: studentNo,
                }),
              }).then(async (s) => {
                if (s.ok) {
                  let ss = await s.json();
                  alert("Student Signed Out Successfuly");
                } else {
                  let ss = await s.json();
                  alert("Failed to Signout Student\n\nDetails: " + ss.details);
                }
              });
            }}
          >
            <FontAwesomeIcon style={{ marginRight: 10 }} icon={faSignOutAlt} />
            Sign Out Student
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
