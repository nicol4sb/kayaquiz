// About.js
import React from "react";
import "./Results.css";
const IntroResults = () => {
  return (
    <div>
      <p>
        You have just solved the Kaya Identity. For reference, CO2 emissions in
        2023 are above 40 GT per annum. This corresponds to roughly 5 tons per
        person per year.
      </p>
      <p>
        Based on your inputs, CO2 emissions in 2050 would be{" "}
        {localStorage.getItem("CO2Tons")} GT per annum.
      </p>{" "}
      <div className="big-number">{localStorage.getItem("CO2Tons")} Gigatons</div>
      <div className="medium-number">{localStorage.getItem("calculatedSSP")}</div>
    </div>
  );
};

export default IntroResults;
