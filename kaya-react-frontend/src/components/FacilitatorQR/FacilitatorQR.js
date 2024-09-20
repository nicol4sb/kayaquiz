import React, { useState, useEffect } from "react";
import QRCodeSlide from "./QRCodeSlide";
import ChartSlide from "./ChartSlide";
import { Consequences1, Consequences2 } from "./Consequences"; // Correct named imports
import SecondSessionQRCodeSlide from "./SecondSessionQRCodeSlide"; // Import second session slide
import CompareSessionsChartSlide from "./CompareSessionsChartSlide"; // Import the comparison chart slide
import KayaMaterialSlide from "./KayaMaterialSlide"; // Import the Kaya Material slide
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

  const totalSlides = 7; // Updated total slides to include KayaMaterialSlide

  useEffect(() => {
    const loadFacilitator = async () => {
      const name = await fetchFacilitator(facilitatorId, location);
      setFacilitatorName(name);
    };

    loadFacilitator();
  }, [facilitatorId, location]);

  useEffect(() => {
    const loadLastSessions = async () => {
      const sessions = await fetchLastSessions(facilitatorId);
      setLastSessions(sessions);
    };

    loadLastSessions();
  }, [facilitatorId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, totalSlides]);

  const generateSessionId = () => {
    const sessionId = new Date().toISOString().replace(/[-:.TZ]/g, "");
    setQrUrl(`${window.location.origin}/${facilitatorId}/${sessionId}`);
    setSessionCreated(true);
    setCurrentSlide(0);
  };

  const handleFetchSessionResults = async (sessionId) => {
    const resultData = await fetchSessionResults(sessionId);
    setData(resultData);
    setIsDataLoaded(true);
    setCurrentSlide(1);
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const handlePrevious = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  return (
    <div className="qr-container">
      <h2>Kaya Quiz - {facilitatorName}</h2>

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

      {currentSlide === 2 && <Consequences1 />}
      {currentSlide === 3 && <Consequences2 />}
      {currentSlide === 4 && <SecondSessionQRCodeSlide facilitatorId={facilitatorId} />}
      {currentSlide === 5 && (
        <CompareSessionsChartSlide facilitatorId={facilitatorId} />
      )}

      {/* Add the KayaMaterialSlide as the last slide */}
      {currentSlide === 6 && <KayaMaterialSlide />}

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
