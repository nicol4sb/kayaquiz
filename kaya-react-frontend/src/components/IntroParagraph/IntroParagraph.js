import "./IntroParagraph.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function IntroParagraph() {
  const { t } = useTranslation();

  return (
    <div className="intro-paragraph">
      <div className="intro-header">
        <div className="spacer" /> {/* Pushes flags to the right */}
        <LanguageSwitcher />
      </div>
      <p className="title">{t("IntroTitle")}</p>
      <p>{t("IntroParagraph1")}</p>
      <p>{t("IntroParagraph2")}</p>
    </div>
  );
}

export default IntroParagraph;
