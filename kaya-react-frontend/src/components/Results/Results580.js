// About.js
import React from "react";
import ssp580 from "../../assets/Ssp580.png";
import ssp580Temperatures from "../../assets/Ssp580-1.png";

const Results580 = () => {
  return (
    <div className="results">
      <p>
        The output of your answers leads to a pathway that is closest to the
        dark red one (SSP5-8.5) that should not be able limit global warming to
        below +4C/+5C.
      </p>
      <p>
        We can already see the consequences global warming is having (+1.2C) vs
        the preindustrial era. We have already experienced unprecedented
        heatwaves with temperatures in Paris, London and New York breaking all
        time highs (40+C). The disruption of the water cycle has already led to
        a delayed monsoon season in India (putting many lives at risk). It has
        also lead to disrupting trade as some rivers have dried up in Europe in
        summer (Rhin, Loire) and created significant issues in the panama canal
        disrupting global trade.
      </p>
      <p>
        We have also lived through large scale wildfire in Canada, Australia and
        the Mediterranean liberating significant amounts of CO2 back into the
        atmosphere. Expect these type of events to become more frequent and
        stronger even on this pathway. On this pathway CO2 Emissions drop slowly
        but negative effects do not disappear.
      </p>
      <img src={ssp580} alt="SSP 5 8.0" />
      <p>
        The average temperature on earth 10 thousand years ago was roughly 5C
        colder than the pre-industrial era. Most of Canada, the UK and France
        where covered under several kilometres of ice. Ocean levels where more
        than 100 metres lower (the UK was part of continental Europe). +4C/+5C
        increase in temperatures will happen over a very short period of time
        (geologically speaking) leaving little time for adaptation to most
        species on earth. Here you can see the change expected average
        temperature on earth.
      </p>
      <img src={ssp580Temperatures} alt="SSP 5 -8.0" />
      <p>
        A few important points are worth highlighting: - temperatures on land
        rise much faster than the average surface temperature of the globe as
        ocean temperatures (that cover 3/4 of the earth surface) have much more
        thermal inertia - the climate becomes very unpredictable with feedback
        loops that exacerbate climate disruption notably the permafrost melting
        and gulfstream collapse - it is very possible to have higher average
        temperatures than the mean +4.4C in 2100, even on this pathway we could
        reach +5.7C or more in some scenarios.
      </p>
    </div>
  );
};

export default Results580;
