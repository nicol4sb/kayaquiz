import "./Question.css";
import co2 from "../../assets/co2-gdp-growth.png";

function Question3() {
  return (
    <div className="question">
      <p>3. Decarbonisation efforts</p>
      The world economy burns a lot of fossil fuels (Oil, Gas, Coal). Since we
      primarily use fossil fuels to build things, transport things, grow things,
      produce electricity and heat/cool homes economic activity and CO2
      emissions are strongly linked. There have been efforts to decarbonize the
      world economy (i.e. to reduce our consumption of fossil fuels for some
      activities). Over the last few decades the decarbonisation effort has been
      on average about 1.5% per annum for the world economy (world growth is
      1.5% higher than emissions growth). How do you think this evolve until
      2050?
      <img src={co2} alt="CO2" />
    </div>
  );
}

export default Question3;
