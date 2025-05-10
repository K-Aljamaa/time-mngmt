"use client";

import { useState } from "react";

export default function TimeEntryForm() {
  const [date, setDate] = useState("");
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [hoursWorked, setHoursWorked] = useState<number | null>(null);

  const calculateHours = () => {
    if (!clockIn || !clockOut) return;

    // Split "HH:MM" format into hours and minutes
    const [inHours, inMinutes] = clockIn.split(":").map(Number);
    const [outHours, outMinutes] = clockOut.split(":").map(Number);

    // Calculate the difference
    let hours = outHours - inHours;
    let minutes = outMinutes - inMinutes;

    // Handle negative minutes
    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }

    // Convert to decimal hours
    const totalHours = hours + minutes / 60;
    setHoursWorked(parseFloat(totalHours.toFixed(2)));
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Log Time Entry</h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="clockIn"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Clock In
          </label>
          <input
            type="time"
            id="clockIn"
            value={clockIn}
            onChange={(e) => setClockIn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="clockOut"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Clock Out
          </label>
          <input
            type="time"
            id="clockOut"
            value={clockOut}
            onChange={(e) => setClockOut(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
            required
          />
        </div>
        <button
          onClick={calculateHours}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Calculate Hours
        </button>
        {hoursWorked !== null && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md">
            <p className="font-medium">
              Hours worked: <span className="font-bold">{hoursWorked}</span>
            </p>
            {hoursWorked < 8 && (
              <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                Shortfall: {(8 - hoursWorked).toFixed(2)} hours
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
