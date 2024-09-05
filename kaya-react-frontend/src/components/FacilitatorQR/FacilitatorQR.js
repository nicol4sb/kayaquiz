import React, { useState, useEffect } from "react";
import QRCodeSlide from "./QRCodeSlide";
import ChartSlide from "./ChartSlide";
import IdentitySlide from "./IdentitySlide";
import { useLocation, useParams } from "react-router-dom";
import {
  fetchFacilitator,
  fetchLastSessions,
  fetchSessionResults,
} from "../../utils/api";
import "./FacilitatorQR.css";

function FacilitatorQR() {
  const { facilitatorId } = useParams();
  const location = useLocation();
  const [facilitatorName, setFacilitatorName] = useState("Loading...");
  const [qrUrl, setQrUrl] = useState(
    `${window.location.origin}/${facilitatorId}`
  );
  const [sessionCreated, setSessionCreated] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [lastSessions, setLastSessions] = useState([]);

  const totalSlides = 3;

  // Fetch facilitator name
  useEffect(() => {
    const loadFacilitator = async () => {
      const name = await fetchFacilitator(facilitatorId, location);
      setFacilitatorName(name);
    };

    loadFacilitator();
  }, [facilitatorId, location]);

  // Fetch last sessions
  useEffect(() => {
    const loadLastSessions = async () => {
      const sessions = await fetchLastSessions(facilitatorId);
      setLastSessions(sessions);
    };

    loadLastSessions();
  }, [facilitatorId]);

  // Generate a session ID and update QR URL
  const generateSessionId = () => {
    const sessionId = new Date().toISOString().replace(/[-:.TZ]/g, "");
    setQrUrl(`${window.location.origin}/${facilitatorId}/${sessionId}`);
    setSessionCreated(true);
    setCurrentSlide(0);
  };

  // Fetch session results
  const handleFetchSessionResults = async (sessionId) => {
    const resultData = await fetchSessionResults(sessionId);
    setData(resultData);
    setIsDataLoaded(true);
    setCurrentSlide(1);
  };

  // Handle next and previous slide
  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrevious = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // Add keyboard shortcuts for left and right arrow keys
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentSlide > 0) {
        handlePrevious();
      } else if (event.key === "ArrowRight" && currentSlide < totalSlides - 1) {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="qr-container">
      <h1>Kaya Quiz</h1>
      <h3>{facilitatorName}</h3>

      {currentSlide === 0 && (
        <QRCodeSlide
          qrUrl={qrUrl}
          sessionCreated={sessionCreated}
          generateSessionId={generateSessionId}
          handleFetchSessionResults={handleFetchSessionResults}
          lastSessions={lastSessions}
        />
      )}

      {currentSlide === 1 && isDataLoaded && <ChartSlide data={data} />}

      {currentSlide === 2 && <IdentitySlide />}

      <div className="navigation">
        {currentSlide > 0 && (
          <button className="prev-button" onClick={handlePrevious}>
            ←
          </button>
        )}
        {currentSlide < totalSlides - 1 && (
          <button className="next-button" onClick={handleNext}>
            →
          </button>
        )}
      </div>
    </div>
  );
}

export default FacilitatorQR;
