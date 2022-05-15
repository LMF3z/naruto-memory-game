import { useState, useEffect, useCallback, useContext } from 'react';
import types from '../store/app.types';
import { ContextApp } from '../store/Store';

const Controls = () => {
  const { state, dispatch } = useContext(ContextApp);
  const { time, goal, actualClock, couples } = state;

  const [clock, setClock] = useState(time);
  const [refTimer, setRefTimer] = useState(null);

  const startClock = () => {
    const clk = setInterval(timer, 1000);
    setRefTimer(clk);
    dispatch({ type: types.PLAY });
  };

  const timer = () => {
    setClock((state) => state - 1);
    dispatch({ type: types.SET_CLOCK, payload: clock });
  };

  const resetClock = useCallback(
    (option = false) => {
      clearInterval(refTimer);
      setRefTimer(null);
      setClock(time);
      // dispatch({ type: types.PLAY });
      option &&
        alert(
          `Time completed ${
            couples.length === goal
              ? 'Congratulations, you have won'
              : 'Sorry, try again'
          } `
        );
      setTimeout(() => {
        dispatch({ type: types.RESET });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: types.SHUFFLE });
      }, 1001);

      return null;
    },
    [refTimer, time, dispatch, couples.length, goal]
  );

  useEffect(() => {
    if (clock === 0) {
      resetClock(true);
    }
  }, [clock, resetClock]);

  useEffect(() => {
    if (actualClock === null) {
      resetClock();
    }
  }, [actualClock, resetClock]);

  useEffect(() => {
    if (couples.length === goal && actualClock > 0) {
      setTimeout(() => {
        alert('Congratulations, you have won');
        dispatch({ type: types.RESET });
        dispatch({ type: types.SHUFFLE });
        resetClock();
      }, 1000);
    }
  }, [couples, actualClock, goal, dispatch, resetClock]);

  return (
    <div className="w-full sm:w-4/5 lg:w-3/5 h-20 flex justify-evenly items-center border border-blue_dark">
      <div className="w-2/5 h-full flex justify-center items-center">
        <p className="text-lg md:text-xl">{clock} seconds</p>
      </div>
      <div className="w-2/5 h-full flex justify-center items-center">
        <button
          onClick={startClock}
          disabled={refTimer === null ? false : true}
          className="w-32 h-12 text-white text-lg rounded-lg bg-blue_dark"
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default Controls;
