import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Conclusion.css";
import { useTranslation, Trans } from "react-i18next";

const Conclusion = () => {
  const { t } = useTranslation(); // Use the t function for translation
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`${t("goodbyeMessage")}, ${email}!`); // Translated goodbye message
    setSubmitted(true);

    try {
      await fetch("/api/submitEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Use JSON.stringify to create the body
      });
    } catch (error) {
      console.error(t("submitError"), error); // Translated error message
    }
  };

  const handleClick = () => {
    navigate("/");
  };

  if (submitted) {
    return (
      <div className="content-container">
        <p className="title">{t("thankYouMessage")}</p>
        <p>{t("feedbackPrompt")}</p>
        <div>
          <button className="submit-button" type="button" onClick={handleClick}>
            {t("keepPlayingButton")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <p className="title">
        <Trans i18nKey="conclusionTitle" />
      </p>
      <p>
        <Trans i18nKey="conclusion" />
      </p>
      <div>
        <button className="submit-button" type="button" onClick={handleClick}>
          <Trans i18nKey="keepPlayingButton" />
        </button>
      </div>
      <div>
        <br />
        <br />
        <br />
        <Trans i18nKey="moreLinks">
          Learn more about the
          <a
            href="https://en.wikipedia.org/wiki/Kaya_identity"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kaya Identity
          </a>
          ? Read more in the
          <a
            href="https://www.ipcc.ch/report/ar6/wg2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            IPCC summary
          </a>
          . Participate in a
          <a
            href="https://climatefresk.org/world/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Climate Fresk
          </a>
          (to learn about the science in a fun way).
        </Trans>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">{t("emailLabel")}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
            className="email-input"
            placeholder={"email"} // Translated placeholder
          />
          <button type="submit" className="submit-button">
            {t("submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Conclusion;
