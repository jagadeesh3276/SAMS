// Sidebar.jsx (UI Updated as per reference design)
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = (menu) => {
    setActiveMenu((prev) => (prev === menu ? "" : menu));
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed top-20 left-5 z-50 md:hidden bg-purple-600 text-white p-2 rounded shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[83px] left-0 w-[250px] h-[calc(100%-70px)] bg-white text-gray-700 pt-6 overflow-y-auto shadow-xl border-r border-gray-200 transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Dashboard */}
        <button
          onClick={() => toggleMenu("dashboard")}
          className={`w-full flex justify-between items-center px-5 py-3 text-[15px] font-medium transition-all duration-300 hover:bg-purple-50
            ${activeMenu === "dashboard" ? "bg-purple-100 text-purple-600 font-semibold" : ""}`}
        >
          <span className="flex items-center gap-2">🏠 Dashboard</span>
          <span className="text-sm">▼</span>
        </button>

        <div
          className={`bg-purple-50 overflow-hidden transition-max-h duration-300 ml-3 border-l border-purple-200
            ${activeMenu === "dashboard" ? "max-h-[600px]" : "max-h-0"}`}
        >
          <Link to="/dashboard" className="block px-8 py-2 text-[14px] hover:text-purple-600">All Campus</Link>
          <Link to="/bhimavaram" className="block px-8 py-2 text-[14px] hover:text-purple-600">Bhimavaram</Link>
          <Link to="/palakollu" className="block px-8 py-2 text-[14px] hover:text-purple-600">Palakollu</Link>
        </div>

        {/* Application & Admission Form */}
        <Link to="/applicationform" className="block px-5 py-3 text-[15px] font-medium hover:bg-purple-50">
          📝 Application Form
        </Link>
        <Link to="/onlineentranceexam" className="block px-5 py-3 text-[15px] font-medium hover:bg-purple-50">
          🖥️ Online Exam
        </Link>
        <Link to="/admissionsystem" className="block px-5 py-3 text-[15px] font-medium hover:bg-purple-50">
          🧾 Admission Form
        </Link>

        {/* Employee Management */}
        <button
          onClick={() => toggleMenu("employee")}
          className={`w-full flex justify-between items-center px-5 py-3 text-[15px] font-medium hover:bg-purple-50
            ${activeMenu === "employee" ? "bg-purple-100 text-purple-600 font-semibold" : ""}`}
        >
          <span className="flex items-center gap-2">👥 Employee Management</span>
          <span className="text-sm">▼</span>
        </button>

        <div
          className={`bg-purple-50 overflow-hidden transition-max-h duration-300 ml-3 border-l border-purple-200
            ${activeMenu === "employee" ? "max-h-[600px]" : "max-h-0"}`}
        >
          <Link to="/staff" className="block px-8 py-2 text-[14px] hover:text-purple-600">Staff</Link>
          <Link to="/teachers" className="block px-8 py-2 text-[14px] hover:text-purple-600">Teachers</Link>
          <Link to="/offerletter" className="block px-8 py-2 text-[14px] hover:text-purple-600">Offer Letter</Link>
          <Link to="/idcardgenerator" className="block px-8 py-2 text-[14px] hover:text-purple-600">ID Card</Link>
          <Link to="/payroll" className="block px-8 py-2 text-[14px] hover:text-purple-600">Pay Roll</Link>
        </div>

        {/* Student Management */}
        <button
          onClick={() => toggleMenu("student")}
          className={`w-full flex justify-between items-center px-5 py-3 text-[15px] font-medium hover:bg-purple-50
            ${activeMenu === "student" ? "bg-purple-100 text-purple-600 font-semibold" : ""}`}
        >
          <span className="flex items-center gap-2">🎓 Student Management</span>
          <span className="text-sm">▼</span>
        </button>

        <div
          className={`bg-purple-50 overflow-hidden transition-max-h duration-300 ml-3 border-l border-purple-200
            ${activeMenu === "student" ? "max-h-[600px]" : "max-h-0"}`}
        >
          <Link to="/classsectionallocation" className="block px-8 py-2 text-[14px] hover:text-purple-600">Class & Section Allocation</Link>
          <Link to="/attendance" className="block px-8 py-2 text-[14px] hover:text-purple-600">Attendance</Link>
          <Link to="/studentperformance" className="block px-8 py-2 text-[14px] hover:text-purple-600">Performance</Link>
        </div>

        {/* Academic */}
        <button
          onClick={() => toggleMenu("academic")}
          className={`w-full flex justify-between items-center px-5 py-3 text-[15px] font-medium hover:bg-purple-50
            ${activeMenu === "academic" ? "bg-purple-100 text-purple-600 font-semibold" : ""}`}
        >
          <span className="flex items-center gap-2">📚 Academic & Syllabus</span>
          <span className="text-sm">▼</span>
        </button>

        <div
          className={`bg-purple-50 overflow-hidden transition-max-h duration-300 ml-3 border-l border-purple-200
            ${activeMenu === "academic" ? "max-h-[600px]" : "max-h-0"}`}
        >
          <Link to="/academiccalendar" className="block px-8 py-2 text-[14px] hover:text-purple-600">Academic Calendar</Link>
          <Link to="/syllabustracker" className="block px-8 py-2 text-[14px] hover:text-purple-600">Subject Wise Syllabus</Link>
          <Link to="/teachingplan" className="block px-8 py-2 text-[14px] hover:text-purple-600">Daily/Weekly Plan of Teaching</Link>
        </div>

        {/* Inventory */}
        <button
          onClick={() => toggleMenu("inventory")}
          className={`w-full flex justify-between items-center px-5 py-3 text-[15px] font-medium hover:bg-purple-50
            ${activeMenu === "inventory" ? "bg-purple-100 text-purple-600 font-semibold" : ""}`}
        >
          <span className="flex items-center gap-2">📦 Inventory</span>
          <span className="text-sm">▼</span>
        </button>

        <div
          className={`bg-purple-50 overflow-hidden transition-max-h duration-300 ml-3 border-l border-purple-200
            ${activeMenu === "inventory" ? "max-h-[1000px]" : "max-h-0"}`}
        >
          <Link to="/stationarytable" className="block px-8 py-2 text-[14px] hover:text-purple-600">Stationary</Link>
          <Link to="/uniformtable" className="block px-8 py-2 text-[14px] hover:text-purple-600">Uniforms</Link>
          <Link to="/extracurriculartable" className="block px-8 py-2 text-[14px] hover:text-purple-600">Sports & Activities</Link>
          <Link to="/other-supplies" className="block px-8 py-2 text-[14px] hover:text-purple-600">Other Products</Link>
          <Link to="/inhousetable" className="block px-8 py-2 text-[14px] hover:text-purple-600">Maintenance Products</Link>
          <Link to="/incomedashboard" className="block px-8 py-2 text-[14px] hover:text-purple-600">Income</Link>
          <Link to="/expendituredashboard" className="block px-8 py-2 text-[14px] hover:text-purple-600">Expenditure</Link>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
