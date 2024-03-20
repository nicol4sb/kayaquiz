// About.js
import React from "react";
import IntroResults from "./IntroResults";
import Results119 from "./Results119";
import Results126 from "./Results126";
import Results245 from "./Results245";
import Results370 from "./Results370";
import Results580 from "./Results580";

const Results = () => {
  let ComponentToRender;
  var calculatedSSP = localStorage.getItem("calculatedSSP");
  if (calculatedSSP === "119") {
    ComponentToRender = Results119;
  } else if (calculatedSSP === "126") {
    ComponentToRender = Results126;
  } else if (calculatedSSP === "245") {
    ComponentToRender = Results245;
  } else if (calculatedSSP === "370") {
    ComponentToRender = Results370;
  } else if (calculatedSSP === "580") {
    ComponentToRender = Results580;
  }

  return (
    <div className="results">
      <h2>Results</h2>
      <div>
        <IntroResults />
        {ComponentToRender && <ComponentToRender />}
      </div>
    </div>
  );
};

export default Results;
