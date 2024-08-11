import React, { useEffect, useState } from 'react';
import Stock from './Stock';
import Loader from './Loader';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketContext';

const MainSection = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const [companies, setCompanies] = useState([]);
  const [walletBal, setWalletBal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buyCounter, setBuyCounter] = useState(0);

  const updateCounter = () => {
    setBuyCounter(buyCounter + 1);
  };

  const showSnackbar = (message, duration) => {
    const snackbar = document.getElementById('snackbar');
    if (snackbar) {
      snackbar.innerHTML = message;
      snackbar.classList.add('visible');
      snackbar.classList.remove('invisible');
      setTimeout(() => {
        snackbar.classList.remove('visible');
        snackbar.classList.add('invisible');
      }, duration);
    }
  };

  useEffect(() => {
    if (!Cookies.get('jwt')) {
      navigate('/SignIn');
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const handleFetchWallet = (data) => {
      if (data.status === 'success') {
        setWalletBal(data.balance);
      } else {
        alert(data.message);
        Cookies.remove('jwt');
        navigate('/SignIn');
      }
    };

    const handleStocksUpdate = (data) => {
      if (data.status === 'fail') {
        alert(data.err);
      } else {
        setCompanies(data.companies);
        setIsLoading(false);
      }
    };

    socket.emit('fetchWallet', Cookies.get('userId'));
    socket.emit('fetchStocks');

    socket.on('walletBalance', handleFetchWallet);
    socket.on('getStocks', handleStocksUpdate);

    return () => {
      socket.off('walletBalance', handleFetchWallet);
      socket.off('getStocks', handleStocksUpdate);
    };
  }, [socket, navigate, buyCounter]);

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
            className='w-fit h-fit bg-green-400 border-green-800 text-black-700 border px-4 py-3 rounded transition invisible fixed bottom-4 left-4'
            role='alert'
          >
            Snackbar message here.
          </div>
          <div className='bg-[#FE45RG] px-5 py-5 flex flex-col justify-between'>
            {companies.map((company, index) => (
              <Stock
                key={company.id}
                company={company}
                showSnackbar={showSnackbar}
                updateCounter={updateCounter}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MainSection;
