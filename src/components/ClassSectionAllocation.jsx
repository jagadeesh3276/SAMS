import React, { useState } from "react";

const ClassSectionAllocation = () => {
  // Initial Class Data
  const [classData, setClassData] = useState([
    { sno: 1, class: "10", section: "A", strength: 3, capacity: 40 },
    { sno: 2, class: "10", section: "B", strength: 2, capacity: 40 },
    { sno: 3, class: "9", section: "A", strength: 2, capacity: 35 },
  ]);

  // Students Data mapped by class-section
  const [studentsData, setStudentsData] = useState({
    "10-A": [
      { sno: 1, id: "STD101", name: "Alice Johnson", attendance: "Present", date: "2025-08-22" },
      { sno: 2, id: "STD102", name: "Bob Smith", attendance: "Absent", date: "2025-08-22" },
      { sno: 3, id: "STD103", name: "Charlie Brown", attendance: "Present", date: "2025-08-22" },
    ],
    "10-B": [
      { sno: 1, id: "STD201", name: "David Lee", attendance: "Present", date: "2025-08-22" },
      { sno: 2, id: "STD202", name: "Eva Green", attendance: "Present", date: "2025-08-22" },
    ],
    "9-A": [
      { sno: 1, id: "STD301", name: "Frank Miller", attendance: "Absent", date: "2025-08-22" },
      { sno: 2, id: "STD302", name: "Grace Kim", attendance: "Present", date: "2025-08-22" },
    ],
  });

  const [filteredData, setFilteredData] = useState(classData);
  const [searchText, setSearchText] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [popupData, setPopupData] = useState([]);
  const [popupTitle, setPopupTitle] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  // Form state for adding new class
  const [newClass, setNewClass] = useState("");
  const [newSection, setNewSection] = useState("");
  const [newStrength, setNewStrength] = useState("");
  const [newCapacity, setNewCapacity] = useState("");

  // Filter table
  const filterTable = () => {
    const data = classData.filter((item) => {
      const classMatch = selectedClass ? item.class === selectedClass : true;
      const sectionMatch = selectedSection ? item.section === selectedSection : true;
      const searchMatch =
        item.class.toLowerCase().includes(searchText.toLowerCase()) ||
        item.section.toLowerCase().includes(searchText.toLowerCase());
      return classMatch && sectionMatch && searchMatch;
    });
    setFilteredData(data);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterTable();
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    filterTable();
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    filterTable();
  };

  // View Class Details
  const viewDetails = (classSection) => {
    setPopupTitle(`Class ${classSection} - Student Details`);

    // If students for this class-section do not exist, generate dummy data
    if (!studentsData[classSection]) {
      const [cls, sec] = classSection.split("-");
      const classInfo = classData.find(
        (c) => c.class === cls && c.section === sec
      );
      const newStudents = [];
      for (let i = 1; i <= classInfo.strength; i++) {
        newStudents.push({
          sno: i,
          id: `STD${Math.floor(Math.random() * 1000 + 1)}`,
          name: `Student ${i}`,
          attendance: Math.random() > 0.5 ? "Present" : "Absent",
          date: new Date().toISOString().split("T")[0],
        });
      }
      setStudentsData((prev) => ({ ...prev, [classSection]: newStudents }));
      setPopupData(newStudents);
    } else {
      setPopupData(studentsData[classSection]);
    }

    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  // Add Class Popup
  const openAddPopup = () => setShowAddPopup(true);
  const closeAddPopup = () => setShowAddPopup(false);

  const handleAddClass = (e) => {
    e.preventDefault();
    const newSno = classData.length + 1;
    const newEntry = {
      sno: newSno,
      class: newClass,
      section: newSection,
      strength: parseInt(newStrength),
      capacity: parseInt(newCapacity),
    };
    const updatedData = [...classData, newEntry];
    setClassData(updatedData);
    setFilteredData(updatedData);
    setNewClass("");
    setNewSection("");
    setNewStrength("");
    setNewCapacity("");
    setShowAddPopup(false);
  };

  return (
    <div className="ml-[250px] mt-[90px] p-5 flex-1 overflow-x-auto">
      <h2 className="text-center mb-5 text-gray-800 text-2xl font-semibold">
        Class & Section Allocation
      </h2>

      {/* Search Box and Filters */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Search by class or section..."
          value={searchText}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded p-2 w-52"
        />
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">All Classes</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>
        <select
          value={selectedSection}
          onChange={handleSectionChange}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">All Sections</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
        </select>

        {/* Add Class Button */}
        <button
          className="ml-auto bg-green-600 hover:bg-green-800 text-white rounded px-4 py-2"
          onClick={openAddPopup}
        >
          Add Class
        </button>
      </div>

      {/* Table */}
      <table className="w-full border-collapse shadow bg-white">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="p-3 border">S.No</th>
            <th className="p-3 border">Class</th>
            <th className="p-3 border">Section</th>
            <th className="p-3 border">Strength</th>
            <th className="p-3 border">Vacancy</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => {
            const vacancy = Math.max(item.capacity - item.strength, 0);
            return (
              <tr key={item.sno}>
                <td className="p-3 border text-center">{item.sno}</td>
                <td className="p-3 border text-center">{item.class}</td>
                <td className="p-3 border text-center">{item.section}</td>
                <td className="p-3 border text-center">{item.strength}</td>
                <td className="p-3 border text-center">{vacancy}</td>
                <td className="p-3 border text-center">
                  <button
                    className="bg-blue-600 hover:bg-blue-800 text-white rounded px-3 py-1"
                    onClick={() =>
                      viewDetails(`${item.class}-${item.section}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Student Details Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-lg w-full max-w-3xl overflow-x-auto">
            <h3 className="text-xl font-semibold mb-4">{popupTitle}</h3>
            <table className="w-full border-collapse shadow bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">S.No</th>
                  <th className="p-2 border">Student ID</th>
                  <th className="p-2 border">Student Name</th>
                  <th className="p-2 border">Attendance</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {popupData.length > 0 ? (
                  popupData.map((std) => (
                    <tr key={std.sno}>
                      <td className="p-2 border text-center">{std.sno}</td>
                      <td className="p-2 border text-center">{std.id}</td>
                      <td className="p-2 border text-center">{std.name}</td>
                      <td className="p-2 border text-center">{std.attendance}</td>
                      <td className="p-2 border text-center">{std.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-2 border text-center" colSpan="5">
                      No student data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-800 text-white rounded px-4 py-2"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Class Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Add Class & Section</h3>
            <form onSubmit={handleAddClass} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Class"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
                className="border border-gray-300 rounded p-2"
                required
              />
              <input
                type="text"
                placeholder="Section"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                className="border border-gray-300 rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="Strength"
                value={newStrength}
                onChange={(e) => setNewStrength(e.target.value)}
                className="border border-gray-300 rounded p-2"
                required
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newCapacity}
                onChange={(e) => setNewCapacity(e.target.value)}
                className="border border-gray-300 rounded p-2"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white rounded px-4 py-2"
                  onClick={closeAddPopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-800 text-white rounded px-4 py-2"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassSectionAllocation;
