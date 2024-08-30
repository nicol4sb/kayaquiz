import React, { useState } from "react";
import IntroResults from "./IntroResults";
import Results119 from "./Results119";
import Results126 from "./Results126";
import Results245 from "./Results245";
import Results370 from "./Results370";
import Results585 from "./Results585";
import LinkedinButton from "../SocialMediaSharing/SocialSharing";
import { useNavigate } from "react-router-dom";

const Results = () => {
  let ComponentToRender;
  var calculatedSSP = localStorage.getItem("calculatedSSP");
  if (calculatedSSP === "+1.5°C (SSP 1-1.9)") {
    ComponentToRender = Results119;
  } else if (calculatedSSP === "+2°C (SSP 1-2.6)") {
    ComponentToRender = Results126;
  } else if (calculatedSSP === "+3°C (SSP 2-4.5)") {
    ComponentToRender = Results245;
  } else if (calculatedSSP === "+4°C (SSP 3-7.0)") {
    ComponentToRender = Results370;
  } else if (calculatedSSP === "+5°C (SSP 5-8.5)") {
    ComponentToRender = Results585;
  }

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
  };

  const handleClick = () => {
    console.log("On to the conclusion");
    navigate("/conclusion");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="results">
      <h2>Results</h2>
      <div>
        <IntroResults />
        {ComponentToRender && <ComponentToRender openModal={openModal} />}
      </div>
      <div>
        <LinkedinButton />
      </div>
      <div>
        <button className="submit-button" type="submit" onClick={handleGoBack}>
          Take me back !
        </button>
      </div>
      <div>
        <button className="submit-button" type="submit" onClick={handleClick}>
          Next !
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-container" onClick={closeModal}>
          <img src={modalImage} alt="Enlarged view" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Results;
