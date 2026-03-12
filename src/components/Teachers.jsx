import React, { useState } from "react";

const Teachers = () => {
  const [activeTab, setActiveTab] = useState("dayTable");
  const [teachers, setTeachers] = useState([
    { id: "T001", name: "Mr. Ashok", gender: "Male", department: "Telugu", contact: "9876543210", dayStatus: "Present", weekStatus: "5/7", monthStatus: "27/31" },
    { id: "T002", name: "Mr. Ram", gender: "Male", department: "Telugu", contact: "9876543220", dayStatus: "Present", weekStatus: "4/7", monthStatus: "26/31" },
    { id: "T003", name: "Ms. Ramya", gender: "Female", department: "Hindi", contact: "9876543230", dayStatus: "Present", weekStatus: "6/7", monthStatus: "28/31" },
    { id: "T004", name: "Ms. Shibani", gender: "Female", department: "Hindi", contact: "9876543240", dayStatus: "Absent", weekStatus: "5/7", monthStatus: "22/31" },
    { id: "T005", name: "Mr. Anjith", gender: "Male", department: "English", contact: "9876543250", dayStatus: "Present", weekStatus: "6/7", monthStatus: "21/31" },
    { id: "T006", name: "Ms. Anu", gender: "Female", department: "English", contact: "9876543260", dayStatus: "Present", weekStatus: "6/7", monthStatus: "27/31" },
  ]);

  const [filterRole, setFilterRole] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [teacherCount, setTeacherCount] = useState(6);
  const [newTeacher, setNewTeacher] = useState({ name: "", gender: "Male", department: "Telugu", contact: "" });
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTeachers = teachers.filter(t => {
    const matchesRole = filterRole === "all" || t.department.toLowerCase() === filterRole.toLowerCase();
    const matchesName = t.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesRole && matchesName;
  });

  const handleAddTeacherChange = (e) => {
    const { id, value } = e.target;
    setNewTeacher(prev => ({ ...prev, [id]: value }));
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();
    const newId = "T" + String(teacherCount + 1).padStart(3, "0");
    const newEntry = {
      id: newId,
      name: newTeacher.name,
      gender: newTeacher.gender,
      department: newTeacher.department,
      contact: newTeacher.contact,
      dayStatus: "Present",
      weekStatus: "0/7",
      monthStatus: "0/31"
    };
    setTeachers([...teachers, newEntry]);
    setTeacherCount(prev => prev + 1);
    setNewTeacher({ name: "", gender: "Male", department: "Telugu", contact: "" });
    setModalOpen(false);
  };

  return (
    <div className="ml-60 mt-20 p-5">
      <h2 className="text-center mb-3 text-xl font-bold">Teachers Attendance Overview</h2>

      {/* Add Teacher Button */}
      <div className="text-right mb-3">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setModalOpen(true)}
        >
          ➕ Add Teacher
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-5 relative">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setModalOpen(false)}>✕</button>
            <h5 className="text-lg font-bold mb-3">Add Teacher</h5>
            <form onSubmit={handleAddTeacher}>
              <div className="mb-2">
                <label className="block mb-1">Name</label>
                <input type="text" className="border w-full px-2 py-1 rounded" id="name" value={newTeacher.name} onChange={handleAddTeacherChange} required />
              </div>
              <div className="mb-2">
                <label className="block mb-1">Gender</label>
                <select className="border w-full px-2 py-1 rounded" id="gender" value={newTeacher.gender} onChange={handleAddTeacherChange}>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Department</label>
                <select className="border w-full px-2 py-1 rounded" id="department" value={newTeacher.department} onChange={handleAddTeacherChange}>
                  <option>Telugu</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Maths</option>
                  <option>Science</option>
                  <option>Social</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block mb-1">Contact</label>
                <input type="text" className="border w-full px-2 py-1 rounded" id="contact" value={newTeacher.contact} onChange={handleAddTeacherChange} required />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Teacher</button>
            </form>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex justify-center mb-5">
        <button className={`px-4 py-2 mx-2 rounded ${activeTab === "dayTable" ? "bg-blue-600 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("dayTable")}>Day-wise</button>
        <button className={`px-4 py-2 mx-2 rounded ${activeTab === "weekTable" ? "bg-blue-600 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("weekTable")}>Week-wise</button>
        <button className={`px-4 py-2 mx-2 rounded ${activeTab === "monthTable" ? "bg-blue-600 text-white" : "bg-gray-300"}`} onClick={() => setActiveTab("monthTable")}>Month-wise</button>
      </div>

      {/* Filters */}
      <div className="text-center mb-5">
        <label className="font-semibold mr-2">Filter by Subject:</label>
        <select className="border px-2 py-1 rounded" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">All</option>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Maths">Maths</option>
          <option value="Science">Science</option>
          <option value="Social">Social</option>
        </select>
        <span className="mx-4 font-semibold">Search by Name:</span>
        <input type="text" placeholder="Enter Name..." className="border px-2 py-1 rounded" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>

      {/* Tables */}
      {activeTab === "dayTable" && (
        <Table data={filteredTeachers} statusKey="dayStatus" />
      )}
      {activeTab === "weekTable" && (
        <Table data={filteredTeachers} statusKey="weekStatus" />
      )}
      {activeTab === "monthTable" && (
        <Table data={filteredTeachers} statusKey="monthStatus" />
      )}
    </div>
  );
};

// Table Component
const Table = ({ data, statusKey }) => (
  <table className="min-w-full border-collapse shadow-lg rounded-lg overflow-hidden mb-6">
    <thead className="bg-blue-600 text-white text-sm">
      <tr>
        <th className="p-3 border">SNO</th>
        <th className="p-3 border">Staff ID</th>
        <th className="p-3 border">Name</th>
        <th className="p-3 border">Gender</th>
        <th className="p-3 border">Role</th>
        <th className="p-3 border">Department</th>
        <th className="p-3 border">Contact</th>
        <th className="p-3 border">Status</th>
      </tr>
    </thead>
    <tbody>
      {data.map((t, idx) => (
        <tr key={t.id}>
          <td className="p-3 border">{idx + 1}</td>
          <td className="p-3 border">{t.id}</td>
          <td className="p-3 border">{t.name}</td>
          <td className="p-3 border">{t.gender}</td>
          <td className="p-3 border">Teacher</td>
          <td className="p-3 border">{t.department}</td>
          <td className="p-3 border">{t.contact}</td>
          <td className={`p-3 border font-bold ${t[statusKey] === "Present" || t[statusKey]?.includes("/") ? "text-green-600" : "text-red-600"}`}>{t[statusKey]}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Teachers;
