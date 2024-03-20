// About.js
import React from "react";
import ssp245 from "../../assets/Ssp245.png";
import ssp245Temperatures from "../../assets/Ssp245-1.png";

const Results245 = () => {
  return (
    <div>
      <p>
        The output of your answers leads to a pathway that is closest to the
        yellow one (SSP2-4.5) that should limit global warming to below +3°C
        with a 50% likelihood.
      </p>
      <p>
        We can already see the consequences global warming is having (+1.2°C) vs
        the preindustrial era. We have already experienced unprecedented
        heatwaves with temperatures in Paris, London and New York breaking all
        time highs (40+°C). The disruption of the water cycle has already led to
        a delayed monsoon season in India (putting many lives at risk). It has
        also lead to disrupting trade as some rivers have dried up in Europe in
        summer (Rhin, Loire) and created significant issues in the panama canal
        disrupting global trade. We have also lived through large scale wildfire
        in Canada, Australia and the Mediterranean liberating significant
        amounts of CO2 back into the atmosphere.
      </p>
      <p>
        Expect these type of events to become more frequent and stronger even on
        this pathway. On this pathway CO2 Emissions drop slowly but negative
        effects do not disappear.
      </p>
      <img src={ssp245} alt="ssp2-4.5" />
      <p>
        The average temperature on earth 10 thousand years ago was roughly 5°C
        colder than the pre-industrial era. Most of Canada, the UK and France
        where covered under several kilometres of ice. Ocean levels where more
        than 100 metres lower (the UK was part of continental Europe). +3°C
        increase in temperatures will happen over a very short period of time
        (geologically speaking) leaving little time for adaptation to most
        species on earth. Here you can see the change expected average
        temperature on earth.{" "}
      </p>
      <img src={ssp245Temperatures} alt="ssp2 4.5 degrees" />
      <p>
        A few important points are worth highlighting: - temperatures on land
        rise much faster than the average surface temperature of the globe as
        ocean temperatures (that cover 3/4 of the earth surface) have much more
        thermal inertia - expect very frequent heatwaves and longer period of
        drought in numerous regions - it is very possible to have higher average
        temperatures than the mean +2.7°C in 2100, even on this pathway we could
        reach +3.5°C in some scenarios.
      </p>
    </div>
  );
};

export default Results245;
