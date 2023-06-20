import React from "react";

const About = ({ info }) => {
<<<<<<< HEAD
  return <>{info && <p>{info.attributes.sobre_mi}</p>}</>;
=======
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
>>>>>>> gaby-carrizo
};

export default About;
