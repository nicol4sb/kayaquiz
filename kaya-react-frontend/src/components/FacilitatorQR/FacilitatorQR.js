import React from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import './FacilitatorQR.css';

function FacilitatorQR() {
  const { facilitator } = useParams();
  const url = `${window.location.origin}/${facilitator}`;

  return (
    <div className="qr-container">
      <h1>QR Code for Facilitator ID: {facilitator}</h1>
      <QRCode value={url} />
      <p>Scan this QR code to visit the facilitator's page.</p>
    </div>
  );
}

export default FacilitatorQR;
