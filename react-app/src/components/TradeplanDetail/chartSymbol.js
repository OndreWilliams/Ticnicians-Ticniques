
const chartSymbol = (id) => {
  switch (id) {
    case 1:
      return "USDJPY";
    case 2:
      return "USDCHF";
    case 3:
      return "USDCAD";
    case 4:
      return "EURUSD";
    case 5:
      return "GBPUSD";
    case 6:
      return "AUDUSD";
    case 7:
      return "NZDUSD";
    default:
      return "USDJPY";
  }
};

export default chartSymbol;
