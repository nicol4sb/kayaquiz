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
  const [currentSlide, setCurrentSlide] = useState(0); // Track the current slide
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // Track if data is loaded

  const totalSlides = 3; // Total number of slides (QR code, chart, image)

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

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentSlide > 0) {
        handlePrevious();
      } else if (event.key === "ArrowRight" && currentSlide < totalSlides - 1) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide]);

  const generateSessionId = () => {
    const now = new Date();
    const sessionId = now.toISOString().replace(/[-:.TZ]/g, "");
    const newUrl = `${window.location.origin}/${facilitatorId}/${sessionId}`;
    setQrUrl(newUrl);
    setSessionCreated(true);
    setCurrentSlide(0); // Reset to QR code slide
  };

  const handleFetchSessionResults = () => {
    const sessionId = qrUrl.split('/').pop();
    setIsDataLoaded(false); // Set data loading state to false
    fetch(`/api/sessionResults?sessionId=${sessionId}`)
      .then((response) => response.json())
      .then((response) => {
        const formattedData = response.map((item) => ({
          name: item.text,
          participants: item.value,
        }));
        setData(formattedData);
        setIsDataLoaded(true); // Data is loaded successfully
      })
      .catch((error) => {
        console.error("Error fetching session results:", error);
        setIsDataLoaded(false); // Set data loading state to false on error
      });
  };

  const handleNext = () => {
    if (currentSlide === 0 && sessionCreated) {
      handleFetchSessionResults(); // Fetch session results before showing chart
    }
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="qr-container">
      {currentSlide === 0 && (
        <div className="slide">
          <h1>QR Code for Facilitator: {facilitatorName}</h1>

          {qrUrl && <QRCode value={qrUrl} size={384} />}
          {qrUrl && (
            <>
              <p>Scan this QR code to visit the facilitator's page.</p>
              <p>
                Or click <a href={qrUrl} target="_blank" rel="noopener noreferrer">here</a> to visit the page.
              </p>
            </>
          )}

          {!sessionCreated && (
            <button onClick={generateSessionId} className="new-session-button">
              New Session
            </button>
          )}

          {sessionCreated && (
            <button onClick={handleNext} className="close-session-button">
              Show results
            </button>
          )}
        </div>
      )}

      {currentSlide === 1 && isDataLoaded && (
        <div className="slide">
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
        </div>
      )}

      {currentSlide === 2 && (
        <div className="slide">
          <img src={kayaIdentityImage} alt="Kaya Identity Equation" className="equation-image" />
        </div>
      )}

      <div className="navigation">
        {currentSlide > 0 && (
          <button className="carousel-arrow left-arrow" onClick={handlePrevious}>
            ←
          </button>
        )}
        {currentSlide < totalSlides - 1 && (
          <button className="carousel-arrow right-arrow" onClick={handleNext}>
            →
          </button>
        )}
      </div>
    </div>
  );
}

export default FacilitatorQR;
