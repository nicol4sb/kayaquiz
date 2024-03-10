import React, { useState, useEffect } from "react";
import "./Form.css"; // Importing external stylesheet for component-specific styles
import Question1 from "../Questions/Question1";
import Question2 from "../Questions/Question2";
import Question3 from "../Questions/Question3";
import IntroParagraph from "../IntroParagraph/IntroParagraph";
import { useNavigate } from "react-router-dom";

function KayaQuizForm() {
  const [answers, setAnswers] = useState({
    question1: localStorage.getItem("question1LocalStorage"),
    question2: localStorage.getItem("question2LocalStorage"),
    question3: localStorage.getItem("question3LocalStorage"),
  });

  const handleAnswerChange = (question, value) => {
    setAnswers({ ...answers, [question]: value });
  };

  // Update localStorage when answers is changed
  useEffect(() => {
    localStorage.setItem("question1LocalStorage", answers.question1);
    localStorage.setItem("question2LocalStorage", answers.question2);
    localStorage.setItem("question3LocalStorage", answers.question3);
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
        navigate("/results", { state: { id: 1, ans: answers } });
        console.log("Form submitted successfully!");
        console.debug("Q1 results :  " + answers.question1);
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="form-container">
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
                checked={answers.question1 === "option1"}
                onChange={() => handleAnswerChange("question1", "option1")}
              />
              Much less than projections (8 billions)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question1 === "option2"}
                onChange={() => handleAnswerChange("question1", "option2")}
              />
              In line with projections (10 billions)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question1 === "option3"}
                onChange={() => handleAnswerChange("question1", "option3")}
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
                checked={answers.question2 === "option1"}
                onChange={() => handleAnswerChange("question2", "option1")}
              />
              Below 10'000 USD (on average people are poorer)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question2 === "option2"}
                onChange={() => handleAnswerChange("question2", "option2")}
              />
              Around 15'000 USD (on average people are a bit richer)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question2 === "option3"}
                onChange={() => handleAnswerChange("question2", "option3")}
              />
              Around 20'000 USD (on average people are fairly richer)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question2 === "option4"}
                onChange={() => handleAnswerChange("question2", "option4")}
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
                checked={answers.question3 === "option1"}
                onChange={() => handleAnswerChange("question3", "option1")}
              />
              Super massive investments to decarbonize (3% improvement per year)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question3 === "option2"}
                onChange={() => handleAnswerChange("question3", "option2")}
              />
              Massive investment to decarbonize (2% improvement per year)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question3 === "option3"}
                onChange={() => handleAnswerChange("question3", "option3")}
              />
              Continued investment to decarbonize (1% improvement per year)
            </label>
            <label>
              <input
                type="radio"
                checked={answers.question3 === "option4"}
                onChange={() => handleAnswerChange("question3", "option4")}
              />
              We revert back to coal as oil reserves run low (1% deterioration
              per year)
            </label>
          </div>
        </div>

        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default KayaQuizForm;
