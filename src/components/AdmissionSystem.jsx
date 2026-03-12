import React, { useState, useEffect } from "react";

const AdmissionSystem = () => {
  const [formData, setFormData] = useState({
    applicationId: "",
    studentId: "",
    studentSurname: "",
    studentName: "",
    classValue: "",
    section: "",
    paidAmount: "",
    examResult: "Not Attempted",
    documents: {
      studentIdProof: null,
      studentPhoto: null,
      previousRecords: null,
      parentIdProof: null,
    },
    fees: {
      tuition: { amount: "", discount: "", reason: "", paid: "", pending: "" },
      uniform: { amount: "", discount: "", reason: "", paid: "", pending: "" },
      stationery: { amount: "", discount: "", reason: "", paid: "", pending: "" },
      hostel: { amount: "", discount: "", reason: "", paid: "", pending: "" },
      mess: { amount: "", discount: "", reason: "", paid: "", pending: "" },
      sports: { amount: "", discount: "", reason: "", paid: "", pending: "" },
      transport: { amount: "", discount: "", reason: "", paid: "", pending: "" },
    },
  });

  const [applications, setApplications] = useState([]);
  const [bill, setBill] = useState(null);

  const [sections, setSections] = useState({
    A: 0,
    B: 2,
    C: 3,
  });

  const feeStructureByClass = {
    "Class 1": { tuition: 15000, uniform: 3000, stationery: 2000, hostel: 0, mess: 0, sports: 1000, transport: 2000 },
    "Class 5": { tuition: 25000, uniform: 4000, stationery: 3000, hostel: 20000, mess: 15000, sports: 2000, transport: 4000 },
    "Class 10": { tuition: 40000, uniform: 6000, stationery: 5000, hostel: 30000, mess: 20000, sports: 4000, transport: 6000 },
  };

  const categories = [
    { key: "tuition", label: "Tuition Fee" },
    { key: "uniform", label: "Uniform Fee" },
    { key: "stationery", label: "Stationery Fee" },
    { key: "hostel", label: "Hostel Fee" },
    { key: "mess", label: "Mess Fee" },
    { key: "sports", label: "Sports Fee" },
    { key: "transport", label: "Transport Fee" },
  ];

  useEffect(() => {
    const storedApps = JSON.parse(localStorage.getItem("applications") || "[]");
    setApplications(storedApps);
  }, []);

  const handleApplicationIdBlur = () => {
    const appData = applications.find(
      (app) => app.applicationId === formData.applicationId
    );
    if (appData) {
      const examResults = JSON.parse(localStorage.getItem("examResults") || "[]");
      const examResult = examResults.find(
        (res) => res.applicationId === formData.applicationId
      );
      setFormData((prev) => ({
        ...prev,
        studentSurname: appData?.studentSurname || "",
        studentName: appData?.studentName || "",
        classValue: appData?.classValue || "",
        paidAmount: appData?.feeAmount || 0,
        examResult: examResult
          ? `${examResult.percentage}% (${examResult.score}/${examResult.total})`
          : "Not Attempted",
      }));
    }
  };

  const handleClassChange = (e) => {
    const selectedClass = e.target.value;
    setFormData((prev) => {
      const newFees = { ...prev.fees };
      if (feeStructureByClass[selectedClass]) {
        Object.keys(newFees).forEach((key) => {
          const amt = feeStructureByClass[selectedClass][key] || 0;
          newFees[key].amount = amt;
          newFees[key].pending = amt;
        });
      }
      return { ...prev, classValue: selectedClass, fees: newFees };
    });
  };

  // Dynamic fee calculation: discount & paid fee update
  const handleInput = (e, key, field) => {
    const value = e.target.value;

    if (key) {
      setFormData((prev) => {
        const updatedFees = { ...prev.fees };
        const fee = updatedFees[key];
        fee[field] = field === "reason" ? value : parseFloat(value) || 0;

        const amount = parseFloat(fee.amount) || 0;
        const discount = parseFloat(fee.discount) || 0;
        const paid = parseFloat(fee.paid) || 0;

        // Calculate discount amount and pending dynamically
        const discountAmount = (amount * discount) / 100;
        fee.pending = amount - discountAmount - paid;
        if (fee.pending < 0) fee.pending = 0; // prevent negative

        updatedFees[key] = fee;
        return { ...prev, fees: updatedFees };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [docType]: file },
    }));
  };

  const generateBill = () => {
    const { applicationId, studentId, studentSurname, studentName, classValue, section, fees } = formData;
    if (!applicationId || !studentId || !studentSurname || !studentName || !classValue || !section) {
      alert("Please fill all required fields.");
      return;
    }

    let totalFees = 0,
      totalDiscountAmt = 0,
      totalNetAmount = 0,
      totalPaid = 0;

    const rows = categories.map((cat) => {
      const { amount, discount, reason, paid, pending } = fees[cat.key];
      const discountAmt = (amount * discount) / 100;
      const netAmount = amount - discountAmt;
      totalFees += amount;
      totalDiscountAmt += discountAmt;
      totalNetAmount += netAmount;
      totalPaid += paid;
      return { ...cat, amount, discount, discountAmt, reason, paid, pending, netAmount };
    });

    setBill({
      applicationId,
      studentId,
      studentName: `${studentSurname} ${studentName}`,
      classValue,
      section,
      totalFees,
      totalDiscountAmt,
      totalNetAmount,
      totalPaid,
      totalPending: totalNetAmount - totalPaid,
      rows,
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById("billSection").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
  <div className="ml-64 p-10 max-w-6xl mt-24">

  <h1 className="text-xl font-bold mb-4">Admission Form</h1>

  <div className="bg-white shadow border rounded-lg p-6 mb-8">

    {/* Basic Info Section */}
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div>
        <label className="block text-sm font-semibold mb-1">Application ID</label>
        <input
          type="text"
          name="applicationId"
          placeholder="Enter Application ID"
          className="border border-gray-300 p-2 rounded w-full text-sm"
          value={formData.applicationId}
          onChange={(e) => handleInput(e)}
          onBlur={handleApplicationIdBlur}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Student ID</label>
        <input
          type="text"
          name="studentId"
          placeholder="Enter Student ID"
          className="border border-gray-300 p-2 rounded w-full text-sm"
          value={formData.studentId}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Student Surname</label>
        <input
          type="text"
          name="studentSurname"
          placeholder="Surname"
          className="border border-gray-300 p-2 rounded w-full text-sm"
          value={formData.studentSurname}
          onChange={(e) => handleInput(e)}
        />
      </div>
    </div>

    {/* Name, Class, Section */}
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div>
        <label className="block text-sm font-semibold mb-1">Student Name</label>
        <input
          type="text"
          name="studentName"
          placeholder="First Name"
          className="border border-gray-300 p-2 rounded w-full text-sm"
          value={formData.studentName}
          onChange={(e) => handleInput(e)}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Class</label>
        <select
          name="classValue"
          className="border border-gray-300 p-2 rounded w-full text-sm"
          value={formData.classValue}
          onChange={handleClassChange}
        >
          <option value="">Select Class</option>
          <option value="Class 1">Class 1</option>
          <option value="Class 5">Class 5</option>
          <option value="Class 10">Class 10</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Section</label>
        <select
          name="section"
          className="border border-gray-300 p-2 rounded w-full text-sm"
          value={formData.section}
          onChange={(e) => handleInput(e)}
        >
          <option value="">Select Section</option>
          {Object.entries(sections).map(([key, vacancy]) => (
            <option key={key} value={key} disabled={vacancy === 0}>
              Section {key} {vacancy === 0 ? "(Filled)" : `(${vacancy} Vacancies)`}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Upload Section */}
    <h3 className="text-md font-bold text-gray-700">Upload Documents</h3>

    <div className="grid grid-cols-2 gap-6 mt-3 mb-8">
      <div>
        <label className="block text-sm font-medium mb-1">Student ID Proof</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "studentIdProof")}
          className="border border-gray-300 text-sm p-2 rounded w-full bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Student Passport Size Photo</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "studentPhoto")}
          className="border border-gray-300 text-sm p-2 rounded w-full bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Previous School Records</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "previousRecords")}
          className="border border-gray-300 text-sm p-2 rounded w-full bg-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Parent ID Proof</label>
        <input
          type="file"
          onChange={(e) => handleFileUpload(e, "parentIdProof")}
          className="border border-gray-300 text-sm p-2 rounded w-full bg-white"
        />
      </div>
    </div>

    {/* Fees Section */}
    <h3 className="text-md font-bold text-gray-800 mb-3">Fee Details</h3>

    <div className="space-y-4">
      {categories.map((cat) => {
        const fee = formData.fees[cat.key];

        return (
          <div
            key={cat.key}
            className="border border-gray-200 p-4 rounded-lg bg-gray-50"
          >
            <label className="block font-semibold text-gray-700 mb-3">
              {cat.label}
            </label>

            <div className="grid grid-cols-5 gap-4">
              <input
                type="number"
                value={fee.amount}
                readOnly
                className="border border-gray-300 p-2 rounded bg-gray-100 text-sm"
                placeholder="Amount"
              />

              <input
                type="number"
                value={fee.discount}
                onChange={(e) => handleInput(e, cat.key, "discount")}
                placeholder="Discount %"
                className="border border-gray-300 p-2 rounded text-sm"
              />

              <input
                type="text"
                value={fee.reason}
                onChange={(e) => handleInput(e, cat.key, "reason")}
                placeholder="Reason"
                className="border border-gray-300 p-2 rounded text-sm"
              />

              <input
                type="number"
                value={fee.paid}
                onChange={(e) => handleInput(e, cat.key, "paid")}
                placeholder="Paid Fee"
                className="border border-gray-300 p-2 rounded text-sm"
              />

              <input
                type="number"
                value={fee.pending}
                readOnly
                placeholder="Pending Fee"
                className="border border-gray-300 p-2 rounded bg-gray-100 text-sm"
              />
            </div>
          </div>
        );
      })}
    </div>

    <button
      onClick={generateBill}
      className="mt-6 bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700"
    >
      Generate Bill
    </button>
  </div>

  {/* Bill Section */}
  {bill && (
    <div id="billSection" className="bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-green-700">Bill Preview</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p><b>Application ID:</b> {bill.applicationId}</p>
        <p><b>Student ID:</b> {bill.studentId}</p>
        <p><b>Name:</b> {bill.studentName}</p>
        <p><b>Class:</b> {bill.classValue}</p>
        <p><b>Section:</b> {bill.section}</p>
        <p><b>Total Fees:</b> ₹{bill.totalFees}</p>
        <p><b>Total Discount:</b> ₹{bill.totalDiscountAmt}</p>
        <p><b>Net Amount:</b> ₹{bill.totalNetAmount}</p>
        <p><b>Total Paid:</b> ₹{bill.totalPaid}</p>
        <p><b>Pending:</b> ₹{bill.totalPending}</p>
      </div>

      <button
        onClick={handlePrint}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Print Bill
      </button>
    </div>
  )}
</div>

  );
};

export default AdmissionSystem;
