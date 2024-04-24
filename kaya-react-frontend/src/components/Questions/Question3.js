import "./Question.css";
import { useTranslation, Trans } from 'react-i18next';
import co2 from "../../assets/co2-gdp-growth.png";
import growth_old from "../../assets/co2-gdp-growth-old.png";

function Question3() {
  useTranslation();
  return (
    <div className="question">
      <Trans i18nKey="Q3Title"/>
      <Trans i18nKey="Q3_1"/>
      <img src={growth_old} alt="Growth vs carbon"/>
      <Trans i18nKey="Q3_2"/>
      <img src={co2} alt="CO2" />
    </div>
  );
}

export default Question3;