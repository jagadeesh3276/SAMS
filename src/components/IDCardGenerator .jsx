import React, { useState } from "react";
import html2canvas from "html2canvas";

const IDCardGenerator = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    idNumber: "",
    role: "",
    class: "",
    section: "",
    department: "",
    photo: null,
  });
  const [cardData, setCardData] = useState(null);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "photo") {
      setFormData({ ...formData, [id]: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      idNumber,
      role,
      class: classValue,
      section,
      department,
      photo,
    } = formData;

    const reader = new FileReader();
    reader.onload = () => {
      const photoSrc = reader.result;
      const qrData =
        role === "Student"
          ? `ID: ${idNumber}, Name: ${name}, Role: ${role}, Class: ${classValue}, Section: ${section}`
          : `ID: ${idNumber}, Name: ${name}, Role: ${role}, Department: ${department}`;
      const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${encodeURIComponent(
        qrData
      )}`;
      setCardData({
        name,
        idNumber,
        role,
        classValue,
        section,
        department,
        photoSrc,
        qrSrc,
      });
    };
    if (photo) reader.readAsDataURL(photo);
  };

  const downloadCard = () => {
    const card = document.getElementById("idCard");
    html2canvas(card).then((canvas) => {
      const link = document.createElement("a");
      link.download = "id_card.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-[70px] ml-[180px] mt-16">
      <div className="flex flex-wrap gap-5 p-5 ml-[230px]">
        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-[300px]">
          <h2 className="text-lg font-semibold mb-2">ID Card Generator</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
            />
            <input
              type="text"
              id="idNumber"
              placeholder="ID Number"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
            />
            <select
              id="role"
              required
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                handleChange(e);
              }}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Student">Student</option>
              <option value="Staff">Staff</option>
            </select>

            {/* Student Fields */}
            {role === "Student" && (
              <div>
                <input
                  type="text"
                  id="class"
                  placeholder="Class (e.g., 10th)"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
                <input
                  type="text"
                  id="section"
                  placeholder="Section (e.g., A)"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
              </div>
            )}

            {/* Staff Fields */}
            {role === "Staff" && (
              <div>
                <input
                  type="text"
                  id="department"
                  placeholder="Department"
                  required
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 mb-3"
                />
              </div>
            )}

            <input
              type="file"
              id="photo"
              accept="image/*"
              required
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Generate ID Card
            </button>
          </form>
        </div>

        {/* ID Card Preview */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div
            id="idCard"
            className="relative w-[300px] h-[180px] border-2 border-blue-600 rounded-xl p-3 bg-gradient-to-br from-gray-100 to-white overflow-hidden"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="Institution Logo"
              className="w-10 absolute top-2 left-2"
            />
            <div className="ml-3 mt-2">
              <h3 className="text-[16px] font-semibold" id="cardName">
                {cardData ? cardData.name : "Name"}
              </h3>
              <p className="text-[12px]" id="cardId">
                {cardData ? `ID: ${cardData.idNumber}` : "ID Number"}
              </p>
              <p className="text-[12px]" id="cardRole">
                {cardData ? cardData.role : "Role"}
              </p>
              <p className="text-[12px]" id="cardDetails">
                {cardData
                  ? cardData.role === "Student"
                    ? `Class: ${cardData.classValue} | Section: ${cardData.section}`
                    : `Department: ${cardData.department}`
                  : "Details"}
              </p>
            </div>
            <img
              src={
                cardData?.photoSrc
                  ? cardData.photoSrc
                  : "https://via.placeholder.com/80"
              }
              alt="Photo"
              className="w-20 h-20 rounded-full absolute top-5 right-5 border-2 border-blue-600 object-cover"
            />
            <img
              src={
                cardData?.qrSrc
                  ? cardData.qrSrc
                  : "https://via.placeholder.com/50"
              }
              alt="QR Code"
              className="w-[50px] absolute bottom-2 right-2"
            />
          </div>

          {cardData && (
            <button
              onClick={downloadCard}
              className="block mt-4 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Download ID Card
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IDCardGenerator;
