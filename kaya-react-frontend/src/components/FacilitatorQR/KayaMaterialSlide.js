import React, { useState, useEffect } from "react";
import "./KayaMaterialSlide.css";

const KayaMaterialSlide = () => {
  const [fileLinks, setFileLinks] = useState([]);

  useEffect(() => {
    // Fetch file list from the backend API
    fetch("/api/kaya_materials")
      .then((response) => response.json())
      .then((data) => setFileLinks(data))
      .catch((error) => console.error("Error loading materials:", error));
  }, []);

  // Helper function to determine if a file is an image
  const isImageFile = (fileName) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
    return imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  };

  return (
    <div className="slide">
      <h2>Kaya Materials</h2>
      <div className="material-list">
        {fileLinks.map((file, index) => (
          <div className="material-item" key={index}>
            {isImageFile(file.url) ? (
              // Render image as a clickable thumbnail
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                <img src={file.url} alt={file.name} className="thumbnail" />
              </a>
            ) : (
              // Render non-image files as styled links
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="file-link">
                {file.name}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KayaMaterialSlide;
