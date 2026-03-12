import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // ✅ component-scoped
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";
import schoolimg from "../images/schoolimg.png";
import campus1 from "../images/campus1.png";  // ✅ corrected
import campus2 from "../images/campus2.png";
import sports from "../images/sports.png";
import preschool from "../images/preschool.png";
import brand from "../images/brand.png";
import admission from "../images/admission.png";
import testimonial1 from "../images/testimonial1.png";
import testimonial2 from "../images/testimonial2.png";
import testimonial3 from "../images/testimonial3.png";
import testimonial4 from "../images/testimonial4.png";
import testimonial5 from "../images/testimonial5.png";
import Admissionopen from "../images/Admissionopen.png";


export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      img: banner1,
      title: "Shaping Bright Minds, Inspiring Future",
      green: "Explore Programs",
      red: "Discover More",
    },
    {
      img: banner2,
      title: "Learning That Goes Beyond Books",
      green: "Explore Programs",
      red: "Discover More",
    },
    {
      img: banner3,
      title: "A Community That Cares",
      green: "Explore Programs",
      red: "Discover More",
    },
  ];

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

return (
  
  <div className="w-full overflow-hidden">

    {/* ================= SLIDER (unchanged) ================= */}
    {/* ================= TOP HERO (insert ABOVE the slider) ================= */}
<header className="w-full bg-gradient-to-r from-white via-white to-[#f1f7ff]">
  

  {/* Main hero */}
  <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 grid md:grid-cols-2 gap-8 items-center">
    {/* Left content */}
    <div className="space-y-5">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0b2540] leading-tight">
        A Community That Carest
      </h1>

      <p className="text-gray-700 max-w-2xl leading-relaxed">
        At SAMS School we nurture curious minds through a balanced blend of academic excellence, co-curricular activities and character building. Join a supportive learning environment that prepares students for life.
      </p>

      <div className="flex flex-wrap gap-4 mt-4">
        <a
          href="/enquiryform"
          className="inline-flex items-center gap-3 bg-green-700 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-green-800"
        >
          <i className="bi bi-mortarboard-fill"></i>
          Explore Programs
        </a>

        <a
          href="/about"
          className="inline-flex items-center gap-3 border border-[#a02121] text-[#a02121] px-5 py-3 rounded-lg font-semibold hover:bg-[#a02121] hover:text-white transition"
        >
          Learn More
        </a>
      </div>

      {/* Quick feature chips below CTAs */}
      <div className="flex flex-wrap gap-3 mt-5">
        <div className="flex items-center gap-3 bg-white shadow-sm p-3 rounded-lg">
          <img src={preschool} alt="pre" className="w-8 h-8" />
          <div>
            <div className="text-xs text-gray-500">Pre-Primary</div>
            <div className="font-semibold text-sm">Holistic Early Learning</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white shadow-sm p-3 rounded-lg">
          <img src={sports} alt="sports" className="w-8 h-8" />
          <div>
            <div className="text-xs text-gray-500">Sports</div>
            <div className="font-semibold text-sm">Indoor & Outdoor</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white shadow-sm p-3 rounded-lg">
          <img src={brand} alt="brand" className="w-8 h-8" />
          <div>
            <div className="text-xs text-gray-500">Clubs</div>
            <div className="font-semibold text-sm">Creativity & Tech</div>
          </div>
        </div>
      </div>
    </div>

    {/* Right hero image / small card stack */}
    <div className="relative grid grid-cols-1 gap-4">
      <div className="rounded-xl overflow-hidden shadow-xl">
        <img src={banner3} alt="Hero" className="w-full h-[360px] object-cover" />
      </div>

      <div className="absolute right-6 bottom-6 md:bottom-10 md:right-12 w-[260px] bg-white rounded-xl shadow-2xl p-4 border">
        <div className="flex items-center gap-3">
          <img src={Admissionopen} className="w-12 h-12 rounded-md" alt="Admit" />
          <div>
            <div className="text-xs text-gray-500">Admissions</div>
            <div className="font-semibold text-sm">Now Open 2025-26</div>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-3">Simple process. Limited seats. Enroll now to secure your child’s spot.</p>
        <a href="/enquiryform" className="mt-4 inline-block bg-[#a02121] text-white text-sm px-4 py-2 rounded-md font-semibold">Apply Now</a>
      </div>
    </div>
  </div>
