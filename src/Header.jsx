import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sams from "./images/Sams.JPG";
import Icon from "./images/Icon.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const [settingsPopupOpen, setSettingsPopupOpen] = useState(false);
  const [logoutPopupOpen, setLogoutPopupOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  const openProfilePopup = () => {
    setProfilePopupOpen(true);
    closeDropdown();
  };
  const closeProfilePopup = () => {
    setProfilePopupOpen(false);
    document.getElementById("profileForm")?.reset();
  };

  const openSettingsPopup = () => {
    setSettingsPopupOpen(true);
    closeDropdown();
  };
  const closeSettingsPopup = () => {
    setSettingsPopupOpen(false);
    document.getElementById("settingsForm")?.reset();
  };

  const openLogoutPopup = () => {
    setLogoutPopupOpen(true);
    closeDropdown();
  };
  const closeLogoutPopup = () => setLogoutPopupOpen(false);

  const handleLogout = () => {
    alert("Logged out successfully!");
    closeLogoutPopup();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown") && !event.target.matches(".profile-img")) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved!");
    closeProfilePopup();
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved!");
    closeSettingsPopup();
  };

  return (
    <>
      {/* ===== New Top Header UI - Clean White Bar ===== */}
   {/* ===== New Top Header UI - Clean White Bar ===== */}
<header className="fixed top-0 w-full z-50 h-16 bg-white shadow-sm flex items-center justify-between px-6">

  {/* ==== Search Box ==== */}
  <div className="flex items-center w-1/3">
    <div className="w-full bg-gray-100 rounded-full flex items-center px-4 py-2">
      <span className="material-icons text-gray-500 mr-2">search</span>
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none text-gray-700 w-full"
      />
    </div>
  </div>

  {/* ==== Right Side: Notification, Language, Profile ==== */}
  <div className="flex items-center gap-6">

    {/* Notification Icon (NO BADGE) */}
    <div className="cursor-pointer">
      <span className="material-icons text-gray-600 text-2xl">notifications</span>
    </div>

    {/* Language Selector with ▼ arrow */}
    <div className="flex items-center gap-2 cursor-pointer">
      <img
        src="https://flagsapi.com/GB/flat/32.png"
        alt="English"
        className="w-6 h-6 rounded-sm"
      />
      <span className="text-gray-700 font-medium">English</span>

      {/* Down Arrow */}
      <span className="text-gray-600 text-xs">▼</span>
    </div>

    {/* Profile Image + Dropdown */}
    <div className="relative">
      <img
        src={Icon}
        alt="Profile"
        className="profile-img h-10 w-10 rounded-full cursor-pointer border border-gray-300 object-cover"
        onClick={toggleDropdown}
      />

      {dropdownOpen && (
        <div className="dropdown absolute right-0 mt-3 bg-white text-gray-800 w-44 rounded-lg shadow-md overflow-hidden">
          <button
            onClick={openProfilePopup}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </button>
          <button
            onClick={openSettingsPopup}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </button>
          <button
            onClick={openLogoutPopup}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>

    {/* Admin Name */}
    <div className="text-right">
      <p className="font-semibold text-gray-800">Moni Roy</p>
      <p className="text-xs text-gray-500">Admin</p>
    </div>

  </div>
</header>


      {/* Popups - REUSED (unchanged) */}
      {[{ open: profilePopupOpen, close: closeProfilePopup, title: "My Profile", formId: "profileForm", submitHandler: handleProfileSubmit },
        { open: settingsPopupOpen, close: closeSettingsPopup, title: "Settings", formId: "settingsForm", submitHandler: handleSettingsSubmit }].map(({ open, close, title, formId, submitHandler }) =>
        open && (
          <div key={formId} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <form id={formId} onSubmit={submitHandler} className="flex flex-col gap-3">
                {title === "My Profile" && (
                  <>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter your name" required className="border rounded px-3 py-2" />
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Enter your email" required className="border rounded px-3 py-2" />
                    <label>Phone</label>
                    <input type="tel" name="phone" placeholder="Enter your phone" className="border rounded px-3 py-2" />
                  </>
                )}
                {title === "Settings" && (
                  <>
                    <label>Theme</label>
                    <select name="theme" className="border rounded px-3 py-2">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                    <label>Notifications</label>
                    <select name="notifications" className="border rounded px-3 py-2">
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                    <label>Language</label>
                    <select name="language" className="border rounded px-3 py-2">
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                    </select>
                  </>
                )}
                <div className="flex justify-end gap-2 mt-4">
                  <button type="button" onClick={close} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                    Close
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    {title === "My Profile" ? "Save Changes" : "Save Settings"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )
      )}

      {logoutPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-xs text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-center gap-2">
              <button onClick={closeLogoutPopup} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancel
              </button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
