import React, { useState } from 'react'
import CountTracker from './CountTracker'
import axios from 'axios'

const Stock = (props) => {
  const [currentQuantity, setCurrentQuantity] = useState(0)

  const buyBtn = document.getElementById(`buyBtn-${props.index}`)

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  const buyStock = async () => {
    await axios
      .post(
        `${
          import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL
        }/stockastic/transaction/`,
        {
          type: 'buy',
          company: props.company._id,
          volume: currentQuantity,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        }
      )
      .then((response) => {
        if (response.data.status.toLowerCase() == 'fail') {
          return
        }

      console.log(props.showSnackbar)

        props.showSnackbar(
          `You bought ${currentQuantity} stock(s) of ${props.company.name}`,
          5000
        ) // Kevin Jacob.
        setCurrentQuantity(0)
        props.updateCounter()
        buyBtn.disabled = false
      })
      .catch((error) => {
        // Handle the error
        if (
          error.response.data.message ==
          'Enter all the details type,company,volume,price'
        ) {
          props.showSnackbar('Please enter a non-zero quantity.', 5000) // TODO: Make it red.
          buyBtn.disabled = false
          return
        }
        props.showSnackbar(error.response.data.message, 5000) // TODO: Make it red.
        buyBtn.disabled = false
      })
  }

  const handleBuy = () => {
    buyStock()
    buyBtn.disabled = true
    setTimeout(() => {
      buyBtn.disabled = false
    }, 5000)
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-center bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3'>
        <div className='w-full grid grid-cols-5 gap-x-4 justify-items-stretch justify-between'>
          <div>
            <div className='flex flex-row items-center'>
              <img
                className='h-[40px] w-[50px] ml-4'
                src='./stockastic_logo.svg'
              />
              <p>{toTitleCase(props.company.name.slice(0, 22))}</p>
            </div>
          </div>
          <div className='ps-10'>
            <p>{props.company.volume}</p>
          </div>
          <div>
            <p>{props.company.price.toFixed(2)}</p>
          </div>
          <div>
            <CountTracker
              currentQuantity={currentQuantity}
              setCurrentQuantity={setCurrentQuantity}
              volume={props.company.volume}
            />
          </div>
          <div>
            <button
              className='font-montaga py-2 px-5 rounded-xl bg-[#3DB042] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed'
              id={`buyBtn-${props.index}`}
              onClick={handleBuy}
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stock
