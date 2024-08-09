// import React, { useState } from 'react'
// import CountTracker from './CountTracker'
// import axios from 'axios'
// import io from 'socket.io-client';


// const Stock = (props) => {
//   const [currentQuantity, setCurrentQuantity] = useState(0)

//   const buyBtn = document.getElementById(`buyBtn-${props.index}`)

//   function toTitleCase(str) {
//     return str.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
//     })
//   }
//   //buy sell price update portfolio

//   // const SocketIo = () => {
//   //   const [messages, setMessages] = useState({
//   //     type: 'buy',
//   //     company: props.company._id,
//   //     volume: currentQuantity,
//   //   });
//   //   const [inputMessage, setInputMessage] = useState('');
//   //   const [socket, setSocket] = useState(null);

//   //   useEffect(() => {
//   //     const newSocket = io('http://localhost:3000',
//   //       {
//   //         extraHeaders: {
//   //           Authorization: 'Bearer ' + Cookies.get('jwt'),
//   //         }
//   //       }
//   //     );
//   //     setSocket(newSocket);

//   //     newSocket.on('connect', () => {
//   //       console.log('Connected to Socket.IO server');
//   //     });

//   //     newSocket.on('message', (message) => {
//   //       console.log('Message from server:', message);
//   //       setMessages((prevMessages) => [...prevMessages, message]);
//   //     });

//   //     newSocket.on('disconnect', () => {
//   //       console.log('Socket.IO connection closed');
//   //     });

//   //     return () => {
//   //       newSocket.close();
//   //     };
//   //   }, []);

//   //   if (socket && inputMessage.trim()) {
//   //     socket.emit('clientMessage', inputMessage);
//   //     setInputMessage('');
//   //   }
//   // };

//   const buyStock = async () => {
//     await axios
//       .post(
//         `${import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL
//         }/stockastic/transaction/`,
//         {
//           type: 'buy',
//           company: props.company._id,
//           volume: currentQuantity,
//         },
//         {
//           headers: {
//             Authorization: 'Bearer ' + localStorage.getItem('jwt'),
//           },
//         }
//       )
//       .then((response) => {
//         if (response.data.status.toLowerCase() == 'fail') {
//           return
//         }

//         console.log(props.showSnackbar)

//         props.showSnackbar(
//           `You bought ${currentQuantity} stock(s) of ${props.company.name}`,
//           5000
//         ) // Kevin Jacob.
//         setCurrentQuantity(0)
//         props.updateCounter()
//         buyBtn.disabled = false
//       })
//       .catch((error) => {
//         // Handle the error
//         if (
//           error.response.data.message ==
//           'Enter all the details type,company,volume,price'
//         ) {
//           props.showSnackbar('Please enter a non-zero quantity.', 5000) // TODO: Make it red.
//           buyBtn.disabled = false
//           return
//         }
//         props.showSnackbar(error.response.data.message, 5000) // TODO: Make it red.
//         buyBtn.disabled = false
//       })
//   }

//   const handleBuy = () => {
//     SocketIo()
//     buyStock()
//     buyBtn.disabled = true
//     setTimeout(() => {
//       buyBtn.disabled = false
//     }, 5000)
//   }

//   return (
//     <div>
//       <div className='flex flex-row items-center justify-center bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3'>
//         <div className='w-full grid grid-cols-5 gap-x-4 justify-items-stretch justify-between'>
//           <div>
//             <div className='flex flex-row items-center'>
//               <img
//                 className='h-[40px] w-[50px] ml-4'
//                 src='./stockastic_logo.svg'
//               />
//               <p>{toTitleCase(props.company.name.slice(0, 22))}</p>
//             </div>
//           </div>
//           <div className='ps-10'>
//             <p>{props.company.volume}</p>
//           </div>
//           <div>
//             <p>{props.company.price.toFixed(2)}</p>
//           </div>
//           <div>
//             <CountTracker
//               currentQuantity={currentQuantity}
//               setCurrentQuantity={setCurrentQuantity}
//               volume={props.company.volume}
//             />
//           </div>
//           <div>
//             <button
//               className='font-montaga py-2 px-5 rounded-xl bg-[#3DB042] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed'
//               id={`buyBtn-${props.index}`}
//               onClick={handleBuy}
//             >
//               BUY
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Stock








//HTTP METHOD



// import React, { useState } from 'react';
// import CountTracker from './CountTracker';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Stock = ({ company, showSnackbar, updateCounter, index }) => {
//   const [currentQuantity, setCurrentQuantity] = useState(0);
//   const [participantStocks, setParticipantStocks] = useState(company.participantStocks);
//   const [companyPrices, setCompanyPrices] = useState(company.prices); // State for updated stock price

//   const buyBtn = document.getElementById(`buyBtn-${index}`);

//   function toTitleCase(str) {
//     return str.replace(/\w\S*/g, function (txt) {
//       return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
//     });
//   }

//   const buyStock = async () => {
//     const userId = Cookies.get('userId');

//     try {
//       const response = await axios.post(
//         `http://localhost:8000/stockastic/transaction/`,
//         {
//           type: 'BUY',
//           company: company.id,
//           volume: currentQuantity,
//           userId: userId,
//         },
//         {
//           headers: {
//             Authorization: 'Bearer ' + Cookies.get('jwt'),
//           },
//         }
//       );

