import "./IntroParagraph.css";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

function IntroParagraph() {
  const { t } = useTranslation();

  return (
    <div className="intro-paragraph">
      <LanguageSwitcher />
      <p className="title">{t("IntroTitle")}</p>
      <p>{t("IntroParagraph1")}</p>
      <p>{t("IntroParagraph2")}</p>
    </div>
  );
}

export default IntroParagraph;
