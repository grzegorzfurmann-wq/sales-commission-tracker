import React, { useState, useEffect } from 'react';
import './SalespersonView.css';
import SalespersonDashboard from './SalespersonDashboard';
import CommissionStats from './CommissionStats';
import SalespersonContractList from './SalespersonContractList';

function SalespersonView({ salesperson, formatCurrency }) {
  const [contracts, setContracts] = useState([]);
  const [commissionStats, setCommissionStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (salesperson) {
      fetchData();
    }
  }, [salesperson]);

  const fetchData = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const [contractsRes, statsRes] = await Promise.all([
        fetch(`${apiUrl}/api/salespeople/${salesperson.id}/contracts`),
        fetch(`${apiUrl}/api/salespeople/${salesperson.id}/commission`)
      ]);
      
      const contractsData = await contractsRes.json();
      const statsData = await statsRes.json();
      
      setContracts(contractsData);
      setCommissionStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Błąd pobierania danych:', error);
      setLoading(false);
    }
  };

  const handleContractUpdated = () => {
    fetchData();
  };

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  return (
    <div className="salesperson-view">
      <SalespersonDashboard
        salesperson={salesperson}
        commissionStats={commissionStats}
        formatCurrency={formatCurrency}
      />

      <CommissionStats
        stats={commissionStats}
        formatCurrency={formatCurrency}
      />

      <SalespersonContractList
        contracts={contracts}
        salespersonId={salesperson.id}
        formatCurrency={formatCurrency}
        onContractUpdated={handleContractUpdated}
      />
    </div>
  );
}

export default SalespersonView;



