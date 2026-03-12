import React, { useState, useEffect } from "react";

// Sample data pools
const roles = ["Teacher", "Driver", "Cleaner", "Admin", "Security Guard", "Librarian"];
const names = ["Ramesh", "Amith", "Hari", "Kavya", "Rajesh", "Priya", "Manoj", "Sneha", "Suresh", "Anjali"];
const departments = ["Science", "Social", "Mathematics", "Administration", "Route 1", "Route 2", "Campus", "Library"];
const genders = ["Male", "Female"];
const images = [
  "images/undraw_male-avatar_zkzx.svg",
  "Images/undraw_female-avatar_7t6k.svg",
];

// Generate random integer between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate random staff data
const generateStaffData = (count = 20) => {
  return Array.from({ length: count }, (_, i) => ({
    sno: i + 1,
    id: `${roles[randomInt(0, roles.length - 1)].charAt(0)}${100 + i}`,
    name: `${genders[randomInt(0, 1)] === "Male" ? "Mr." : "Ms."} ${names[randomInt(0, names.length - 1)]}`,
    gender: genders[randomInt(0, 1)],
    role: roles[randomInt(0, roles.length - 1)],
    dept: departments[randomInt(0, departments.length - 1)],
    contact: "9876543" + randomInt(100, 999),
    attendance: randomInt(50, 100),
    img: images[randomInt(0, images.length - 1)],
  }));
};

const Performance = () => {
  const [filterRole, setFilterRole] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    setStaffData(generateStaffData(20)); // generate 20 random staff records
  }, []);

  const filteredStaff = staffData.filter(
    (staff) =>
      (filterRole === "all" || staff.role === filterRole) &&
      staff.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openModal = (staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getPerformanceClass = (attendance) => {
    if (attendance >= 90) return "text-green-600 font-bold";
    if (attendance >= 75) return "text-yellow-500 font-bold";
    if (attendance >= 50) return "text-red-600 font-bold";
    return "text-gray-500 font-bold";
  };

  const getPerformanceLabel = (attendance) => {
    if (attendance >= 90) return "Best";
    if (attendance >= 75) return "Good";
    if (attendance >= 50) return "Average";
    return "Poor";
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <h2 className="text-center text-2xl font-bold text-blue-600 mt-20 mb-5">
        👥 📊 Performance Dashboard
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-5 text-sm">
        <label className="flex flex-col items-start">
          <span className="font-bold">Role:</span>
          <select
            className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All</option>
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col items-start">
          <span className="font-bold">Search Name:</span>
          <input
            type="text"
            placeholder="Enter name..."
            className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full mx-auto bg-white rounded shadow-md w-240 ml-60">
          <thead className="bg-blue-600 text-white text-sm">
            <tr>
              <th className="p-2">SNO</th>
              <th className="p-2">Staff ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Role</th>
              <th className="p-2">Department / Area</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Attendance (%)</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr
                key={staff.id}
                className="hover:bg-blue-100 cursor-pointer text-center"
              >
                <td className="p-2">{staff.sno}</td>
                <td className="p-2">{staff.id}</td>
                <td className="p-2">{staff.name}</td>
                <td className="p-2">{staff.gender}</td>
                <td className="p-2">{staff.role}</td>
                <td className="p-2">{staff.dept}</td>
                <td className="p-2">{staff.contact}</td>
                <td className={`p-2 ${getPerformanceClass(staff.attendance)}`}>
                  {staff.attendance}
                </td>
                <td className="p-2">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => openModal(staff)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tailwind Modal */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-5 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              ✖
            </button>
            <h3 className="text-xl font-bold mb-4">Staff Performance Report</h3>
            <div className="flex flex-wrap gap-5 mb-4">
              <div className="flex-1 min-w-[180px]">
                <p><b>Staff ID:</b> {selectedStaff.id}</p>
                <p><b>Name:</b> {selectedStaff.name}</p>
                <p><b>Role:</b> {selectedStaff.role}</p>
                <p><b>Department:</b> {selectedStaff.dept}</p>
                <p><b>Contact:</b> {selectedStaff.contact}</p>
                <p><b>Attendance:</b> {selectedStaff.attendance}%</p>
              </div>
              <div className="text-center">
                <img
                  src={selectedStaff.img}
                  alt="Staff"
                  className="w-36 h-36 rounded-full border-2 border-blue-600 mx-auto mb-2 object-cover"
                />
                <p className="font-bold">{selectedStaff.name}</p>
              </div>
            </div>
            <p>
              <b>Overall Performance:</b>{" "}
              <span className={getPerformanceClass(selectedStaff.attendance)}>
                {getPerformanceLabel(selectedStaff.attendance)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Performance;
