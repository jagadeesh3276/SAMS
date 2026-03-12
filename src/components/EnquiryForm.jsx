import React, { useState, useEffect } from "react";

const EnquiryForm = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [formId, setFormId] = useState("");

  useEffect(() => {
    const uniqueId =
      "ENQ-" + new Date().toISOString().replace(/\D/g, "").slice(0, 12);
    setFormId(uniqueId);
  }, []);

  const showMessage = (id, message, type = "error") => {
    setErrors((prev) => ({ ...prev, [id]: { message, type } }));
  };

  const validateName = (id, value) => {
    const pattern = /^[A-Za-z\s]+$/;
    if (!value.trim()) return showMessage(id, "This field is required.");
    if (!pattern.test(value.trim())) return showMessage(id, "Only letters allowed.");
    showMessage(id, "Looks good", "success");
    return true;
  };

  const validatePhone = (id, value) => {
    if (!/^[0-9]{10}$/.test(value.trim())) {
      showMessage(id, "Enter 10 digit number.");
      return false;
    }
    showMessage(id, "Valid", "success");
    return true;
  };

  const validateRequired = (id, value, message) => {
    if (!value.trim()) {
      showMessage(id, message);
      return false;
    }
    showMessage(id, "Valid", "success");
    return true;
  };

  const validateAndSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const studentFullName = form["student_full_name"].value;
    const parentName = form["parent_or_guardian_name"].value;
    const relation = form["relationship"].value;
    const age = form["age"].value;
    const gender = form["gender"].value;
    const phoneNo = form["phone_no"].value;
    const state = form["state"].value;
    const classLevel = form["class_level"].value;
    const previousSchool = form["previous_school"].value;

    const valid =
      validateName("snameError", studentFullName) &&
      validateName("pnameError", parentName) &&
      validateRequired("relationError", relation, "Relation is required.") &&
      validateRequired("ageError", age, "Age is required.") &&
      validateRequired("genderError", gender, "Select gender.") &&
      validatePhone("phoneError", phoneNo) &&
      validateName("stateError", state) &&
      validateRequired("classError", classLevel, "Select class.");

    if (!valid) return;

    const payload = {
      student_full_name: studentFullName,
      parent_or_guardian_name: parentName,
      relationship: relation,
      age: parseInt(age),
      gender,
      phone_no: phoneNo,
      class_level: classLevel,
      previous_school: previousSchool,
      state,
    };

    const message = `
      <b>Form ID:</b> ${formId}<br>
      <b>Student Name:</b> ${studentFullName}<br>
      <b>Parent Name:</b> ${parentName}<br>
      <b>Relation:</b> ${relation}<br>
      <b>Age:</b> ${age}<br>
      <b>Gender:</b> ${gender}<br>
      <b>Phone:</b> ${phoneNo}<br>
      <b>State:</b> ${state}<br>
      <b>Class Level:</b> ${classLevel}<br>
      <b>Previous School Details:</b> ${previousSchool || "N/A"}
    `;
    setPopupMessage(message);
    setPopupOpen(true);
  };

  useEffect(() => {
    if (popupOpen)
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [popupOpen]);

  return (
    <div className="w-full flex flex-col items-center">

      {/* FORM BOX */}
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] lg:w-[75%] mt-10">

        <h1 className="text-center text-2xl font-bold text-gray-900 mb-10 tracking-wide">
          CAMPUS
        </h1>

        <form onSubmit={validateAndSubmit} className="grid grid-cols-2 gap-8">

          {/* Student Name */}
          <div className="col-span-1">
            <label className="text-sm font-semibold text-gray-700">
              Student Full Name
            </label>
            <input
              type="text"
              name="student_full_name"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="Julia William"
            />
            <small className="text-red-500">{errors.snameError?.message}</small>
          </div>

          {/* Parent Name */}
          <div className="col-span-1">
            <label className="text-sm font-semibold text-gray-700">
              Parent / Guardian Name
            </label>
            <input
              type="text"
              name="parent_or_guardian_name"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="you@example.com"
            />
            <small className="text-red-500">{errors.pnameError?.message}</small>
          </div>

          {/* Relation */}
          <div className="col-span-1">
            <label className="text-sm font-semibold text-gray-700">
              Relation to Student
            </label>
            <input
              type="text"
              name="relationship"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="Enter"
            />
            <small className="text-red-500">{errors.relationError?.message}</small>
          </div>

          {/* Age + Gender */}
          <div className="col-span-1 flex gap-3">
            <div className="w-1/2">
              <label className="text-sm font-semibold text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                className="mt-1 w-full p-3 border rounded-md bg-gray-50"
                placeholder="1"
              />
              <small className="text-red-500">{errors.ageError?.message}</small>
            </div>

            <div className="w-1/2">
              <label className="text-sm font-semibold text-gray-700">Gender</label>
              <select
                name="gender"
                className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <small className="text-red-500">{errors.genderError?.message}</small>
            </div>
          </div>

          {/* Phone */}
          <div className="col-span-1">
            <label className="text-sm font-semibold text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone_no"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="Enter"
            />
            <small className="text-red-500">{errors.phoneError?.message}</small>
          </div>

          {/* State */}
          <div className="col-span-1">
            <label className="text-sm font-semibold text-gray-700">State</label>
            <input
              type="text"
              name="state"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="Hyd"
            />
            <small className="text-red-500">{errors.stateError?.message}</small>
          </div>

          {/* Class Level */}
          <div className="col-span-1">
            <label className="text-sm font-semibold text-gray-700">
              Class Level
            </label>
            <input
              type="text"
              name="class_level"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="Enter"
            />
            <small className="text-red-500">{errors.classError?.message}</small>
          </div>

          {/* Previous School */}
          <div className="col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Previous School Details (Optional)
            </label>
            <input
              type="text"
              name="previous_school"
              className="mt-1 w-full p-3 border rounded-md bg-gray-50"
              placeholder="Enter"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="col-span-2 w-32 bg-blue-900 text-white font-semibold py-2 rounded-md mt-4"
          >
            Submit
          </button>
        </form>

        {/* Popup */}
        {popupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-80 text-center">
              <h3 className="text-green-600 text-lg font-bold">
                Form Submitted!
              </h3>
              <p
                className="text-gray-700 mt-2 text-sm"
                dangerouslySetInnerHTML={{ __html: popupMessage }}
              />
              <button
                onClick={() => setPopupOpen(false)}
                className="bg-blue-900 text-white font-semibold px-6 py-2 rounded-md mt-4"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="mt-20 w-full bg-[#0e0e21] text-white">
        <section className="grid md:grid-cols-4 gap-8 px-10 py-14">

          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://via.placeholder.com/50"
                alt="logo"
                className="w-12 h-12 rounded-md"
              />
              <h2 className="font-bold text-xl">SAMS</h2>
            </div>
            <p className="text-sm leading-relaxed">
              At [School Name], we provide quality education that nurtures
              curiosity, creativity, and confidence in every child...
            </p>
            <div className="flex gap-4 mt-4 text-lg">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-pinterest"></i>
              <i className="bi bi-twitter"></i>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="font-bold text-xl mb-4">Other Branches</h2>
            <ul className="space-y-2">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Management</li>
              <li>Digital Marketing</li>
              <li>Blog News</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="font-bold text-xl mb-4">Address</h2>
            <p className="text-sm">📍 238, Arimantab, Moska USA</p>
            <p className="text-sm mt-2">📞 (00) 875 784 5682</p>
          </div>

          {/* Column 4 */}
          <div>
            <h2 className="font-bold text-xl mb-4">
              2025–26 Admissions Openery
            </h2>
          </div>
        </section>

        <div className="border-t border-gray-700 text-center py-4 text-sm">
          © School name All Rights Reserved. 2025
        </div>
      </footer>
    </div>
  );
};

export default EnquiryForm;
