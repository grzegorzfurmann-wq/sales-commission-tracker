import React from 'react';
import './SalespersonDashboard.css';

function SalespersonDashboard({ salesperson, commissionStats, formatCurrency }) {
  if (!salesperson || !commissionStats) {
    return <div>Ładowanie danych...</div>;
  }

  // Suma wszystkich prowizji (włącznie z nadprowizją dyrektorską i prowizją z różnicy poziomów)
  // Backend już włącza te wartości do odpowiednich statusów, więc używamy total.commission
  const totalCommission = commissionStats.total?.commission || 0;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard: {salesperson.name}</h2>
        <div className="dashboard-badge">
          Prowizja: {(salesperson.commission_rate * 100).toFixed(1)}%
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">Liczba Umów</div>
          <div className="stat-value">{commissionStats.total?.count || 0}</div>
        </div>

        <div className="stat-card success">
          <div className="stat-label">Liczba Procesów</div>
          <div className="stat-value">{commissionStats.processed?.count || 0}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(commissionStats.processed?.commission || 0)}
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-label">Liczba Spadów</div>
          <div className="stat-value">{commissionStats.dropped?.count || 0}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(commissionStats.dropped?.commission || 0)}
          </div>
        </div>

        <div className="stat-card primary">
          <div className="stat-label">Zarobiona Prowizja</div>
          <div className="stat-value">{formatCurrency(totalCommission)}</div>
          <div className="stat-description">Suma wszystkich prowizji</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-label">Do wypłaty</div>
          <div className="stat-value">{commissionStats.paid?.count || 0}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(commissionStats.paid?.commission || 0)}
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-label">Podpisane</div>
          <div className="stat-value">{commissionStats.signed?.count || 0}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(commissionStats.signed?.commission || 0)}
          </div>
        </div>

        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)' }}>
          <div className="stat-label">Wypłacone</div>
          <div className="stat-value">{commissionStats.paid_out?.count || 0}</div>
          <div className="stat-description">
            Prowizja: {formatCurrency(commissionStats.paid_out?.commission || 0)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalespersonDashboard;

