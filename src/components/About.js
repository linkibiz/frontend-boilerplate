import React from 'react'

const About = ({info}) => {
  return (
    <>
      {info && (
        <>
         <h2 className='w-full text-left font-bold'> Sobre mi </h2>
         <p>
          {info.attributes.sobre_mi}
         </p>
        </>
      )}
    </>
  )
}

export default About