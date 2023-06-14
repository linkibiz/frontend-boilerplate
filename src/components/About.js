import React from "react";

const About = ({ info }) => {
  return <>{info && <p>{info.attributes.sobre_mi}</p>}</>;
};

export default About;
