import "./Question.css";
import co2 from "../../assets/co2-gdp-growth.png";

function Question3() {
  return (
    <div className="question">
      <p>3. Decarbonization speed - CO2/GDP</p>
      <p>
        Do you think global economies will become more or less CO2 intensive? If
        so, by how much per annum? Do you think the world average CO2 intensity
        of GDP will decrease (or increase)?
      </p>
      <p>
        High CO2 emissions for low economic output are for example burning coal
        to heat poorly isolated homes. This activity would lead to higher carbon
        intensity of GDP (negative number - negative environmental impact).
      </p>
      <p>
        Low CO2 emissions for high economic output are for example using
        renewable energies to produce high value medication. This activity would
        lead to lower carbon intensity of GDP (positive number - less negative
        environmental impact).
      </p>
      <p>
        A positive number means CO2 emissions globally drop for every unit of
        GDP (i.e. economies are less carbon intensive). For your reference
        historical trends are available below.
      </p>
      <p>
        Over the last few decades the yearly improvement has been +1.5% per
        annum. The last 10 years have seen a slight improvement at +2%.
      </p>
      <img src={co2} alt="CO2" />
    </div>
  );
}

export default Question3;
