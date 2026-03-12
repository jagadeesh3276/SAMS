import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const OnlineEntranceExam = () => {
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const [selectedClass, setSelectedClass] = useState("10");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [applicationId, setApplicationId] = useState("");
  const [applicationIdInput, setApplicationIdInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const questionBank = {
    "10": {
      easy: [
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: "4" },
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], correct: "Paris" },
      ],
      medium: [
        { question: "What is 5 × 3?", options: ["10", "15", "20", "25"], correct: "15" },
        { question: "Which planet is known as the Red Planet?", options: ["Jupiter", "Mars", "Venus", "Mercury"], correct: "Mars" },
      ],
      hard: [
        { question: "What is the square root of 16?", options: ["2", "3", "4", "5"], correct: "4" },
        { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Dickens", "Austen", "Hemingway"], correct: "Shakespeare" },
      ],
    },
    "12": {
      easy: [
        { question: "What is the formula for water?", options: ["H2O", "CO2", "O2", "N2"], correct: "H2O" },
        { question: "What is 10 ÷ 2?", options: ["3", "4", "5", "6"], correct: "5" },
      ],
      medium: [
        { question: "What is the derivative of x^2?", options: ["x", "2x", "x^2", "2x^2"], correct: "2x" },
        { question: "Which gas is most abundant in Earth's atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: "Nitrogen" },
      ],
      hard: [
        { question: "What is the value of π (pi) to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], correct: "3.14" },
        { question: "Who discovered penicillin?", options: ["Fleming", "Einstein", "Newton", "Curie"], correct: "Fleming" },
      ],
    },
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const appId = params.get("applicationId") || "";
    const grade = params.get("gradeLevel") || "10";
    setApplicationId(appId);
    setApplicationIdInput(appId);
    setSelectedClass(grade);
  }, [location.search]);

  const handleApplicationIdChange = (e) => {
    const inputId = e.target.value.trim();
    setApplicationIdInput(inputId);
    setError("");
    setApplicationId(inputId || "");
  };

  const loadQuestions = async () => {
    setLoading(true);
    setError("");
    setShowSubmit(false);

    try {
      const response = await fetch(
        `http://localhost:8000/questions?classLevel=${selectedClass}&difficulty=${selectedDifficulty}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      if (data && data.length > 0) {
        setCurrentQuestions(data);
      } else {
        const fallback = questionBank[selectedClass]?.[selectedDifficulty];
        if (fallback) setCurrentQuestions(fallback);
        else setError("No questions available for the selected class and difficulty.");
      }

      setShowSubmit(true);
    } catch (err) {
      console.error("Error fetching questions:", err);
      const fallback = questionBank[selectedClass]?.[selectedDifficulty];
      if (fallback) {
        setCurrentQuestions(fallback);
        setShowSubmit(true);
      } else {
        setError("Failed to fetch questions. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async () => {
    if (!applicationId) {
      setError("Please enter your Application ID before submitting the exam.");
      return;
    }

    let score = 0;
    const results = currentQuestions.map((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      const isCorrect = selected?.value === q.correct;
      if (isCorrect) score++;
      return { ...q, selected: selected?.value || null, correct: isCorrect };
    });

    const percentage = (score / currentQuestions.length) * 100;
    const examResult = {
      applicationId,
      classLevel: selectedClass,
      difficulty: selectedDifficulty,
      score,
      total: currentQuestions.length,
      percentage: percentage.toFixed(2),
      results,
      timestamp: new Date().toISOString(),
    };

    const examResults = JSON.parse(localStorage.getItem("examResults") || "[]");
    const existingIndex = examResults.findIndex((r) => r.applicationId === applicationId);
    if (existingIndex >= 0) examResults[existingIndex] = examResult;
    else examResults.push(examResult);
    localStorage.setItem("examResults", JSON.stringify(examResults));

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(examResult),
      });
      if (!response.ok) throw new Error("Failed to submit exam results");
    } catch (err) {
      console.error("Error submitting exam:", err);
    }

    setResult(examResult);
    setShowSubmit(false);
  };

  return (
    <div className="font-[Poppins] bg-gray-50 min-h-screen pt-24 px-8 ml-60">

      {/* MAIN WHITE CARD */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-7xl mx-auto">

        <h1 className="text-2xl font-semibold mb-6">Online Entrance Exam</h1>

        {/* TOP ROW LIKE IMAGE */}
        <div className="grid grid-cols-4 gap-6 mb-10">

          <div>
            <label className="text-sm font-semibold">Application ID:</label>
            <input
              type="text"
              value={applicationIdInput}
              onChange={handleApplicationIdChange}
              placeholder="Enter Application ID"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Select Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Class {i + 1}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">Select Difficulty:</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadQuestions}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Loading..." : "Load Questions"}
            </button>
          </div>
        </div>

        {/* QUESTIONS */}
        <div className="space-y-10">
          {currentQuestions.map((q, index) => (
            <div key={index} className="border-b pb-6">
              <h3 className="font-semibold text-lg mb-3">
                {index + 1}. {q.question}
              </h3>

              {q.options.map((opt, i) => (
                <label key={i} className="block mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={opt}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}
        </div>

        {/* SUBMIT BUTTON LEFT SIDE LIKE IMAGE */}
        {showSubmit && (
          <button
            onClick={submitExam}
            className="mt-10 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Submit Exam
          </button>
        )}

        {/* RESULTS */}
        {result && (
          <div className="mt-10 bg-gray-100 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Exam Summary</h3>
            <p>Application ID: {result.applicationId}</p>
            <p>You scored {result.score} / {result.total} ({result.percentage}%)</p>

            <div className="mt-4 space-y-3">
              {result.results.map((r, i) => (
                <div
                  key={i}
                  className={`p-3 rounded ${
                    r.correct ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  <p className="font-medium">
                    Question {i + 1}: {r.question}
                  </p>
                  {r.selected ? (
                    r.correct ? (
                      <p>Your answer: {r.selected} ✔</p>
                    ) : (
                      <>
                        <p>Your answer: {r.selected} ✘</p>
                        <p>Correct answer: {r.correct}</p>
                      </>
                    )
                  ) : (
                    <>
                      <p>No answer selected</p>
                      <p>Correct answer: {r.correct}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default OnlineEntranceExam;
