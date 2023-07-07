import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className="px-4 py-4 flex justify-center items-start flex-col gap-6">
      {children}
    </div>
  )
}

export default Wrapper