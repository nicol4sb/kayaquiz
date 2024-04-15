function calculateSSPScenario(int1, int2, int3) {
  const co2InTonsIn2050 = int1/8 * int2/12500 * Math.pow(1 - int3, 25) * 40; // int1 = pop in absolute. int2 = income in absolute
  
  let scenarioCode;
  if (co2InTonsIn2050 < 10) {
    scenarioCode = "+1.5°C (SSP 1-1.9)";
  } else if (co2InTonsIn2050 < 30) {
    scenarioCode = "+2°C (SSP 1-2.6)";
  } else if (co2InTonsIn2050 < 50) {
    scenarioCode = "+3°C (SSP 2-4.5)";
  } else if (co2InTonsIn2050 < 70) {
    scenarioCode = "+4°C (SSP 3-7.0)";
  } else {
    scenarioCode = "+5°C (SSP 5-8.5)";
  }

  return [parseInt(co2InTonsIn2050), scenarioCode];
}

// Export functions
module.exports = {
  calculateSSPScenario,
};
