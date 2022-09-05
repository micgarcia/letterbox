import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home.js';
import Films from './components/Films.js';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/films' element={<Films />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
