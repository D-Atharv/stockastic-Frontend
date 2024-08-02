import React from 'react'

import { useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-row items-center justify-between px-[2%] py-3'>
      <img className='h-[60px] w-[70px]' src='./stockastic_logo.svg' />
      <h1 className='font-montaga text-white text-extrabold text-3xl'>
        STOCKASTIC
      </h1>
      <div>
        <button
          className='font-montaga bg-purple-700 text-white py-2 px-5 rounded-full  h-[40px]'
          onClick={() => navigate('/portfolio')}
        >
          MY PORTFOLIO
        </button>
        <button
          className='font-montaga bg-purple-700 text-white py-2 px-5 rounded-full  h-[40px] ml-4'
          onClick={() => {
            localStorage.removeItem('jwt')
            navigate('/SignIn')
          }}
        >
          LOGOUT
        </button>
      </div>
    </div>
  )
}

export default Navbar
