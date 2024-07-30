import './MedicinePage.css';
import Navbar from '../components/Nav/Nav.js';
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