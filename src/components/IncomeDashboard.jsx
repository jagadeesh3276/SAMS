import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const IncomeDashboard = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);
  const [totals, setTotals] = useState({
    Stationary: 0,
    Uniform: 0,
    Sports: 0,
    Other: 0,
  });
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState("");
  const [filterDate, setFilterDate] = useState("");

  // Initialize dummy data
  useEffect(() => {
    const categories = ["Stationary", "Uniform", "Sports", "Other"];
    const paymentMethods = ["Cash", "Card", "UPI"];
    const dummyData = [];

    for (let i = 1; i <= 30; i++) {
      dummyData.push({
        id: i,
        studentId: "STU" + (1000 + i),
        product: categories[Math.floor(Math.random() * categories.length)],
        unit: Math.ceil(Math.random() * 5),
        income: Math.floor(Math.random() * 500) + 100,
        payment: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        date:
          "2025-08-" +
          String(Math.ceil(Math.random() * 19) + 1).padStart(2, "0"),
      });
    }
    setData(dummyData);
  }, []);

  // Update chart and totals whenever data or filters change
  useEffect(() => {
    const filteredData = data.filter((d) => {
      const matchProduct = filterProduct ? d.product === filterProduct : true;
      const matchSearch = d.studentId.toLowerCase().includes(search.toLowerCase());
      const matchDate = filterDate ? d.date === filterDate : true;
      return matchProduct && matchSearch && matchDate;
    });

    const newTotals = { Stationary: 0, Uniform: 0, Sports: 0, Other: 0 };
    filteredData.forEach((d) => {
      newTotals[d.product] += d.income;
    });
    setTotals(newTotals);

    // Chart.js
    const ctx = document.getElementById("incomeChart").getContext("2d");
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Stationary", "Uniform", "Sports", "Other"],
        datasets: [
          {
            label: "Income (₹)",
            data: [
              newTotals.Stationary,
              newTotals.Uniform,
              newTotals.Sports,
              newTotals.Other,
            ],
            borderColor: "#4e79a7",
            backgroundColor: "rgba(78,121,167,0.2)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#fff",
            pointBorderColor: "#4e79a7",
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } },
      },
    });
  }, [data, search, filterProduct, filterDate]);

  // Filtered table data
  const filteredTable = data.filter((d) => {
    const matchProduct = filterProduct ? d.product === filterProduct : true;
    const matchSearch = d.studentId.toLowerCase().includes(search.toLowerCase());
    const matchDate = filterDate ? d.date === filterDate : true;
    return matchProduct && matchSearch && matchDate;
  });

  return (
    <main className="mt-[90px] ml-[250px] p-5">
      {/* Top Bar */}
      <div className="flex justify-between mb-5">
        <div>
          <input
            type="text"
            placeholder="Search Student ID..."
            className="p-2 mr-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="p-2 mr-2 border rounded"
            value={filterProduct}
            onChange={(e) => setFilterProduct(e.target.value)}
          >
            <option value="">All Products</option>
            <option value="Stationary">Stationary</option>
            <option value="Uniform">Uniform</option>
            <option value="Sports">Sports</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            className="p-2 border rounded"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Chart & Metrics */}
      <div className="flex gap-5 mb-5">
        {/* Chart */}
        <div className="flex-[2] bg-white p-5 rounded-xl shadow-lg">
          <canvas id="incomeChart"></canvas>
        </div>

        {/* Metrics */}
        <div className="flex-1 bg-white p-5 rounded-xl shadow-lg">
          <h3 className="mt-0 mb-3 text-center font-semibold text-lg">
            Metrics Summary
          </h3>
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="sticky top-0 bg-[#4e79a7] text-white p-2 z-10">
                  Category
                </th>
                <th className="sticky top-0 bg-[#4e79a7] text-white p-2 z-10">
                  Total Income (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {["Stationary", "Uniform", "Sports", "Other"].map((cat) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>₹{totals[cat].toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Income Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                {[
                  "S.No",
                  "Student ID",
                  "Category",
                  "Unit",
                  "Price (₹)",
                  "Payment Method",
                  "Date",
                ].map((head) => (
                  <th
                    key={head}
                    className="sticky top-0 bg-[#4e79a7] text-white p-2 z-10"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTable.length === 0 ? (
                <tr>
                  <td colSpan="7">No records found</td>
                </tr>
              ) : (
                filteredTable.map((d, index) => (
                  <tr key={d.id} className="hover:bg-gray-100">
                    <td>{index + 1}</td>
                    <td>{d.studentId}</td>
                    <td>{d.product}</td>
                    <td>{d.unit}</td>
                    <td>₹{d.income.toLocaleString()}</td>
                    <td>{d.payment}</td>
                    <td>{d.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default IncomeDashboard;
