import React from "react";
import IncomeChart from "../components/incomeCharts";
import SalesOverview from "../components/companyOverview";

const year = {
  label: "year",
  year: {
    1: 120000,
    2: 180000,
    3: 60000,
    4: 120000,
    5: 180000,
    6: 240000,
    7: 216000,
    8: 264000,
    9: 204000,
    10: 300000,
    11: 360000,
    12: 336000,
  },
  month: {},
};

const month = {
  label: "month",
  year: {},
  month: {
    1: 12000,
    2: 13200,
    3: 14400,
    4: 15600,
    5: 18000,
    6: 19200,
    7: 20400,
    8: 21600,
    9: 22800,
    10: 24000,
    11: 25200,
    12: 24000,
    13: 24600,
    14: 25200,
    15: 25800,
    16: 26400,
    17: 21000,
    18: 21600,
    19: 22200,
    20: 22800,
    21: 23400,
    22: 24000,
    23: 24600,
    24: 25200,
    25: 26400,
    26: 27000,
    27: 27600,
    28: 28200,
    29: 28800,
    30: 29400,
    31: 30000,
  },
};
export default function HomePage() {
  return (
    <>
      <div className="dashboard-container-one">
        <SalesOverview />
      </div>
      <div className="dashboard-container">
        <IncomeChart data={{ year: year?.year, month: month?.month }} />
      </div>
    </>
  );
}
