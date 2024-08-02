import React, { useEffect, useState } from 'react'
import Stock from './Stock'
import axios from 'axios'

import { useNavigate } from 'react-router'

import Loader from './Loader'

const MainSection = () => {
  const navigate = useNavigate()

  const [companies, setCompanies] = useState([])

  const [walletBal, setWalletBal] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const [buyCounter, setBuyCounter] = useState(0)

  const updateCounter = () => {
    setBuyCounter(buyCounter + 1)
  }

  const showSnackbar = (message, duration) => {
    var snackbar = document.getElementById('snackbar')
    snackbar.innerHTML = message
    snackbar.classList.add('visible')
    snackbar.classList.remove('invisible')
    setTimeout(function () {
      snackbar.classList.remove('visible')
      snackbar.classList.add('invisible')
    }, duration)
  }

  useEffect(() => {
    async function checkLogin() {

      if (localStorage.getItem('jwt') === null) {
        navigate('/SignIn')
        return
      }

      await axios
        .get(`${import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL}/auth/me`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
        .then((e) => {
          console.log(e)
          return
        })
        .catch((e) => {
          console.log(e)
          alert('There was some error logging in. Please login again.')
          localStorage.removeItem('jwt')
          navigate('/SignIn')
        })
    }
    checkLogin()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Refreshing data')
      updateCounter()
      console.log(buyCounter)
    }, 60000)

    async function getStocks() {
      await axios
        .get(
          `${import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL}/stockastic/company`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          }
        )
        .then((e) => {
          const status = e.data.status
          if (status === 'fail') {
            alert(e.data.err)
          } else {
            setCompanies(e.data.companies)
            setIsLoading(false)
          }
          return
        })
        .catch((e) => {
          console.log(e)
        })
    }

    async function getWallet() {
      await axios
        .get(`${import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL}/team`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
        .then((e) => {
          const status = e.data.status
          if (status === 'fail') {
            alert(e.data.message)
          } else {
            setWalletBal(e.data.team.wallet)
          }
          return
        })
        .catch((e) => {
          if (e.response.data.message === 'No team found') {
            localStorage.removeItem('jwt')
            alert("No team found. Cannot access the portal.")
            navigate('/SignIn')
            setIsLoading(true)
          }
        })
    }

    getWallet()
    getStocks()

    return () => {
      console.log('Clearing')
      clearInterval(intervalId)
    }
  }, [buyCounter])

  return (
    <div className='mx-10 rounded-3xl my-10 h-full'>
      <div className='w-full grid grid-cols-5 gap-x-4 justify-items-stretch justify-between font-montaga text-white text-extrabold text-md'>
        <h1 className='class ps-5'>STOCK NAME</h1>
        <h1 className=''>VOLUME AVAILABLE</h1>
        <h1 className=''>PRICE</h1>
        <h1 className=''>Quantity</h1>
        <h1 className='bg-white px-10 py-3 text-black rounded-2xl'>
          Amount Left: <span>{walletBal.toFixed(2)}</span>
        </h1>
      </div>
      {isLoading ? (
        <div className='h-full w-full flex justify-center items-center p-12'>
          <Loader />
        </div>
      ) : (
        <>
          <div
            id='snackbar'
            className={
              'w-fit h-fit bg-green-400 border-green-800 text-black-700 border px-4 py-3 rounded transition invisible fixed bottom-4 left-4'
            }
            role='alert'
          >
            Snackbar message here.
          </div>
          <div className='bg-[#FE45RG] px-5 py-5 flex flex-col justify-between'>
            {companies.map((company, index) => (
              <Stock
                index={index}
                key={index}
                company={company}
                showSnackbar={showSnackbar}
                updateCounter={updateCounter}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MainSection
