const CounterButton = (props) => {
  const decreaseCount = () => {
    props.setCurrentQuantity((prevQuantity) => {
      console.log("Decreasing: Current Quantity =", prevQuantity);
      if (prevQuantity > 0) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  const increaseCount = () => {
    props.setCurrentQuantity((prevQuantity) => {
      console.log("Increasing: Current Quantity =", prevQuantity);
      if (prevQuantity < props.volume) {
        return prevQuantity + 1;
      }
      return prevQuantity;
    });
  };

  const handleInputChange = (e) => {
    let newCount = parseInt(e.target.value);
    console.log("Input Change: New Count =", newCount);
    if (newCount > props.volume) {
      newCount = props.volume;
    }
    props.setCurrentQuantity(isNaN(newCount) ? 0 : newCount);
  };

  console.log("Rendering CounterButton: Current Quantity =", props.currentQuantity, "Volume =", props.volume);

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
  );
};

export default CounterButton;
