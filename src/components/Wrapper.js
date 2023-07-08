import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className="p-5 flex justify-center items-start flex-col gap-6">
      {children}
    </div>
  )
}

export default Wrapper