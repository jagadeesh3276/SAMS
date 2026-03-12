import React, { useState } from "react";

const StudentPerformance = () => {
  const [rows, setRows] = useState([
    {
      id: "ST101",
      name: "Ravi Kumar",
      gender: "Male",
      class: "10",
      section: "A",
      subjects: "Maths: 85, Science: 90, English: 88",
      score: 263,
    },
    {
      id: "ST102",
      name: "Sita Reddy",
      gender: "Female",
      class: "10",
      section: "B",
      subjects: "Maths: 92, Science: 89, English: 94",
      score: 275,
    },
    {
      id: "ST103",
      name: "Arjun Singh",
      gender: "Male",
      class: "9",
      section: "C",
      subjects: "Maths: 78, Science: 82, English: 80",
      score: 240,
    },
  ]);

  const [search, setSearch] = useState("");

  // Delete Row
  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  // Filter Rows
  const filteredRows = rows.filter(
    (row) =>
      row.id.toLowerCase().includes(search.toLowerCase()) ||
      row.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-[100px] ml-[250px] p-5">
      <h2 className="text-center mb-5 text-[gauntlet] text-2xl font-semibold">
        Student Performance Report
      </h2>

      {/* Search */}
      <div className="mb-5 flex justify-center">
        <input
          type="text"
          placeholder="Search by Student ID or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 w-[300px] border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:shadow-md"
        />
      </div>

      {/* Table */}
      <table className="w-full border-collapse bg-white shadow-md">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              S.No
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Student ID
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Student Name
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Gender
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Class
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Section
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Subjects
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Score
            </th>
            <th className="border border-gray-300 p-2 text-center bg-blue-500 text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredRows.map((row, index) => (
            <tr
              key={row.id}
              className={`${
                index % 2 === 1 ? "bg-gray-100" : ""
              } hover:bg-gray-200`}
            >
              <td className="border border-gray-300 p-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.id}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.name}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.gender}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.class}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.section}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.subjects}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {row.score}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => deleteRow(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {filteredRows.length === 0 && (
            <tr>
              <td
                colSpan="9"
                className="text-center p-3 text-gray-500 italic"
              >
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentPerformance;
