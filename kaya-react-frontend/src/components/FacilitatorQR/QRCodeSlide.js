import React from "react";
import QRCode from "qrcode.react";

function QRCodeSlide({ qrUrl, sessionCreated, generateSessionId, handleFetchSessionResults, lastSessions }) {
  return (
    <div className="slide">
      {qrUrl && <QRCode value={qrUrl} size={384} />}
      <p>Scan this QR code to visit the facilitator's page.</p>

      {!sessionCreated ? (
        <button onClick={generateSessionId} className="new-session-button">New Session</button>
      ) : (
        <button onClick={() => handleFetchSessionResults(qrUrl.split("/").pop())} className="close-session-button">
          Show results
        </button>
      )}

      <div className="session-list">
        <h3>Last Sessions</h3>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {lastSessions.map((session) => (
            <li key={session.session_id} style={{ marginBottom: "10px" }}>
              <span>{session.date}</span>
              <button onClick={() => handleFetchSessionResults(session.session_id)}>View Results</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default QRCodeSlide;
