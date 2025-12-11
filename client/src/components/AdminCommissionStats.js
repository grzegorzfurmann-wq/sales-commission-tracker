import React from 'react';
import './CommissionStats.css';

function AdminCommissionStats({ contracts, formatCurrency }) {
  if (!contracts || contracts.length === 0) {
    return (
      <div className="commission-stats">
        <h3>Szczegółowe Statystyki Prowizji</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Do wypłaty:</span>
            <span className="stat-amount pending">
              {formatCurrency(0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Potencjał wypłaty (tyle możesz zarobić):</span>
            <span className="stat-amount potential">
              {formatCurrency(0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Spady (tyle Ci przepadło):</span>
            <span className="stat-amount dropped">
              {formatCurrency(0)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wypłacone:</span>
            <span className="stat-amount paid-out">
              {formatCurrency(0)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Oblicz prowizje zgodnie z wymaganiami
  const calculateCommission = (contract) => {
    const rate = contract.commission_rate || 0.1;
    return contract.contract_value * rate;
  };

  // Prowizja z umów na statusie "Do wypłaty"
  const doWypłaty = contracts
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + calculateCommission(c), 0);

  // Prowizja z umów na statusie "Podpisana", "Proces", "Do wypłaty"
  const potencjałWypłaty = contracts
    .filter(c => c.status === 'signed' || c.status === 'processed' || c.status === 'paid')
    .reduce((sum, c) => sum + calculateCommission(c), 0);

  // Prowizja z umów na statusie "Spad"
  const spady = contracts
    .filter(c => c.status === 'dropped')
    .reduce((sum, c) => sum + calculateCommission(c), 0);

  // Prowizja z umów na statusie "Wypłacone"
  const wypłacone = contracts
    .filter(c => c.status === 'paid_out')
    .reduce((sum, c) => sum + calculateCommission(c), 0);

  return (
    <div className="commission-stats">
      <h3>Szczegółowe Statystyki Prowizji</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Do wypłaty:</span>
          <span className="stat-amount pending">
            {formatCurrency(doWypłaty)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Potencjał wypłaty (tyle możesz zarobić):</span>
          <span className="stat-amount potential">
            {formatCurrency(potencjałWypłaty)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Spady (tyle Ci przepadło):</span>
          <span className="stat-amount dropped">
            {formatCurrency(spady)}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Wypłacone:</span>
          <span className="stat-amount paid-out">
            {formatCurrency(wypłacone)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AdminCommissionStats;


