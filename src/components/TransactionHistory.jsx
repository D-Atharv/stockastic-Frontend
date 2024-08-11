import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSocket } from '../context/SocketContext';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    // Replace with actual method to get userId
    /* Fetch or get userId from context or state */
    const userId = 1; //hardcoded for now

    socket.emit('getTransactionHistory', userId);

    socket.on('transactionHistory', (data) => {
      if (data.status === 'fail') {
        alert(data.message);
      } else {
        setTransactions(data.transactions);
        setIsLoading(false);
      }
    });

    return () => {
      socket.off('transactionHistory');
    };
  }, [socket]);

  return (
    <>
      <div className='flex flex-row items-center justify-between px-2 py-3'>
        <button onClick={() => navigate('/portfolio')}>
          <img className='w-20' src='./back_1.svg' alt='Back' />
        </button>
        <h1 className='font-montaga text-white text-extrabold text-3xl'>
          STOCKASTIC
        </h1>
        <img className='h-16 w-16' src='./stockastic_logo.svg' alt='Logo' />
      </div>

      <div className='text-white h-screen p-16'>
        <div className='relative'>
          <div className='p-8 rounded-3xl border-4 border-purple-900 shadow-lg h-full'>
            <h1 className='text-3xl font-bold mb-4'>Transaction History</h1>
            {isLoading ? (
              <div className='flex justify-center items-center'>
                <p>Loading...</p>
              </div>
            ) : (
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <p className='text-lg leading-relaxed my-5'>
                      You{' '}
                      <span
                        className={`text-${transaction.transactionType === 'BUY' ? '[#B6EADA]' : 'red-500'}`}
                      >
                        <b>{transaction.transactionType === 'BUY' ? 'purchased' : 'sold'} </b>
                      </span>
                      <span className='text-[#B6EADA]'>
                        {transaction.quantity}{' '}
                      </span>
                      share(s) of{' '}
                      <span className='text-[#B6EADA]'>
                        {transaction.stock.stockName}
                      </span>{' '}
                      at a price of{' '}
                      <span className='text-[#B6EADA]'>
                        {transaction.price.toFixed(2)}
                      </span>{' '}
                      each. The total price was{' '}
                      <span className='text-[#B6EADA]'>
                        {(transaction.price * transaction.quantity).toFixed(2)}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionHistory;
