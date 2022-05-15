import Board from './Components/Board';
import Controls from './Components/Controls';

const App = () => {
  return (
    <div className="w-full min-h-screen p-5 pb-10 flex flex-col justify-start items-center space-y-2">
      <Controls />
      <Board />
    </div>
  );
};

export default App;
