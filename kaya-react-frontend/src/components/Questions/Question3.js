import "./Question.css";
import { Trans } from "react-i18next";
import co2 from "../../assets/co2-gdp-growth.png";
import growth_old from "../../assets/co2-gdp-growth-old.png";
import { useModal } from "../ModalContext/ModalContext";

function Question3() {
  const { openModal } = useModal();

  return (
    <div className="question-pairs">
      <h3 className="question-title">
        <Trans i18nKey="Q3Title" />
      </h3>

      <div className="question-row">
        <div className="text-block">
          <p><Trans i18nKey="Q3_1" /></p>
        </div>
        <div className="image-block">
          <img
            src={growth_old}
            alt="Growth vs carbon"
            onClick={() => openModal(growth_old)}
          />
        </div>
      </div>

      <div className="question-row">
        <div className="text-block">
          <p><Trans i18nKey="Q3_2" /></p>
        </div>
        <div className="image-block">
          <img
            src={co2}
            alt="CO2 emissions"
            onClick={() => openModal(co2)}
          />
        </div>
      </div>
    </div>
  );
}

export default Question3;
