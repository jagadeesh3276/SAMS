import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const AcademicCalendar = () => {
  useEffect(() => {
    // Browser notification function
    window.sendNotification = function (title, date) {
      alert(`📢 Notification generated:\n${title} scheduled on ${date}`);
      if (Notification.permission === "granted") {
        new Notification("Academic Event", {
          body: `${title} on ${date}`,
          icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Academic Event", {
              body: `${title} on ${date}`,
              icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
            });
          }
        });
      }
    };
  }, []);

  // Sample events
  const events = [
    { id: "1", title: "Midterm Exam - Math", start: "2025-09-05" },
    { id: "2", title: "Science Syllabus Completion", start: "2025-09-10" },
    { id: "3", title: "Final Exam - Physics", start: "2025-09-20" },
  ];

  // Function to send notification to parent and teacher apps
  const sendAppNotification = async (eventTitle, eventDate) => {
    try {
      // Example backend endpoint (replace with your actual API endpoint)
      const response = await fetch("https://your-backend.com/api/notifyUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eventTitle,
          message: `New academic event scheduled on ${eventDate}`,
          recipients: ["parents", "teachers"], // optional structure
          date: eventDate,
        }),
      });

      if (response.ok) {
        alert(`✅ Notification sent to Parent and Teacher apps`);
      } else {
        alert(`⚠️ Failed to send app notification`);
      }
    } catch (error) {
      console.error("Error sending app notification:", error);
      alert("❌ Error sending app notification");
    }
  };

  // Combined handler
  const handleNotify = (title, date) => {
    window.sendNotification(title, date); // local browser notification
    sendAppNotification(title, date); // send to mobile apps
  };

  return (
    <div className="mt-[70px] ml-0 md:ml-[230px] flex flex-col md:flex-row h-[calc(100vh-70px)] p-8">
      {/* Calendar Section */}
      <div className="p-5 bg-white shadow-md overflow-y-auto w-full md:w-2/3 h-[50vh] md:h-auto">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      </div>

      {/* Event List */}
      <div className="p-5 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-300 overflow-y-auto w-full md:w-1/3 h-[50vh] md:h-auto">
        <h2 className="text-xl font-semibold mb-4">Event List</h2>
        <div id="eventsContainer">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white mb-3 p-3 rounded-lg shadow-sm flex justify-between items-center"
            >
              <span className="text-sm">
                <b>{ev.title}</b>
                <br />
                <small>{ev.start}</small>
              </span>
              <button
                className="text-blue-500 hover:text-blue-700 text-lg"
                onClick={() => handleNotify(ev.title, ev.start)}
              >
                <i className="fas fa-bell"></i> Notify
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
