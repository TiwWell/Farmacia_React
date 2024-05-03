import './MedicinePage.css';
import Navbar from '../components/Nav.js';
import Medicine from '../components/Medicine/Medicine.js';
import { Toaster, toast } from 'react-hot-toast';

function MedicinePage() {
  return (
    <div>
      <Medicine/>
      <Toaster/>
    </div>
  );
}

export default MedicinePage;