import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Home/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/event/userBookEvent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(res.data.bookEvents);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch events");
    }
  };

  const cancelEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/event/cancel/${eventId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      fetchEvents(); // refresh after cancel
    } catch (err) {
      setMessage(err.response?.data?.message || "Cancel failed");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-indigo-400">Your Events</h1>
            <button
              onClick={() => navigate("/user/request-event")}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
            >
              + Request New Event
            </button>
          </div>

          {message && (
            <p className="mb-4 text-red-400 text-center font-medium">{message}</p>
          )}

          {events.length === 0 ? (
            <p className="text-center text-gray-400">No events found.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event._id} className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-700 shadow-md">
                  <h2 className="text-xl font-semibold text-indigo-300 mb-2">{event.eventType}</h2>
                  <p><span className="text-gray-400 font-medium">Date:</span> {new Date(event.eventDate).toLocaleDateString()}</p>
                  <p><span className="text-gray-400 font-medium">Guests:</span> {event.guests}</p>
                  <p><span className="text-gray-400 font-medium">Budget:</span> ₹{event.budget}</p>
                  <p>
                    <span className="text-gray-400 font-medium">Status:</span>{" "}
                    <span className={`font-semibold ${
                      event.status === "pending" ? "text-yellow-400" :
                      event.status === "booked" ? "text-green-400" : "text-red-400"
                    }`}>
                      {event.status.toUpperCase()}
                    </span>
                  </p>

                  {event.status === "pending" && (
                    <button
                      onClick={() => cancelEvent(event._id)}
                      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Cancel Event
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
