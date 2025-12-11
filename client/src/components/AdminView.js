import React, { useState, useEffect } from 'react';
import './AdminView.css';
import AddContractForm from './AddContractForm';
import AdminContractList from './AdminContractList';
import ChangePassword from './ChangePassword';
import SalespeopleManagement from './SalespeopleManagement';
import AdminDashboard from './AdminDashboard';
import AdminCommissionStats from './AdminCommissionStats';

function AdminView({ formatCurrency, adminEmail }) {
  const [salespeople, setSalespeople] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [salespeopleRes, contractsRes] = await Promise.all([
        fetch('/api/salespeople'),
        fetch('/api/contracts')
      ]);
      
      const salespeopleData = await salespeopleRes.json();
      const contractsData = await contractsRes.json();
      
      setSalespeople(salespeopleData);
      setContracts(contractsData);
      setLoading(false);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setLoading(false);
    }
  };

  const handleContractAdded = () => {
    fetchData();
  };

  const handleContractUpdated = () => {
    fetchData();
  };

  const handleSalespersonAdded = () => {
    fetchData();
  };

  const handleSalespersonUpdated = () => {
    fetchData();
  };

  const handleSalespersonDeleted = () => {
    fetchData();
  };

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="admin-view">
      <div className="admin-header">
        <h2>Panel Administracyjny</h2>
        <p>Zarządzanie umowami i statusami</p>
      </div>

      {adminEmail && (
        <ChangePassword adminEmail={adminEmail} />
      )}

      <AdminDashboard
        contracts={contracts}
        formatCurrency={formatCurrency}
      />

      <AdminCommissionStats
        contracts={contracts}
        formatCurrency={formatCurrency}
      />

      <SalespeopleManagement
        salespeople={salespeople}
        onSalespersonAdded={handleSalespersonAdded}
        onSalespersonUpdated={handleSalespersonUpdated}
        onSalespersonDeleted={handleSalespersonDeleted}
      />

      <AddContractForm
        salespeople={salespeople}
        onContractAdded={handleContractAdded}
      />

      <AdminContractList
        contracts={contracts}
        formatCurrency={formatCurrency}
        onContractUpdated={handleContractUpdated}
      />
    </div>
  );
}

export default AdminView;

