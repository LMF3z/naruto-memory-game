import { useRef, useContext, useEffect, useCallback } from 'react';
import types from '../store/app.types';
import { ContextApp } from '../store/Store';

const Card = ({ card }) => {
  const { state, dispatch } = useContext(ContextApp);
  const { play, activeCard, couples } = state;

  const refCard = useRef(null);

  const handlerSelectCard = (item) => {
    if (activeCard.length < 2 && !activeCard.includes(item)) {
      dispatch({ type: types.ADD_CARD_ACTIVE, payload: item });
      refCard.current.classList.add('isActive');
      return;
    }

    refCard.current.classList.remove('isActive');
    dispatch({ type: types.DELETE_CARD_ACTIVE, payload: item });
  };

  const validPlaying = (item) => {
    if (!couples.some((i) => i.img === item.img) && play) {
      handlerSelectCard(item);
    }
  };

  const flipCards = useCallback(() => {
    if (!couples.some((i) => i.img === card.img)) {
      refCard.current.classList.remove('isActive');
      dispatch({ type: types.CLEAR_CARD_ACTIVE });
    }
  }, [couples, card.img, dispatch]);

  useEffect(() => {
    if (activeCard.length === 2 && activeCard[0].img !== activeCard[1].img) {
      setTimeout(flipCards, 1000);
    }
  }, [activeCard, flipCards]);

  return (
    <div className="w-full h-full cursor-pointer flex justify-center items-center">
      <div className="main_container">
        <div
          ref={refCard}
          className={`the_card ${
            couples.some((i) => i.img === card.img) ? 'isActive' : ''
          } `}
          onClick={() => validPlaying(card)}
        >
          <div
            className={`front bg-blank bg-center bg-no-repeat bg-cover rounded-lg`}
          ></div>
          <div className="back flex justify-center items-center bg-blue_dark rounded-lg">
            <img
              src={card.img}
              className="w-80% sm:w-95% h-80% sm:h-95% rounded-lg"
              alt="card-img"
              // w-80% h-70% md:w-11/12 md:h-11/12 lg:w-90% lg:h-90%
            />
          </div>
        </div>
      </div>
      {/* <div className="absolute w-full h-full bg-blank bg-center bg-no-repeat bg-cover"></div> */}
    </div>
  );
};

export default Card;
