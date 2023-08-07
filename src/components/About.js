import React from "react";

const About = ({ info }) => {
  return (
    <>
      {info && (
        <div className="flex flex-col gap-3 w-full items-left text-black text-justify">
          <p className="font-bold">Sobre mi</p>
          <p>{info}</p>
        </div>
      )}
    </>
  );
};

export default About;
