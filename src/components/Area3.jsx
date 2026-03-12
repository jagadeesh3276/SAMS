import React from "react";

// ✅ Import ALL images used in galleryImages
import area1 from "../images/area1.png";
import area2 from "../images/area2.png";
import area3 from "../images/area3.png";
import area4 from "../images/area4.png";
import area5 from "../images/area5.png";
import area6 from "../images/area6.png";

const Area1 = () => {
  // ------- Gallery Images -------
  const galleryImages = [area1, area2, area3, area4, area5, area6];

  return (
    <div className="font-sans">
      {/* Branch Section */}
      <h3 className="text-center text-maroon text-[20px] font-bold">
        Our Madhapur Branch
      </h3>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
        {/* School Image */}
        <img
          src={area1}
          alt="School Branch"
          className="w-full md:w-1/2 max-w-md rounded shadow-lg"
        />

        {/* Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60899.74267954089!2d78.35044542427894!3d17.448514697096062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sMadhapur%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1755687709033!5m2!1sen!2sin"
          width="100%"
          height="300"
          className="border-0 rounded shadow-md md:w-1/2"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Address */}
      <p className="text-center font-bold mt-4">
        <span className="font-normal">Address: </span>
        School name, area, near Andhra Bhavan, Madhapur, Pincode: 530008
      </p>

      <h4 className="text-center pt-2 pb-2">For any information, reach out to us on</h4>

      <div className="text-center">
        <ul className="inline-block text-left list-none">
          <li>Admission Office: +91-9876543210</li>
          <li>Reception: +91-9876543210</li>
          <li>Hostel: +91-876543210</li>
        </ul>
      </div>

      {/* Activity Button */}
      <div className="flex justify-end mt-10 mr-5">
        <a
          href="#"
          className="px-5 py-2 text-white bg-maroon rounded hover:bg-[#056105] transition-colors"
        >
          Activity
        </a>
      </div>

      {/* -------------------- FOOTER -------------------- */}
      <footer className="mt-20">
        <section className="grid md:grid-cols-4 gap-8 bg-[#0e0e21] text-white px-10 py-14">

          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-bold text-xl">SAMS</h2>
            </div>
            <p className="text-sm leading-relaxed">
              At [School Name], we provide quality education that nurtures
              curiosity, creativity, and confidence in every child...
            </p>

            {/* Social Icons */}
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
            <p className="flex items-center gap-2 text-sm">
              📍 238, Arimantab, Moska USA.
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm">
              📞 (00) 875 784 5682
            </p>
          </div>

          {/* Column 4 */}
          <div>
            <h2 className="font-bold text-xl mb-4">
              2025–26 Admissions Openery
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`admission ${index}`}
                  className="w-20 h-20 rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        </section>

        {/* bottom bar */}
        <div className="bg-[#0e0e21] border-t border-gray-700 text-center py-4 text-white text-sm">
          © School name All Rights Reserved. 2025
        </div>
      </footer>
    </div>
  );
};

export default Area1;
