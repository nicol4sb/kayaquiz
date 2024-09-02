import React, { useState } from "react";
import QRCode from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";
import './FacilitatorQR.css';
import kayaIdentityImage from "../../assets/kayaIdentity.png"; // Adjust the path as necessary
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
  "+1.5°C (SSP 1-1.9)": "#1ebcca",
  "+2°C (SSP 1-2.6)": "#053081",
  "+3°C (SSP 2-4.5)": "#f2b211",
  "+4°C (SSP 3-7.0)": "#ed4433",
  "+5°C (SSP 5-8.5)": "#900C3F",
};

function FacilitatorQR() {
  const { facilitatorId } = useParams();
  const location = useLocation();
  const facilitatorName = location.state?.facilitatorName || 'Unknown Facilitator';
  
  const initialUrl = `${window.location.origin}/${facilitatorId}`;
  const [qrUrl, setQrUrl] = useState(initialUrl);
  const [sessionCreated, setSessionCreated] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showEquation, setShowEquation] = useState(false);
  const [data, setData] = useState([]);

  const generateSessionId = () => {
    const now = new Date();
    const sessionId = now.toISOString().replace(/[-:.TZ]/g, "");
    const newUrl = `${window.location.origin}/${facilitatorId}/${sessionId}`;
    setQrUrl(newUrl);
    setSessionCreated(true);
    setShowChart(false); // Ensure chart is hidden initially after a new session is created
    setShowEquation(false); // Hide the equation image if previously shown
  };

  const fetchChartData = () => {
    fetch("/api/groupResults", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const formattedData = response.map((item) => ({
          name: item.text,
          participants: item.value,
        }));
        setData(formattedData);
        setShowChart(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleCloseSession = () => {
    setShowChart(false);
    setShowEquation(true);
  };

  const totalParticipants = data.reduce(
    (acc, cur) => acc + cur.participants,
    0
  );

  return (
    <div className="qr-container">
      <h1>QR Code for Facilitator: {facilitatorName}</h1>
      <QRCode value={qrUrl} />
      <p>Scan this QR code to visit the facilitator's page.</p>

      {!sessionCreated && (
        <button onClick={generateSessionId} className="new-session-button">
          New Session
        </button>
      )}

      {sessionCreated && !showChart && !showEquation && (
        <button onClick={fetchChartData} className="close-session-button">
          Close Session
        </button>
      )}

      {sessionCreated && showChart && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={400}>
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
          <button onClick={handleCloseSession} className="equation-time-button">
            Equation time!
          </button>
        </div>
      )}

      {showEquation && (
        <div className="equation-container">
          <img src={kayaIdentityImage} alt="Kaya Identity Equation" className="equation-image" />
        </div>
      )}
    </div>
  );
}

export default FacilitatorQR;
