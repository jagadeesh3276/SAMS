import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Examresults = () => {
  useEffect(() => {
    const examFilter = document.getElementById("examFilter");
    const classFilter = document.getElementById("classFilter");
    const sectionFilter = document.getElementById("sectionFilter");
    const table = document
      .getElementById("resultsTable")
      .getElementsByTagName("tbody")[0];
    const noDataMsg = document.getElementById("noData");

    function updateSerialNumbers() {
      let rows = table.getElementsByTagName("tr");
      let count = 1;
      for (let row of rows) {
        if (row.style.display !== "none") {
          row.cells[0].textContent = count++;
        }
      }
    }

    function filterResults() {
      let examVal = examFilter.value;
      let classVal = classFilter.value;
      let sectionVal = sectionFilter.value;
      let rows = table.getElementsByTagName("tr");
      let visible = 0;

      for (let row of rows) {
        let examName = row.cells[1].textContent;
        let className = row.cells[2].textContent;
        let sectionName = row.cells[3].textContent;

        let matchExam = examVal === "" || examVal === examName;
        let matchClass = classVal === "" || classVal === className;
        let matchSection = sectionVal === "" || sectionVal === sectionName;

        if (matchExam && matchClass && matchSection) {
          row.style.display = "";
          visible++;
        } else {
          row.style.display = "none";
        }
      }

      noDataMsg.style.display = visible === 0 ? "block" : "none";
      updateSerialNumbers();
    }

    examFilter.addEventListener("change", filterResults);
    classFilter.addEventListener("change", filterResults);
    sectionFilter.addEventListener("change", filterResults);

    updateSerialNumbers();

    return () => {
      examFilter.removeEventListener("change", filterResults);
      classFilter.removeEventListener("change", filterResults);
      sectionFilter.removeEventListener("change", filterResults);
    };
  }, []);

  return (
    <div className="ml-[230px] mt-[75px] p-5">
      <h2 className="text-center text-gray-800 font-semibold text-xl">📊 Results</h2>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-5 flex-wrap">
        <select
          id="examFilter"
          className="p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">All Exams</option>
          <option value="Unit Test">Unit Test</option>
          <option value="Midterm">Midterm</option>
          <option value="Final Exam">Final Exam</option>
        </select>
        <select
          id="classFilter"
          className="p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">All Classes</option>
          <option value="10">Class 10</option>
          <option value="9">Class 9</option>
          <option value="8">Class 8</option>
        </select>
        <select
          id="sectionFilter"
          className="p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
        </select>
      </div>

      {/* Results Table */}
      <table
        id="resultsTable"
       className="w-[98%] h-60 border-collapse bg-white shadow-md ml-4"

      >
        <thead>
          <tr>
            <th className="p-3 text-center bg-blue-600 text-white">S.No</th>
            <th className="p-3 text-center bg-blue-600 text-white">Exam</th>
            <th className="p-3 text-center bg-blue-600 text-white">Class</th>
            <th className="p-3 text-center bg-blue-600 text-white">Section</th>
            <th className="p-3 text-center bg-blue-600 text-white">Exam Date</th>
            <th className="p-3 text-center bg-blue-600 text-white">Class Pass %</th>
            <th className="p-3 text-center bg-blue-600 text-white">Maths %</th>
            <th className="p-3 text-center bg-blue-600 text-white">Science %</th>
            <th className="p-3 text-center bg-blue-600 text-white">English %</th>
            <th className="p-3 text-center bg-blue-600 text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td></td>
            <td>Unit Test</td>
            <td>10</td>
            <td>A</td>
            <td>2025-08-01</td>
            <td>85%</td>
            <td>90%</td>
            <td>80%</td>
            <td>88%</td>
            <td>
              <Link
               to="/unittestresults"
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-800"
              >
                View
              </Link>
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td></td>
            <td>Midterm</td>
            <td>9</td>
            <td>B</td>
            <td>2025-07-20</td>
            <td>78%</td>
            <td>75%</td>
            <td>80%</td>
            <td>79%</td>
            <td>
              <Link
               to="/unittestresults"
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-800"
              >
                View
              </Link>
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td></td>
            <td>Final Exam</td>
            <td>8</td>
            <td>C</td>
            <td>2025-07-10</td>
            <td>92%</td>
            <td>95%</td>
            <td>90%</td>
            <td>91%</td>
            <td>
             <Link
               to="/unittestresults"
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-800"
              >
                View
              </Link>
            </td>
          </tr>
          <tr className="hover:bg-gray-100">
            <td></td>
            <td>Unit Test</td>
            <td>10</td>
            <td>B</td>
            <td>2025-06-15</td>
            <td>81%</td>
            <td>85%</td>
            <td>78%</td>
            <td>80%</td>
            <td>
             <Link
               to="/unittestresults"
                className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-800"
              >
                View
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      <p
        id="noData"
        className="text-center p-5 text-gray-500 hidden"
      >
        No results found ❌
      </p>
    </div>
  );
};

export default Examresults;
