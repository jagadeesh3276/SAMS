import React from "react";
import { Link } from "react-router-dom";

import area1 from "../images/area1.png";
import area2 from "../images/area2.png";
import area3 from "../images/area3.png";
import area4 from "../images/area4.png";
import area5 from "../images/area5.png";
import area6 from "../images/area6.png";
import Admissionopen from "../images/Admissionopen.png";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">

      {/* ----------- Branches Title ----------- */}
      <h3 className="text-3xl text-center font-bold mt-10">Our Branches</h3>
      <p className="text-center text-gray-500 max-w-xl mx-auto mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
      </p>

   {/* ----------- Auto Loop Carousel ----------- */}
<div className="mt-10 px-6 pb-16">
  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={30}
    slidesPerView={3}
    loop={true}
    centeredSlides={true}
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    breakpoints={{
      0: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="pb-10"
  >

    {/* Slide 1 */}
    <SwiperSlide>
      <Link to="/area1">
        <div className="w-64 mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
          <img src={area1} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="bg-blue-700 text-white text-center py-3 text-lg font-semibold rounded-b-xl">
            Madhapur
          </div>
        </div>
      </Link>
    </SwiperSlide>

    {/* Slide 2 */}
    <SwiperSlide>
      <Link to="/area2">
        <div className="w-64 mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
          <img src={area2} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="bg-blue-700 text-white text-center py-3 text-lg font-semibold rounded-b-xl">
            Secunderabad
          </div>
        </div>
      </Link>
    </SwiperSlide>

    {/* Slide 3 */}
    <SwiperSlide>
      <Link to="/area3">
        <div className="w-64 mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
          <img src={area3} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="bg-blue-700 text-white text-center py-3 text-lg font-semibold rounded-b-xl">
            Manikonda
          </div>
        </div>
      </Link>
    </SwiperSlide>

    {/* Slide 4 */}
    <SwiperSlide>
      <Link to="/area4">
        <div className="w-64 mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
          <img src={area4} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="bg-blue-700 text-white text-center py-3 text-lg font-semibold rounded-b-xl">
            Hi-Tech City
          </div>
        </div>
      </Link>
    </SwiperSlide>

    {/* Slide 5 */}
    <SwiperSlide>
      <Link to="/area5">
        <div className="w-64 mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
          <img src={area5} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="bg-blue-700 text-white text-center py-3 text-lg font-semibold rounded-b-xl">
            Gachibowli
          </div>
        </div>
      </Link>
    </SwiperSlide>

    {/* Slide 6 */}
    <SwiperSlide>
      <Link to="/area6">
        <div className="w-64 mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition cursor-pointer">
          <img src={area6} className="rounded-t-xl w-full h-40 object-cover" />
          <div className="bg-blue-700 text-white text-center py-3 text-lg font-semibold rounded-b-xl">
            Khairatabad
          </div>
        </div>
      </Link>
    </SwiperSlide>

  </Swiper>
</div>



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

export default Home;
