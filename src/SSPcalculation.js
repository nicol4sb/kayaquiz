function calculateSSPScenario(int1, int2, int3) {
  const co2InTonsIn2050 = int1 * int2 * Math.pow(1 - int3, 25) * 40; // CO2 prod in Gt in 2050

  let scenarioCode;
  if (co2InTonsIn2050 < 10) {
    scenarioCode = "119";
  } else if (co2InTonsIn2050 < 30) {
    scenarioCode = "126";
  } else if (co2InTonsIn2050 < 50) {
    scenarioCode = "245";
  } else if (co2InTonsIn2050 < 70) {
    scenarioCode = "460";
  } else {
    scenarioCode = "580";
  }

  return [parseInt(co2InTonsIn2050), scenarioCode];
}

// Export functions
module.exports = {
  calculateSSPScenario,
};
