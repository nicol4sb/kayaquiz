function calculateSSPScenario(int1, int2, int3) {
  const co2InTonsIn2050 = int1/8 * int2/12500 * Math.pow(1 - int3, 25) * 40; // int1 = pop in absolute. int2 = income in absolute
  
  let scenarioCode;
  if (co2InTonsIn2050 < 10) {
    scenarioCode = "SSP119";
  } else if (co2InTonsIn2050 < 30) {
    scenarioCode = "SSP126";
  } else if (co2InTonsIn2050 < 50) {
    scenarioCode = "SSP245";
  } else if (co2InTonsIn2050 < 70) {
    scenarioCode = "SSP370";
  } else {
    scenarioCode = "SSP585";
  }

  return [parseInt(co2InTonsIn2050), scenarioCode];
}

// Export functions
module.exports = {
  calculateSSPScenario,
};
