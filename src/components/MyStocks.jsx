import React, { useState } from 'react';
import CountTracker from './CountTracker';
import { useSocket } from '../context/SocketContext';

const MyStocks = (props) => {
  const socket = useSocket();
  const [currentQuantity, setCurrentQuantity] = useState(0);

  const handleSell = () => {
    sellStock();
    socket.emit('getTotal', userId); // Re-fetch the total amount after selling
  };

  const sellStock = async () => {
    if (currentQuantity === 0) {
      props.showSnackbar('Please select a quantity greater than 0', 5000);
      return;
    }

    console.log('Attempting to sell stock with quantity:', currentQuantity);

    socket.emit('sellStock', {
      type: 'sell',
      company: props.stock.stock.id,
      volume: currentQuantity,
      userId: 1, // Hardcoded for now, replace with actual user ID if necessary
    });

    socket.on('sellResponse', (response) => {
      if (response.status.toLowerCase() === 'fail') {
        console.log(response.message);
        props.showSnackbar('Error selling stock', 5000);
      } else {
        props.showSnackbar(`You sold ${currentQuantity} stock(s) of ${props.stock.stock.stockName}`, 5000);
        setCurrentQuantity(0);
        props.updateCounter();
      }
    });
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

        {/* <button
          className='font-montaga py-2 px-5 rounded-xl bg-[#FF2235] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleSell}
          disabled={currentQuantity === 0} // Disable button when quantity is 0
        >
          SELL
        </button> */}
      </div>
    </div>
  );
};

export default MyStocks;



