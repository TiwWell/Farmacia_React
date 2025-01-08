
import { Toaster } from 'react-hot-toast';
import Client from '../../components/Client/Client.js';
import './ClientPage.css';

function ClientPage() {
  return (
    <div>
      <Client />
      <Toaster />
    </div>
  );
}

export default ClientPage;
