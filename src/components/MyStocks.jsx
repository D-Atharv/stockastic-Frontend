import React, { useState } from 'react';
import axios from 'axios';
import CountTracker from './CountTracker';
import Cookies from 'js-cookie';


const MyStocks = (props) => {
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const handleSell = () => {
    sellStock();
  };

  const sellStock = async () => {
    try {
      console.log('Attempting to sell stock with quantity:', currentQuantity);
      console.log('Authorization Token:', Cookies.get('jwt'));
      console.log('Stock ID:', props.stock.stock.id);

      const response = await axios.post(
        'http://localhost:8000/stockastic/holdings/',
        {
          type: 'sell',
          company: props.stock.stock.id,
          volume: currentQuantity,
        },
        {
          headers: {
            Authorization: 'Bearer ' + Cookies.get('jwt'),
          },
        }
      );

      console.log('Sell response:', response);


      console.log({
        type: 'sell',
        company: props.stock.stock.id,
        volume: currentQuantity,
      })

      if (response.data.status.toLowerCase() === 'fail') {
        return;
      }

      props.showSnackbar(
        `You sold ${currentQuantity} stock(s) of ${props.stock.stock.stockName}`,
        5000
      );
      setCurrentQuantity(0);
      props.updateCounter();
    } catch (error) {
      console.error('Error selling stock:', error);
      props.showSnackbar('Error selling stock', 5000);
    }
  };


  return (
    <div>
      <div className='flex flex-row items-center justify-around bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3 mx-2 w-full'>
        <div className='flex flex-row items-center justify-center'>
          <img className='h-[40px] w-[50px]' src='./stockastic_logo.svg' alt="Stock Logo" />
          <p>{props.stock.stock.stockName}</p>
        </div>
        <p>{props.stock.stock.prices.toFixed(2)}</p>
        <p className='bg-purple-700 px-5 py-2 rounded-2xl text-center w-[100px]'>
          <span>{props.stock.quantity}</span>
        </p>
        <div>
          <p>{(props.stock.quantity * props.stock.stock.prices).toFixed(2)}</p>
        </div>
        <div>
          <CountTracker
            currentQuantity={currentQuantity}
            setCurrentQuantity={setCurrentQuantity}
            volume={props.stock.quantity}
          />
        </div>
        <button
          className='font-montaga py-2 px-5 rounded-xl bg-[#FF2235] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleSell}
        >
          SELL
        </button>
      </div>
    </div>
  );
};

export default MyStocks;





