import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement, // Ensure this is imported
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the components you will use in the chart
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement, // Register the Bar element
    Title,
    Tooltip,
    Legend
);

const LeetCodeSubmissionChart = ({ chartData }) => {
  return (
    <div className="w-auto h-[90] mt-10 flex items-center justify-center">
      <div className="p-4 mt-0 h-[90%] auto rounded-lg border-2 border-gray-300 shadow-lg bg-white flex flex-col justify-between items-center
       w-[40%] transition-all hover:shadow-xl">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: {
                display: true,
                text: 'LeetCode Submissions Per Day',
              },
            },
            scales: {
              y: { beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LeetCodeSubmissionChart;
