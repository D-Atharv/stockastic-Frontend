import React, { useState } from 'react'
import axios from 'axios'
import CountTracker from './CountTracker'

const MyStocks = (props) => {
  const [currentQuantity, setCurrentQuantity] = useState(0)

  const sellBtn = document.getElementById(`sellBtn-${props.index}`)

  const handleSell = () => {
    sellStock()
    sellBtn.disabled = true
    setTimeout(() => {
      sellBtn.disabled = false
    }, 5000)
  }

  const sellStock = async () => {
    await axios
      .post(
        `${
          import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL
        }/stockastic/transaction/`,
        {
          type: 'sell',
          company: props.stock_id,
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

        props.showSnackbar(
          `You sold ${currentQuantity} stock(s) of ${props.stock.company.name}`,
          5000
        ) // Kevin Jacob.
        setCurrentQuantity(0)
        props.updateCounter()
        sellBtn.disabled = false
      })
      .catch((error) => {
        props.showSnackbar(error.response.data.message, 5000)
      })
  }

  return (
    <div>
      <div className='flex flex-row items-center justify-around bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3 mx-2 w-full'>
        <div className='flex flex-row items-center justify-center'>
          <img className='h-[40px] w-[50px]' src='./stockastic_logo.svg' />
          <p>{props.stock.company.name}</p>
        </div>
        <p>{props.stock.company.price.toFixed(2)}</p>
        <p className='bg-purple-700 px-5 py-2 rounded-2xl text-center w-[100px]'>
          <span>{props.stock.totalVolume}</span>
        </p>
        <div>
          <p>
            {(props.stock.totalVolume * props.stock.company.price).toFixed(2)}
          </p>
        </div>
        <div>
          <CountTracker
            currentQuantity={currentQuantity}
            setCurrentQuantity={setCurrentQuantity}
            volume={props.stock.totalVolume}
          />
        </div>
        <button
          className='font-montaga py-2 px-5 rounded-xl bg-[#FF2235] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed'
          id={`sellBtn-${props.index}`}
          onClick={handleSell}
        >
          SELL
        </button>
      </div>
    </div>
  )
}

export default MyStocks
