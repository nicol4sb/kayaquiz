import React, { useState, useEffect } from "react";
import "./Form.css"; // Importing external stylesheet for component-specific styles
import Question1 from "../Questions/Question1";
import Question2 from "../Questions/Question2";
import Question3 from "../Questions/Question3";
import IntroParagraph from "../IntroParagraph/IntroParagraph";
import { useNavigate } from "react-router-dom";

function KayaQuizForm() {
  //------------------------------------------------------
  // intialize questions state from local storage
  const storedAnswersString = localStorage.getItem("answers");
  const storedAnswers = storedAnswersString
    ? JSON.parse(storedAnswersString)
    : { question1: "", question2: "", question3: "" };

  const [answers, setAnswers] = useState({
    question1: storedAnswers.question1,
    question2: storedAnswers.question2,
    question3: storedAnswers.question3,
  });
  //------------------------------------------------------

  const handleAnswerChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
    console.log("Form changed :: " + question + " " + value);
  };

  // Update localStorage when answers is changed
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        const serverResponse = await response.json();
        localStorage.setItem("CO2Tons", serverResponse.CO2Tons);
        localStorage.setItem("calculatedSSP", serverResponse.calculatedSSP);
        navigate("/results", {
          state: { ans: answers },
        });
        console.log(
          "Form submitted successfully! - result :: " +
            serverResponse.calculatedSSP +
            " --- " +
            serverResponse.CO2Tons
        );
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <IntroParagraph />
      <form onSubmit={handleSubmit}>
        <div className="option-container">
          <p>
            <Question1 />
          </p>
          <div>
            <input
              type="range"
              value={answers.question1}
              min="6"
              max="12"
              step="0.1"
              onChange={(e) =>
                handleAnswerChange("question1", parseFloat(e.target.value))
              }
            />
            <br />
            World population in 2050 : {answers.question1} billlion
          </div>
        </div>

        <div className="option-container">
          <p>
            <Question2 />
          </p>
          <div>
            <input
              type="range"
              className="slider" // You can define this class in your CSS for styling
              min="8000"
              max="30000"
              step="100" // Adjust step as needed for granularity
              value={answers.question2}
              onChange={(e) =>
                handleAnswerChange("question2", parseFloat(e.target.value))
              }
            />
            <div>income of {answers.question2} USD/year</div>
          </div>
        </div>

        <div>
          <p>
            <Question3 />
          </p>
          <div className="option-container">
            <input
              type="range"
              className="slider" // Use this class for any needed CSS styling
              min="-0.01"
              max="0.03"
              step="0.01"
              value={answers.question3}
              onChange={(e) =>
                handleAnswerChange("question3", parseFloat(e.target.value))
              }
            />
            <div>
              {/* Displaying a descriptive label based on the value could improve UX */}
              {answers.question3 === -0.01
                ? "We revert back to coal (-1% deterioration per year)"
                : answers.question3 === 0
                ? "Steady scenario (0% improvement per year)"
                  : answers.question3 === 0.01
                ? "Continued investment (1% improvement per year)"
                : answers.question3 === 0.02
                ? "Massive investment (2% improvement per year)"
                : answers.question3 === 0.03
                ? "Super massive investments (3% improvement per year)"
                : "Super massive investments (3% improvement per year)"}
            </div>
          </div>
          <button className="submit-button" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default KayaQuizForm;
