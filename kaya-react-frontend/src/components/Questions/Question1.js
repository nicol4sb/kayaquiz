import React from "react";
import "./Question.css";
import projections from "../../assets/PROJECTIONS-95-hi-lo-rec_0.png";
import { Trans } from "react-i18next";
import { useModal } from "../ModalContext/ModalContext";

function Question1() {
  const { openModal } = useModal();

  return (
    <div className="question">
      <h3>
        <Trans i18nKey="Q1Title" />
      </h3>
      <Trans i18nKey="Q1" />
      <img
        src={projections}
        alt="CO2"
        onClick={() => openModal(projections)}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Question1;
