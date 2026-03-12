import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentPortfolio from "../components/StudentPortfolio";

const Attendance = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([
    { id: "1001", name: "Rahul Sharma", class: "10", section: "A", attendance: "Present", date: "2025-08-20" },
    { id: "1002", name: "Priya Verma", class: "10", section: "B", attendance: "Absent", date: "2025-08-20" },
    { id: "1003", name: "Amit Kumar", class: "9", section: "A", attendance: "Present", date: "2025-08-20" },
    { id: "1004", name: "Sneha Patel", class: "8", section: "C", attendance: "Present", date: "2025-08-20" },
    { id: "1005", name: "Ravi Teja", class: "9", section: "B", attendance: "Absent", date: "2025-08-20" },
  ]);

  const [formData, setFormData] = useState({
    newStudentID: "",
    newStudentName: "",
    newClass: "",
    newSection: "",
    newAttendance: "",
    newDate: ""
  });

  const [searchID, setSearchID] = useState("");
  const [searchClass, setSearchClass] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleAddAttendance = (e) => {
    e.preventDefault();
    const { newStudentID, newStudentName, newClass, newSection, newAttendance, newDate } = formData;

    if (!newStudentID || !newStudentName || !newClass || !newSection || !newAttendance || !newDate) {
      alert("Please fill in all fields");
      return;
    }

    setStudents([
      ...students,
      { id: newStudentID, name: newStudentName, class: newClass, section: newSection, attendance: newAttendance, date: newDate }
    ]);

    setFormData({
      newStudentID: "",
      newStudentName: "",
      newClass: "",
      newSection: "",
      newAttendance: "",
      newDate: ""
    });
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.id.toLowerCase().includes(searchID.toLowerCase()) &&
      (searchClass === "" || student.class === searchClass)
    );
  });

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
    if (e.target.value) {
      setStudents((prev) => prev.map((s) => ({ ...s, date: e.target.value })));
    }
  };

  return (
    <div className="ml-[250px] mt-[100px] p-5 flex-1">
      <h2 className="text-center mb-5 text-gray-800 text-2xl font-semibold">Student Attendance</h2>

      {/* Attendance Form
      <div className="bg-white p-4 rounded-lg mb-5 shadow-md">
        <form className="flex flex-wrap gap-2 justify-center" onSubmit={handleAddAttendance}>
          <input type="text" id="newStudentID" placeholder="Student ID" value={formData.newStudentID} onChange={handleFormChange} className="p-2 border border-gray-300 rounded-md text-sm" required />
          <input type="text" id="newStudentName" placeholder="Student Name" value={formData.newStudentName} onChange={handleFormChange} className="p-2 border border-gray-300 rounded-md text-sm" required />
          <select id="newClass" value={formData.newClass} onChange={handleFormChange} className="p-2 border border-gray-300 rounded-md text-sm" required>
            <option value="">Select Class</option>
            <option value="10">Class 10</option>
            <option value="9">Class 9</option>
            <option value="8">Class 8</option>
          </select>
          <select id="newSection" value={formData.newSection} onChange={handleFormChange} className="p-2 border border-gray-300 rounded-md text-sm" required>
            <option value="">Select Section</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <select id="newAttendance" value={formData.newAttendance} onChange={handleFormChange} className="p-2 border border-gray-300 rounded-md text-sm" required>
            <option value="">Select Attendance</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
          <input type="date" id="newDate" value={formData.newDate} onChange={handleFormChange} className="p-2 border border-gray-300 rounded-md text-sm" required />
          <button type="submit" className="p-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">Add Attendance</button>
        </form>
      </div> */}

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <input type="text" placeholder="Search by Student ID" value={searchID} onChange={(e) => setSearchID(e.target.value)} className="p-2 border border-gray-300 rounded-md text-sm" />
        <select value={searchClass} onChange={(e) => setSearchClass(e.target.value)} className="p-2 border border-gray-300 rounded-md text-sm">
          <option value="">All Classes</option>
          <option value="10">Class 10</option>
          <option value="9">Class 9</option>
          <option value="8">Class 8</option>
        </select>
        <input type="date" value={searchDate} onChange={handleDateChange} className="p-2 border border-gray-300 rounded-md text-sm" />
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-[400px] border border-gray-300 rounded-lg bg-white">
        <table className="w-full min-w-[850px] border-collapse">
          <thead className="bg-blue-600 text-white sticky top-0 z-10">
            <tr>
              <th className="p-2">S.No</th>
              <th className="p-2">Student ID</th>
              <th className="p-2">Student Name</th>
              <th className="p-2">Class</th>
              <th className="p-2">Section</th>
              <th className="p-2">Attendance</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="hover:bg-blue-50">
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2 text-center">{student.id}</td>
                <td className="p-2 text-center">{student.name}</td>
                <td className="p-2 text-center">{student.class}</td>
                <td className="p-2 text-center">{student.section}</td>
                <td className="p-2 text-center">{student.attendance}</td>
                <td className="p-2 text-center">{student.date}</td>
                <td className="p-2 text-center">
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                    // onClick={() => navigate("/studentportfolio")}
                      onClick={() => navigate("/studentportfolio")}
                  >
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

export default Attendance;
