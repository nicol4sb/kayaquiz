import React, { useState, useEffect } from "react";
import "./Form.css"; // Importing external stylesheet for component-specific styles
import Question1 from "../Questions/Question1";
import Question2 from "../Questions/Question2";
import Question3 from "../Questions/Question3";
import IntroParagraph from "../IntroParagraph/IntroParagraph";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

function KayaQuizForm() {
  const { t } = useTranslation();
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

    // Check if all sliders have been touched
    if (!answers.question1 || !answers.question2 || answers.question3 === "") {
        alert(t("alertMissingFields"));
        return; // Stop the form submission
    }

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
            <p>
              <Trans i18nKey="Q1Slider" values={{ value: answers.question1 }} />{" "}
            </p>
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
          </div>
        </div>

        <div className="option-container">
          <p>
            <Question2 />
          </p>
          <div>
            <div>
              <Trans i18nKey="Q2Slider" /> {answers.question2} USD
            </div>
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
          </div>
        </div>

        <div>
          <p>
            <Question3 />
          </p>
          <div className="option-container">
            <div>
              {/* Displaying a descriptive label based on the value could improve UX */}
              {answers.question3 <= 0.0
                ? Number((answers.question3 * 100).toFixed(2)) + t("Q3Slider1")
                : answers.question3 > 0 && answers.question3 <= 0.005
                ? Number((answers.question3 * 100).toFixed(2)) + t("Q3Slider2")
                : answers.question3 > 0.005 && answers.question3 <= 0.015
                ? Number((answers.question3 * 100).toFixed(2)) + t("Q3Slider3")
                : answers.question3 > 0.015 && answers.question3 <= 0.025
                ? Number((answers.question3 * 100).toFixed(2)) + t("Q3Slider3")
                : answers.question3 >= 0.025
                ? Number((answers.question3 * 100).toFixed(2)) + t("Q3Slider4")
                : Number((answers.question3 * 100).toFixed(2)) + t("Q3Slider5")}
            </div>{" "}
            <input
              type="range"
              className="slider" // Use this class for any needed CSS styling
              min="-0.02"
              max="0.04"
              step="0.001"
              value={answers.question3}
              onChange={(e) =>
                handleAnswerChange("question3", parseFloat(e.target.value))
              }
            />
          </div>
          <button className="submit-button" type="submit">
            Go !
          </button>
        </div>
      </form>
    </div>
  );
}

export default KayaQuizForm;
