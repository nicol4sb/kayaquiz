import React from "react";
import DynamicResults from "../DynamicResults/DynamicResults";
import { Trans } from "react-i18next";
import { useModal } from "../ModalContext/ModalContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import IntroResults from "./IntroResults";

const Results = () => {
  const { openModal } = useModal();
  const calculatedSSP = localStorage.getItem("calculatedSSP");

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("On to the conclusion");
    navigate("/conclusion");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="content-container">
      <div className="step-slide">
        <h2 className="title">
          <Trans i18nKey="Results" />
        </h2>

        <IntroResults />

        <DynamicResults openModal={openModal} calculatedSSP={calculatedSSP} />

        <div className="nav-buttons">
          <button
            className="submit-button"
            type="button"
            onClick={handleGoBack}
          >
            ← {<Trans i18nKey="back" defaultValue="Take me back!" />}
          </button>
          <button className="submit-button" type="button" onClick={handleClick}>
            {<Trans i18nKey="next" defaultValue="Next!" />} →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
