import React, { useEffect, useState } from 'react'
import MyStocks from './MyStocks'
import MyTeam from './MyTeam'
import axios from 'axios'
import Loader from './Loader'

const MyPortfolio = () => {
  const [myStocks, setMyStocks] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  const [sellCounter, setSellCounter] = useState(0)

  const updateCounter = () => {
    setSellCounter(sellCounter + 1)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Refreshing data')
      updateCounter()
    }, 60000)

    async function getMyStocks() {
      await axios
        .get(
          `${
            import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL
          }/stockastic/transaction/`,
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
            setMyStocks(e.data.transactions)
            setIsLoading(false)
          }
          return
        })
        .catch((e) => {
          console.log(e)
        })
    }
    getMyStocks()
    return () => {
      console.log('Clearing')
      clearInterval(intervalId)
    }
  }, [sellCounter])

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

  return (
    <>
      <div className='flex flex-row items-center justify-around h-full'>
        <div className='bg-[#1E1B1E] mx-10 rounded-3xl my-10 h-full w-full'>
          <div className='flex flex-row items-center justify-around py-3 font-montaga text-white text-extrabold text-md px-[5%]'>
            <h1 className='flex-2'>STOCK NAME</h1>
            <h1 className='flex-2 relative right-4'>PRICE</h1>
            <h1 className='flex-2'>Quantity Holding</h1>
            <h1 className='flex-2'>Amount</h1>
            <h1 className='flex-2'>Quantity</h1>
            <h1 className='flex-2'>Sell</h1>
          </div>
          {isLoading ? (
            <>
              <div className='h-full w-full flex justify-center items-center p-12'>
                <Loader />
              </div>
            </>
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
              {myStocks.map((stock, index) => {
                if (stock.totalVolume > 0) {
                  console.log(stock)
                  // totalAmount += stock.totalVolume * stock.company.price
                  console.log(stock)
                  return (
                    <MyStocks
                      key={index}
                      index={index}
                      stock={stock}
                      stock_id={stock.company._id}
                      showSnackbar={showSnackbar}
                      updateCounter={updateCounter}
                    />
                  )
                }
              })}
            </>
          )}
        </div>
        <div className='flex h-full self-start mx-10 rounded-3xl my-10 w-[40%] '>
          <MyTeam sellCounter={sellCounter} />
        </div>
      </div>
    </>
  )
}

export default MyPortfolio
