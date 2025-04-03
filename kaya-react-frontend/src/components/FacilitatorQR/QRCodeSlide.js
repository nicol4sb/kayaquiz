import React, { useEffect } from "react";
import QRCode from "qrcode.react";

function QRCodeSlide({
  qrUrl,
  sessionCreated,
  generateSessionId,
  handleFetchSessionResults,
  lastSessions,
  sessionStartTime,
}) {
  // Generate the session ID on mount
  useEffect(() => {
    if (!sessionCreated) {
      generateSessionId();
    }
  }, [sessionCreated, generateSessionId]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="slide">
      {qrUrl && (
        <>
          <a href={qrUrl} target="_blank" rel="noopener noreferrer">
            <QRCode value={qrUrl} size={384} />
          </a>
          {sessionStartTime && (
            <p style={{ marginTop: "10px", fontStyle: "italic" }}>
              Session started at {formatTime(new Date(sessionStartTime))}
            </p>
          )}
        </>
      )}

      {!sessionCreated ? (
        <button onClick={generateSessionId} className="new-session-button">
          New Session
        </button>
      ) : (
        <div>
          <button
            onClick={() => handleFetchSessionResults(qrUrl.split("/").pop())}
            className="close-session-button"
          >
            Show results
          </button>
        </div>
      )}

      <div className="session-list">
        <h3>Last Sessions</h3>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {lastSessions.map((session) => (
            <li key={session.session_id} style={{ marginBottom: "10px" }}>
              <span>{session.date}</span>
              <button
                onClick={() => handleFetchSessionResults(session.session_id)}
              >
                View Results
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QRCodeSlide;
