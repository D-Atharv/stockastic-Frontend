import React from 'react'
import { useNavigate } from 'react-router'

const PortfolioNavbar = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-row items-center justify-between px-[2%] py-3'>
      <button onClick={() => navigate("/")}>
        <img className='w-[90px]' src='./back_1.svg' />
      </button>
      <h1 className='font-montaga text-white text-extrabold text-3xl'>
        STOCKASTIC
      </h1>
      <div className='flex flex-row items-center justify-between'>
        <button
          className=' mx-10 my-3 text-white font-normal font-montaga bg-purple-700 px-4 py-2 rounded-full'
          onClick={() => navigate('/transactionhistory')}
        >
          Transaction History
        </button>
        <img className='h-[60px] w-[70px]' src='./stockastic_logo.svg' />
      </div>
    </div>
  )
}

export default PortfolioNavbar
