// About.js
import React from "react";
import ssp580 from "../../assets/Ssp580.png";
import ssp580Temperatures from "../../assets/Ssp580-1.png";
import { Trans } from "react-i18next";

const Results585 = () => {
  return (
    <div className="results">
      <Trans i18nKey="SSP585" />
      <img src={ssp580} alt="SSP 5 8.5" />
      <Trans i18nKey="SSP585_1" />
      <img src={ssp580Temperatures} alt="+5°C (SSP 5-8.5)" />
      <Trans i18nKey="SSP585_2" />
    </div>
  );
};

export default Results585;
