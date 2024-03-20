import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      await fetch("/submitEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: '{"email":"'+ email+'"}',
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
        <p>Thank you for your submission!</p>
        <p>Wait, I want to try again !</p>
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
    <div>
      <p>Let me know what's new on Kayaquiz.com !</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <p>Wait, I want to try again !</p>
      <div>
        <button className="submit-button" type="button" onClick={handleClick}>
          Take me back
        </button>
      </div>
    </div>
  );
};

export default Conclusion;
