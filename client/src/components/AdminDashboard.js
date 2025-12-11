import React from 'react';
import './SalespersonDashboard.css';

function AdminDashboard({ contracts, formatCurrency }) {
  if (!contracts || contracts.length === 0) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard: Administrator</h2>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-label">Liczba Umów</div>
            <div className="stat-value">0</div>
            <div className="stat-description">
              Wartość: {formatCurrency(0)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Oblicz statystyki na podstawie wszystkich umów
  const calculateCommission = (contract) => {
    const rate = contract.commission_rate || 0.1;
    return contract.contract_value * rate;
  };

  const stats = {
    total: {
      count: contracts.length,
      value: contracts.reduce((sum, c) => sum + (c.contract_value || 0), 0),
      commission: contracts.reduce((sum, c) => sum + calculateCommission(c), 0)
    },
    signed: {
      count: contracts.filter(c => c.status === 'signed').length,
      value: contracts.filter(c => c.status === 'signed').reduce((sum, c) => sum + (c.contract_value || 0), 0),
      commission: contracts.filter(c => c.status === 'signed').reduce((sum, c) => sum + calculateCommission(c), 0)
    },
    processed: {
      count: contracts.filter(c => c.status === 'processed').length,
      value: contracts.filter(c => c.status === 'processed').reduce((sum, c) => sum + (c.contract_value || 0), 0),
      commission: contracts.filter(c => c.status === 'processed').reduce((sum, c) => sum + calculateCommission(c), 0)
    },
    paid: {
      count: contracts.filter(c => c.status === 'paid').length,
      value: contracts.filter(c => c.status === 'paid').reduce((sum, c) => sum + (c.contract_value || 0), 0),
      commission: contracts.filter(c => c.status === 'paid').reduce((sum, c) => sum + calculateCommission(c), 0)
    },
    paid_out: {
      count: contracts.filter(c => c.status === 'paid_out').length,
      value: contracts.filter(c => c.status === 'paid_out').reduce((sum, c) => sum + (c.contract_value || 0), 0),
      commission: contracts.filter(c => c.status === 'paid_out').reduce((sum, c) => sum + calculateCommission(c), 0)
    },
    dropped: {
      count: contracts.filter(c => c.status === 'dropped').length,
      value: contracts.filter(c => c.status === 'dropped').reduce((sum, c) => sum + (c.contract_value || 0), 0),
      commission: contracts.filter(c => c.status === 'dropped').reduce((sum, c) => sum + calculateCommission(c), 0)
    }
  };

  const totalCommission = stats.processed.commission;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard: Administrator</h2>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">Liczba Umów</div>
          <div className="stat-value">{stats.total.count}</div>
        </div>

        <div className="stat-card success">
          <div className="stat-label">Liczba Procesów</div>
          <div className="stat-value">{stats.processed.count}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(stats.processed.commission)}
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-label">Liczba Spadów</div>
          <div className="stat-value">{stats.dropped.count}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(stats.dropped.commission)}
          </div>
        </div>

        <div className="stat-card primary">
          <div className="stat-label">Łączna Prowizja</div>
          <div className="stat-value">{formatCurrency(totalCommission)}</div>
          <div className="stat-description">Zaprocesowane umowy</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-label">Do wypłaty</div>
          <div className="stat-value">{stats.paid.count}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(stats.paid.commission)}
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-label">Podpisane</div>
          <div className="stat-value">{stats.signed.count}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(stats.signed.commission)}
          </div>
        </div>

        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' }}>
          <div className="stat-label">Wypłacone</div>
          <div className="stat-value">{stats.paid_out.count}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(stats.paid_out.commission)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;


