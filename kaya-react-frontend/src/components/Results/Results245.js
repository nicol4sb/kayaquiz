// About.js
import React from "react";
import ssp245 from "../../assets/Ssp245.png";
import ssp245Temperatures from "../../assets/Ssp245-1.png";
import { Trans } from "react-i18next";

const Results245 = () => {
  return (
    <div>
      <Trans i18nKey="SSP245" />
      <img src={ssp245} alt="ssp2-4.5" />
      <Trans i18nKey="SSP245_1" />
      <img src={ssp245Temperatures} alt="ssp2 4.5 degrees" />
      <Trans i18nKey="SSP245_2" />
    </div>
  );
};

export default Results245;
