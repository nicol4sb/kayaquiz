// About.js
import React from "react";
import ssp119 from "../../assets/Ssp119.png";
import ssp119Temperatures from "../../assets/Ssp119-1.png";
import { useTranslation, Trans } from "react-i18next";

const Results119 = () => {
  useTranslation();

  return (
    <div className="results">
      <p>
        <Trans i18nKey="SSP19" />
      </p>

      <img src={ssp119} alt="ssp1-1.9" />
      <Trans i18nKey="SSP19_1" />
      <img src={ssp119Temperatures} alt="ssp1-1.9, temperatures" />

      <p>
        <Trans i18nKey="SSP19_2" />{" "}
      </p>
    </div>
  );
};

export default Results119;
