import React, { useState } from "react";

const UnitTestResults = () => {
  const [searchInput, setSearchInput] = useState("");

  const results = [
    { id: "STD101", maths: 45, science: 48, english: 40, social: 42, computer: 50 },
    { id: "STD102", maths: 40, science: 35, english: 39, social: 38, computer: 42 },
    { id: "STD103", maths: 42, science: 44, english: 46, social: 41, computer: 47 },
    { id: "STD104", maths: 38, science: 40, english: 35, social: 39, computer: 45 },
  ];

  const filteredResults = results.filter((student) =>
    student.id.toUpperCase().includes(searchInput.toUpperCase())
  );

  return (
    <div className="max-w-[calc(100%-260px)] ml-[240px] mt-[90px] bg-white p-5 rounded-xl shadow-md">
      <h2 className="text-center text-blue-600 text-2xl mb-5 font-semibold">
        Unit Test Results
      </h2>

      {/* Search Bar */}
      <div className="mb-4 text-right">
        <input
          type="text"
          placeholder="Search by Student ID..."
          className="px-3 py-2 border border-gray-300 rounded-lg w-64 text-sm"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {/* Results Table */}
      <table className="w-full border-collapse mt-2 text-center">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border border-gray-300 px-3 py-2">S.No</th>
            <th className="border border-gray-300 px-3 py-2">Student ID</th>
            <th className="border border-gray-300 px-3 py-2">Maths</th>
            <th className="border border-gray-300 px-3 py-2">Science</th>
            <th className="border border-gray-300 px-3 py-2">English</th>
            <th className="border border-gray-300 px-3 py-2">Social</th>
            <th className="border border-gray-300 px-3 py-2">Computer</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.length > 0 ? (
            filteredResults.map((student, index) => (
              <tr
                key={student.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="border border-gray-300 px-3 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-3 py-2">{student.id}</td>
                <td className="border border-gray-300 px-3 py-2">{student.maths}</td>
                <td className="border border-gray-300 px-3 py-2">{student.science}</td>
                <td className="border border-gray-300 px-3 py-2">{student.english}</td>
                <td className="border border-gray-300 px-3 py-2">{student.social}</td>
                <td className="border border-gray-300 px-3 py-2">{student.computer}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-gray-500 py-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UnitTestResults;
