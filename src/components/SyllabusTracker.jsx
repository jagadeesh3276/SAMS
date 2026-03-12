import React, { useState, useEffect } from "react";

// Default options
const defaultClasses = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
const defaultSections = ["A", "B", "C", "D"];
const defaultSubjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science"
];

// ✅ Static syllabus data (for first load)
const staticData = {
  "Class 1": {
    A: {
      Mathematics: [
        { name: "Numbers 1–100", completed: true, timestamp: new Date().toISOString() },
        { name: "Addition Basics", completed: false, timestamp: new Date().toISOString() },
        { name: "Subtraction Basics", completed: false, timestamp: new Date().toISOString() }
      ],
      Science: [
        { name: "Living & Non-Living Things", completed: false, timestamp: new Date().toISOString() },
        { name: "Our Body", completed: true, timestamp: new Date().toISOString() }
      ]
    },
    B: {
      English: [
        { name: "Alphabets", completed: true, timestamp: new Date().toISOString() },
        { name: "Simple Words", completed: false, timestamp: new Date().toISOString() }
      ],
      "Social Studies": [
        { name: "My Family", completed: true, timestamp: new Date().toISOString() }
      ]
    }
  },
  "Class 2": {
    A: {
      Mathematics: [
        { name: "Even and Odd Numbers", completed: false, timestamp: new Date().toISOString() },
        { name: "Shapes and Patterns", completed: true, timestamp: new Date().toISOString() }
      ],
      Science: [
        { name: "Plants Around Us", completed: false, timestamp: new Date().toISOString() },
        { name: "Animals Around Us", completed: true, timestamp: new Date().toISOString() }
      ]
    }
  },
  "Class 3": {
    A: {
      Mathematics: [
        { name: "Multiplication", completed: false, timestamp: new Date().toISOString() },
        { name: "Division", completed: false, timestamp: new Date().toISOString() }
      ],
      Science: [
        { name: "Human Body", completed: true, timestamp: new Date().toISOString() },
        { name: "Water and Air", completed: false, timestamp: new Date().toISOString() }
      ],
      English: [
        { name: "Grammar Basics", completed: false, timestamp: new Date().toISOString() },
        { name: "Reading Comprehension", completed: true, timestamp: new Date().toISOString() }
      ]
    }
  }
};

