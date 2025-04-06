import React, { useState, useEffect } from "react";
import "./Form.css";
import Question1 from "../Questions/Question1";
import Question2 from "../Questions/Question2";
import Question3 from "../Questions/Question3";
import IntroParagraph from "../IntroParagraph/IntroParagraph";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import { useSwipeable } from "react-swipeable";

function KayaQuizForm({ facilitatorId, sessionId, sessionType }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const storedAnswers = JSON.parse(localStorage.getItem("answers")) || {
    question1: "",
    question2: "",
    question3: "",
  };

  const [answers, setAnswers] = useState(storedAnswers);

  const handleAnswerChange = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const handleSubmit = async () => {
    const { question1, question2, question3 } = answers;
    if (!question1 || !question2 || question3 === "") {
      alert(t("alertMissingFields"));
      return;
    }

    const language = localStorage.getItem("i18nextLng") || "en";
    const submissionData = {
      ...answers,
      language,
      facilitator_id: facilitatorId,
      session_id: sessionId,
      session_type: sessionType,
    };

    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        const serverResponse = await response.json();
        localStorage.setItem("CO2Tons", serverResponse.CO2Tons);
        localStorage.setItem("calculatedSSP", serverResponse.calculatedSSP);
        navigate("/results", { state: { ans: answers } });
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const swipeHandlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      if (eventData.event.target.tagName !== "INPUT") nextStep();
    },
    onSwipedRight: (eventData) => {
      if (eventData.event.target.tagName !== "INPUT") prevStep();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="step-slide">
            <IntroParagraph />
            <div className="nav-buttons center-nav">
              <button className="start-big-button" onClick={nextStep}>
                🚀 {t("start", "Start your journey")}
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="step-slide">
            <Question1 />
            <div style={{ minHeight: "1.5rem", textAlign: "center" }}>
              <Trans i18nKey="Q1Slider" values={{ value: answers.question1 }} />
            </div>
            <div className="slider-container">
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
            <div className="nav-buttons">
              <button onClick={prevStep}>←</button>
              <button onClick={nextStep} disabled={!answers.question1}>
                →
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-slide">
            <Question2 />
            <div style={{ minHeight: "1.5rem", textAlign: "center" }}>
              <Trans i18nKey="Q2Slider" /> {answers.question2} USD
            </div>
            <div className="slider-container">
              <input
                type="range"
                value={answers.question2}
                min="8000"
                max="30000"
                step="100"
                onChange={(e) =>
                  handleAnswerChange("question2", parseFloat(e.target.value))
                }
              />
            </div>
            <div className="nav-buttons">
              <button onClick={prevStep}>←</button>
              <button onClick={nextStep} disabled={!answers.question2}>
                →
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-slide">
            <Question3 />
            <div style={{ minHeight: "1.5rem", textAlign: "center" }}>
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
            </div>
            <div className="slider-container">
              <input
                type="range"
                value={answers.question3}
                min="-0.02"
                max="0.04"
                step="0.001"
                onChange={(e) =>
                  handleAnswerChange("question3", parseFloat(e.target.value))
                }
              />
            </div>
            <div className="nav-buttons">
              <button onClick={prevStep}>←</button>
              <button
                onClick={handleSubmit}
                disabled={answers.question3 === ""}
              >
                ✔ {t("submit")}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="content-container" {...swipeHandlers}>
      {renderStep()}
    </div>
  );
}

export default KayaQuizForm;
