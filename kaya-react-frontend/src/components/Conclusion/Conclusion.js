import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Conclusion.css";

const Conclusion = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Goodbye, " + email + "!");
    setSubmitted(true); // Set submitted state to true after form submission

    // push the email to the backend
    try {
      await fetch("/api/submitEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"email":"' + email + '"}',
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  // Render thank you message if form is submitted
  if (submitted) {
    return (
      <div>
        <p className="title">Thank you for playing along !</p>
        <p>
          We're eager to hear your feedback - be in touch on our Instagram !
        </p>
        <div>
          <button className="submit-button" type="button" onClick={handleClick}>
            Take me back
          </button>
        </div>
      </div>
    );
  }

  // Render email form if form is not submitted
  return (
    <div className="email-input">
      <p className="title">Keep me posted !</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
          className="email-input"
          placeholder="Enter your email here"
        />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      <div>
        <button className="submit-button" type="button" onClick={handleClick}>
          Let me play again !
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
