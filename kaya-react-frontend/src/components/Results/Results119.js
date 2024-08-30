import React from "react";
import ssp119 from "../../assets/Ssp119.png";
import ssp119Temperatures from "../../assets/Ssp119-1.png";
import { useTranslation, Trans } from "react-i18next";

const Results119 = ({ openModal }) => {
  const { t } = useTranslation();

  const sspData = {
    images: [
      { src: ssp119, alt: "ssp1-1.9" },
      { src: ssp119Temperatures, alt: "ssp1-1.9, temperatures" },
    ],
    texts: ["SSP19", "SSP19_1", "SSP19_2"],
  };

  return (
    <div className="results">
      <p>
        <Trans i18nKey={sspData.texts[0]} />
      </p>

      {sspData.images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          style={{ cursor: "pointer" }}
          onClick={() => openModal(image.src)}
        />
      ))}

      <p>
        <Trans i18nKey={sspData.texts[1]} />
      </p>

      <p>
        <Trans i18nKey={sspData.texts[2]} />{" "}
      </p>
    </div>
  );
};

export default Results119;
