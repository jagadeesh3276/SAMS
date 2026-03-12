import React, { useState } from "react";
import { Link } from "react-router-dom";


const ExamManagement = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      class: "10A",
      category: "Midterm",
      date: "2025-09-10",
      time: "10:00",
    },
    {
      id: 2,
      class: "9B",
      category: "Unit Test",
      date: "2025-09-12",
      time: "14:00",
    },
  ]);

  // Add Exam
  const handleAddExam = (e) => {
    e.preventDefault();
    const classVal = e.target.classVal.value;
    const categoryVal = e.target.category.value;
    const dateVal = e.target.date.value;
    const timeVal = e.target.time.value;

    const newExam = {
      id: exams.length + 1,
      class: classVal,
      category: categoryVal,
      date: dateVal,
      time: timeVal,
    };
    setExams([...exams, newExam]);
    e.target.reset();
  };

  // Edit Exam
  const editExam = (index) => {
    const updatedExams = [...exams];
    const exam = updatedExams[index];

    const cls = prompt("Edit Class:", exam.class);
    const category = prompt(
      "Edit Exam Category (Unit Test / Midterm / Final Exam):",
      exam.category
    );
    const date = prompt("Edit Date (YYYY-MM-DD):", exam.date);
    const time = prompt("Edit Time (HH:MM):", exam.time);

    if (cls && category && date && time) {
      updatedExams[index] = {
        ...exam,
        class: cls,
        category,
        date,
        time,
      };
      setExams(updatedExams);
    }
  };

  // Send Notification
  const sendNotification = (message) => {
    alert("📢 Notification sent to parents:\n\n" + message);
  };

  return (
    <div className="mt-20 ml-64 p-5">
      <h1 className="text-center text-gray-800 text-2xl font-semibold mb-5">
        Exam Scheduling & Notifications
      </h1>

      {/* Results Button */}
      <div className="flex justify-end mb-3">
        <Link
          to="/examresults"
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800"
        >
          📊 Results
        </Link>
      </div>

      {/* Add Exam Form */}
      <div className="mb-5 bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-blue-600 mb-3">
          Add New Exam
        </h2>
        <form onSubmit={handleAddExam} className="flex flex-wrap gap-3">
          <label className="font-medium">Class:</label>
          <input
            type="text"
            name="classVal"
            required
            className="border p-2 rounded-md"
          />
          <label className="font-medium">Exam Category:</label>
          <select
            name="category"
            required
            className="border p-2 rounded-md"
          >
            <option value="">-- Select --</option>
            <option value="Unit Test">Unit Test</option>
            <option value="Midterm">Midterm</option>
            <option value="Final Exam">Final Exam</option>
          </select>
          <label className="font-medium">Date:</label>
          <input
            type="date"
            name="date"
            required
            className="border p-2 rounded-md"
          />
          <label className="font-medium">Time:</label>
          <input
            type="time"
            name="time"
            required
            className="border p-2 rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800"
          >
            Add Exam
          </button>
        </form>
      </div>

      {/* Exam Schedule Table */}
      <table className="w-full border-collapse bg-white shadow-md mb-5">
        <thead>
          <tr>
            <th className="p-3 border bg-blue-600 text-white">S.No</th>
            <th className="p-3 border bg-blue-600 text-white">Class</th>
            <th className="p-3 border bg-blue-600 text-white">Exam Category</th>
            <th className="p-3 border bg-blue-600 text-white">Date</th>
            <th className="p-3 border bg-blue-600 text-white">Time</th>
            <th className="p-3 border bg-blue-600 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam, index) => (
            <tr key={exam.id}>
              <td className="p-3 border text-center">{exam.id}</td>
              <td className="p-3 border text-center">{exam.class}</td>
              <td className="p-3 border text-center">{exam.category}</td>
              <td className="p-3 border text-center">{exam.date}</td>
              <td className="p-3 border text-center">{exam.time}</td>
              <td className="p-3 border text-center">
                <span
                  className="text-blue-600 font-semibold cursor-pointer hover:underline mr-2"
                  onClick={() =>
                    sendNotification(
                      `${exam.class} - ${exam.category} scheduled for ${exam.date} at ${exam.time}`
                    )
                  }
                >
                  🔔 Notify
                </span>
                <button
                  onClick={() => editExam(index)}
                  className="px-3 py-1 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-800"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamManagement;
