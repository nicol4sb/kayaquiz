import React from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div class="flags-container">
      <button onClick={() => changeLanguage("en")}>🇬🇧</button>
      <button onClick={() => changeLanguage("fr")}>🇫🇷</button>
      <button onClick={() => changeLanguage("de")}>🇩🇪</button>
    </div>
  );
}

export default LanguageSwitcher;
