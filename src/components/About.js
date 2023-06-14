import React from "react";

const About = ({ info }) => {
  console.log("info", info);
  return (
    <>
      {info && (
        <>
          <h2 className="font-bold">Sobre mi</h2>
          <p>{info.attributes.sobre_mi}</p>
        </>
      )}
    </>
  );
};

export default About;
