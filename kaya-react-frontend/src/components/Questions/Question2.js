import "./Question.css";
import GDP from "../../assets/GDPperPerson.png";

function Question2() {
  return (
    <div className="question">
      <p><u>2. GDP per person (inflation adjusted)</u></p>
      <p>
        How much do you think GDP per person trajectory will lead us to by 2050?
        Current world GDP per person is roughly 12'500 USD, in 2050 GDP per
        person will be:
        <ul>
          <li>9'700 USD with minus 1% per year</li>
          <li>16'000 USD with +1% growth per year</li>
          <li>
            20'000 USD with +2% growth per year (since WW2 it has been roughly
            2% per year)
          </li>
          <li>26'000 USD with +3% growth per year</li>
        </ul>
      </p>
      <img src={GDP} alt="GDP per person" />
    </div>
  );
}

export default Question2;
