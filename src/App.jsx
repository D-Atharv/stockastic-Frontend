import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import MainSection from './components/MainSection'
import MyPortfolio from './components/MyPortfolio'
import PortfolioNavbar from './components/PortfolioNavbar'
import SignIn from './components/Signin'
import TransactionHistory from './components/TransactionHistory'

const App = () => {
  const TradingPortal = () => {
    return (
      <div>
        <Navbar />
        <MainSection />
      </div>
    )
  }

  const Portfolio = () => {
    return (
      <div>
        <PortfolioNavbar />
        <MyPortfolio />
      </div>
    )
  }

  return (
    <div className='bg-[#1E1E1E] h-full'>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/' element={<TradingPortal />} />
        <Route path='/portfolio' element={<Portfolio />} />
        <Route path='/transactionhistory' element={<TransactionHistory />} />
      </Routes>
    </div>
  )
}

export default App
