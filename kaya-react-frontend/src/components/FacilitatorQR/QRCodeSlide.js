import React from "react";
import QRCode from "qrcode.react";

function QRCodeSlide({ qrUrl, sessionCreated, generateSessionId, handleFetchSessionResults, lastSessions }) {
  // Function to convert the UTC session date string (DD/MM/YYYY HH:mm:ss) to local time
  const formatDateToLocal = (dateString) => {
    console.log("Original date string:", dateString); // Debug log for the original string

    try {
      // Split the date string into components (day, month, year, time)
      const [day, month, year, hour, minute, second] = dateString.split(/[/\s:]+/);

      // Construct a valid ISO string: "YYYY-MM-DDTHH:mm:ssZ"
      const isoString = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;

      console.log("Constructed ISO string:", isoString); // Debug log for the constructed ISO string

      const utcDate = new Date(isoString); // Create the date object from the ISO string
      console.log("Parsed date object:", utcDate); // Debug log for the parsed date object

      const localDate = utcDate.toLocaleString(); // Convert to local time string
      console.log("Local date string:", localDate); // Debug log for the local date string

      return localDate; // Return the local time as a string
    } catch (error) {
      console.error("Error parsing date:", error); // Log any errors
      return "Invalid date"; // Return an error message if something goes wrong
    }
  };

  return (
    <div className="slide">
      {qrUrl && <QRCode value={qrUrl} size={384} />}
      <p>Scan this QR code to visit the facilitator's page.</p>

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
          <p>
            <a href={qrUrl} target="_blank" rel="noopener noreferrer">
              Desktop link
            </a>
          </p>
        </div>
      )}

      <div className="session-list">
        <h3>Last Sessions</h3>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {lastSessions.map((session) => (
            <li key={session.session_id} style={{ marginBottom: "10px" }}>
              {/* Format the session date to local time */}
              <span>{formatDateToLocal(session.date)}</span>
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
