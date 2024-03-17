function calculateSSPScenario(int1, int2, int3) {
  const co2InTonsIn2050 = int1 * int2 * Math.pow(1 - int3, 25) * 40; // CO2 prod in Gt in 2050

  if (co2InTonsIn2050 < 10) return "119";
  if (co2InTonsIn2050 < 30) return "126";
  if (co2InTonsIn2050 < 50) return "245";
  if (co2InTonsIn2050 < 70) return "460";
  return "580";
}

// Export functions
module.exports = {
  calculateSSPScenario,
};
