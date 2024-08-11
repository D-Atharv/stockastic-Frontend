import React, { useEffect, useState } from 'react';
import './styles/MyPortfolio.css';
import { useSocket } from '../context/SocketContext';
import Cookies from 'js-cookie';

const Person = ({ member }) => (
  <div className='px-3 py-1 flex flex-row items-center justify-around bg-[#D9D9D9] rounded-xl my-3 text-black'>
    <img src='/person1.svg' className='w-[40px]' alt='Person' />
    <p>{member.name}</p>
  </div>
);

const MyTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [walletAmount, setWalletAmount] = useState(0);
  const [walletChange, setWalletChange] = useState(0);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const userId = parseInt(Cookies.get('userId'), 10);

    socket.emit('getTeam', userId);
    socket.emit('getTotal', userId);

    socket.on('teamData', (data) => {
      if (data.status === 'success') {
        setTeamName(data.team.name);
        setTeamMembers(data.team.members);
      } else {
        console.error(data.message);
      }
    });

    socket.on('totalData', (data) => {
      if (data.status === 'success') {
        setWalletAmount(data.total);
        setWalletChange(data.percent);
      } else {
        console.error(data.message);
      }
    });

    return () => {
      socket.off('teamData');
      socket.off('totalData');
    };
  }, [socket]);

  return (
    <div className='bg-[#1E1B1E] rounded-3xl flex flex-col items-center justify-around py-5 font-montaga text-xl text-white'>
      <div className='bg-[#303030] px-7 py-3 my-5 w-3/4 text-center rounded-xl'>
        <h1><span>{teamName}</span></h1>
      </div>

      <div className='bg-[#303030] px-7 py-3 my-5 w-3/4 text-center rounded-xl'>
        <div>
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <Person key={member.id} member={member} />
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </div>
      </div>

      <div className='px-5 py-5 flex flex-col items-center justify-around px-7 py-3 my-5 w-3/4 text-center rounded-xl bottomSection'>
        <h1 className='mb-4 mt-2'>TOTAL AMOUNT</h1>
        <div className='flex flex-row items-center justify-between'>
          <div className='bg-white px-4 py-3 text-black rounded-xl'>
            <h1>${walletAmount.toFixed(2)}</h1>
          </div>
          <p>{walletChange.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default MyTeam;





