import React from "react";

const About = ({ info }) => {
  console.log("info", info);
  return (
    <>
      {info && (
        <div className="flex flex-col gap-3 w-full items-left">
          <p className="font-bold">Sobre mi</p>
          <p>{info}</p>
        </div>
      )}
    </>
  );
};

export default About;
