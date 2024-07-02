import React from "react";
import QRCode from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";
import './FacilitatorQR.css';

function FacilitatorQR() {
  const { facilitatorId } = useParams();
  const location = useLocation();
  const facilitatorName = location.state?.facilitatorName || 'Unknown Facilitator';
  const url = `${window.location.origin}/${facilitatorId}`;

  return (
    <div className="qr-container">
      <h1>QR Code for Facilitator: {facilitatorName}</h1>
      <QRCode value={url} />
      <p>Scan this QR code to visit the facilitator's page.</p>
    </div>
  );
}

export default FacilitatorQR;
