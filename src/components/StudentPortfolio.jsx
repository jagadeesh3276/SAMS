import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const StudentPortfolio = () => {
  const marksChartRef = useRef(null);
  const attChartRef = useRef(null);
  let marksChart, attChart;

  // ===== Mock Data =====
  const student = {
    name: "Rohit Sharma",
    class: "10",
    section: "B",
    doj: "2021-06-12",
    branch: "Hyderabad",
    address: "#12-34, Plot 56, Kukatpally, Hyderabad",
    hostel: false,
    transport: true,
    feePaid: 50000,
    feePending: 10000,
    prevSchool: "Sunrise High School",
  };

  const examResults = [
    { year: 2022, examType: "Unit Test 1", subject: "Maths", marks: 42, total: 50, grade: "A" },
    { year: 2022, examType: "Unit Test 1", subject: "Science", marks: 39, total: 50, grade: "A" },
    { year: 2022, examType: "Half-Yearly", subject: "Maths", marks: 86, total: 100, grade: "A+" },
    { year: 2022, examType: "Half-Yearly", subject: "English", marks: 78, total: 100, grade: "A" },
    { year: 2022, examType: "Annual", subject: "Maths", marks: 90, total: 100, grade: "A+" },
    { year: 2022, examType: "Annual", subject: "Science", marks: 85, total: 100, grade: "A+" },
    { year: 2023, examType: "Unit Test 1", subject: "Maths", marks: 45, total: 50, grade: "A+" },
    { year: 2023, examType: "Unit Test 1", subject: "English", marks: 40, total: 50, grade: "A" },
    { year: 2023, examType: "Half-Yearly", subject: "Maths", marks: 92, total: 100, grade: "A+" },
    { year: 2023, examType: "Half-Yearly", subject: "Science", marks: 88, total: 100, grade: "A+" },
    { year: 2023, examType: "Annual", subject: "Maths", marks: 95, total: 100, grade: "A+" },
    { year: 2023, examType: "Annual", subject: "English", marks: 84, total: 100, grade: "A+" },
    { year: 2024, examType: "Unit Test 1", subject: "Maths", marks: 47, total: 50, grade: "A+" },
    { year: 2024, examType: "Unit Test 2", subject: "Maths", marks: 46, total: 50, grade: "A+" },
    { year: 2024, examType: "Half-Yearly", subject: "Maths", marks: 94, total: 100, grade: "A+" },
    { year: 2024, examType: "Half-Yearly", subject: "Science", marks: 89, total: 100, grade: "A+" },
    { year: 2024, examType: "Annual", subject: "Maths", marks: 96, total: 100, grade: "A+" },
    { year: 2024, examType: "Annual", subject: "Science", marks: 91, total: 100, grade: "A+" },
  ];

  const attendance = (() => {
    const data = [];
    const start = new Date("2024-06-01");
    const end = new Date("2025-08-15");
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const day = d.getDay();
      if (day === 0 || day === 6) continue; // Mon-Fri working
      const status = Math.random() < 0.93 ? "P" : "A";
      data.push({ date: new Date(d), status });
    }
    return data;
  })();

  const activities = [
    { year: 2022, name: "Science Fair", role: "Project Lead", result: "1st Prize" },
    { year: 2023, name: "Inter-school Cricket", role: "Vice Captain", result: "Semi-finalist" },
    { year: 2023, name: "Debate Competition", role: "Participant", result: "—" },
    { year: 2024, name: "Math Olympiad", role: "Participant", result: "Qualified Level 1" },
    { year: 2024, name: "Coding Hackathon (Jr.)", role: "Team Member", result: "2nd Prize" },
  ];

  // ===== Notification Handler =====
  const handleNotifyParent = () => {
    if (student.feePending > 0) {
      // Placeholder for sending notification to parent mobile app
      // In a real app, this would call an API to trigger a push notification
      console.log(`Sending notification to parent: Pending fee of ₹${student.feePending.toLocaleString("en-IN")} for ${student.name}`);
      alert(`Notification sent to parent for pending fee of ₹${student.feePending.toLocaleString("en-IN")}`);
    } else {
      alert("No pending fees to notify.");
    }
  };

  // ===== Chart Rendering (demo with sample) =====
  useEffect(() => {
    // Marks Chart (Line)
    if (marksChart) marksChart.destroy();
    marksChart = new Chart(marksChartRef.current, {
      type: "line",
      data: {
        labels: examResults.map((r) => r.year + " " + r.examType),
        datasets: [
          {
            label: "Marks %",
            data: examResults.map((r) => ((r.marks / r.total) * 100).toFixed(1)),
            borderColor: "#4f46e5",
          },
        ],
      },
      options: { responsive: true },
    });

    // Attendance Chart (Doughnut)
    const present = attendance.filter((a) => a.status === "P").length;
    const absent = attendance.length - present;
    if (attChart) attChart.destroy();
    attChart = new Chart(attChartRef.current, {
      type: "doughnut",
      data: {
        labels: ["Present", "Absent"],
        datasets: [{ data: [present, absent], backgroundColor: ["#22c55e", "#dc2626"] }],
      },
    });
  }, []);

  return (
    <div className="mt-24 ml-64 max-w-[calc(100%-270px)] p-6 bg-[#eef2ff]">
      {/* ===== Student Profile & Quick Stats ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-slate-300">
          <div className="flex justify-between items-center px-7 py-5 border-b bg-gradient-to-r from-slate-50 to-indigo-100">
            <h3 className="text-xl font-semibold">Student Profile</h3>
            <div className="flex gap-3">
              <label className="cursor-pointer border-2 border-dashed border-indigo-600 px-4 py-2 rounded-lg text-indigo-600">
                📷 Change Photo
                <input type="file" hidden />
              </label>
              {student.feePending > 0 && (
                <button
                  onClick={handleNotifyParent}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Notify Parent
                </button>
              )}
            </div>
          </div>
          <div className="p-7 flex gap-7 items-center">
            <img
              src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop"
              alt="Student"
              className="w-40 h-40 rounded-2xl border-4 border-indigo-600 object-cover"
            />
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 items-center">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <span className="bg-slate-100 rounded-full px-3 py-1">
                  Class <b>{student.class}</b> • Section <b>{student.section}</b>
                </span>
                <span className="bg-green-200 text-green-800 rounded-full px-3 py-1">
                  {student.hostel ? "Hostel" : "Day Scholar"}
                </span>
                <span className="bg-slate-100 rounded-full px-3 py-1">
                  Transport: {student.transport ? "Yes" : "No"}
                </span>
              </div>
              <div className="grid grid-cols-[200px_1fr] gap-x-7 gap-y-3 mt-4 text-slate-700">
                <div>Date of Joining</div>
                <div>{new Date(student.doj).toLocaleDateString()}</div>
                <div>Branch</div>
                <div>{student.branch}</div>
                <div>Address</div>
                <div>{student.address}</div>
                <div>Previous School</div>
                <div>{student.prevSchool}</div>
                <div>Fees</div>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-green-200 text-green-800 rounded-full px-3 py-1">
                    Paid: ₹ {student.feePaid.toLocaleString("en-IN")}
                  </span>
                  <span className="bg-amber-200 text-amber-800 rounded-full px-3 py-1">
                    Pending: ₹ {student.feePending.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-300">
          <div className="px-7 py-5 border-b bg-gradient-to-r from-slate-50 to-indigo-100">
            <h3 className="text-xl font-semibold">Quick Stats</h3>
          </div>
          <div className="p-6 space-y-5">
            <div className="bg-white border rounded-xl p-5 shadow-md text-center">
              <div className="text-slate-600 font-medium">Attendance (This Month)</div>
              <div className="text-3xl font-bold">—</div>
              <div className="text-slate-500 text-sm">—</div>
            </div>
            <div className="bg-white border rounded-xl p-5 shadow-md text-center">
              <div className="text-slate-600 font-medium">Avg. Score (This Year)</div>
              <div className="text-3xl font-bold">—</div>
              <div className="text-slate-500 text-sm">Across all exams</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Exam Results ===== */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-300 mt-7">
        <div className="flex justify-between items-center px-7 py-5 border-b bg-gradient-to-r from-slate-50 to-indigo-100">
          <h3 className="text-xl font-semibold">Exam Results</h3>
          <div className="flex gap-3">
            <select className="border rounded-lg px-3 py-2"></select>
            <select className="border rounded-lg px-3 py-2"></select>
            <select className="border rounded-lg px-3 py-2"></select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Reset</button>
          </div>
        </div>
        <div className="p-7">
          <canvas ref={marksChartRef} height="120"></canvas>
          <table className="w-full mt-6 border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2">Year</th>
                <th>Exam Type</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Total</th>
                <th>%</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {examResults.map((r, i) => (
                <tr key={i} className="bg-white border rounded-lg shadow-sm hover:bg-slate-50">
                  <td className="px-4 py-2">{r.year}</td>
                  <td>{r.examType}</td>
                  <td>{r.subject}</td>
                  <td>{r.marks}</td>
                  <td>{r.total}</td>
                  <td>{((r.marks / r.total) * 100).toFixed(1)}%</td>
                  <td>{r.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Attendance ===== */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-300 mt-7">
        <div className="flex justify-between items-center px-7 py-5 border-b bg-gradient-to-r from-slate-50 to-indigo-100">
          <h3 className="text-xl font-semibold">Attendance Records (Daily)</h3>
          <div className="flex gap-3">
            <select className="border rounded-lg px-3 py-2"></select>
            <select className="border rounded-lg px-3 py-2"></select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Reset</button>
          </div>
        </div>
        <div className="p-7">
          <canvas ref={attChartRef} height="120"></canvas>
          <table className="w-full mt-6 border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-indigo-100">
                <th className="px-4 py-2">Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.slice(0, 10).map((a, i) => (
                <tr key={i} className="bg-white border hover:bg-slate-50">
                  <td className="px-4 py-2">{a.date.toLocaleDateString()}</td>
                  <td>
                    {a.status === "P" ? (
                      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">Present</span>
                    ) : (
                      <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full">Absent</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Activities ===== */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-300 mt-7">
        <div className="flex justify-between items-center px-7 py-5 border-b bg-gradient-to-r from-slate-50 to-indigo-100">
          <h3 className="text-xl font-semibold">Activities & Achievements</h3>
          <div className="flex gap-3">
            <select className="border rounded-lg px-3 py-2"></select>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">Reset</button>
          </div>
        </div>
        <div className="p-7 space-y-3">
          {activities.map((a, i) => (
            <div
              key={i}
              className="flex justify-between items-center border rounded-xl px-4 py-3 bg-white shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="bg-indigo-200 text-indigo-700 px-3 py-1 rounded-full">{a.year}</span>
                <b>{a.name}</b> — <span>{a.role}</span>
              </div>
              <div>
                <span className="bg-slate-100 px-3 py-1 rounded-full">{a.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-slate-500 text-sm mt-6">
        Tip: Replace the mock data in the script with real API data or server-rendered JSON. All filters and
        charts will adapt automatically. For the Notify Parent button, implement the handleNotifyParent function
        with your backend API to send push notifications to the parent's mobile app.
      </p>
    </div>
  );
};

export default StudentPortfolio;