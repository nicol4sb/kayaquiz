import "./Question.css";
import { Trans } from 'react-i18next';
import co2 from "../../assets/co2-gdp-growth.png";
import growth_old from "../../assets/co2-gdp-growth-old.png";
import { useModal } from "../ModalContext/ModalContext"; // Import the useModal hook

function Question3() {
  const { openModal } = useModal(); // Use the modal context
  return (
    <div className="question">
      <Trans i18nKey="Q3Title" />
      <Trans i18nKey="Q3_1" />
      <img
        src={growth_old}
        alt="Growth vs carbon"
        onClick={() => openModal(growth_old)} // Opens the modal on click
        style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
      />
      <Trans i18nKey="Q3_2" />
      <img
        src={co2}
        alt="CO2"
        onClick={() => openModal(co2)} // Opens the modal on click
        style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
      />
    </div>
  );
}

export default Question3;
