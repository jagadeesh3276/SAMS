import React from "react";
import campusactivities from "../images/campusactivities.png";

// Import all gallery images from the folder
import campuss1 from "../images/campuss1.jpg";
import campuss2 from "../images/campuss2.jpg";
import campus3 from "../images/campus3.jpg";
import campus4 from "../images/campus4.jpg";
import campus5 from "../images/campus5.jpg";
import campus6 from "../images/campus6.jpg";

const CampusLife = () => {
  const galleryImages = [campuss1, campuss2, campus3, campus4, campus5, campus6];


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner */}
      <section className="w-full h-64 md:h-96">
        <img
          src={campusactivities}
          alt="Campus Banner"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Campus Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Campus ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <footer>
        <section className="grid md:grid-cols-4 gap-8 bg-[#a02121] text-white px-6 py-10">
          <div>
            <h2 className="font-bold text-xl mb-2">SAMS School</h2>
            <p>
              At [School Name], we provide quality education that nurtures
              curiosity, creativity, and confidence in every child...
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-2">Address</h2>
            <p>Madhapur, Hyderabad – 500081</p>
            <p>📞 +91 9XXXXXXX89</p>
            <div className="flex gap-2 mt-2">
              <i className="bi bi-instagram"></i>
              <i className="bi bi-whatsapp"></i>
              <i className="bi bi-youtube"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl mb-2">Other Branches</h2>
            <ul>
              <li>Madhapur</li>
              <li>Secunderabad</li>
              <li>Manikonda</li>
              <li>Hi-Tech City</li>
              <li>Gachibowli</li>
              <li>Khairatabad</li>
            </ul>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-xl mb-2">2025-26 Admissions Open</h2>
            {/* <img
              src="./Images/download.png"
              alt="Admissions"
              className="w-20 h-20 mx-auto"
            /> */}
          </div>
        </section>
        <div className="bg-[#a02121] text-center py-4 text-white text-sm">
          © School name All Rights Reserved. 2025
        </div>
      </footer>
    </div>
  );
};

export default CampusLife;
