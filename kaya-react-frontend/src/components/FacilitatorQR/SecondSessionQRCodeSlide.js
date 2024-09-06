import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";

function SecondSessionQRCodeSlide({ facilitatorId }) {
  const [secondSessionUrl, setSecondSessionUrl] = useState("");

  // Automatically generate the second session URL if it's empty
  useEffect(() => {
    if (!secondSessionUrl) {
      generateSecondSession();
    }
  }, [secondSessionUrl]); // Runs when the component loads or secondSessionUrl changes

  const generateSecondSession = () => {
    const sessionId = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const newSessionUrl = `${window.location.origin}/${facilitatorId}/${sessionId}`;
    setSecondSessionUrl(newSessionUrl);
  };

  return (
    <div className="slide">
      <h3>Second Session</h3>
      {secondSessionUrl ? (
        <div>
          <QRCode value={secondSessionUrl} size={384} />
          <p>
            <a href={secondSessionUrl} target="_blank" rel="noopener noreferrer">
              Desktop Link to Second Session
            </a>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SecondSessionQRCodeSlide;
