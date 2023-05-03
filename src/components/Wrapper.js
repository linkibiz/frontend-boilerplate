import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className="p-4 flex justify-center items-center flex-col gap-8">
      {children}
    </div>
  )
}

export default Wrapper