import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className="p-4 flex justify-center items-start flex-col gap-4">
      {children}
    </div>
  )
}

export default Wrapper