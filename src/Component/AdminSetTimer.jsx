import { useState } from "react";
import { updatePremiumTime } from "../api/users";

const AdminSetTimer = () => {
  const [days, setDays] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!days || isNaN(days) || days <= 0) {
      setMessage("Please enter a valid number of days.");
      return;
    }

    try {
      const res = await updatePremiumTime(parseInt(days));
      setMessage(
        `Premium time successfully updated to ${new Date(
          res.endTime * 1000
        ).toLocaleString()}`
      );
    } catch (error) {
      setMessage("Error updating premium time.");
    }
  };

  return (
    <div className="text-center mt-6">
      <h2 className="text-2xl font-semibold">Set Premium Time</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Number of Days:</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="mt-2 p-2 border focus:border-none rounded-md"
            min="1"
            placeholder="Enter number of days"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
        >
          Update Premium Time
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default AdminSetTimer;
