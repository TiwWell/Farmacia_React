
import './ClientPage.css';
import Navbar from '../components/Nav/Nav.js';
import Client from '../components/Client/Client.js';
import { Toaster, toast } from 'react-hot-toast';

function ClientPage() {
  return (
    <div>
      <Client/>
      <Toaster/>
    </div>
  );
}

export default ClientPage;
