import React, { useState, useEffect } from 'react';
import CountTracker from './CountTracker';
import { useSocket } from '../context/SocketContext';
import Cookies from 'js-cookie';

const Stock = ({ company, showSnackbar, updateCounter, index }) => {
  const socket = useSocket();
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [participantStocks, setParticipantStocks] = useState(company.participantStocks);
  const [companyPrices, setCompanyPrices] = useState(company.prices);

  useEffect(() => {
    const buyResponseHandler = (data) => {
      console.log('Received buyResponse:', data); // Debugging line
      if (data.status.toLowerCase() === 'fail') {
        showSnackbar(data.message, 5000);
        return;
      }
      // showSnackbar(`You bought ${currentQuantity} stock(s) of ${company.name}`, 5000);
      showSnackbar(`You bought ${currentQuantity} stock(s) of ${company.stockName}`, 5000);
      setParticipantStocks(participantStocks - currentQuantity);
      setCompanyPrices(data.updatedPrice);
      setCurrentQuantity(0);
      updateCounter();
      document.getElementById(`buyBtn-${index}`).disabled = false;
    };

    socket.on('buyResponse', buyResponseHandler);

    return () => {
      socket.off('buyResponse', buyResponseHandler);
    };
    // }, [currentQuantity, participantStocks, company.name, company.id, index, updateCounter, socket]);
  }, [currentQuantity, participantStocks, company.stockName, company.id, index, updateCounter, socket]);

  const handleBuy = () => {
    const userId = Cookies.get('userId');
    console.log('Emitting buyStock with data:', {
      type: 'BUY',
      company: company.id,
      volume: currentQuantity,
      userId: userId,
    }); // Debugging line
    socket.emit('buyStock', {
      type: 'BUY',
      company: company.id,
      volume: currentQuantity,
      userId: userId,
    });
    document.getElementById(`buyBtn-${index}`).disabled = true;
    setTimeout(() => {
      document.getElementById(`buyBtn-${index}`).disabled = false;
    }, 5000);
  };

  useEffect(() => {
    console.log('Company Prices Updated:', companyPrices); // Debugging line
  }, [companyPrices]);

  return (
    <div>
      <div className="flex flex-row items-center justify-center bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3">
        <div className="w-full grid grid-cols-5 gap-x-4 justify-items-stretch justify-between">
          <div>
            <div className="flex flex-row items-center">
              <img className="h-[40px] w-[50px] ml-4" src="./stockastic_logo.svg" alt="logo" />
              <p>{company.stockName.slice(0, 22)}</p>
            </div>
          </div>
          <div className="ps-10">
            <p>{participantStocks}</p>
          </div>
          <div>
            <p>{companyPrices.toFixed(2)}</p>
          </div>
          <div>
            <CountTracker
              currentQuantity={currentQuantity}
              setCurrentQuantity={setCurrentQuantity}
              volume={company.volume}
            />
          </div>
          <div>
            <button
              className="font-montaga py-2 px-5 rounded-xl bg-[#3DB042] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
              id={`buyBtn-${index}`}
              onClick={handleBuy}
            >
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
