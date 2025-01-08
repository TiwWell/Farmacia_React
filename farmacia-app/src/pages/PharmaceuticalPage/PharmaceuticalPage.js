import { Toaster } from 'react-hot-toast';
import Pharmaceutical from '../../components/pharmaceutical/pharmaceutical.js';
import './PharmaceuticalPage.css';

function PharmaceuticalPage() {
  return (
    <div>
      <Pharmaceutical/>
      <Toaster/>
    </div>
  );
}

export default PharmaceuticalPage;