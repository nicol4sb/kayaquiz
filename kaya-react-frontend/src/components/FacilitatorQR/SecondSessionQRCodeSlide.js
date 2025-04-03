import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

function SecondSessionQRCodeSlide({ facilitatorId }) {
  const [secondSessionUrl, setSecondSessionUrl] = useState("");

  // Automatically generate the second session URL if it's empty
  useEffect(() => {
    if (facilitatorId && !secondSessionUrl) {
      generateSecondSession();
    }
  }, [secondSessionUrl, facilitatorId]);

  const generateSecondSession = () => {
    const sessionId = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const newSessionUrl = `${window.location.origin}/${facilitatorId}/${sessionId}`;
    setSecondSessionUrl(newSessionUrl);
  };

  return (
    <div className="slide">
      <h3
        style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Second Session
      </h3>

      {secondSessionUrl ? (
        <div>
          <a href={secondSessionUrl} target="_blank" rel="noopener noreferrer">
            <QRCode value={secondSessionUrl} size={384} />
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SecondSessionQRCodeSlide;
