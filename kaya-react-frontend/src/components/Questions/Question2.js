import "./Question.css";
import { Trans } from 'react-i18next';
import GDP from "../../assets/GDPperPerson.png";
import { useModal } from "../ModalContext/ModalContext"; // Import the useModal hook

function Question2() {
  const { openModal } = useModal(); // Use the modal context
  return (
    <div className="question">
      <Trans i18nKey="Q2Title" />
      <Trans i18nKey="Q2" />
      <img
        src={GDP}
        alt="GDP per person"
        onClick={() => openModal(GDP)} // Opens the modal on click
        style={{ cursor: "pointer" }} // Change cursor to pointer to indicate it's clickable
      />
    </div>
  );
}

export default Question2;
