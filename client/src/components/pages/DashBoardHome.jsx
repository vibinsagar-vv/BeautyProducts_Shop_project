import React from 'react'
import AdminMonthlyOrderChart from '../MonthlyOrderChart'
import YearlyMonthlyBlockChart from '../YearlyMonthlyChart'
import SalesPieChart from '../OrderPieChart'
import YearlySalesPieChart from '../yearlyPieChart'
export default function DashBoardHome() {
  return (
    <div>
        <div>
           <div className='mb-20 mt-6'> <AdminMonthlyOrderChart/></div>
            <div className=' mb-20 mt-6'><YearlyMonthlyBlockChart/></div>
            <SalesPieChart/>
            <YearlySalesPieChart/>
        </div>
    </div>
  )
}
