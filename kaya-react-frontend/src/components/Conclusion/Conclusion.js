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
      <p className="title">
        Thanks for taking <br />
        the Kayaquiz
      </p>
      <p>
        Most people agree that climate change is an issue that urgently needs to
        be adressed. The aim of the KayaQuiz is to start quantifying the
        trade-offs that we collectively need to implement to avoid the worst
        outcomes.
      </p>
      <div>
        <button className="submit-button" type="button" onClick={handleClick}>
          Keep playing
        </button>
      </div>
      <div>
        <br />
        <br />
        <br />
        <p>
          Learn more about the <a href="https://en.wikipedia.org/wiki/Kaya_identity">Kaya Identity</a>?
          <br />
          Read more in the <a href="https://www.ipcc.ch/report/ar6/wg2/">IPCC summary</a>
          <br/>
          Participate in a <a href="https://climatefresk.org/world/">Climate Fresk</a> (to learn
          about the science in a fun way)
        </p>
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
      </div>
    </div>
  );
};

export default Conclusion;
