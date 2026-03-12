import React, { useState, useEffect } from "react";

const TeachingPlan = () => {
  const [rows, setRows] = useState([
    {
      class: "Grade 1",
      section: "A",
      teacher: "Mr. Sharma",
      daily: "Math - Addition",
      weekly: "Basic Arithmetic",
    },
    {
      class: "Grade 2",
      section: "B",
      teacher: "Ms. Gupta",
      daily: "Science - Plants",
      weekly: "Introduction to Botany",
    },
    {
      class: "Grade 3",
      section: "C",
      teacher: "Mr. Khan",
      daily: "English - Grammar",
      weekly: "Parts of Speech",
    },
    {
      class: "Grade 4",
      section: "A",
      teacher: "Mrs. Iyer",
      daily: "History - Ancient India",
      weekly: "Indus Valley Civilization",
    },
    {
      class: "Grade 5",
      section: "B",
      teacher: "Mr. Das",
      daily: "Geography - Maps",
      weekly: "Continents & Oceans",
    },
  ]);

  const [classFilter, setClassFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [extraCols, setExtraCols] = useState([]);

  // Add Row
  const addRow = () => {
    setRows([
      ...rows,
      { class: "", section: "", teacher: "", daily: "", weekly: "" },
    ]);
  };

  // Add Column
  const addColumn = () => {
    const colName = prompt("Enter column name:");
    if (!colName) return;
    setExtraCols([...extraCols, colName]);
  };

  // Save Row
  const saveRow = (index) => {
    alert(`Row ${index + 1} data saved!`);
  };

  // Filter rows
  const filteredRows = rows.filter((row) => {
    const matchesClass = classFilter
      ? row.class.toLowerCase().includes(classFilter.toLowerCase())
      : true;
    const matchesSection = sectionFilter
      ? row.section.toLowerCase().includes(sectionFilter.toLowerCase())
      : true;
    return matchesClass && matchesSection;
  });

  return (
    <main className="mt-[5%] ml-[230px] p-8 flex-1 font-poppins mt-20">
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Daily & Weekly Teaching Plan
      </h1>

      {/* Controls */}
      <div className="flex justify-between items-center gap-3 mb-4">
        <div className="flex gap-3 flex-1">
          <input
            type="text"
            placeholder="Filter by Class"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-[150px]"
          />
          <input
            type="text"
            placeholder="Filter by Section"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-[150px]"
          />
        </div>
        <div>
          <button
            onClick={addColumn}
            className="px-3 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            + Add Column
          </button>
          <button
            onClick={addRow}
            className="px-3 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            + Add Row
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              S.No
            </th>
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              Class
            </th>
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              Section
            </th>
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              Teacher
            </th>
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              Daily Plan
            </th>
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              Weekly Plan
            </th>
            {extraCols.map((col, i) => (
              <th
                key={i}
                className="border border-gray-300 p-2 bg-blue-500 text-white"
              >
                {col}
              </th>
            ))}
            <th className="border border-gray-300 p-2 bg-blue-500 text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr
              key={index}
              className={index % 2 === 1 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.class}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].class = e.target.value;
                    setRows(newRows);
                  }}
                  className="p-1 border border-gray-300 rounded w-full"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.section}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].section = e.target.value;
                    setRows(newRows);
                  }}
                  className="p-1 border border-gray-300 rounded w-full"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.teacher}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].teacher = e.target.value;
                    setRows(newRows);
                  }}
                  className="p-1 border border-gray-300 rounded w-full"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.daily}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].daily = e.target.value;
                    setRows(newRows);
                  }}
                  className="p-1 border border-gray-300 rounded w-full"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={row.weekly}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].weekly = e.target.value;
                    setRows(newRows);
                  }}
                  className="p-1 border border-gray-300 rounded w-full"
                />
              </td>
              {extraCols.map((col, ci) => (
                <td key={ci} className="border border-gray-300 p-2">
                  <input
                    type="text"
                    placeholder={col}
                    className="p-1 border border-gray-300 rounded w-full"
                  />
                </td>
              ))}
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => saveRow(index)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default TeachingPlan;
