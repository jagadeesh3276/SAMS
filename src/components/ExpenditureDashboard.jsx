import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Link, useNavigate } from 'react-router-dom';

const ExpenditureDashboard = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

   const navigate = useNavigate();

    const handleButtonClick = () => {
    navigate('/invoicereceipt'); 
  };
 
 

  const initialData = [
    {
      id: 1,
      category: "Books",
      product: "Math Textbook",
      hsn: "4901",
      unit: 10,
      price: 150,
      cgst: "9%",
      sgst: "9%",
      total: 1635,
      agent: "Ravi Kumar",
      location: "Hyderabad",
      phone: "9876543210",
      payment: "Prepaid",
      status: "Approved",
      date: "2025-09-18",
    },
    {
      id: 2,
      category: "Uniforms",
      product: "School Shirt",
      hsn: "6109",
      unit: 5,
      price: 250,
      cgst: "6%",
      sgst: "6%",
      total: 1325,
      agent: "Anita Rao",
      location: "Bangalore",
      phone: "9876501234",
      payment: "Credit",
      status: "Pending",
      date: "2025-09-18",
    },
    {
      id: 3,
      category: "Study Tables",
      product: "Wooden Table",
      hsn: "9403",
      unit: 2,
      price: 3200,
      cgst: "9%",
      sgst: "9%",
      total: 6976,
      agent: "Manoj Singh",
      location: "Pune",
      phone: "9988776655",
      payment: "COD",
      status: "Rejected",
      date: "2025-09-18",
    },
    {
      id: 4,
      category: "Extras",
      product: "Drawing Kit",
      hsn: "9608",
      unit: 3,
      price: 450,
      cgst: "6%",
      sgst: "6%",
      total: 1431,
      agent: "Kavita Sharma",
      location: "Delhi",
      phone: "9123456780",
      payment: "Prepaid",
      status: "Approved",
      date: "2025-09-18",
    },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Filtered data
  const filteredData = tableData.filter((item) => {
    return (
      item.category.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || item.category === category) &&
      (date === "" || item.date === date)
    );
  });

  // Pie chart data based on filtered data
  const chartData = {
    labels: ["Books", "Uniforms", "Study Tables", "Extras"],
    datasets: [
      {
        data: ["Books", "Uniforms", "Study Tables", "Extras"].map(
          (cat) =>
            filteredData
              .filter((item) => item.category === cat)
              .reduce((sum, i) => sum + i.total, 0)
        ),
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#e91e63"],
      },
    ],
  };

  useEffect(() => {
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "pie",
      data: chartData,
      options: { responsive: true, plugins: { legend: { display: false } } },
    });

    return () => chartInstanceRef.current.destroy();
  }, [filteredData]);

  // Metrics calculation based on filtered data
  const totalSales = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
  const maxVal = Math.max(...chartData.datasets[0].data);
  const minVal = Math.min(...chartData.datasets[0].data);
  const highestCat = chartData.labels[chartData.datasets[0].data.indexOf(maxVal)];
  const lowestCat = chartData.labels[chartData.datasets[0].data.indexOf(minVal)];

  return (
    <div className="ml-[250px] mt-[90px] p-5">
      <h2 className="text-2xl font-semibold text-gray-800 mb-5">Expenditure</h2>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-2 py-1 border rounded-md text-sm"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="px-2 py-1 border rounded-md text-sm"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Uniforms">Uniforms</option>
          <option value="Study Tables">Study Tables</option>
          <option value="Extras">Extras</option>
        </select>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-[1.2fr_0.8fr] gap-5">
        {/* Chart Section */}
        <div className="bg-white p-5 rounded-xl shadow flex flex-col items-center">
          <div className="w-[260px] h-[260px] mb-5">
            <canvas ref={chartRef}></canvas>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {chartData.labels.map((label, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[i] }}
                ></div>
                {label}
              </div>
            ))}
          </div>

          {/* Small Data Table */}
          <div className="w-full max-h-[180px] overflow-y-auto border rounded-md">
            <table className="w-full border-collapse">
              <thead className="bg-gray-200 sticky top-0">
                <tr>
                  <th className="px-2 py-1 text-center">Category</th>
                  <th className="px-2 py-1 text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {chartData.labels.map((label, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                    <td className="px-2 py-1 text-center border">{label}</td>
                    <td className="px-2 py-1 text-center border">
                      {chartData.datasets[0].data[idx]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Metrics Summary */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="text-gray-800 mb-4">Metrics Summary</h3>
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <th className="text-left text-gray-600 px-2 py-1">Total Sales</th>
                <td className="text-right font-bold text-gray-900 px-2 py-1">{totalSales}</td>
              </tr>
              <tr>
                <th className="text-left text-gray-600 px-2 py-1">Highest Category</th>
                <td className="text-right font-bold text-gray-900 px-2 py-1">{highestCat}</td>
              </tr>
              <tr>
                <th className="text-left text-gray-600 px-2 py-1">Lowest Category</th>
                <td className="text-right font-bold text-gray-900 px-2 py-1">{lowestCat}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Large Data Table */}
      <div className="bg-white rounded-xl shadow mt-7 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-800 text-white sticky top-0 z-10">
            <tr>
              {[
                "S.No",
                "Category",
                "Product Name",
                "HSN Code",
                "Unit",
                "Price (₹)",
                "CGST",
                "SGST",
                "Total Cost",
                "Purchase Agent",
                "Location",
                "Phone",
                "Payment Status",
                "Status",
                "View",
              ].map((header, idx) => (
                <th key={idx} className="px-3 py-2 text-center text-sm font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item.id} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border px-3 py-1 text-center">{item.id}</td>
                <td className="border px-3 py-1 text-center">{item.category}</td>
                <td className="border px-3 py-1 text-center">{item.product}</td>
                <td className="border px-3 py-1 text-center">{item.hsn}</td>
                <td className="border px-3 py-1 text-center">{item.unit}</td>
                <td className="border px-3 py-1 text-center">₹{item.price}</td>
                <td className="border px-3 py-1 text-center">{item.cgst}</td>
                <td className="border px-3 py-1 text-center">{item.sgst}</td>
                <td className="border px-3 py-1 text-center">₹{item.total}</td>
                <td className="border px-3 py-1 text-center">{item.agent}</td>
                <td className="border px-3 py-1 text-center">{item.location}</td>
                <td className="border px-3 py-1 text-center">{item.phone}</td>
                <td className="border px-3 py-1 text-center">{item.payment}</td>
                <td className="border px-3 py-1 text-center">{item.status}</td>
                <td className="border px-3 py-1 text-center">
                 
                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500" onClick={handleButtonClick}>
                      View
                    </button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenditureDashboard;
