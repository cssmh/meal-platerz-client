import { useState } from "react";
import { updatePremiumTime } from "../api/users";

const AdminSetTimer = () => {
  const [timeValue, setTimeValue] = useState("");
  const [timeUnit, setTimeUnit] = useState("days");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!timeValue || isNaN(timeValue) || timeValue < 0) {
      setMessage("Please enter a valid number for the selected time unit.");
      return;
    }

    let totalSeconds = 0;
    if (timeUnit === "days") {
      totalSeconds = parseInt(timeValue, 10) * 24 * 3600;
    } else if (timeUnit === "hours") {
      totalSeconds = parseInt(timeValue, 10) * 3600;
    } else if (timeUnit === "minutes") {
      totalSeconds = parseInt(timeValue, 10) * 60;
    }

    try {
      const res = await updatePremiumTime(totalSeconds / (24 * 3600));
      if (res.endTime === 0) {
        setMessage("Premium timer stopped successfully.");
      } else {
        setMessage(
          `Premium time successfully updated to ${new Date(
            res.endTime * 1000
          ).toLocaleString()}`
        );
      }
    } catch (error) {
      setMessage("Error updating premium time.");
    }
  };

  const handleStopTimer = async () => {
    try {
      const res = await updatePremiumTime(0);
      if (res.endTime === 0) {
        setMessage("Premium timer stopped successfully.");
      }
    } catch (error) {
      setMessage("Error stopping premium timer.");
    }
  };

  return (
    <div className="text-center mt-6">
      <h2 className="text-2xl font-semibold">Set Premium Time</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <label className="block text-sm font-medium">Set Time:</label>
          <input
            type="number"
            value={timeValue}
            onChange={(e) => setTimeValue(e.target.value)}
            className="mt-2 p-2 border rounded-md w-36"
            min="0"
            placeholder={`Enter ${timeUnit}`}
          />
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            className="mt-2 p-2 border rounded-md"
            style={{ outline: "none" }}
          >
            <option value="days">Days</option>
            <option value="hours">Hours</option>
            <option value="minutes">Min</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Update Premium Time
        </button>
      </form>
      <button
        onClick={handleStopTimer}
        className="mt-4 bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition"
      >
        Stop Timer
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AdminSetTimer;
