import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [facilitatorTotals, setFacilitatorTotals] = useState([]);
  const navigate = useNavigate();

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
        setFacilitatorTotals(response.total_visits_per_facilitator);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleCardClick = (facilitatorId, facilitatorName) => {
    navigate(`/facilitator/${facilitatorId}`, { state: { facilitatorName } });
  };

  return (
    <div className="stats-container">
      <h1>Kayaquiz Stats</h1>
      <div className="big-number">
        Total Visits: {totalVisits}
      </div>
      <div className="facilitator-totals">
        {facilitatorTotals.map((facilitator, index) => (
          <div 
            key={index} 
            className="facilitator-card" 
            onClick={() => handleCardClick(facilitator.id, facilitator.facilitator)}>
            <h3>{facilitator.facilitator}</h3>
            <p>{facilitator.total_visits} visits</p>
          </div>
        ))}
      </div>
      <div className="bar-chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
    </div>
  );
}

export default Stats;
