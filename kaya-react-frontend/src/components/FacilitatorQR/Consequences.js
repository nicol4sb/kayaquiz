import React from "react";
import consequences_1 from "../../assets/consequences_1.png";
import consequences_2 from "../../assets/consequences_2.png";

// First slide with the first image
function Consequences1() {
  return (
    <div className="slide">
      <img src={consequences_1} alt="consequences_1" className="equation-image" />
    </div>
  );
}

// Second slide with the second image
function Consequences2() {
  return (
    <div className="slide">
      <img src={consequences_2} alt="consequences_2" className="equation-image" />
    </div>
  );
}

export { Consequences1, Consequences2 };