//       if (response.data.status.toLowerCase() === 'fail') {
//         return;
//       }

//       showSnackbar(`You bought ${currentQuantity} stock(s) of ${company.name}`, 5000);

//       // Update participantStocks and companyPrices after successful purchase
//       setParticipantStocks(participantStocks - currentQuantity);
//       setCompanyPrices(response.data.updatedPrice);

//       setCurrentQuantity(0);
//       updateCounter();
//       buyBtn.disabled = false;
//     } catch (error) {
//       if (
//         error.response.data.message ===
//         'Enter all the details type,company,volume,price'
//       ) {
//         showSnackbar('Please enter a non-zero quantity.', 5000);
//         buyBtn.disabled = false;
//         return;
//       }
//       showSnackbar(error.response.data.message, 5000);
//       buyBtn.disabled = false;
//     }
//   };

//   const handleBuy = () => {
//     buyStock();
//     buyBtn.disabled = true;
//     setTimeout(() => {
//       buyBtn.disabled = false;
//     }, 5000);
//   };

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-center bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3">
//         <div className="w-full grid grid-cols-5 gap-x-4 justify-items-stretch justify-between">
//           <div>
//             <div className="flex flex-row items-center">
//               <img
//                 className="h-[40px] w-[50px] ml-4"
//                 src="./stockastic_logo.svg"
//               />
//               <p>{toTitleCase(company.stockName.slice(0, 22))}</p>
//             </div>
//           </div>
//           <div className="ps-10">
//             <p>{participantStocks}</p>
//           </div>
//           <div>
//             <p>{companyPrices.toFixed(2)}</p> {/* Use updated price here */}
//           </div>
//           <div>
//             <CountTracker
//               currentQuantity={currentQuantity}
//               setCurrentQuantity={setCurrentQuantity}
//               volume={company.volume}
//             />
//           </div>
//           <div>
//             <button
//               className="font-montaga py-2 px-5 rounded-xl bg-[#3DB042] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
//               id={`buyBtn-${index}`}
//               onClick={handleBuy}
//             >
//               BUY
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stock;












// import React, { useState, useEffect } from 'react';
// import CountTracker from './CountTracker';
// import io from 'socket.io-client';
// import Cookies from 'js-cookie';

// const socket = io('http://localhost:8000', {
//   withCredentials: true,
// });

// const Stock = ({ company, showSnackbar, updateCounter, index }) => {
//   const [currentQuantity, setCurrentQuantity] = useState(0);
//   const [participantStocks, setParticipantStocks] = useState(company.participantStocks);
//   const [companyPrices, setCompanyPrices] = useState(company.prices);

//   useEffect(() => {
//     socket.on('buyResponse', (data) => {
//       if (data.status.toLowerCase() === 'fail') {
//         return;
//       }
//       showSnackbar(`You bought ${currentQuantity} stock(s) of ${company.name}`, 5000);
//       setParticipantStocks(participantStocks - currentQuantity);
//       setCompanyPrices(data.updatedPrice);
//       setCurrentQuantity(0);
//       updateCounter();
//       document.getElementById(`buyBtn-${index}`).disabled = false;
//     });

//     return () => {
//       socket.off('buyResponse');
//     };
//   }, [currentQuantity, participantStocks, company.name, company.id, index, updateCounter]);

//   const handleBuy = () => {
//     const userId = Cookies.get('userId');
//     socket.emit('buyStock', {
//       type: 'BUY',
//       company: company.id,
//       volume: currentQuantity,
//       userId: userId,
//     });
//     document.getElementById(`buyBtn-${index}`).disabled = true;
//     setTimeout(() => {
//       document.getElementById(`buyBtn-${index}`).disabled = false;
//     }, 5000);
//   };

//   return (
//     <div>
//       <div className="flex flex-row items-center justify-center bg-[#303030] rounded-3xl text-white font-montaga py-3 my-3">
//         <div className="w-full grid grid-cols-5 gap-x-4 justify-items-stretch justify-between">
//           <div>
//             <div className="flex flex-row items-center">
//               <img className="h-[40px] w-[50px] ml-4" src="./stockastic_logo.svg" alt="logo" />
//               <p>{company.stockName.slice(0, 22)}</p>
//             </div>
//           </div>
//           <div className="ps-10">
//             <p>{participantStocks}</p>
//           </div>
//           <div>
//             <p>{companyPrices.toFixed(2)}</p>
//           </div>
//           <div>
//             <CountTracker
//               currentQuantity={currentQuantity}
//               setCurrentQuantity={setCurrentQuantity}
//               volume={company.volume}
//             />
//           </div>
//           <div>
//             <button
//               className="font-montaga py-2 px-5 rounded-xl bg-[#3DB042] w-[100px] mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
//               id={`buyBtn-${index}`}
//               onClick={handleBuy}
//             >
//               BUY
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stock;








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
      if (data.status.toLowerCase() === 'fail') {
        return;
      }
      showSnackbar(`You bought ${currentQuantity} stock(s) of ${company.name}`, 5000);
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
  }, [currentQuantity, participantStocks, company.name, company.id, index, updateCounter, socket]);

  const handleBuy = () => {
    const userId = Cookies.get('userId');
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

