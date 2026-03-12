import React, { useState, useEffect, useRef } from "react";

const Staff = () => {
  const [activeTab, setActiveTab] = useState("dayTable");
  const [employees, setEmployees] = useState([
    { id: "T001", name: "Mr. Ramesh", gender: "Male", role: "Teacher", dept: "Science", contact: "9876543210", status: "Present" },
    { id: "T002", name: "Mr. Amith", gender: "Male", role: "Teacher", dept: "Social", contact: "9876543210", status: "Present" },
    { id: "D001", name: "Mr. Hari", gender: "Male", role: "Driver", dept: "Route 1", contact: "9876543212", status: "Present" },
    { id: "D002", name: "Mr. Vardhan", gender: "Male", role: "Driver", dept: "Route 4", contact: "987655678", status: "Absent" },
    { id: "C002", name: "Ms. Kavitha", gender: "Female", role: "Cleaner", dept: "Classrooms", contact: "9876543222", status: "Absent" },
    { id: "C003", name: "Ms. Kavi", gender: "Female", role: "Cleaner", dept: "Classrooms", contact: "9876543223", status: "Absent" },
  ]);

  const [filterRole, setFilterRole] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const nameRef = useRef();
  const genderRef = useRef();
  const roleRef = useRef();
  const deptRef = useRef();
  const contactRef = useRef();

  const filteredEmployees = employees.filter(
    (emp) =>
      (filterRole === "all" || emp.role === filterRole) &&
      emp.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const id = roleRef.current.value.charAt(0).toUpperCase() + Math.floor(Math.random() * 1000);
    const newEmp = {
      id,
      name: nameRef.current.value,
      gender: genderRef.current.value,
      role: roleRef.current.value,
      dept: deptRef.current.value,
      contact: contactRef.current.value,
      status: "Present",
    };
    setEmployees([...employees, newEmp]);
    setShowModal(false);
    e.target.reset();
  };

  const handleStatusChange = (id, value) => {
    setEmployees(
      employees.map((emp) => (emp.id === id ? { ...emp, status: value } : emp))
    );
  };

  const tabs = [
    { id: "dayTable", label: "Day-wise" },
    { id: "weekTable", label: "Week-wise" },
    { id: "monthTable", label: "Month-wise" },
  ];

  return (
    <div className="p-6 ml-0 md:ml-64 mt-20">
      <h2 className="text-2xl font-bold mb-4">Staff Overview</h2>

      <div className="text-right mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Employee
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600">Add New Employee</h3>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                X
              </button>
            </div>
            <form onSubmit={handleAddEmployee}>
              <label className="block mb-1 font-medium">Name</label>
              <input ref={nameRef} className="w-full border rounded px-2 py-1 mb-2" required />
              <label className="block mb-1 font-medium">Gender</label>
              <select ref={genderRef} className="w-full border rounded px-2 py-1 mb-2" required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <label className="block mb-1 font-medium">Role</label>
              <select ref={roleRef} className="w-full border rounded px-2 py-1 mb-2" required>
                <option value="">Select</option>
                <option>Teacher</option>
                <option>Driver</option>
                <option>Cleaner</option>
                <option>Admin</option>
                <option>Security</option>
                <option>Librarian</option>
              </select>
              <label className="block mb-1 font-medium">Department / Area</label>
              <input ref={deptRef} className="w-full border rounded px-2 py-1 mb-2" required />
              <label className="block mb-1 font-medium">Contact</label>
              <input ref={contactRef} className="w-full border rounded px-2 py-1 mb-4" required />
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
                Add Employee
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex mb-4 space-x-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded ${
              activeTab === tab.id ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-semibold">Filter by Role:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option>Teacher</option>
          <option>Driver</option>
          <option>Cleaner</option>
          <option>Admin</option>
          <option>Security</option>
          <option>Librarian</option>
        </select>
        <label className="font-semibold">Search by Name:</label>
        <input
          type="text"
          placeholder="Enter name..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {/* Tables */}
      {/* Day Table */}
      {activeTab === "dayTable" && (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 border">SNO</th>
              <th className="p-2 border">Staff ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, idx) => (
              <tr key={emp.id}>
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{emp.id}</td>
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.gender}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border">{emp.dept}</td>
                <td className="p-2 border">{emp.contact}</td>
                <td className="p-2 border">
                  <select
                    value={emp.status}
                    onChange={(e) => handleStatusChange(emp.id, e.target.value)}
                    className={`px-2 py-1 border rounded ${
                      emp.status === "Present" ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    <option>Present</option>
                    <option>Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Week Table */}
      {activeTab === "weekTable" && (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 border">SNO</th>
              <th className="p-2 border">Staff ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, idx) => (
              <tr key={emp.id}>
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{emp.id}</td>
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border">{emp.dept}</td>
                <td className="p-2 border">{emp.gender}</td>
                <td className="p-2 border">{emp.contact}</td>
                <td className="p-2 border">0/7</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Month Table */}
      {activeTab === "monthTable" && (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-2 border">SNO</th>
              <th className="p-2 border">Staff ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, idx) => (
              <tr key={emp.id}>
                <td className="p-2 border">{idx + 1}</td>
                <td className="p-2 border">{emp.id}</td>
                <td className="p-2 border">{emp.name}</td>
                <td className="p-2 border">{emp.role}</td>
                <td className="p-2 border">{emp.dept}</td>
                <td className="p-2 border">{emp.gender}</td>
                <td className="p-2 border">{emp.contact}</td>
                <td className="p-2 border">0/31</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Staff;
