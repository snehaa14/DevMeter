import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CodeChef = ({ ratingData, ccUserData }) => {
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
        borderColor: '#FF1493',  // Pink color for the line
        backgroundColor: 'rgba(255, 20, 147, 0.2)',  // Light pink background for the line area
        fill: true,  // Fill the area under the line
        tension: 0.1,
        pointRadius: 0,  // Hide points by default
        pointHoverRadius: 5,  // Show larger circles on hover
        pointHoverBackgroundColor: '#FF1493',  // Pink color for the hover point
        pointHoverBorderColor: '#FF1493',  // Pink border for the hover point
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
      x: {
        grid: {
          display: false, // Remove grid lines on the x-axis
        },
      },
      y: {
        grid: {
          display: false, // Remove grid lines on the y-axis
        },
        beginAtZero: false,
      },
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
