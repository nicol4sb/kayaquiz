import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="flags-container">
      <button onClick={() => changeLanguage("en")}>🇬🇧</button>
      <button onClick={() => changeLanguage("fr")}>🇫🇷</button>
      <button onClick={() => changeLanguage("de")}>🇩🇪</button>
      <button onClick={() => changeLanguage("es")}>🇪🇸</button> {/* Spanish flag button */}
      <button onClick={() => changeLanguage("pt")}>🇵🇹</button> {/* Added Portuguese flag button */}
    </div>
  );
}

export default LanguageSwitcher;
