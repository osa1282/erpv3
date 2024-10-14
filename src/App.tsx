import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import Calendar from '@/components/modules/Calendar';
import InOut from '@/components/modules/InOut';
import Administrator from '@/components/modules/Administrator';
import Cars from '@/components/modules/Cars';
import Installations from '@/components/modules/Installations';
import Clients from '@/components/modules/Clients';
import Warehouse from '@/components/modules/Warehouse';
import Todo from '@/components/modules/Todo';
import Sell from '@/components/modules/Sell';
import Invoices from '@/components/modules/Invoices';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'inout':
        return <InOut />;
      case 'administrator':
        return <Administrator />;
      case 'cars':
        return <Cars />;
      case 'installations':
        return <Installations />;
      case 'clients':
        return <Clients />;
      case 'warehouse':
        return <Warehouse />;
      case 'todo':
        return <Todo />;
      case 'sell':
        return <Sell />;
      case 'invoices':
        return <Invoices />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Layout activeModule={activeModule} setActiveModule={setActiveModule}>
        {renderModule()}
      </Layout>
    </ThemeProvider>
  );
}

export default App;