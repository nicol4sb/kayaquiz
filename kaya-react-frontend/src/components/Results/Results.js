// About.js
import React from 'react';
import {useLocation} from 'react-router-dom';

const Results = () => {
  const location = useLocation();
  return (
    <div>
      <h2>Results</h2>
      <p>Q1 results : {location.state.ans.question1}</p>
      <p>Q2 results : {location.state.ans.question2}</p>
      <p>Q3 results : {location.state.ans.question3}</p>
    </div>
  );
};

export default Results;
