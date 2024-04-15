import "./Question.css";
import projections from "../../assets/PROJECTIONS-95-hi-lo-rec_0.png";
function Question1() {
  return (
    <div className="question">
      <p>1. World Population?</p>
      <p>What do you believe the world population in 2050 will be?</p>
      <p>Current world population is estimated at 8 billion people.</p>
      <p>
        UN projections are for the world population to be between 9.4b and 10.1b
        in 2050
      </p>
      <img src={projections} alt="CO2" />
    </div>
  );
}

export default Question1;
