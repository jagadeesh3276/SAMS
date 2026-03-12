import React from "react";
import schoolcampus from "../images/schoolcampus.png";

// Import all gallery images
import camp1 from "../images/camp1.jpg";
import camp2 from "../images/camp2.jpg";
import camp3 from "../images/camp3.jpg";
import camp4 from "../images/camp4.jpg";
import camp5 from "../images/camp5.jpg";
import camp6 from "../images/camp6.jpg";

const Campus = () => {
  const galleryImages = [camp1, camp2, camp3, camp4, camp5, camp6];
// Carousel State
const [currentIndex, setCurrentIndex] = React.useState(0);

// Auto Slide Logic (loop)
React.useEffect(() => {
  const timer = setInterval(() => {
    setCurrentIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(timer);
}, [galleryImages.length]);

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* -------------------- HERO AREA -------------------- */}
      <section className="w-full py-16 bg-gradient-to-r from-[#f6e7e7] to-[#e3e6ff] text-center relative">
        <h1 className="text-4xl font-bold tracking-wide text-[#073c68]">
          CAMPUS
        </h1>

        {/* Small decorative icons */}
        <div className="absolute left-10 top-10 text-red-600 text-3xl">◦◦◦◦</div>
        <div className="absolute right-10 top-14 text-purple-600 text-3xl">*</div>
        <div className="absolute left-1/2 bottom-6 text-red-500 text-2xl">↻</div>
      </section>

      {/* -------------------- GALLERY SECTION -------------------- */}
<section className="max-w-6xl mx-auto text-center mt-10 overflow-hidden">
  <h2 className="text-3xl font-bold text-gray-900">Gallery</h2>
  <p className="text-gray-600 mt-2 max-w-xl mx-auto">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore.
  </p>

  {/* Carousel Container */}
  <div className="relative mt-10 w-full overflow-hidden">
    <div
      className="flex transition-transform duration-700 ease-out"
      style={{
        transform: `translateX(-${currentIndex * 100}%)`,
      }}
    >
      {galleryImages.map((img, index) => (
        <div key={index} className="min-w-full flex justify-center">
          <img
            src={img}
            alt={`Gallery ${index}`}
            className="w-[450px] h-[260px] object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </div>
  </div>

  {/* Dots */}
  <div className="flex justify-center mt-4 gap-2">
    {galleryImages.map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full ${
          currentIndex === index ? "bg-[#073c68]" : "bg-gray-300"
        }`}
      ></div>
    ))}
  </div>
</section>


      {/* -------------------- FOOTER -------------------- */}
      <footer className="mt-20">
        <section className="grid md:grid-cols-4 gap-8 bg-[#0e0e21] text-white px-10 py-14">

          {/* Column 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={schoolcampus} alt="logo" className="w-12 h-12 rounded-md" />
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
              {galleryImages.slice(0, 6).map((img, index) => (
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

export default Campus;
