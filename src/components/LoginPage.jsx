import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuperAdminImg from '../images/superadmin.png';
import RecepImg from '../images/recip.png';
import samslogo from "../images/samslogo.png";
import AccountantImg from '../images/accountant.png';
import Admissionopen from "../images/admissionopen.PNG";
import loginbg from "../images/loginbg.png";
import loginformbg from "../images/loginformbg.png";

const credentials = {
  "Super Admin": { username: "superadmin", password: "super123" },
  Admin: { username: "admin", password: "admin123" },
  Receptionist: { username: "reception", password: "recep123" },
  Accountant: { username: "accountant", password: "acc123" },
};

const LoginPage = () => {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [userError, setUserError] = useState(false);

  const navigate = useNavigate();

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setUsername(credentials[selectedRole].username);
    setPassword(credentials[selectedRole].password);
    setShowPass(false);
    setUserError(false);
  };

  const toggleFields = () => setShowPass(!showPass);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!role) return alert("Please select a role first.");
    if (!username || !password) return alert("Please enter both username and password.");

    if (!/^[A-Za-z]/.test(username)) {
      setUserError(true);
      return;
    } else {
      setUserError(false);
    }

    if (
      credentials[role] &&
      username === credentials[role].username &&
      password === credentials[role].password
    ) {
      alert(`Login successful as ${role}`);
      navigate(`/dashboard?role=${encodeURIComponent(role)}`);
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">

      {/* ================= MAIN LOGIN SECTION ================= */}
      <div className="flex flex-col items-center justify-center px-6 py-10">

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE – ROLE SELECTION */}
          <div>
            <div className="flex justify-center mb-6">
              <img src={samslogo} alt="school logo" className="w-20" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Select Role to Login
            </h2>

            <p className="text-center text-gray-500 mb-8">Click Here</p>

            <div className="grid grid-cols-2 gap-6 px-4">
              {Object.keys(credentials).map((r) => (
                <div
                  key={r}
                  onClick={() => selectRole(r)}
                  className="bg-white border rounded-xl shadow-md p-5 cursor-pointer 
                             hover:shadow-xl hover:border-blue-400 transition"
                >
                  <img
                    src={
                      r === "Super Admin"
                        ? SuperAdminImg
                        : r === "Admin"
                        ? "https://cdn-icons-png.flaticon.com/512/2995/2995642.png"
                        : r === "Receptionist"
                        ? RecepImg
                        : AccountantImg
                    }
                    alt={r}
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="text-center font-semibold text-gray-700 text-lg">{r}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE – LOGIN FORM */}
          <div className="bg-white border shadow-2xl rounded-3xl p-10 w-full">

            <label className="text-gray-700 font-medium text-sm">Role ID</label>
            <input
              type="text"
              value={role}
              readOnly
              className="w-full border rounded-lg px-4 py-3 mb-5 bg-gray-100 mt-1"
            />

            <label className="text-gray-700 font-medium text-sm">User Name</label>
            <div className="mb-5 mt-1">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
              {userError && (
                <p className="text-red-500 text-sm mt-1">
                  Username must start with a letter
                </p>
              )}
            </div>

            <label className="text-gray-700 font-medium text-sm">Password</label>
            <div className="relative mb-5 mt-1">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
              />
              <span
                className="absolute right-4 top-3.5 cursor-pointer text-gray-500 text-sm"
                onClick={toggleFields}
              >
                {showPass ? "Hide" : "👁"}
              </span>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#d4d4d4] text-gray-700 py-3 rounded-lg 
                         font-semibold hover:bg-[#c8c8c8] transition"
            >
              Log in
            </button>

            <p className="text-center mt-4">
              <a href="#" className="text-gray-700 underline text-sm">
                Forget your password?
              </a>
            </p>

          </div>
        </div>
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

export default LoginPage;
