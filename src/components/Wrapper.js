import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className="py-4 px-8 flex justify-center items-start flex-col gap-6">
      {children}
    </div>
  )
}

export default Wrapper