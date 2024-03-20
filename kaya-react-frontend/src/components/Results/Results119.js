// About.js
import React from "react";
import "./Results.css"; // Importing external stylesheet for component-specific styles
import ssp12 from "../../assets/Ssp1+2.png";
import ssp122 from "../../assets/Ssp1+2-2.png";
import IntroResults from "./IntroResults";

const Results119 = () => {
  return (
    <div className="results">
      <h2>Results</h2>
      <div className="results">
        <IntroResults/>        
        <p> To be in line with the
        Paris Climate accord global emissions need to be divided by a factor of
        3 by 2050 (to roughly 15 GT per annum) and continue to decline and even
        become negative after that. The output of your answers leads to a
        pathway that is closest to the dark blue one (SSP1-2.6) that should
        limit global warming to below +2C with a 50% likelihood. We can already
        see the consequences global warming is having (+1.2C) vs the
        preindustrial era. We have already experienced unprecedented heatwaves
        with temperatures in Paris, London and New York breaking all time highs
        (40+C). The disruption of the water cycle has already led to a delayed
        monsoon season in India (putting many lives at risk). It has also lead
        to disrupting trade as some rivers have dried up in Europe in summer
        (Rhin, Loire) and created significant issues in the panama canal
        disrupting global trade. We have also lived through large scale wildfire
        in Canada, Australia and the Mediterranean liberating significant
        amounts of CO2 back into the atmosphere. Expect these type of events to
        become more frequent and stronger. Longer periods of drought, stronger
        hurricanes declining agricultural yields. On this pathway CO2 Emissions
        drop slowly but negative effects do not disappear.
        </p>
        <img src={ssp12} alt="ssp12" />
        The average temperature on earth 10 thousand years ago was roughly 5C
        colder than the pre-industrial era. Most of Canada, the UK and France
        where covered under several kilometres of ice. Ocean levels where more
        than 100 metres lower (the UK was part of continental Europe). +2C
        increase in temperatures will happen over a very short period of time
        (geologically speaking) leaving little time for adaptation to most
        species on earth. Here you can see the change expected average
        temperature on earth.
        <img src={ssp122} alt="ssp122" />A few important points are worth
        highlighting: - temperatures on land rise much faster than the average
        surface temperature of the globe as ocean temperatures (that cover 3/4
        of the earth surface) have much more thermal inertia - expect more
        frequent heatwaves and longer period of drought in numerous regions - it
        is very possible to have higher average temperatures than the mean +1.8C
        in 2100, even on this pathway we could reach +2.4C or more in some
        scenarios.
      </div>
    </div>
  );
};

export default Results119;
