import { useEffect, createContext, useReducer } from 'react';
import images from '../assets/images';
import types from './app.types';

export const ContextApp = createContext();

const INITIAL_STATE = {
  goal: 8,
  play: false,
  arrayImages: [],
  activeCard: [],
  couples: [],
  time: 60,
  actualClock: null,
  // ---------------
  cancelClock: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case types.PLAY: {
      return {
        ...state,
        play: !state.play,
      };
    }

    case types.SET_CLOCK: {
      return {
        ...state,
        actualClock: payload,
      };
    }

    case types.SHUFFLE: {
      const copyArray = [...images];
      const finallyArrayImages = [];

      for (let i = 0; i < images.length; i++) {
        let data = {};

        data.id = finallyArrayImages.length + 1;
        data.img = images[i];
        finallyArrayImages.push(data);

        data = {};

        data.id = finallyArrayImages.length + 1;
        data.img = copyArray[i];
        finallyArrayImages.push(data);

        data = {};
      }

      const orderedArrayImages = finallyArrayImages.sort(
        () => Math.random() - 0.5
      );

      return {
        ...state,
        arrayImages: orderedArrayImages,
      };
    }

    case types.ADD_CARD_ACTIVE: {
      if (state.activeCard.length < 2) {
        const newCouple = state.activeCard.find(
          (item) => item.img === payload.img
        );

        return {
          ...state,
          activeCard: newCouple ? [] : [...state.activeCard, payload],
          couples: newCouple
            ? [...state.couples, newCouple]
            : [...state.couples],
        };
      }

      return {
        ...state,
      };
    }

    case types.DELETE_CARD_ACTIVE: {
      const deleted = state.activeCard.filter((item) => item.id !== payload.id);

      return {
        ...state,
        activeCard: deleted,
      };
    }

    case types.CLEAR_CARD_ACTIVE: {
      return {
        ...state,
        activeCard: [],
      };
    }

    case types.RESET: {
      return {
        goal: 8,
        play: false,
        arrayImages: [],
        activeCard: [],
        couples: [],
        time: 60,
        actualClock: 0,
      };
    }

    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    dispatch({ type: types.SHUFFLE });
  }, []);

  return (
    <ContextApp.Provider value={{ state, dispatch }}>
      {children}
    </ContextApp.Provider>
  );
};

export default Store;
