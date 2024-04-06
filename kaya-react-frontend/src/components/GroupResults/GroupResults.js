import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Static mapping of column names to colors
const colorMapping = {
  "SSP 1-1.9": "#1ebcca",
  "SSP 1-2.6": "#053081",
  "SSP 2-4.5": "#f2b211",
  "SSP 3-7.0": "#ed4433",
  "SSP 5-8.5": "#900C3F",
  // Add other column names and their colors as needed
};

function GroupResults() {
  const [data, setData] = useState([{ name: "SSP5-8.5", participants: 1 }]);

  useEffect(() => {
    fetch("/api/groupResults", {
      method: "GET",
    })
      .then(response => response.json())
      .then(response => {
        const formattedData = response.map(item => ({
          name: item.text, // Assuming 'text' represents the column name
          participants: item.value,
        }));
        setData(formattedData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Participants', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="participants" isAnimationActive={false}>
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorMapping[entry.name] || '#8884d8'} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GroupResults;
