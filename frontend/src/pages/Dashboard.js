import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [history, setHistory] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
useEffect(() => {
  if (user) {
    axios
      .get(`http://127.0.0.1:5000/history/${user.email}`)
      .then((res) => setHistory(res.data))
      .catch(() => alert("Error fetching history"));
  }
}, [user]);


  return (
    <div style={{ padding: "40px" }}>
      <h2>📊 Analysis History</h2>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Role</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.role}</td>
              <td>{item.score}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
