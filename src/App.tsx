import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanBoardPage from './containers/KanbanBoardPage';

function App() {

  return (
    <DndProvider backend={ HTML5Backend }> 
    <div className="App">
        <KanbanBoardPage />
    </div>
    </DndProvider>
  );
}

export default App;
