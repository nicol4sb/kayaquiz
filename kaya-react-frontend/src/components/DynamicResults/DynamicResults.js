import React from "react";
import { Trans } from "react-i18next";

// Dynamically import all images starting with "SSP"
const images = {};
const importAll = (r) => {
  r.keys().forEach((key) => (images[key.replace("./", "")] = r(key)));
};
importAll(require.context("../../assets", false, /SSP.*\.(png|jpe?g|svg)$/));

const generateSspMapping = () => {
  const sspMapping = {};

  Object.keys(images).forEach((filename) => {
    // Match any filenames like SSP119, SSP245, etc.
    const match = filename.match(/(SSP\d+)/);

    if (match) {
      const sspKey = match[1];

      if (!sspMapping[sspKey]) {
        sspMapping[sspKey] = {
          component: `Results${sspKey}`,
          data: {
            images: [],
            texts: [sspKey, `${sspKey}_1`, `${sspKey}_2`],
          },
        };
      }

      const imageKey = filename.includes("-1") ? "temperatures" : "main";
      sspMapping[sspKey].data.images.push({
        src: images[filename],
        alt: `${sspKey}, ${imageKey}`,
      });
    }
  });

  return sspMapping;
};

const sspMapping = generateSspMapping();

const DynamicResults = ({ openModal, calculatedSSP }) => {
  const sspData = sspMapping[calculatedSSP]?.data;

  if (!sspData) {
    console.error(`No data available for the selected SSP: ${calculatedSSP}`);
    return <p>No data available for the selected SSP: {calculatedSSP}</p>;
  }

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

export default DynamicResults;