</header>

    { /* keep your existing slider code here */ }

    {/* ================= ABOUT ================= */}
    <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 grid md:grid-cols-2 gap-10 items-center">
      <div>
        <img
          src={schoolimg}
          className="rounded-xl shadow-lg w-full h-[380px] object-cover"
        />
      </div>

      <div>
        <h2 className="text-[#a02121] text-3xl font-bold mb-4">Welcome To SAMS</h2>
        <p className="text-gray-700 leading-relaxed text-[15px]">
          Founded in 2010, SAMS School has been committed to nurturing young minds
          through a thoughtful blend of academic excellence, creativity and strong
          human values...
        </p>
        <button
          onClick={() => (window.location.href = "/about")}
          className="mt-5 bg-[#a02121] hover:bg-red-900 text-white px-6 py-2 rounded-md shadow-md transition"
        >
          Read More
        </button>
      </div>
    </section>

    {/* ================= PROGRAMS ================= */}
    <section className="bg-[#f7f7f7] py-12">
      <h2 className="text-center text-3xl font-bold text-[#a02121] mb-10">
        Programs
      </h2>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {[
          { title: "Sports & Games", desc: "Building fitness...", link: "/socialactivity" },
          { title: "Arts & Culture", desc: "Music, dance...", link: "/activitiespage" },
          { title: "Clubs & Activities", desc: "Science clubs...", link: "/creativity" },
        ].map((p, i) => (
          <div key={i} className="bg-white p-7 text-center shadow-lg rounded-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
            <p className="text-gray-600 mb-4">{p.desc}</p>
            <Link
              to={p.link}
              className="px-5 py-2 bg-[#a02121] text-white rounded-md hover:bg-red-800"
            >
              Know More
            </Link>
          </div>
        ))}
      </div>
    </section>

    {/* ================= CATEGORY ================= */}
    <section className="py-10 bg-white">
      <div className="flex flex-wrap justify-center gap-8">
        {[
          { img: campus1, text: "Campus", route: "/campus" },
          { img: campus2, text: "Campus Life", route: "/campuslife" },
          { img: sports, text: "Sports", route: "/sports" },
          { img: preschool, text: "Kids Life", route: "/kidslife" },
          { img: brand, text: "Our Branding", route: "/ourbrand" },
        ].map((c, i) => (
          <Link
            key={i}
            to={c.route}
            className="flex flex-col items-center justify-center w-[130px] h-[130px] bg-white shadow-md rounded-full hover:bg-[#a02121] hover:text-white transition"
          >
            <img src={c.img} className="w-10 h-10 mb-2" />
            <span className="font-semibold">{c.text}</span>
          </Link>
        ))}
      </div>
    </section>

    {/* ================= TESTIMONIALS ================= */}
    <section className="bg-[#f7f7f7] py-12">
      <h2 className="text-center text-3xl font-bold text-[#a02121] mb-10">
        What Parents Say
      </h2>

      <div className="overflow-x-auto flex gap-6 px-6 pb-4 no-scrollbar">
        {[
          { name: "Ramesh Kumar", text: "SAMS School has built...", image: testimonial2 },
          { name: "Anita Sharma", text: "The teachers here truly...", image: testimonial1 },
          { name: "Vikram Rao", text: "I’ve seen big improvement...", image: testimonial4 },
          { name: "Priya", text: "Balances studies with activities...", image: testimonial3 },
          { name: "Sandeep Verma", text: "We feel safe & happy...", image: testimonial5 },
        ].map((t, i) => (
          <div
            key={i}
            className="min-w-[350px] bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
          >
            <p className="text-gray-700 italic mb-4">{t.text}</p>
            <div className="flex items-center gap-4">
              <img src={t.image} className="w-14 h-14 rounded-full border" />
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-yellow-500 text-sm">★★★★★</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* ================= ADMISSION ================= */}
    <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 py-14">
      <img src={admission} className="w-full md:w-[420px] rounded-xl shadow-lg" />

      <div className="grid sm:grid-cols-2 gap-8 text-center">
        <div className="p-6 shadow-lg bg-white rounded-xl">
          <h3 className="font-semibold text-xl mb-3">Enroll Your Child Today</h3>
          <p className="text-gray-600 mb-3">Admissions are now open...</p>
          <a
            href="/enquiryform"
            className="inline-block bg-green-700 px-5 py-2 text-white rounded-md hover:bg-green-800"
          >
            Apply Now
          </a>
        </div>

        <div className="p-6 shadow-lg bg-white rounded-xl">
          <h3 className="font-semibold text-xl mb-3">Step Into SAMS</h3>
          <p className="text-gray-600 mb-3">Admissions are simple...</p>
          <a
            href="/enquiryform"
            className="inline-block bg-[#a02121] px-5 py-2 text-white rounded-md hover:bg-red-800"
          >
            Start Admission
          </a>
        </div>
      </div>
    </section>

    {/* ================= FAQ ================= */}
    <section className="bg-[#f7f7f7] py-12">
      <h2 className="text-center text-3xl font-bold text-[#a02121] mb-10">
        FAQ
      </h2>

      <div className="max-w-3xl mx-auto space-y-5">
        {[
          { q: "What classes does SAMS offer?", a: "We offer education from..." },
          { q: "Which curriculum do you follow?", a: "We follow CBSE/ICSE..." },
          { q: "What facilities are available?", a: "Modern classrooms..." },
          { q: "How do parents stay updated?", a: "PTMs, digital communication..." },
          { q: "When do admissions open?", a: "Nov–Jan every year..." },
        ].map((f, i) => (
          <details
            key={i}
            className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
          >
            <summary className="font-semibold text-lg">
              {f.q}
            </summary>
            <p className="mt-3 text-gray-700">{f.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* ================= FOOTER ================= */}
    <footer className="bg-[#0b0b0b] text-white py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-6">

        <div>
          <h3 className="font-bold text-xl mb-3">SAMS School</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            At SAMS, we provide quality education that nurtures curiosity,
            creativity and confidence...
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-3">Address</h3>
          <p>Madhapur, Hyderabad</p>
          <p>Pin: 500081</p>
          <p>📞 +91 9XXXXXXX89</p>

          <div className="flex gap-3 text-2xl mt-3">
            <i className="bi bi-instagram"></i>
            <i className="bi bi-whatsapp"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-linkedin"></i>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-3">Other Branches</h3>
          <ul className="space-y-1 text-gray-300">
            {["Madhapur", "Secunderabad", "Manikonda", "Hi-Tech City"].map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="font-bold text-lg mb-3">Admissions 2025-26</h3>
          <img src={Admissionopen} className="w-24 h-24" />
        </div>

      </div>

      <div className="text-center text-sm mt-10 text-gray-400">
        © SAMS School All Rights Reserved 2025
      </div>
    </footer>

  </div>
);

};