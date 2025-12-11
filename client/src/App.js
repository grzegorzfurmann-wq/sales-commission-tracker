import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import AdminView from './components/AdminView';
import SalespersonView from './components/SalespersonView';
import SetPassword from './components/SetPassword';

function App() {
  const [salespeople, setSalespeople] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalespeople();
    
    // Rejestracja Service Workera dla PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker zarejestrowany:', registration.scope);
          })
          .catch((error) => {
            console.log('Błąd rejestracji Service Workera:', error);
          });
      });
    }
  }, []);

  const fetchSalespeople = async () => {
    try {
      const response = await fetch('/api/salespeople');
      const data = await response.json();
      setSalespeople(data);
      setLoading(false);
    } catch (error) {
      console.error('Błąd pobierania handlowców:', error);
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(amount);
  };

  // Jeśli jesteśmy na stronie ustawiania hasła, nie pokazuj głównej aplikacji
  if (window.location.pathname === '/set-password' || window.location.search.includes('token=')) {
    return <SetPassword />;
  }

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  if (!user) {
    return <Login salespeople={salespeople} onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <div>
            <h1>💰 System Prowizji Handlowców</h1>
            <p>
              {user.type === 'admin' 
                ? `Panel Administracyjny${user.name ? ` - ${user.name}` : ''} - Zarządzanie umowami i statusami`
                : `Witaj, ${user.salesperson.name}! - Twoje umowy i prowizje`
              }
            </p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Wyloguj
          </button>
        </div>
      </header>

      <div className="container">
        {user.type === 'admin' ? (
          <AdminView formatCurrency={formatCurrency} adminEmail={user.email} />
        ) : (
          <SalespersonView 
            salesperson={user.salesperson} 
            formatCurrency={formatCurrency} 
          />
        )}
      </div>
    </div>
  );
}

export default App;

