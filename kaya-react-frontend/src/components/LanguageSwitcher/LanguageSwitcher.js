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
      <button onClick={() => changeLanguage("cz")}>🇨🇿</button> {/* Czech flag */}
      <button onClick={() => changeLanguage("es")}>🇪🇸</button> {/* Spanish flag */}
      <button onClick={() => changeLanguage("pt")}>🇵🇹</button> {/* Portuguese flag */}
    </div>
  );
}

export default LanguageSwitcher;
