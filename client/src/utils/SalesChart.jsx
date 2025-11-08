import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [300, 600, 400, 700, 500, 800],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: isDark ? "#ffffff" : "#000000",
      },
    },
    tooltip: {
      bodyColor: isDark ? "#ffffff" : "#000000",
      titleColor: isDark ? "#ffffff" : "#000000",
    },
  },
  scales: {
    x: {
      ticks: {
        color: isDark ? "#ffffff" : "#000000",
      },
      grid: {
        color: isDark ? "#444" : "#ccc",
      },
    },
    y: {
      ticks: {
        color: isDark ? "#ffffff" : "#000000",
      },
      grid: {
        color: isDark ? "#444" : "#ccc",
      },
    },
  },
};

const SalesChart = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Monthly Sales
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;