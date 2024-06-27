import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Static mapping of weeks to colors (optional)
const colorMapping = {
  // Add specific week mappings if needed, otherwise leave empty
};

function Stats() {
  const [data, setData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);

  useEffect(() => {
    fetch("/api/total-visits", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        setTotalVisits(response.total_visits);

        const formattedData = response.weekly_visits.map((item) => ({
          week: item.week,
          visits: item.weekly_visits,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ width: 800, height: 600 }}>
      <h1>Website Visits</h1>
      <p>Total Visits: {totalVisits}</p>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis
            label={{
              value: "Visits",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="visits" isAnimationActive={false} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMapping[entry.week] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;
