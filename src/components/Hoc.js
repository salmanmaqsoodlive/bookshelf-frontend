import React from "react";

const Hoc = ({ children }) => {
  return (
    <div className="flex min-h-screen  items-center justify-center p-24 bg-slate-950">
      {children}
    </div>
  );
};

export default Hoc;
