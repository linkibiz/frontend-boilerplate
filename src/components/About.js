import React from "react";

const About = ({ info }) => {
  return <>{info && <p>{info.sobre_mi}</p>}</>;
};

export default About;
