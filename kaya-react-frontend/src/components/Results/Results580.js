// About.js
import React from "react";
import { useLocation } from "react-router-dom";
import "./Results.css"; // Importing external stylesheet for component-specific styles
import ssp12 from "../../assets/Ssp1+2.png";
import ssp122 from "../../assets/Ssp1+2-2.png";

const Results580 = () => {
  const location = useLocation();
  return (
    <div className="results">
      <h2>Results</h2>
      <p>Q1 results : {location.state.ans.question1}</p>
      <p>Q2 results : {location.state.ans.question2}</p>
      <p>Q3 results : {location.state.ans.question3}</p>
      <div className="results">
        scenario 5-8.0 - add content here
      </div>
    </div>
  );
};

export default Results580;
