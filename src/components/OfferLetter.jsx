import React, { useState } from "react";
import jsPDF from "jspdf";

const OfferLetter = () => {
  const [formData, setFormData] = useState({
    candidateName: "",
    positionTitle: "",
    department: "",
    startDate: "",
    salary: "",
    supervisor: "",
    responseDeadline: "",
  });

  const [offerDetails, setOfferDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      candidateName,
      positionTitle,
      department,
      startDate,
      salary,
      supervisor,
      responseDeadline,
    } = formData;

    const today = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const expirationDate = new Date(responseDeadline);
    expirationDate.setDate(expirationDate.getDate() + 3);
    const formattedExpirationDate = expirationDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    setOfferDetails({
      ...formData,
      today,
      formattedExpirationDate,
    });

    setFormData({
      candidateName: "",
      positionTitle: "",
      department: "",
      startDate: "",
      salary: "",
      supervisor: "",
      responseDeadline: "",
    });
  };

  const printOfferLetter = () => {
    window.print();
  };

  const downloadOfferLetter = () => {
    const doc = new jsPDF();
    const content = document.querySelector(".offer-letter-content").innerHTML;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    tempDiv.style.fontFamily = "Poppins, Segoe UI, Roboto, Arial, sans-serif";
    tempDiv.style.padding = "20px";
    doc.html(tempDiv, {
      callback: function (doc) {
        doc.save("offer_letter.pdf");
      },
      x: 10,
      y: 10,
      width: 190,
      windowWidth: 800,
    });
  };

  return (
    <div className="bg-[#f9fafc] min-h-screen text-gray-800">
      <div className="max-w-3xl mx-auto mt-24 mb-6 bg-white p-10 rounded-xl shadow-xl print:shadow-none print:border-none print:mt-0 print:p-6">
        {/* Offer Letter Form */}
        {!offerDetails && (
          <div className="border border-gray-300 rounded-lg bg-gray-50 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">
              Generate Offer Letter
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block mt-3 mb-1 font-medium">Candidate Name</label>
              <input
                type="text"
                name="candidateName"
                value={formData.candidateName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mt-3 mb-1 font-medium">Position Title</label>
              <input
                type="text"
                name="positionTitle"
                value={formData.positionTitle}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mt-3 mb-1 font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Academic">Academic</option>
                <option value="Administrative">Administrative</option>
              </select>

              <label className="block mt-3 mb-1 font-medium">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mt-3 mb-1 font-medium">
                Salary (INR per annum)
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mt-3 mb-1 font-medium">Reporting To</label>
              <input
                type="text"
                name="supervisor"
                value={formData.supervisor}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block mt-3 mb-1 font-medium">
                Response Deadline
              </label>
              <input
                type="date"
                name="responseDeadline"
                value={formData.responseDeadline}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md mt-4"
              >
                Generate Offer Letter
              </button>
            </form>
          </div>
        )}

        {/* Offer Letter Preview */}
        {offerDetails && (
          <div className="offer-letter-content print:block">
            <div className="text-center border-b-2 border-blue-600 pb-6 mb-6">
              <h1 className="text-3xl font-bold text-blue-600">Offer Letter</h1>
              <p>Bharatiya Vidya Bhavan</p>
              <p>
                Plot No. 12, Educational Avenue, Bhimavaram, Andhra Pradesh,
                534201
              </p>
              <p>Email: hr@bvb.edu.in | Phone: (08816) 123-4567</p>
            </div>

            <div className="leading-relaxed text-[15px]">
              <p>Date: {offerDetails.today}</p>
              <p className="mt-3">
                Dear <span className="font-semibold">{offerDetails.candidateName}</span>,
              </p>

              <p className="mt-3">
                We are delighted to offer you the position of{" "}
                <span className="font-semibold">
                  {offerDetails.positionTitle}
                </span>{" "}
                with Bharatiya Vidya Bhavan. Your qualifications, experience, and
                enthusiasm make you an excellent fit for our educational
                institution.
              </p>

              <p className="font-semibold mt-4">Position Details:</p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  <strong>Position:</strong> {offerDetails.positionTitle}
                </li>
                <li>
                  <strong>Department:</strong> {offerDetails.department}
                </li>
                <li>
                  <strong>Start Date:</strong>{" "}
                  {new Date(offerDetails.startDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </li>
                <li>
                  <strong>Salary:</strong> INR {offerDetails.salary} per annum
                </li>
                <li>
                  <strong>Work Location:</strong> Bhimavaram Campus
                </li>
                <li>
                  <strong>Reporting To:</strong> {offerDetails.supervisor}
                </li>
              </ul>

              <p className="font-semibold mt-4">Benefits:</p>
              <p>
                As a full-time employee, you will be eligible for our
                comprehensive benefits package, which includes medical
                insurance, paid leave, professional development opportunities,
                and a provident fund. Detailed information will be provided in
                the employee handbook upon joining.
              </p>

              <p className="font-semibold mt-4">Next Steps:</p>
              <p>
                Please confirm your acceptance of this offer by signing below
                and returning a copy to hr@bvb.edu.in by{" "}
                <span className="font-semibold">
                  {new Date(
                    offerDetails.responseDeadline
                  ).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                . This offer remains valid until{" "}
                <span className="font-semibold">
                  {offerDetails.formattedExpirationDate}
                </span>
                . For any queries, please contact our HR department at
                hr@bvb.edu.in or (08816) 123-4567.
              </p>

              <p className="mt-3">
                We are excited to welcome you to the Bharatiya Vidya Bhavan
                family!
              </p>

              <div className="mt-10">
                <p>Sincerely,</p>
                <p className="mt-1 font-semibold">
                  Dr. Priya Sharma
                  <br />
                  Director of Human Resources
                  <br />
                  Bharatiya Vidya Bhavan
                </p>
              </div>

              <p className="mt-6 font-semibold">Acceptance of Offer:</p>
              <p>
                I, {offerDetails.candidateName}, accept the offer of employment
                as outlined above.
              </p>
              <p>Signature: _____________________________</p>
              <p>Date: _____________________________</p>
            </div>

            <div className="text-center mt-8 text-sm text-gray-500">
              <p>Bharatiya Vidya Bhavan | Confidential</p>
            </div>

            <div className="flex justify-center gap-4 mt-6 print:hidden">
              <button
                onClick={printOfferLetter}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md"
              >
                Print Offer Letter
              </button>
              <button
                onClick={downloadOfferLetter}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-6 rounded-md"
              >
                Download as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferLetter;
