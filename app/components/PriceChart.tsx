'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface PriceChartProps {
  priceHistory: { date: string; price: number }[];
}

const PriceChart: React.FC<PriceChartProps> = ({ priceHistory }) => {
  const chartData = {
    labels: priceHistory.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: priceHistory.map((entry) => entry.price),
        fill: false,
        backgroundColor: 'rgba(18, 150, 56,0.4)',
        borderColor: 'rgba(18, 150, 56,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Price History',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default PriceChart;