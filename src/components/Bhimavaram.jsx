import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register ChartDataLabels plugin globally
Chart.register(ChartDataLabels);

const Dashboard = () => {
  const incomeChartRef = useRef(null);
  const pendingChartRef = useRef(null);
  const expensesChartRef = useRef(null);

  const [popupData, setPopupData] = useState({ visible: false, title: "", metrics: [] });

  const [showMoreIncome, setShowMoreIncome] = useState(false);
  const [showMorePending, setShowMorePending] = useState(false);

  const openPopup = (chart, title) => {
    setPopupData({
      visible: true,
      title,
      metrics: [
        { label: "Metric 1", value: "5000" },
        { label: "Metric 2", value: "3200" },
        { label: "Metric 3", value: "2100" }
      ]
    });
  };

  const closePopup = () => {
    setPopupData({ visible: false, title: "", metrics: [] });
  };

  const staticData = {
    income: {
      monthly: [50000, 500000, 120000, 80000, 20000, 200000, 150000, 70000],
    },
    pending: {
      monthly: [80000, 20000, 15000, 50000, 30000, 10000],
    },
    expenses: {
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        inventory: [2000, 3000, 4000, 2500, 2000, 3000, 0, 0, 0, 0, 0, 0],
        salaries: [5000, 6000, 7000, 5000, 4000, 6000, 0, 0, 0, 0, 0, 0],
      }
    }
  };

  useEffect(() => {
    if (incomeChartRef.current) incomeChartRef.current.destroy();
    if (pendingChartRef.current) pendingChartRef.current.destroy();
    if (expensesChartRef.current) expensesChartRef.current.destroy();

    const createPieChartConfig = (labels, data, colors) => {
  const total = data.reduce((sum, value) => sum + value, 0);
  const percentages = data.map(value => ((value / total) * 100).toFixed(1));

  return {
    type: "doughnut",
    data: {
      labels,
      datasets: [
        {
          // OUTER LIGHT RING
          data,
          backgroundColor: colors.map(c => c + "55"), // 55 = pastel transparency
          borderWidth: 0,
          hoverOffset: 0,
          cutout: "60%",
        },
        {
          // INNER DARK RING
          data,
          backgroundColor: colors,
          borderWidth: 0,
          cutout: "80%",
          weight: 0.8
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: { display: false },

        tooltip: {
          backgroundColor: "#2c2c54",
          padding: 12,
          displayColors: false,
          titleColor: "#fff",
          bodyColor: "#fff",
          bodyFont: { size: 14 },
          titleFont: { size: 14, weight: "bold" },
          callbacks: {
            title: (ctx) => ctx[0].label,
            label: (ctx) =>
              `${data[ctx.dataIndex]} (${percentages[ctx.dataIndex]}%)`,
          },
        },

        datalabels: {
          color: "transparent", // hide inside labels (like screenshot)
        },
      },

      animation: {
        animateRotate: true,
        animateScale: true,
      }
    },
  };
};


    // Income Pie
    const incomeCanvas = document.getElementById("incomePie");
    if (incomeCanvas) {
      incomeChartRef.current = new Chart(
        incomeCanvas,
        createPieChartConfig(
          [
            "Application Income", "Tuition Fee", "Uniform", "Stationary - Books",
            "Stationary - Extra", "Hostel", "Transport", "Extra Curricular"
          ],
          staticData.income.monthly,
          ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
            "#9966FF", "#FF9F40", "#C9CBCF", "#8BC34A"]
        )
      );
    }

    // Pending Pie
    const pendingCanvas = document.getElementById("pendingPie");
    if (pendingCanvas) {
      pendingChartRef.current = new Chart(
        pendingCanvas,
        createPieChartConfig(
          ["Tuition Fee", "Uniform Fee", "Stationary Fee", "Hostel", "Transport", "Extra Curricular"],
          staticData.pending.monthly,
          ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"]
        )
      );
    }

    // Expenses Bar Graph
    const expensesCanvas = document.getElementById("expensesLine");
    if (expensesCanvas) {
      expensesChartRef.current = new Chart(expensesCanvas, {
        type: "bar",
        data: {
          labels: staticData.expenses.monthly.labels,
          datasets: [
            {
              label: "Inventory",
              data: staticData.expenses.monthly.inventory,
              backgroundColor: "rgba(255,99,132,0.3)",
            },
            {
              label: "Salaries",
              data: staticData.expenses.monthly.salaries,
              backgroundColor: "rgba(54,162,235,0.3)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: "bottom" }
          },
        },
      });
    }
  }, []);
const getIncomeMetrics = () => {
  const labels = [
    "Application Income", "Tuition Fee", "Uniform",
    "Stationary - Books", "Stationary - Extra",
    "Hostel", "Transport", "Extra Curricular"
  ];

  const data = staticData.income.monthly;
  const total = data.reduce((a, b) => a + b, 0);

  return labels.map((label, index) => ({
    label,
    value: data[index],
    percent: ((data[index] / total) * 100).toFixed(1)
  }));
};

const getPendingMetrics = () => {
  const labels = [
    "Tuition Fee", "Uniform Fee", "Stationary Fee",
    "Hostel", "Transport", "Extra Curricular"
  ];

  const data = staticData.pending.monthly;
  const total = data.reduce((a, b) => a + b, 0);

  return labels.map((label, index) => ({
    label,
    value: data[index],
    percent: ((data[index] / total) * 100).toFixed(1)
  }));
};

  return (
    <div className="ml-0 md:ml-[230px] mt-20 p-4 md:p-8 bg-[#f5f7fb] flex-1">

      {/* Header */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
        Welcome to SAMS
      </h2>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{ title: "Employee", count: 400 },
        { title: "Teachers", count: 500 },
        { title: "Students", count: 1200 }].map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <p className="text-xs text-gray-500">{item.title}</p>
            <h3 className="text-3xl font-semibold text-gray-900 mt-1">{item.count}</h3>
            <p className="text-sm text-gray-400 mt-1">TOTAL STRENGTH</p>
          </div>
        ))}
      </div>

      {/* PIE CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Income */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">Income</h3>
              <p className="text-xs text-gray-500">From 1–6 Dec, 2020</p>
            </div>
            <button className="text-indigo-600 text-sm">View Report</button>
          </div>

          <div className="flex justify-center">
            <canvas
              id="incomePie"
              className="w-full max-w-[260px] h-[260px]"
              onClick={() => openPopup("incomePie", "Income Metrics")}
            ></canvas>
          </div>

         {/* Income Metrics */}
<div className="text-xs mt-4">
  {getIncomeMetrics().slice(0, 3).map((item, idx) => (
    <p key={idx} className="flex items-center gap-1">
      <span className="w-3 h-3 rounded-full"
        style={{ backgroundColor: incomeChartRef.current?.data.datasets[0].backgroundColor[idx] }}>
      </span>

      {item.label} {item.percent}%
    </p>
  ))}

  {!showMoreIncome && (
    <button
      onClick={() => setShowMoreIncome(true)}
      className="text-indigo-600 text-xs font-medium mt-2">
      More
    </button>
  )}

  {showMoreIncome && (
    <div className="mt-3 space-y-1">
      {getIncomeMetrics().slice(3).map((item, idx) => (
        <p key={idx} className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full"
            style={{
              backgroundColor:
                incomeChartRef.current?.data.datasets[0].backgroundColor[idx + 3]
            }}>
          </span>

          {item.label} {item.percent}%
        </p>
      ))}

      <button
        onClick={() => setShowMoreIncome(false)}
        className="text-indigo-600 text-xs font-medium mt-2">
        Less
      </button>
    </div>
  )}
</div>

        </div>

        {/* Pending Fees */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">Pending Fees</h3>
              <p className="text-xs text-gray-500">From 1–6 Dec, 2020</p>
            </div>
            <button className="text-indigo-600 text-sm">View Report</button>
          </div>

          <div className="flex justify-center">
            <canvas
              id="pendingPie"
              className="w-full max-w-[260px] h-[260px]"
              onClick={() => openPopup("pendingPie", "Pending Fees Metrics")}
            ></canvas>
          </div>

          {/* Pending Metrics */}
<div className="text-xs mt-4">
  {getPendingMetrics().slice(0, 3).map((item, idx) => (
    <p key={idx} className="flex items-center gap-1">
      <span className="w-3 h-3 rounded-full"
        style={{ backgroundColor: pendingChartRef.current?.data.datasets[0].backgroundColor[idx] }}>
      </span>

      {item.label} {item.percent}%
    </p>
  ))}

  {!showMorePending && (
    <button
      onClick={() => setShowMorePending(true)}
      className="text-indigo-600 text-xs font-medium mt-2">
      More
    </button>
  )}

  {showMorePending && (
    <div className="mt-3 space-y-1">
      {getPendingMetrics().slice(3).map((item, idx) => (
        <p key={idx} className="flex items-center gap-1">
          <span className="w-3 h-3 rounded-full"
            style={{
              backgroundColor:
                pendingChartRef.current?.data.datasets[0].backgroundColor[idx + 3]
            }}>
          </span>

          {item.label} {item.percent}%
        </p>
      ))}

      <button
        onClick={() => setShowMorePending(false)}
        className="text-indigo-600 text-xs font-medium mt-2">
        Less
      </button>
    </div>
  )}
</div>

        </div>
      </div>

      {/* Expenses Bar Graph */}
      <div className="mt-8 bg-white border rounded-xl shadow-sm p-5">
        <div className="flex justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Expenses</h3>
          <button className="text-indigo-600 text-sm">View Report</button>
        </div>

        <p className="text-2xl font-bold text-gray-900">₹ 7,852.000</p>
        <p className="text-green-600 text-xs font-medium mt-1">▲ 2.1% vs last week</p>

        <p className="text-xs text-gray-500 mt-3 mb-3">Sales from 1–12 Dec, 2025</p>

        <div className="w-full h-[300px]">
          <canvas
            id="expensesLine"
            onClick={() => openPopup("expensesLine", "Expenses Metrics")}
          ></canvas>
        </div>

        <div className="flex gap-4 text-xs mt-4">
          <p className="flex items-center gap-1"><span className="w-3 h-3 bg-[#ff6384] rounded-full"></span> Inventory</p>
          <p className="flex items-center gap-1"><span className="w-3 h-3 bg-[#36a2eb] rounded-full"></span> Salaries</p>
        </div>
      </div>

      {/* POPUP */}
      {popupData.visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
          <div className="bg-white p-5 rounded-xl w-full max-w-md shadow-lg relative">
            <span
              className="absolute top-3 right-3 cursor-pointer text-red-500 font-bold text-xl"
              onClick={closePopup}
            >
              ×
            </span>

            <h3 className="text-center text-indigo-600 font-semibold mb-4">
              {popupData.title}
            </h3>

            <ul className="space-y-2">
              {popupData.metrics.map((m, idx) => (
                <li key={idx} className="flex justify-between bg-gray-100 p-2 rounded-md shadow-sm">
                  <strong>{m.label}</strong>
                  <span className="bg-indigo-500 text-white px-2 py-0.5 rounded-full text-sm">
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
