import React, { useEffect } from "react";
import { BsGeoAltFill, BsTelephoneFill } from "react-icons/bs";
import founder from "../images/founder.png";
import Admissionopen from "../images/Admissionopen.png";

const About = () => {
  useEffect(() => {
    // Animate sections when they come into view
    const sections = document.querySelectorAll(
      ".founder-section, .History, .Vision, .Mission"
    );
    const headings = document.querySelectorAll(".container h2");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    // Animate headings separately
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {

            
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    headings.forEach((h) => headingObserver.observe(h));

    // Scroll to top button
    const topBtn = document.getElementById("topBtn");
    const handleScroll = () => {
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 return (
  <div className="flex flex-col min-h-screen bg-white text-gray-800">

    {/* Main Wrapper */}
    <div className="flex-grow container mx-auto p-4 sm:p-8">

      {/* Founder Section */}
      <section className="founder-section mb-10">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Founder & Director
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
        </p>

        {/* Card */}
        <div className="bg-[#f3f0ff] p-6 sm:p-10 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left Column */}
          <div className="flex flex-col items-center">
            <img
              src={founder}
              alt="Founder"
              className="w-40 h-40 rounded-full object-cover shadow-md mb-4"
            />

            {/* Social Icons */}
            <div className="flex gap-3 mb-6">
              <i className="bi bi-facebook text-xl cursor-pointer"></i>
              <i className="bi bi-instagram text-xl cursor-pointer"></i>
              <i className="bi bi-twitter text-xl cursor-pointer"></i>
              <i className="bi bi-linkedin text-xl cursor-pointer"></i>
            </div>

            {/* Contact Box */}
            <div className="text-sm text-gray-700 mb-4 text-center">
              <p className="flex items-center gap-2 justify-center">
                <BsTelephoneFill /> (484) 429-987
              </p>
              <p className="flex items-center gap-2 justify-center mt-1">
                <BsGeoAltFill /> Indiana, Wisconsin (WI), 54205
              </p>
              <p className="mt-1">amillam69@gmail.com</p>
            </div>

            {/* Button */}
            <button className="bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-2 rounded-lg shadow-md">
              Contact Us Teacher
            </button>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-gray-900">MELVIN WARNER</h3>
            <span className="text-gray-500 text-sm block mb-4">TEACHER</span>

            <p className="text-gray-700 leading-relaxed mb-4">
              Tempor orci dapibus ultrices in iaculis nunc sed augue. Feugiat in ante metus dictum at tempor commodo, venenatis lectus magna fringilla urna porttitor rhoncus.
            </p>

            <p className="text-gray-700 leading-relaxed mb-4">
              Tempor orci dapibus ultrices in iaculis nunc sed augue. Feugiat in ante metus dictum at tempor commodo felis integer feugiat.
            </p>

            <h4 className="font-bold text-gray-900 mb-2">Education:</h4>
            <p className="text-gray-700 leading-relaxed">
              Five expert years figuring out the “formula” to teaching technical skills in a classroom environment...
            </p>
          </div>
        </div>
      </section>


      {/* Mission Section */}
      <section className="Mission my-14">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-2">
          Our Mission
        </h2>
        <p className="text-center text-gray-500 mb-6 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
            <li>Paperless admissions; live status; full student health profiles.</li>
            <li>One-tap attendance; instant alerts; automatic timetables; quick substitutions.</li>
            <li>Simple exams; digital gradebooks; timely report cards; tracking.</li>
            <li>Online fees; reminders; automatic receipts; clear history; refunds.</li>
          </ul>

          {/* Right - Illustration */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2014/2014867.png"
            alt="Mission Illustration"
            className="w-60 mx-auto"
          />
        </div>
      </section>

      {/* History */}
      <section className="History my-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our history</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          The shift began with one need: reduce paperwork and delays without losing control...
        </p>
      </section>

      {/* Vision */}
      <section className="Vision my-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          An organized, inclusive campus where admin feels light, safety is assured...
        </p>
      </section>

    </div>

    {/* Footer */}
    <footer className="bg-[#0f0f18] text-white mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 p-10">

        {/* About */}
        <div>
          <h2 className="text-lg font-bold mb-3">SAMS School</h2>
          <p className="text-gray-300">
            At School Name, we provide quality education that nurtures curiosity, creativity, and confidence.
          </p>
        </div>

        {/* Branches */}
        <div>
          <h2 className="text-lg font-bold mb-3">Other Branches</h2>
          <ul className="space-y-1 text-gray-300">
            {["Web Development", "UI/UX Design", "Management", "Digital Marketing", "Blog News"].map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h2 className="text-lg font-bold mb-3">Address</h2>
          <p className="text-gray-300">123, Amaravathi, Mocha</p>
          <p className="text-gray-300">📞 (00) 778 5462</p>
        </div>

        {/* Admissions */}
        <div className="text-center">
          <h2 className="text-lg font-bold mb-3">2025-26 Admissions Open</h2>
          <img
            src={Admissionopen}
            className="w-28 mx-auto rounded-lg shadow-lg"
            alt="Admissions"
          />
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-700 text-gray-400">
        © School name All Rights Reserved. 2025
      </div>
    </footer>

  </div>
);

       };
export default About;