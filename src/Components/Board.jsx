import { useContext } from 'react';
import { ContextApp } from '../store/Store';
import Card from './Card';
const Board = () => {
  const { state } = useContext(ContextApp);

  return (
    <div className="w-full sm:w-4/5 lg:w-3/5 min-h-70vh h-85vh md:h-70vh bg-blue_dark grid grid-cols-2 sm:grid-cols-4 sm:grid-rows-4 grid-rows-8 lg:grid-cols-4 gap-2 p-3 rounded-lg">
      {state.arrayImages.length > 0 &&
        state.arrayImages.map((card, index) => (
          <Card key={index} card={card} />
        ))}
    </div>
  );
};

export default Board;
