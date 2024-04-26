// About.js
import React from "react";
import ssp126 from "../../assets/Ssp126.png";
import ssp126Temperatures from "../../assets/Ssp126-1.png";
import {Trans} from "react-i18next";

const Results126 = () => {
  return (
    <div>
      <Trans i18nKey="SSP126" />
      <img src={ssp126} alt=" ssp 1-2.6 degrees" />
      <Trans i18nKey="SSP126_1" />

      <img src={ssp126Temperatures} alt="ssp 1-2.6 degrees" />
      <Trans i18nKey="SSP126_2" />
    </div>
  );
};

export default Results126;
