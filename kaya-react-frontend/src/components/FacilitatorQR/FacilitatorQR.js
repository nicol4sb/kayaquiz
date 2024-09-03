import React, { useState, useEffect } from "react";
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

const colorMapping = {
  SSP119: "#1ebcca",
  SSP126: "#053081",
  SSP245: "#f2b211",
  SSP370: "#ed4433",
  SSP585: "#900C3F",
};

function FacilitatorQR() {
  const { facilitatorId } = useParams();
  const location = useLocation();
  const [facilitatorName, setFacilitatorName] = useState('Loading...');
  const [qrUrl, setQrUrl] = useState(`${window.location.origin}/${facilitatorId}`);
  const [sessionCreated, setSessionCreated] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (location.state?.facilitatorName) {
      setFacilitatorName(location.state.facilitatorName);
    } else {
      fetch(`/api/facilitator/${facilitatorId}`)
        .then((response) => response.json())
        .then((data) => setFacilitatorName(data.name || 'Unknown Facilitator'))
        .catch((error) => {
          console.error("Error fetching facilitator name:", error);
          setFacilitatorName('Unknown Facilitator');
        });
    }
  }, [facilitatorId, location.state]);

  const generateSessionId = () => {
    const now = new Date();
    const sessionId = now.toISOString().replace(/[-:.TZ]/g, "");
    const newUrl = `${window.location.origin}/${facilitatorId}/${sessionId}`;
    setQrUrl(newUrl);
    setSessionCreated(true);
    setShowCarousel(false);
    
    // Fetch session results after creating a new session
    fetch(`/api/sessionResults?sessionId=${sessionId}`)
      .then((response) => response.json())
      .then((response) => {
        const formattedData = response.map((item) => ({
          name: item.calculatedSSP,
          participants: item.count, // Use item.count directly without fallback
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching session results:", error);
      });
  };

  const handleCloseSession = () => {
    setShowCarousel(true);
  };

  const handleNext = () => {
    setCarouselIndex(1);
  };

  const handlePrevious = () => {
    setCarouselIndex(0);
  };

  const handleReturnToQR = () => {
    setShowCarousel(false);
  };

  return (
    <div className="qr-container">
      {!showCarousel && (
        <>
          <h1>QR Code for Facilitator: {facilitatorName}</h1>

          {qrUrl && <QRCode value={qrUrl} />}
          {qrUrl && <p>Scan this QR code to visit the facilitator's page.</p>}

          {!sessionCreated && (
            <button onClick={generateSessionId} className="new-session-button">
              New Session
            </button>
          )}

          {sessionCreated && !showCarousel && (
            <button onClick={handleCloseSession} className="close-session-button">
              Show results
            </button>
          )}
        </>
      )}

      {showCarousel && (
        <div className="carousel-container">
          {carouselIndex === 0 && data.length > 0 && (
            <div className="chart-container">
              <button className="carousel-arrow left-arrow" onClick={handleReturnToQR}>
                ←
              </button>
              <ResponsiveContainer width="100%" height={600}>
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
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Participants",
                      angle: -90,
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participants" isAnimationActive={false}>
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
                        `${((value / data.reduce((acc, cur) => acc + cur.participants, 0)) * 100).toFixed(2)}%`
                      }
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <button className="carousel-arrow right-arrow" onClick={handleNext}>
                →
              </button>
            </div>
          )}

          {carouselIndex === 1 && (
            <div className="equation-container">
              <button className="carousel-arrow left-arrow" onClick={handlePrevious}>
                ←
              </button>
              <img src={kayaIdentityImage} alt="Kaya Identity Equation" className="equation-image" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FacilitatorQR;
