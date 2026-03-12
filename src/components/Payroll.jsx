import React, { useEffect, useState } from "react";

const Payroll = () => {
  const initialData = [
    { sno: 1, id: "T001", name: "Mr. Hrithik", role: "Teacher", totalDays: 30, presentDays: 27, absentDays: 3, basicSalary: 30000, daySalary: 5000, allowances: 2000, deduction: 1000, netPay: "—" },
    { sno: 2, id: "A001", name: "Ms. Anitha", role: "Admin", totalDays: 30, presentDays: 29, absentDays: 1, basicSalary: 25000, daySalary: 0, allowances: 1500, deduction: 800, netPay: "—" },
    { sno: 3, id: "T002", name: "Mrs. Kavitha", role: "Teacher", totalDays: 30, presentDays: 28, absentDays: 2, basicSalary: 28000, daySalary: 0, allowances: 1800, deduction: 500, netPay: "—" },
    { sno: 4, id: "D001", name: "Mr. Ravi", role: "Driver", totalDays: 30, presentDays: 26, absentDays: 4, basicSalary: 15000, daySalary: 0, allowances: 1200, deduction: 300, netPay: "—" },
    { sno: 5, id: "C001", name: "Mrs. Lakshmi", role: "Cleaner", totalDays: 30, presentDays: 25, absentDays: 5, basicSalary: 12000, daySalary: 0, allowances: 800, deduction: 200, netPay: "—" },
    { sno: 6, id: "L001", name: "Mr. Suresh", role: "Librarian", totalDays: 30, presentDays: 29, absentDays: 1, basicSalary: 18000, daySalary: 0, allowances: 1000, deduction: 300, netPay: "—" },
    { sno: 7, id: "S001", name: "Mr. Ajay", role: "Security", totalDays: 30, presentDays: 30, absentDays: 0, basicSalary: 14000, daySalary: 0, allowances: 500, deduction: 0, netPay: "—" },
    { sno: 8, id: "P001", name: "Mr. Kiran", role: "Peon", totalDays: 30, presentDays: 27, absentDays: 3, basicSalary: 10000, daySalary: 0, allowances: 600, deduction: 100, netPay: "—" },
    { sno: 9, id: "AC001", name: "Ms. Priya", role: "Accountant", totalDays: 30, presentDays: 29, absentDays: 1, basicSalary: 22000, daySalary: 0, allowances: 1200, deduction: 400, netPay: "—" },
    { sno: 10, id: "LB001", name: "Mr. Mahesh", role: "Lab Assistant", totalDays: 30, presentDays: 28, absentDays: 2, basicSalary: 16000, daySalary: 0, allowances: 900, deduction: 250, netPay: "—" },
  ];

  const [staffData, setStaffData] = useState(initialData);
  const [filterRole, setFilterRole] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Recalculate net pay
  useEffect(() => {
    const updated = staffData.map((row) => {
      const daySalary = row.totalDays > 0 ? row.basicSalary / row.totalDays : 0;
      const netPay = Math.round(daySalary * row.presentDays + row.allowances - row.deduction);
      return { ...row, daySalary, netPay: "₹" + netPay.toLocaleString() };
    });
    setStaffData(updated);
  }, []);

  // Save to localStorage
  const saveData = () => {
    localStorage.setItem("staffPayrollData", JSON.stringify(staffData));
    alert("✅ Data saved successfully!");
  };

  // Load from localStorage
  const loadData = () => {
    const saved = localStorage.getItem("staffPayrollData");
    if (saved) {
      setStaffData(JSON.parse(saved));
      alert("📂 Data loaded!");
    } else {
      alert("⚠ No saved data found.");
    }
  };

  // Handle editable cells
  const handleEdit = (index, field, value) => {
    const updated = [...staffData];
    updated[index][field] = Number(value) || 0;

    const daySalary = updated[index].totalDays > 0 ? updated[index].basicSalary / updated[index].totalDays : 0;
    const netPay = Math.round(daySalary * updated[index].presentDays + updated[index].allowances - updated[index].deduction);

    updated[index].daySalary = daySalary;
    updated[index].netPay = "₹" + netPay.toLocaleString();
    setStaffData(updated);
  };

  // Filter data
  const filteredData = staffData.filter(
    (row) =>
      (filterRole === "all" || row.role === filterRole) &&
      row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalNetPay = filteredData.reduce((sum, row) => sum + parseInt(row.netPay.replace(/[₹,]/g, "")), 0);
  const avgNetPay = filteredData.length > 0 ? Math.round(totalNetPay / filteredData.length) : 0;

  return (
   <div className="max-w-5xl mx-auto mt-20 p-5 md:mt-36 ml-60">

      <h2 className="text-center mb-4 text-gray-800 text-2xl">📊 Integrated Employee Attendance & Payroll Report</h2>

      {/* Filters */}
      <div className="text-center mb-6 text-sm">
        <label htmlFor="filterRole" className="font-semibold">Filter by Role:</label>
        <select
          id="filterRole"
          className="mx-2 px-2 py-1 border border-gray-300 rounded text-sm"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="Teacher">Teacher</option>
          <option value="Driver">Driver</option>
          <option value="Cleaner">Cleaner</option>
          <option value="Admin">Admin</option>
          <option value="Security">Security</option>
          <option value="Librarian">Librarian</option>
          <option value="Peon">Peon</option>
          <option value="Accountant">Accountant</option>
          <option value="Lab Assistant">Lab Assistant</option>
        </select>

        <label htmlFor="searchInput" className="font-semibold">Search by Name:</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Enter name..."
          className="mx-2 px-2 py-1 border border-gray-300 rounded text-sm"
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap justify-center gap-4 mb-5">
        <div className="flex-1 min-w-[200px] text-center p-4 rounded-lg shadow-md">
          <h5 className="font-bold text-blue-600 mb-2">Total Employees</h5>
          <p className="text-xl font-semibold">{filteredData.length}</p>
        </div>
        <div className="flex-1 min-w-[200px] text-center p-4 rounded-lg shadow-md">
          <h5 className="font-bold text-blue-600 mb-2">Total Payroll</h5>
          <p className="text-xl font-semibold">₹{totalNetPay.toLocaleString()}</p>
        </div>
        <div className="flex-1 min-w-[200px] text-center p-4 rounded-lg shadow-md">
          <h5 className="font-bold text-blue-600 mb-2">Average Net Pay</h5>
          <p className="text-xl font-semibold">₹{avgNetPay.toLocaleString()}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden table-fixed w-280">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="p-2 border">SNO</th>
              <th className="p-2 border">STAFF ID</th>
              <th className="p-2 border">NAME</th>
              <th className="p-2 border">ROLE</th>
              <th className="p-2 border">TOTAL DAYS</th>
              <th className="p-2 border">TOTAL PRESENT DAYS</th>
              <th className="p-2 border">TOTAL ABSENT DAYS</th>
              <th className="p-2 border">BASIC SALARY</th>
              <th className="p-2 border">DAY SALARY</th>
              <th className="p-2 border">ALLOWANCES</th>
              <th className="p-2 border">DEDUCTION</th>
              <th className="p-2 border bg-blue-700">NET PAY</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id} className="hover:bg-yellow-100">
                <td>{row.sno}</td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.role}</td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="bg-yellow-50 cursor-text"
                  onBlur={(e) => handleEdit(index, "totalDays", e.target.innerText)}
                >
                  {row.totalDays}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="bg-yellow-50 cursor-text"
                  onBlur={(e) => handleEdit(index, "presentDays", e.target.innerText)}
                >
                  {row.presentDays}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="bg-yellow-50 cursor-text"
                  onBlur={(e) => handleEdit(index, "absentDays", e.target.innerText)}
                >
                  {row.absentDays}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="bg-yellow-50 cursor-text"
                  onBlur={(e) => handleEdit(index, "basicSalary", e.target.innerText)}
                >
                  {row.basicSalary}
                </td>
                <td>₹{row.daySalary.toFixed(2)}</td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="bg-yellow-50 cursor-text"
                  onBlur={(e) => handleEdit(index, "allowances", e.target.innerText)}
                >
                  {row.allowances}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  className="bg-yellow-50 cursor-text"
                  onBlur={(e) => handleEdit(index, "deduction", e.target.innerText)}
                >
                  {row.deduction}
                </td>
                <td className="font-bold text-blue-900">{row.netPay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-5">
        <button onClick={saveData} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
          💾 Save Data
        </button>
        <button onClick={loadData} className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition">
          📂 Load Saved Data
        </button>
      </div>
    </div>
  );
};

export default Payroll;
