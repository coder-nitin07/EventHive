import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Home/Header";

const RequestEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    eventType: "",
    eventDate: "",
    location: "",
    guests: "",
    budget: "",
  });

  const [message, setMessage] = useState("");

  const eventTypes = [
    "Wedding",
    "Birthday",
    "Corporate",
    "Engagement",
    "Concert",
    "Other",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/event/book", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(res.data.message);
      setFormData({
        eventType: "",
        eventDate: "",
        location: "",
        guests: "",
        budget: "",
      });

      setTimeout(() => navigate("/user/dashboard"), 1000);
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            setMessage(err.response.data.message); // Show backend error
        } else {
            setMessage("Something went wrong. Please try again.");
        }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#0f0f0f] text-white px-4 py-8 flex justify-center items-start">
        <div className="bg-[#1a1a1a] p-8 rounded-xl w-full max-w-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">Request a New Event</h2>

          {message && <p className="text-red-400 mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700"
              required
            >
              <option value="">Select Event Type</option>
              {eventTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700"
            />

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Event Location"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700"
            />

            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              placeholder="Number of Guests"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700"
            />

            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Event Budget (in ₹)"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#2b2b2b] border border-gray-700"
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-semibold"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestEvent;