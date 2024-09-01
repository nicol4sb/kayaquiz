import React from "react";
import "./Question.css";
import projections from "../../assets/PROJECTIONS-95-hi-lo-rec_0.png";
import { Trans } from 'react-i18next';
import { useModal } from "../ModalContext/ModalContext"; // Import the useModal hook

function Question1() {
  const { openModal } = useModal(); // Use the modal context
  
  return (
    <div className="question">
      <h3><Trans i18nKey="Q1Title" /></h3>
      <div>
        <Trans i18nKey="Q1" />
      </div>
      <img 
        src={projections} 
        alt="CO2" 
        onClick={() => openModal(projections)} // Opens the modal on click
        style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
      />
    </div>
  );
}

export default Question1;
