import React from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function SalaryDistributionChart() {
  const data = {
    labels: ["$80k-100k", "$100k-120k", "$120k-140k", "$140k-160k", "$160k+"],
    datasets: [
      {
        label: "No. of Applications",
        data: [5, 12, 18, 7, 3],
        backgroundColor: "#ea580c", // orange-600
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: { display: false },
    },

    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#9CA3AF", // X axis text color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // grid line color
        },
      },
      y: {
        ticks: {
          color: "#9CA3AF", // Y axis text color
        },
        grid: {
          color: "rgba(255, 255, 255, 0.3)", // background grid box effect
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
}
