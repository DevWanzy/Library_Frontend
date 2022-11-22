import SearchBar from "../custom/searchbar";
import { useState, useEffect } from "react";
import moment from "moment";
import c from "../Constants";
import Modal from "../custom/Modal";

function Primary() {
  const [search, setSearch] = useState("");
  const [seats, setSeats] = useState({ status: 0, data: [] });
  const [sin, setSin] = useState(false);
  const [mul, setMul] = useState(false);
  const [tr, setTr] = useState(false);

  useEffect(() => {
    fetch(`${c.backendUrl}/seats`, {
      headers: { auth_token: localStorage.getItem("auth_token") },
    }).then(async (rr) => {
      if (rr.ok) {
        let r = await rr.json();
        setSeats({
          status: 2,
          data: r,
        });
      } else {
        let r = await rr.text();
        setSeats({
          status: 1,
          data: r,
        });
      }
    });
  }, [tr]);
  return (
    <>
      <Modal
        show={sin}
        title="Add Single Seat"
        handleClose={() => setSin(false)}
      >
        <div style={{ padding: "1rem" }}>
          {/* <div className="login-input">
                        <label htmlFor="sinQ">Quantity</label>
                        <input id="sinQ" type="number" autoComplete="false" />
                    </div> */}
          <div className="login-input">
            <label htmlFor="name">Floor</label>
            <select name="" id="sinFloor">
              <option value="Ground Floor">Ground Floor</option>
              <option value="First Floor">First Floor</option>
              <option value="Second Floor">Second Floor</option>
            </select>
          </div>
          <div className="login-input">
            <label htmlFor="sinDes">Description</label>
            <input id="sinDes" type="text" autoComplete="false" />
          </div>
          <div className="options">
            <button
              className="button-default"
              onClick={() => {
                fetch(`${c.backendUrl}/seats/single`, {
                  method: "POST",
                  headers: {
                    auth_token: localStorage.getItem("auth_token"),
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    floor: document.querySelector("#sinFloor").value,
                    description: document.querySelector("#sinDes").value,
                  }),
                }).then(async (rr) => {
                  if (rr.ok) {
                    let r = await rr.json();
                    //console.log(r);
                    alert("Seat Added");
                    setTr(!tr);
                  } else {
                    let r = await rr.text();
                    alert(`Seat NOT Added\n\nReason\n${r}`);
                  }
                });
              }}
            >
              Add Seat
            </button>
            <button
              className="button-cancel"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setSin(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={mul}
        title="Add Multiple Seats"
        handleClose={() => setMul(false)}
      >
        <div style={{ padding: "1rem" }}>
          <div className="login-input">
            <label htmlFor="mulQ">Quantity</label>
            <input id="mulQ" type="number" autoComplete="false" />
          </div>
          <div className="login-input">
            <label htmlFor="mulFloor">Floor</label>
            <select name="" id="mulFloor">
              <option value="Ground Floor">Ground Floor</option>
              <option value="First Floor">First Floor</option>
              <option value="Second Floor">Second Floor</option>
            </select>
          </div>
          <div className="login-input">
            <label htmlFor="mulDes">Description</label>
            <input id="mulDes" type="text" autoComplete="false" />
          </div>
          <div className="options">
            <button
              className="button-default"
              onClick={() => {
                fetch(`${c.backendUrl}/seats`, {
                  method: "POST",
                  headers: {
                    auth_token: localStorage.getItem("auth_token"),
                    "content-type": "application/json",
                  },
                  body: JSON.stringify({
                    quantity: document.querySelector("#mulQ").value,
                    floor: document.querySelector("#mulFloor").value,
                    description: document.querySelector("#mulDes").value,
                  }),
                }).then(async (rr) => {
                  if (rr.ok) {
                    let r = await rr.json();
                    console.log(r);
                    alert(r.details);
                    setTr(!tr);
                  } else {
                    let r = await rr.text();
                    alert(`Seat NOT Added\n\nReason\n${r}`);
                  }
                });
              }}
            >
              Add Seat
            </button>
            <button
              className="button-cancel"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setMul(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      <div className="title">Seats</div>
      <SearchBar
        placeholder="Search Through Library Seats..."
        searchData={(d) => setSearch(d.toUpperCase())}
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
          onClick={() => setSin(true)}
          style={{ fontSize: "small", marginRight: 10 }}
          className="button-default"
        >
          Add Single Seat
        </button>
        <button
          onClick={() => setMul(true)}
          style={{ fontSize: "small" }}
          className="button-default"
        >
          Add Multiple Seats
        </button>
      </div>
      <div className="students-list">
        {seats.status === 0 ? (
          <>Please Wait</>
        ) : seats.status === 1 ? (
          <>{seats.data}</>
        ) : (
          <table style={{ margin: ".5rem", fontSize: "small" }}>
            <tr style={{ fontWeight: "bolder" }}>
              <td className="std-head">SeatNo</td>
              <td
                className="std-head"
                onClick={() => {
                  seats.data.sort((a, b) => a - b);
                }}
              >
                Floor
              </td>
              <td className="std-head">Description</td>
              <td className="std-head">Date Added</td>
            </tr>
            {seats.data
              .filter(
                (s) =>
                  s.no.toString().includes(search) ||
                  s.floor.toUpperCase().includes(search) ||
                  s.description.toUpperCase().includes(search)
              )
              .map((std) => (
                <tr className="std-row">
                  <td className="std-item">{std.no}</td>
                  <td className="std-item">{std.floor}</td>
                  <td className="std-item">{std.description}</td>
                  <td className="std-item">
                    {moment(std.dateadded).format(
                      "ddd, Do MMM YYYY hh:mm:ss a"
                    )}
                  </td>
                </tr>
              ))}
            <tr style={{ background: "black", color: "white" /*"#f9b917"*/ }}>
              <td colSpan="6" style={{ textAlign: "center", padding: ".5rem" }}>
                <div>{`${seats.data.length.toLocaleString()} Seats`}</div>
              </td>
            </tr>
          </table>
        )}
      </div>
    </>
  );
}

export default Primary;
