import React, { useEffect, useState } from 'react'
import './styles/MyPortfolio.css'
import axios from 'axios'

const Person = (props) => {
  return (
    <div>
      <div className='px-3 py-1 flex flex-row items-center justify-around bg-[#D9D9D9] rounded-xl my-3 text-black'>
        <img src='/person1.svg' className='w-[40px]' />
        <p>{props.member.name}</p>
      </div>
    </div>
  )
}

const MyTeam = (props) => {
  const [teamName, setTeamName] = useState('')
  const [teamMembers, setTeamMembers] = useState([])

  const [walletAmount, setWalletAmount] = useState(0)
  const [walletChange, setWalletChange] = useState(0)

  useEffect(() => {
    async function getTeam() {
      await axios
        .get(`${import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL}/team`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
        .then((e) => {
          const status = e.data.status
          if (status === 'fail') {
            alert(e.data.err)
          } else {
            setTeamName(e.data.team.name)
            setTeamMembers(e.data.team.members)
          }
          return
        })
        .catch((e) => {})
    }

    async function getTotal() {
      await axios
        .get(`${import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL}/total`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('jwt'),
          },
        })
        .then((e) => {
          const status = e.data.status
          if (status === 'fail') {
            alert(e.data.err)
          } else {
            setWalletAmount(e.data.total)
            setWalletChange(e.data.percent)
          }
          return
        })
        .catch((e) => {})
    }

    getTeam()
    getTotal()
    return
  }, [props.sellCounter])

  return (
    <div className='bg-[#1E1B1E] rounded-3xl flex flex-col items-center justify-around py-5 font-montaga text-xl text-white'>
      <div className='bg-[#303030] px-7 py-3 my-5 w-3/4 text-center rounded-xl'>
        <h1>
          <span>{teamName}</span>
        </h1>
      </div>

      <div className='bg-[#303030] px-7 py-3 my-5 w-3/4 text-center rounded-xl'>
        <div>
          {teamMembers.map((member, index) => {
            return <Person key={index} member={member} />
          })}
        </div>
      </div>

      <div className='px-5 py-5 flex flex-col items-center justify-around px-7 py-3 my-5 w-3/4 text-center rounded-xl bottomSection'>
        <h1 className='mb-4 mt-2'>TOTAL AMOUNT</h1>
        <div className='flex flex-row items-center justify-between'>
          <div className='bg-white px-4 py-3 text-black rounded-xl mx-2'>
            {walletAmount.toFixed(2)}
          </div>

          <div
            className={`flex flex-row items-center justify-around mx-2 ${
              walletChange == 0
                ? 'bg=[#303030]'
                : walletChange > 0
                ? 'bg-[#3DB042]'
                : 'bg-[#FF2235]'
            } rounded-xl px-4 py-3`}
          >
            <img
              src='./arrow.svg'
              className={`w-1/3 transition-transform ${
                walletChange >= 0 ? 'rotate-180' : ''
              } ${walletChange == 0 ? 'hidden' : ''}`}
            />
            <span className='px-1'>{walletChange.toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyTeam
