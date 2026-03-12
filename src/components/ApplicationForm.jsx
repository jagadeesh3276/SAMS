import React, { useState, useEffect } from "react";

const ApplicationForm = () => {
  const [contactType, setContactType] = useState("");
  const [feeAmount, setFeeAmount] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [studentSurname, setStudentSurname] = useState("");
  const [studentName, setStudentName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const generateApplicationId = () => {
    const year = new Date().getFullYear();
    let counter = parseInt(localStorage.getItem("applicationCounter") || "1");
    let idNumber = String(counter).padStart(3, "0");
    return `SAMS-${year}-${idNumber}`;
  };

  useEffect(() => {
    setApplicationId(generateApplicationId());
  }, []);

  const calculateAge = (dobValue) => {
    if (!dobValue) return "";
    const birthDate = new Date(dobValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : "";
  };

  const handleDobChange = (e) => {
    const selectedDob = e.target.value;
    setDob(selectedDob);
    setAge(calculateAge(selectedDob));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      app_id: applicationId,
      full_name: `${studentSurname} ${studentName}`.trim(),
      surname: studentSurname,
      dob,
      gender: e.target.gender.value,
      email: e.target.student_email.value,
      grade_level: gradeLevel,
      father_name: e.target.father_name?.value || "",
      father_occupation: e.target.father_occupation?.value || "",
      father_phone: e.target.father_phone?.value || "",
      mother_name: e.target.mother_name?.value || "",
      mother_occupation: e.target.mother_occupation?.value || "",
      mother_phone: e.target.mother_phone?.value || "",
      guardian_name: e.target.guardian_name?.value || "",
      guardian_occupation: e.target.guardian_occupation?.value || "",
      guardian_phone: e.target.guardian_phone?.value || "",
      application_fee: parseFloat(feeAmount) || 0,
    };

    try {
      const response = await fetch("http://192.168.1.28:1000/applications/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Backend Error Response:", errorText);
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const result = await response.json();
      alert(`✅ Application submitted successfully! ID: ${result.application_id || applicationId}`);

      let counter = parseInt(localStorage.getItem("applicationCounter") || "1");
      localStorage.setItem("applicationCounter", counter + 1);

      e.target.reset();
      setContactType("");
      setFeeAmount("");
      setStudentSurname("");
      setStudentName("");
      setGradeLevel("");
      setDob("");
      setAge("");
      setApplicationId(generateApplicationId());
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("❌ Failed to submit application. Please check backend or network connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-start py-16 ml-48">
      <div className="w-full max-w-3xl bg-white p-10 rounded-xl shadow-md border">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Application Form
        </h2>

        <form id="applicationForm" onSubmit={handleSubmit} className="space-y-6">

          {/* SECTION – Application Info */}
          <fieldset className="border p-5 rounded-md">
            <legend className="px-2 text-lg font-semibold text-gray-700 border-l-4 border-red-500">
              Application Info
            </legend>

            <label className="block text-sm font-medium mt-2">Application ID</label>
            <input
              type="text"
              value={applicationId}
              readOnly
              className="w-full p-2 mt-1 border rounded bg-gray-100"
            />
          </fieldset>

          {/* SECTION – Student Details */}
          <fieldset className="border p-5 rounded-md">
            <legend className="px-2 text-lg font-semibold text-gray-700 border-l-4 border-red-500">
              Student Details
            </legend>

            <label className="block text-sm font-medium mt-3">Student Surname</label>
            <input
              type="text"
              value={studentSurname}
              onChange={(e) => setStudentSurname(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />

            <label className="block text-sm font-medium mt-3">Student Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />

            <label className="block text-sm font-medium mt-3">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={handleDobChange}
              className="w-full p-2 border rounded mt-1"
            />

            {age && (
              <p className="text-gray-700 text-sm mt-1">
                <strong>Age:</strong> {age} years
              </p>
            )}

            <label className="block text-sm font-medium mt-3">Gender</label>
            <select name="gender" className="w-full p-2 border rounded mt-1">
              <option>Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label className="block text-sm font-medium mt-3">Student Email</label>
            <input
              type="email"
              name="student_email"
              className="w-full p-2 border rounded mt-1"
            />

            <label className="block text-sm font-medium mt-3">Grade Level</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option>Select Grade</option>
              {[
                "Preschool", "Kindergarten", "1st Standard", "2nd Standard", "3rd Standard",
                "4th Standard", "5th Standard", "6th Standard", "7th Standard", "8th Standard",
                "9th Standard", "10th Standard", "11th Standard", "12th Standard",
              ].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </fieldset>

          {/* SECTION – Parent/Guardian */}
          <fieldset className="border p-5 rounded-md">
            <legend className="px-2 text-lg font-semibold text-gray-700 border-l-4 border-red-500">
              Guardian/Parent Details
            </legend>

            <label className="block text-sm font-medium mt-3">Contact Type</label>
            <select
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            >
              <option value="">Select</option>
              <option value="parent">Parent</option>
              <option value="guardian">Guardian</option>
            </select>

            {contactType === "parent" && (
              <>
                <div className="grid grid-cols-1 mt-3 gap-3">

                  <label>Father's Name</label>
                  <input type="text" name="father_name" className="p-2 border rounded" />

                  <label>Father's Occupation</label>
                  <input type="text" name="father_occupation" className="p-2 border rounded" />

                  <label>Father's Phone</label>
                  <input type="text" name="father_phone" className="p-2 border rounded" />

                  <label>Mother's Name</label>
                  <input type="text" name="mother_name" className="p-2 border rounded" />

                  <label>Mother's Occupation</label>
                  <input type="text" name="mother_occupation" className="p-2 border rounded" />

                  <label>Mother's Phone</label>
                  <input type="text" name="mother_phone" className="p-2 border rounded" />

                </div>
              </>
            )}

            {contactType === "guardian" && (
              <>
                <div className="grid grid-cols-1 mt-3 gap-3">
                  <label>Guardian's Name</label>
                  <input type="text" name="guardian_name" className="p-2 border rounded" />

                  <label>Guardian's Occupation</label>
                  <input type="text" name="guardian_occupation" className="p-2 border rounded" />

                  <label>Guardian's Phone</label>
                  <input type="text" name="guardian_phone" className="p-2 border rounded" />
                </div>
              </>
            )}
          </fieldset>

          {/* SECTION – Fee */}
          <fieldset className="border p-5 rounded-md">
            <legend className="px-2 text-lg font-semibold text-gray-700 border-l-4 border-red-500">
              Application Fee
            </legend>

            <label className="block text-sm font-medium mt-3">Fee Amount (₹)</label>
            <input
              type="number"
              value={feeAmount}
              onChange={(e) => setFeeAmount(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </fieldset>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-2 rounded text-white font-semibold ${
                loading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
};

export default ApplicationForm;
