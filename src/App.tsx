import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import BaseContainer from './Components/User';
import Create from './Components/create';
import UserDetails from './Components/UserDetails';
import Update from './Components/update';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <div className='Navbar'>
          <Navbar />
        </div>
        <div className='BaseContainer'>
          <Routes>
            <Route path='/home' element={<BaseContainer />} />
            <Route path='/create' element={<Create />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route path='/users/update/:id' element={<Update />} />
            <Route path='/' element={<BaseContainer />} /> {/* Route เริ่มต้น */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}