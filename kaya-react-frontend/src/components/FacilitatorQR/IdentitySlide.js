import React from "react";
import consequences_1 from "../../assets/consequences_1.png";
import consequences_2 from "../../assets/consequences_2.png";

function IdentitySlide() {
  return (
    <div className="slide">
      <img src={consequences_1} alt="consequences_1" className="equation-image" />
      <img src={consequences_2} alt="consequences_2" className="equation-image" />
    </div>
  );
}

export default IdentitySlide;
