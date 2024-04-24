import "./Question.css";
import projections from "../../assets/PROJECTIONS-95-hi-lo-rec_0.png";
import { useTranslation, Trans } from 'react-i18next';

function Question1() {
  useTranslation();
  return (
    <div className="question">
      <Trans i18nKey="Q1Title"/>
      <Trans i18nKey="Q1"/>
      <img src={projections} alt="CO2" />
    </div>
  );
}

export default Question1;
