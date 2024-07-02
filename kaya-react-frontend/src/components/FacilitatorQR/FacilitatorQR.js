import React from "react";
import QRCode from "qrcode.react";
import { useParams } from "react-router-dom";
import './FacilitatorQR.css';

function FacilitatorQR() {
  const { facilitator } = useParams();
  const url = `${window.location.origin}/${facilitator}`;

  return (
    <div className="qr-container">
      <h1>QR Code for Facilitator : {facilitator}</h1>
      <QRCode value={url} />
      <p>Scan this QR code to start a session with {facilitator}</p>
    </div>
  );
}

export default FacilitatorQR;
