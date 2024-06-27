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
} from "recharts";
import './Stats.css';

// Function to get a color for each facilitator
function getColor(index) {
  const colors = [
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#d84b6e',
    '#a1c4fd',
    '#ff9ff3',
    '#ff7f50',
    '#8a2be2',
    '#20b2aa',
  ];
  return colors[index % colors.length];
}

function Stats() {
  const [data, setData] = useState([]);
  const [totalVisits, setTotalVisits] = useState(0);
  const [facilitators, setFacilitators] = useState([]);

  useEffect(() => {
    fetch("/api/total-visits", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const facilitatorSet = new Set();
        const formattedData = response.weekly_visits.reduce((acc, item) => {
          const { week, facilitator, weekly_visits } = item;
          facilitatorSet.add(facilitator);
          const existingWeek = acc.find(d => d.week === week);
          if (existingWeek) {
            existingWeek[facilitator] = weekly_visits;
          } else {
            acc.push({ week, [facilitator]: weekly_visits });
          }
          return acc;
        }, []);
        setFacilitators(Array.from(facilitatorSet));
        setData(formattedData);
        setTotalVisits(response.total_visits);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ width: 800, height: 600 }}>
      <h1>Kayaquiz Stats</h1>
      <div className="big-number" style={{ fontSize: '32px', fontWeight: 'bold' }}>
        Total Visits: {totalVisits}
      </div>
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
          {facilitators.map((facilitator, index) => (
            <Bar
              key={facilitator}
              dataKey={facilitator}
              fill={getColor(index)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;
