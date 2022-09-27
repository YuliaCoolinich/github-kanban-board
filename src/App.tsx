import './App.css';
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
import KanbanBoard from './components/KanbanBoard';
import Navigation from './components/Navigation';

function App() {

  return (
    <DndProvider backend={ HTML5Backend }> 
    <div className="App">
        <Navigation />
        <KanbanBoard />
    </div>
    </DndProvider>
  );
}

export default App;
