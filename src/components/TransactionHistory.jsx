import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    async function getAllTransacrtions() {
      await axios
        .get(
          `${
            import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL
          }/stockastic/transaction/`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
          }
        )
        .then((e) => {
          const status = e.data.status
          if (status === 'fail') {
            alert(e.data.err)
          } else {
            setTransactions(e.data.transactions)
            setIsLoading(false)
          }
          return
        })
        .catch((e) => {
        console.log(e)
      })
    }
    getAllTransacrtions()
  }, [])

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
          <div className='p-8 rounded-3xl border-4 border-purple-900 shadow-lg h-[100%]'>
            <h1 className='text-3xl font-bold mb-4'>Transaction History</h1>
            <ul>
              {transactions.map((company) => {
                return company.transactions.map((company_transactions) => {
                  return (
                    <li>
                      <p className='text-lg leading-relaxed my-5'>
                        You{' '}
                        <span
                          className={`text-${
                            company_transactions.type == 'buy'
                              ? '[#B6EADA]'
                              : 'red-500'
                          }`}
                        >
                          <b>
                            {company_transactions.type == 'buy'
                              ? 'purchased'
                              : 'sold'}{' '}
                          </b>
                        </span>
                        <span className='text-[#B6EADA]'>
                          {company_transactions.volume}{' '}
                        </span>
                        share(s) of{' '}
                        <span className='text-[#B6EADA]'>
                          {company.company.name}
                        </span>{' '}
                        at a price of{' '}
                        <span className='text-[#B6EADA]'>
                          {company_transactions.priceOfStock.toFixed(2)}
                        </span>{' '}
                        each. The total price was{' '}
                        <span className='text-[#B6EADA]'>
                          {company_transactions.totalPrice.toFixed(2)}
                        </span>
                      </p>
                    </li>
                  )
                })
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default TransactionHistory