const SyllabusTracker = () => {
  const [classes, setClasses] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topicName, setTopicName] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [classInput, setClassInput] = useState("");
  const [sectionsInput, setSectionsInput] = useState("");
  const [subjectsInput, setSubjectsInput] = useState("");

  // ✅ Load from localStorage or set static default data
  useEffect(() => {
    const stored = localStorage.getItem("syllabus-tracker");
    if (stored) {
      setClasses(JSON.parse(stored));
    } else {
      setClasses(staticData); // ← load static defaults
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("syllabus-tracker", JSON.stringify(classes));
  }, [classes]);

  // Add / Update Class with sections & subjects
  const addClass = () => {
    if (!classInput) return;

    setClasses((prev) => {
      const newData = { ...prev };
      const sections = sectionsInput
        ? sectionsInput.split(",").map((s) => s.trim())
        : [];
      const subjects = subjectsInput
        ? subjectsInput.split(",").map((s) => s.trim())
        : [];

      if (!newData[classInput]) newData[classInput] = {};

      sections.forEach((sec) => {
        if (!newData[classInput][sec]) newData[classInput][sec] = {};
        subjects.forEach((sub) => {
          if (!newData[classInput][sec][sub])
            newData[classInput][sec][sub] = [];
        });
      });

      return newData;
    });

    setClassInput("");
    setSectionsInput("");
    setSubjectsInput("");
  };

  // Reset all
  const resetAll = () => {
    setClasses(staticData); // reset to static data instead of clearing
    setSelectedClass("");
    setSelectedSection("");
    setSelectedSubject("");
    localStorage.removeItem("syllabus-tracker");
  };

  // Add or update topic
  const handleAddTopic = () => {
    if (!selectedClass || !selectedSection || !selectedSubject || !topicName)
      return;

    setClasses((prev) => {
      const newData = { ...prev };
      if (!newData[selectedClass][selectedSection][selectedSubject]) {
        newData[selectedClass][selectedSection][selectedSubject] = [];
      }
      if (editIndex !== null) {
        newData[selectedClass][selectedSection][selectedSubject][editIndex].name =
          topicName;
        newData[selectedClass][selectedSection][selectedSubject][
          editIndex
        ].timestamp = new Date().toISOString();
        setEditIndex(null);
      } else {
        newData[selectedClass][selectedSection][selectedSubject].push({
          name: topicName,
          completed: false,
          timestamp: new Date().toISOString()
        });
      }
      return newData;
    });

    setTopicName("");
  };

  // Toggle topic completion
  const toggleTopic = (index) => {
    setClasses((prev) => {
      const newData = { ...prev };
      newData[selectedClass][selectedSection][selectedSubject][index].completed =
        !newData[selectedClass][selectedSection][selectedSubject][index]
          .completed;
      newData[selectedClass][selectedSection][selectedSubject][
        index
      ].timestamp = new Date().toISOString();
      return newData;
    });
  };

  // Edit topic
  const editTopic = (index) => {
    setTopicName(
      classes[selectedClass][selectedSection][selectedSubject][index].name
    );
    setEditIndex(index);
  };

  // Delete topic
  const deleteTopic = (index) => {
    setClasses((prev) => {
      const newData = { ...prev };
      newData[selectedClass][selectedSection][selectedSubject].splice(
        index,
        1
      );
      return newData;
    });
  };

  // Clear completed topics
  const clearCompleted = () => {
    setClasses((prev) => {
      const newData = { ...prev };
      newData[selectedClass][selectedSection][selectedSubject] =
        newData[selectedClass][selectedSection][selectedSubject].filter(
          (t) => !t.completed
        );
      return newData;
    });
  };

  // Export JSON
  const exportData = () => {
    const blob = new Blob([JSON.stringify(classes, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "syllabus-tracker.json";
    a.click();
  };

  // Import JSON
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setClasses(JSON.parse(ev.target.result));
    reader.readAsText(file);
  };

  // Export CSV
  const exportCSV = () => {
    if (!selectedClass || !selectedSection || !selectedSubject) return;
    const rows = [["Topic", "Status", "Last Updated"]];
    classes[selectedClass][selectedSection][selectedSubject].forEach((t) =>
      rows.push([
        t.name,
        t.completed ? "Completed" : "Pending",
        new Date(t.timestamp).toLocaleString()
      ])
    );
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedClass}_${selectedSection}_${selectedSubject}.csv`;
    a.click();
  };

  // Get topics
  const topics =
    selectedClass &&
    selectedSection &&
    selectedSubject &&
    classes[selectedClass]?.[selectedSection]?.[selectedSubject]
      ? classes[selectedClass][selectedSection][selectedSubject]
      : [];

  const filteredTopics = topics.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  const completedCount = topics.filter((t) => t.completed).length;
  const progress = topics.length
    ? Math.round((completedCount / topics.length) * 100)
    : 0;

  return (
    <div className="flex min-h-screen bg-gray-100 font-poppins ml-56 mt-24">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-blue-500 to-purple-500 text-white p-4 flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-bold">Syllabus Tracker</h1>
          <p className="text-sm text-blue-100">
            Track subjects by class & section
          </p>
        </div>

        {/* Selectors */}
        <div className="space-y-3">
          <select
            className="w-full p-2 rounded-lg text-black"
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setSelectedSection("");
              setSelectedSubject("");
            }}
          >
            <option value="">Select Class</option>
            {Object.keys(classes).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            className="w-full p-2 rounded-lg text-black"
            value={selectedSection}
            onChange={(e) => {
              setSelectedSection(e.target.value);
              setSelectedSubject("");
            }}
            disabled={!selectedClass}
          >
            <option value="">Select Section</option>
            {selectedClass &&
              Object.keys(classes[selectedClass] || {}).map((s) => (
                <option key={s}>{s}</option>
              ))}
          </select>

          <select
            className="w-full p-2 rounded-lg text-black"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            disabled={!selectedSection}
          >
            <option value="">Select Subject</option>
            {selectedClass &&
              selectedSection &&
              Object.keys(classes[selectedClass]?.[selectedSection] || {}).map(
                (sub) => <option key={sub}>{sub}</option>
              )}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setTopicName("")}
              className="flex-1 bg-blue-700 py-2 rounded-lg hover:bg-blue-800"
            >
              + Subject
            </button>
            <label className="flex-1 cursor-pointer bg-white text-blue-600 py-2 rounded-lg text-center hover:bg-blue-100">
              Import
              <input
                type="file"
                className="hidden"
                accept=".json"
                onChange={importData}
              />
            </label>
            <button
              onClick={exportData}
              className="flex-1 bg-white text-blue-600 py-2 rounded-lg hover:bg-blue-100"
            >
              Export
            </button>
          </div>
        </div>

        {/* Class setup */}
        <div className="bg-white text-black p-3 rounded-lg">
          <h2 className="font-semibold mb-2">Classes setup</h2>
          <input
            type="text"
            placeholder="Class name"
            className="w-full border rounded p-2 mb-2"
            value={classInput}
            onChange={(e) => setClassInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sections (comma-separated)"
            className="w-full border rounded p-2 mb-2"
            value={sectionsInput}
            onChange={(e) => setSectionsInput(e.target.value)}
          />
          <input
            type="text"
            placeholder="Subjects (comma-separated)"
            className="w-full border rounded p-2 mb-2"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={addClass}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add / Update Class
            </button>
            <button
              onClick={resetAll}
              className="flex-1 bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
            >
              Reset All
            </button>
          </div>
        </div>

        {/* Quick tools */}
        <div className="bg-white text-black p-3 rounded-lg space-y-2">
          <h2 className="font-semibold mb-2">Quick tools</h2>
          <button
            onClick={exportCSV}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Export subject CSV
          </button>
          <button
            onClick={clearCompleted}
            className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
          >
            Clear completed topics
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {selectedClass && selectedSection && selectedSubject ? (
          <>
            <div className="flex items-center gap-2 text-sm mb-4">
              <span>{selectedClass}</span>
              <span>›</span>
              <span>{selectedSection}</span>
              <span>›</span>
              <span className="font-semibold">{selectedSubject}</span>
              <span className="ml-2 text-gray-500">
                {topics.length} topics • {progress}% complete
              </span>
              <input
                type="text"
                placeholder="Search topics..."
                className="ml-auto border rounded p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleAddTopic}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                + Add Topic
              </button>
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <div className="flex justify-between mb-2">
                <h2 className="font-semibold">{selectedSubject}</h2>
                <span className="text-sm text-gray-500">
                  {selectedClass} • Section {selectedSection}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Topics table */}
            <div className="bg-white rounded-lg shadow p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-2">Topic</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Last Updated</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map((t, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2">{t.name}</td>
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTopic(idx)}
                          />
                        </td>
                        <td className="p-2 text-sm text-gray-500">
                          {new Date(t.timestamp).toLocaleString()}
                        </td>
                        <td className="p-2 space-x-2">
                          <button
                            onClick={() => editTopic(idx)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTopic(idx)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-2 text-center text-gray-500"
                      >
                        No topics. Add one using "+ Add Topic".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="text-gray-500">
            Please select a class, section, and subject.
          </p>
        )}
      </main>
    </div>
  );
};

export default SyllabusTracker;
