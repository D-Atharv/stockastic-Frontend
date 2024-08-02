const CounterButton = (props) => {
  const decreaseCount = () => {
    if (props.currentQuantity > 0) {
      props.setCurrentQuantity(props.currentQuantity - 1)
    }
  }

  const increaseCount = () => {
    // TODO: One team cannot buy more than 30% of any one share.
    if (props.currentQuantity < props.volume) {
      props.setCurrentQuantity(props.currentQuantity + 1)
    }
  }

  const handleInputChange = (e) => {
    let newCount = parseInt(e.target.value)
    if (newCount > props.volume) {
      newCount = props.volume
      // return
    }
    props.setCurrentQuantity(isNaN(newCount) ? 0 : newCount)
  }

  return (
    <div className='flex items-center text-montaga'>
      <button
        className='bg-purple-700 text-white py-1 px-3 rounded-l'
        onClick={decreaseCount}
      >
        -
      </button>
      <input
        type='text'
        className='bg-purple-700 py-1 px-3 text-white text-center w-20 appearance-none focus:outline-none'
        value={props.currentQuantity}
        onChange={handleInputChange}
      />
      <button
        className='bg-purple-700 text-white py-1 px-3 rounded-r'
        onClick={increaseCount}
      >
        +
      </button>
    </div>
  )
}

export default CounterButton
