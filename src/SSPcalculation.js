function calculateSSPScenario(int1, int2, int3) {
  const co2InTonsIn2050 = int1 * int2 * Math.pow(1 - int3, 25) * 40; // CO2 prod in Gt in 2050

  let scenarioCode;
  if (co2InTonsIn2050 < 10) {
    scenarioCode = "SSP 1-1.9";
  } else if (co2InTonsIn2050 < 30) {
    scenarioCode = "SSP 1-2.6";
  } else if (co2InTonsIn2050 < 50) {
    scenarioCode = "SSP 2-4.5";
  } else if (co2InTonsIn2050 < 70) {
    scenarioCode = "SSP 3-7.0";
  } else {
    scenarioCode = "SSP 5-8.5";
  }

  return [parseInt(co2InTonsIn2050), scenarioCode];
}

// Export functions
module.exports = {
  calculateSSPScenario,
};
