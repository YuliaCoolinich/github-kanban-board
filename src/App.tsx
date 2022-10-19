import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from "react-dnd-html5-backend";
import ProjectPage from './containers/ProjectPage';

function App() {

  return (
    <DndProvider backend={ HTML5Backend }> 
    <div className="App">
        <ProjectPage />
    </div>
    </DndProvider>
  );
}

export default App;
