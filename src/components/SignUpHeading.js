import React from "react";

const SignUpHeading = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-3 mb-3">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-xs">{subtitle}</p>
    </div>
  );
};

export default SignUpHeading;
