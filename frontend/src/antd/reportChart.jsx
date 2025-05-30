import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Empty } from 'antd';
import { Divider} from "antd"


const reportChart = ({ data }) => {
  // console.log(data)
  if (!data) {
    return <Empty/>;
  }

  const pieData = Object.entries(data)
    .map(([label, value], index) => ({
      id: index,
      value,
      label,
    }))
    .filter(item => item.value > 0); 
  return (
  <>
<div className="flex flex-col justify-center items-center h-full overflow-hidden">
  <PieChart
    series={[
      {
        data: pieData,
      },
    ]}
    width={600}
    height={300}
  />
  </div>
  <Divider/>
  <div className='flex justify-center'>
  <details className="hover:cursor-pointer bg-white shadow-md p-4 rounded-lg border border-gray-200">
      <summary className="text-lg font-semibold text-gray-700">📊 Report Summary</summary>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data).map(([key, value], index) => (
              <tr key={index} className="text-gray-600 even:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
    </div>
  </>
  );
};

export default reportChart;
