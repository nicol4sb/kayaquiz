import React from "react";
import DynamicResults from "../DynamicResults/DynamicResults";
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
    <div className="results">
      <h2>Results</h2>
      <IntroResults />
      <DynamicResults openModal={openModal} calculatedSSP={calculatedSSP} />
      <div>
        <button className="submit-button" type="submit" onClick={handleGoBack}>
          Take me back !
        </button>
      </div>
      <div>
        <button className="submit-button" type="submit" onClick={handleClick}>
          Next !
        </button>
      </div>
    </div>
  );
};

export default Results;
