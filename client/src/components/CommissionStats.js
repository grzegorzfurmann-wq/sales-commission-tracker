import React from 'react';
import './CommissionStats.css';

function CommissionStats({ stats, formatCurrency }) {
  if (!stats) {
    return null;
  }

  // Oblicz prowizje zgodnie z nowymi wymaganiami
  const doWypłaty = stats.paid?.commission || 0; // Prowizja z umów na statusie "Do wypłaty"
  const potencjałWypłaty = (stats.signed?.commission || 0) + (stats.processed?.commission || 0) + (stats.paid?.commission || 0); // Prowizja z umów na statusie "Podpisana", "Proces", "Do wypłaty"
  const spady = stats.dropped?.commission || 0; // Prowizja z umów na statusie "Spad"
  const wypłacone = stats.paid_out?.commission || 0; // Prowizja z umów na statusie "Wypłacone"

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

export default CommissionStats;

