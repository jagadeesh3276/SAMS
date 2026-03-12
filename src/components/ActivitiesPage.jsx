// SocialActivity.jsx
import React from "react";
import sportsgames from "../images/sportsgames.png";

const   ActivitiesPage
 = () => {
  return (
    <div className="font-sans bg-[#f8fafc]">

     {/* Hero Section */}
<div
  className="relative w-full h-[350px] flex flex-col justify-center items-center text-center text-[#2a2a2a]
             bg-gradient-to-r from-[#d8e6ff] via-[#f5e8ff] to-[#ffe6d9]"
>
  {/* Decorative Shapes */}
  <div className="absolute top-10 left-10 w-6 h-6 bg-pink-400 rounded-full opacity-60"></div>
  <div className="absolute top-20 right-20 w-10 h-10 bg-purple-400 square opacity-40"></div>
  <div className="absolute bottom-16 left-1/3 w-4 h-4 bg-blue-400 rounded-half opacity-50"></div>
  <div className="absolute bottom-10 right-1/4 w-8 h-8 bg-orange-300 rounded-full opacity-50"></div>

  <h1 className="text-5xl font-bold uppercase tracking-wide text-[#2b2b2b]">
   Arts & Culture

  </h1>

  <p className="mt-4 text-lg font-medium text-gray-700">
    Celebrating Creativity, Expression & Heritage

  </p>
</div>

      {/* Our Activities */}
      <section className="my-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#a02121] mb-10">
          Our Activities
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white shadow-xl p-6 rounded-2xl hover:-translate-y-2 transition-all">
            <img
              src="https://img.freepik.com/premium-vector/football-cricket-basketball-volleyball-icon-set_822734-265.jpg"
              alt="Outdoor"
              className="h-32 mx-auto mb-4"
            />
            <h5 className="font-bold text-lg text-center mb-2">Visual Arts
</h5>
            <p className="text-center text-gray-600">
              Drawing, Painting, Craftwork, Sculpture, and Digital Art.

            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-xl p-6 rounded-2xl hover:-translate-y-2 transition-all">
            <img
              src="https://img.freepik.com/free-vector/board-games-concept-illustration_114360-11866.jpg"
              alt="Indoor"
              className="h-32 mx-auto mb-4"
            />
            <h5 className="font-bold text-lg text-center mb-2">Indoor Games
</h5>
            <p className="text-center text-gray-600">
             Music (Vocal & Instrumental), Dance (Classical & Contemporary), Drama & Theatre.

            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-xl p-6 rounded-2xl hover:-translate-y-2 transition-all">
            <img
              src="https://img.freepik.com/free-vector/gym-fitness-concept-illustration_114360-4395.jpg"
              alt="Fitness"
              className="h-32 mx-auto mb-4"
            />
            <h5 className="font-bold text-lg text-center mb-2">Skill Development
</h5>
            <p className="text-center text-gray-600">
              YCreative writing, debates, elocution, and storytelling.


            </p>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="my-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#a02121] mb-10">
          Achievements
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>200+ artworks exhibited in inter-school and community art shows.
</li>
            <li>20 stage plays performed at school and district-level competitions.
</li>
            <li>30+ awards in singing, instrumental, and dance competitions.
</li>
            <li>Recognized for Best Cultural Presentation at inter-school annual fest (2023).
</li>
          </ul>

          <img
            src="https://img.freepik.com/free-vector/winner-concept-illustration_114360-1615.jpg"
            className="w-80 mx-auto"
            alt="Achievements"
          />
        </div>
      </section>

      {/* Gallery */}
      <section className="my-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#a02121] mb-10">
          Gallery
        </h2>

        <div className="flex gap-5 overflow-x-auto pb-4">
          {[
            "https://img.freepik.com/free-photo/children-playing-football-grass-field_23-2151390255.jpg",
            "https://img.freepik.com/free-photo/kids-playing-cricket_1303-28361.jpg",
            "https://img.freepik.com/free-photo/boys-playing-basketball_23-2151648722.jpg",
            "https://img.freepik.com/free-photo/children-team-sports_23-2151831672.jpg",
          ].map((img, i) => (
            <img
              key={i}
              src={img}
              alt="Gallery"
              className="h-40 w-64 rounded-lg object-cover shadow-md"
            />
          ))}
        </div>
      </section>

      {/* Reach Us */}
      <section className="my-20 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-[#a02121] mb-10">
          Reach Us
        </h2>

        <div className="grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Form */}
          <div className="p-10">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <input type="text" placeholder="Student Name" className="p-4 border rounded-lg" />
              <input type="text" placeholder="Student ID" className="p-4 border rounded-lg" />
              <input type="email" placeholder="Email Address" className="p-4 border rounded-lg" />
              <input type="text" placeholder="Phone Number" className="p-4 border rounded-lg" />
            </div>

            <button
              className="block w-full bg-[#a02121] text-white py-3 rounded-full font-bold hover:bg-red-800"
              onClick={() => alert("We Will Reach You Soon")}
            >
              Submit
            </button>
          </div>

          {/* Image */}
          <img
            src="https://img.freepik.com/free-photo/two-teen-girls-studying-library_23-2148006427.jpg"
            alt="Students"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Footer */}
      <footer>
        <section className="grid md:grid-cols-4 gap-8 bg-black text-white px-10 py-12">

          <div>
            <h2 className="font-bold text-xl mb-3">SAMS School</h2>
            <p className="text-gray-300">
              At SAMS School, we provide quality education nurturing curiosity,
              creativity & confidence in every child.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Address</h2>
            <p>Madhapur, Hyderabad – 500081</p>
            <p>📞 +91 9XXXXXXX89</p>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-3">Other Branches</h2>
            <ul className="space-y-1 text-gray-300">
              <li>Madhapur</li>
              <li>Secunderabad</li>
              <li>Manikonda</li>
              <li>Hi-Tech City</li>
              <li>Gachibowli</li>
              <li>Khairatabad</li>
            </ul>
          </div>

          <div className="text-center">
            <h2 className="font-bold text-xl">2025-26 Admissions Open</h2>
          </div>
        </section>

        <div className="bg-black text-center py-4 text-gray-300 text-sm border-t border-gray-700">
          © School Name. All Rights Reserved. 2025
        </div>
      </footer>
    </div>
  );
};

export default    ActivitiesPage
;
