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
      const response = await fetch("/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answers),
      });

      if (response.ok) {
        const serverResponse = await response.json();
        localStorage.setItem("CO2Tons",serverResponse.CO2Tons);
        localStorage.setItem("calculatedSSP",serverResponse.calculatedSSP);
        navigate("/results", {
          state: { ans: answers },
        });
        console.log(
          "Form submitted successfully! - result :: " +
            serverResponse.calculatedSSP +" --- "+serverResponse.CO2Tons
        );
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [slider1Value, setSlider1Value] = useState(50);
  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'slider1':
        setSlider1Value(parseInt(value));
        break;
      default:
        break;
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
            <label>
              <input
                type="radio"
                checked={answers.question1 === 1}
                onChange={() => handleAnswerChange("question1", 1)}
              />
              Much less than projections (8 billions)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question1 === 1.25}
                onChange={() => handleAnswerChange("question1", 1.25)}
              />
              In line with projections (10 billions)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question1 === 1.5}
                onChange={() => handleAnswerChange("question1", 1.5)}
              />
              Much more than projections 12 billions
            </label>
          </div>
        </div>

        <div className="option-container">
          <p>
            <Question2 />
          </p>
          <div>
            <label>
              <input
                type="radio"
                checked={answers.question2 === 0.8}
                onChange={() => handleAnswerChange("question2", 0.8)}
              />
              Below 10'000 USD (on average people are poorer)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question2 === 1.2}
                onChange={() => handleAnswerChange("question2", 1.2)}
              />
              Around 15'000 USD (on average people are a bit richer)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question2 === 1.6}
                onChange={() => handleAnswerChange("question2", 1.6)}
              />
              Around 20'000 USD (on average people are fairly richer)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question2 === 2.4}
                onChange={() => handleAnswerChange("question2", 2.4)}
              />
              Around 30'000 USD (on average people are much richer)
            </label>
          </div>
        </div>

        <div>
          <p>
            <Question3 />
          </p>
          <div className="option-container">
            <label>
              <input
                type="radio"
                checked={answers.question3 === 0.03}
                onChange={() => handleAnswerChange("question3", 0.03)}
              />
              Super massive investments to decarbonize (3% improvement per year)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question3 === 0.02}
                onChange={() => handleAnswerChange("question3", 0.02)}
              />
              Massive investment to decarbonize (2% improvement per year)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question3 === 0.01}
                onChange={() => handleAnswerChange("question3", 0.01)}
              />
              Continued investment to decarbonize (1% improvement per year)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question3 === -0.01}
                onChange={() => handleAnswerChange("question3", -0.01)}
              />
              We revert back to coal as oil reserves run low (1% deterioration
              per year)
            </label>
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
