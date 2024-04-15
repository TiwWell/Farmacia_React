
import './App.css';
import Navbar from './components/Nav.js';
import Client from './components/Client/Client.js';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Navbar/>
      <Client/>
      <Toaster/>
    </div>
  );
}

export default App;
