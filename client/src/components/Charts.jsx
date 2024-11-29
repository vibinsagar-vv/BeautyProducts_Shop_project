import React from "react";
import AdminMonthlyOrderChart from "./MonthlyOrderChart";
import YearlyMonthlyBlockChart from "./YearlyMonthlyChart";
import SalesPieChart from "./OrderPieChart";
import YearlySalesPieChart from "./yearlyPieChart";

export default function Charts() {
  return (
    <div>
      <div>
        <div className="mb-20 mt-6">
          {" "}
          <AdminMonthlyOrderChart />
        </div>
        <div className=" mb-20 mt-6">
          <YearlyMonthlyBlockChart />
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1">
          <div>
            <SalesPieChart />
          </div>
          <div>
            <YearlySalesPieChart />
          </div>
        </div>
      </div>
    </div>
  );
}
