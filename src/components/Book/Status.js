import React, { useState } from "react";

const Status = ({ handleStatus, currentStatus }) => {
  const handleChange = (e) => {
    handleStatus(e);
  };
  return (
    <div className="relative">
      <select
        value={currentStatus}
        className="block mt-2 appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        onChange={handleChange}
      >
        <option value="">Select Status</option>
        <option value="plan to read">Plan to Read</option>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default Status;
