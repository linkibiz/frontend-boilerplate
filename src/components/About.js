import React from "react";

const About = ({ info }) => {
  console.log("info", info)
  return <>{info && <p>{info.attributes.sobre_mi}</p>}</>;
};

export default About;
