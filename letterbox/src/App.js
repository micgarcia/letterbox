import './Home.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home.js';
import Films from './components/Films.js';
import Info from './components/Info.js';
import Create from './components/Create.js';
import Login from './components/Login.js';
import Account from './components/Account.js';
import './fonts.css';



function App() {

  return (

    <div className="App">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/films' element={<Films />}></Route>
        <Route path='/info' element={<Info />}></Route>
        <Route path='/create' element={<Create />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/account' element={<Account />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
