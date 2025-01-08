import { Toaster } from 'react-hot-toast';
import Medicine from '../../components/Medicine/Medicine.js';
import './MedicinePage.css';

function MedicinePage() {
  return (
    <div>
      <Medicine/>
      <Toaster/>
    </div>
  );
}

export default MedicinePage;