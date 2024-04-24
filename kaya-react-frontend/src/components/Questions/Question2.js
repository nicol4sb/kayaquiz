import "./Question.css";
import { useTranslation, Trans } from 'react-i18next';
import GDP from "../../assets/GDPperPerson.png";

function Question2() {
  useTranslation();
  return (
    <div className="question">
      <Trans i18nKey="Q2Title"/>
      <Trans i18nKey="Q2"/>
      <img src={GDP} alt="GDP per person" />
    </div>
  );
}

export default Question2;
