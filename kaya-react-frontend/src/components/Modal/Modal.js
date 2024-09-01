// Modal.js
import React from "react";
import "./Modal.css"; // Ensure your modal-related CSS is in this file

const Modal = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-container" onClick={onClose}>
      <img src={imageSrc} alt="Enlarged view" className="modal-image" />
    </div>
  );
};

export default Modal;