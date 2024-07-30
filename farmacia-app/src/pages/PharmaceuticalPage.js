import './PharmaceuticalPage.css';
import Navbar from '../components/Nav/Nav.js';
import Pharmaceutical from '../components/pharmaceutical/pharmaceutical.js'
import { Toaster, toast } from 'react-hot-toast';

function PharmaceuticalPage() {
  return (
    <div>
      <Pharmaceutical/>
      <Toaster/>
    </div>
  );
}

export default PharmaceuticalPage;