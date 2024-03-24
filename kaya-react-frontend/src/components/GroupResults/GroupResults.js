import React, { useState, useEffect } from "react";
import BarChart from "react-bar-chart";
import "./GroupResults.css";

function GroupResults() {
  const [data, setData] = useState([{ text: "SSP5-8.0", value: 1 }]);

  useEffect(() => {
    fetch("/api/groupResults", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setData(response);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once after initial render

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  return (
    <div>
      <div style={{ width: "30%" }}>
        <BarChart
          ylabel="Participants"
          width={300}
          height={300}
          margin={margin}
          data={data}
          style={{ color: "blue" }}
        />
      </div>
    </div>
  );
}

export default GroupResults;
