// About.js
import React from "react";
import "./Results.css";
import { Trans } from "react-i18next";

const IntroResults = () => {
  return (
    <div>
      <p>
        <Trans i18nKey="IntroResults" />
      </p>
      <p>
      <Trans i18nKey="IntroResults1" />{" "}
        {localStorage.getItem("CO2Tons")} GT per annum.
      </p>{" "}
      <div className="big-number">
        {localStorage.getItem("CO2Tons")} Gigatons
      </div>
      <div className="medium-number">
        {localStorage.getItem("calculatedSSP")}
      </div>
    </div>
  );
};

export default IntroResults;
