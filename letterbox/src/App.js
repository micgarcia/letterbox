import './Home.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home.js';
import Films from './components/Films.js';
import Info from './components/Info.js';


function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/films' element={<Films />}></Route>
        <Route path='/info' element={<Info />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
