// About.js
import React from "react";

const IntroResults = () => {
  return (
    <p>
      You have just tried to solve the Kaya Identity. CO2 emissions in 2023 are
      above 40 GT per annum. This corresponds to roughly 5 tons per person per
      year (40GT / 8 Billion) Given the inputs you have provided the CO2
      emissions in 2050 should be {localStorage.getItem("CO2Tons")} GT per annum.{" "}
    </p>
  );
};

export default IntroResults;
