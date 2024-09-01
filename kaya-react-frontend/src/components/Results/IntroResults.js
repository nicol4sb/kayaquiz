  import React from "react";
  import "./Results.css";
  import { Trans } from "react-i18next";

  const IntroResults = () => {
    // Local mapping of SSP keys to full descriptive texts
    const sspMapping = {
      "SSP119": "+1.5°C (SSP 1-1.9)",
      "SSP126": "+2°C (SSP 1-2.6)",
      "SSP245": "+3°C (SSP 2-4.5)",
      "SSP370": "+4°C (SSP 3-7.0)",
      "SSP585": "+5°C (SSP 5-8.5)"
    };

    // Retrieve SSP key from localStorage
    const calculatedSSP = localStorage.getItem("calculatedSSP");

    // Map the SSP key to its full descriptive text
    const translatedSSP = sspMapping[calculatedSSP] || calculatedSSP;

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
          {translatedSSP}
        </div>
      </div>
    );
  };

  export default IntroResults;
