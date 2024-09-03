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
  LabelList,
} from "recharts";

// Static mapping of column names to colors
const colorMapping = {
  "SSP119": "#1ebcca",
  "SSP126": "#053081",
  "SSP245": "#f2b211",
  "SSP370": "#ed4433",
  "SSP585": "#900C3F",
  // Add other column names and their colors as needed
};

function GroupResults() {
  const [data, setData] = useState([{ name: "SSP5-8.5", participants: 1 }]);

  useEffect(() => {
    fetch("/api/groupResults", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const formattedData = response.map((item) => ({
          name: item.text, // Assuming 'text' represents the column name
          participants: item.value,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const totalParticipants = data.reduce(
    (acc, cur) => acc + cur.participants,
    0
  );

  return (
    <div style={{ width: 800, height: 600 }}>
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
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Participants",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="participants" isAnimationActive={false} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMapping[entry.name] || "#8884d8"}
              />
            ))}
            <LabelList
              dataKey="participants"
              position="top"
              formatter={(value) =>
                `${((value / totalParticipants) * 100).toFixed(2)}%`
              }
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GroupResults;
