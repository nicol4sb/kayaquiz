// About.js
import React from "react";
import ssp370 from "../../assets/Ssp370.png";
import ssp370Temperatures from "../../assets/Ssp370-1.png";
import { Trans } from "react-i18next";

const Results370 = () => {
  return (
    <div>
      <Trans i18nKey="SSP370" />
      <img src={ssp370} alt="SSP 370" />
      <Trans i18nKey="SSP370_1" />
      <img src={ssp370Temperatures} alt="SSP 3 - 7.0" />
      <Trans i18nKey="SSP370_2" />
    </div>
  );
};

export default Results370;
