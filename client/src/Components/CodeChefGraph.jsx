import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CodeChef = ({ ratingData , ccUserData}) => {
  // Extract the necessary data for the graph
  const labels = ratingData.map(item => `${item.getday}/${item.getmonth}/${item.getyear}`);
  const ratings = ratingData.map(item => parseInt(item.rating));

  // Chart configuration
  const data = {
    labels,  // X-axis labels (contest end dates)
    datasets: [
      {
        label: 'CodeChef Rating',
        data: ratings,  // Y-axis values (ratings)
        borderColor: '#00C49F',
        backgroundColor: 'rgba(30, 125, 34, 0.5)',
        fill: false,
        tension: 0.1,
        pointRadius: 5,  // To make points more noticeable
        pointHoverRadius: 8,  // Larger point radius when hovering
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Allow control over height/width
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        callbacks: {
          // Customize the tooltip to show name, date, and rating each on a new line
          label: function(context) {
            const label = context.label || '';
            const value = context.raw !== null ? context.raw : '';
            const name = ratingData[context.dataIndex]?.name || 'Unknown';  // Assuming ratingData has 'name'
            
            // Return each item as a separate array element to show on a new line
            return [`Name: ${name}`, `Date: ${label}`, `Rating: ${value}`];
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="text-center w-full  p-11 rounded-md" style={{ maxWidth: '800px' }}>
        {/* bg-white to only this graph container */}
        <div className="bg-white rounded-md p-5" style={{ height: '400px', width: '100%' }}>
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CodeChef;
