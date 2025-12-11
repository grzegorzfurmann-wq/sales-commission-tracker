import React from 'react';
import './ContractList.css';

function ContractList({ contracts, formatCurrency, onContractUpdated }) {
  const getStatusLabel = (status) => {
    const labels = {
      signed: 'Podpisana',
      paid: 'Opłacona',
      processed: 'Zaprocesowana'
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const handleStatusChange = async (contractId, newStatus) => {
    try {
      const response = await fetch(`/api/contracts/${contractId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onContractUpdated();
      } else {
        alert('Błąd podczas aktualizacji umowy');
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert('Błąd podczas aktualizacji umowy');
    }
  };

  const calculateCommission = (contract) => {
    const rate = contract.commission_rate || 0.1;
    return contract.contract_value * rate;
  };

  if (contracts.length === 0) {
    return (
      <div className="contract-list">
        <h3>Lista Umów</h3>
        <div className="empty-state">Brak umów dla tego handlowca</div>
      </div>
    );
  }

  return (
    <div className="contract-list">
      <h3>Lista Umów ({contracts.length})</h3>
      <div className="contracts-grid">
        {contracts.map((contract) => (
          <div key={contract.id} className="contract-card">
            <div className="contract-header">
              <h4>{contract.client_name}</h4>
              <span className={getStatusClass(contract.status)}>
                {getStatusLabel(contract.status)}
              </span>
            </div>

            <div className="contract-details">
              <div className="detail-row">
                <span className="detail-label">Wartość umowy:</span>
                <span className="detail-value">
                  {formatCurrency(contract.contract_value)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Prowizja:</span>
                <span className="detail-value commission">
                  {formatCurrency(calculateCommission(contract))}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Data podpisania:</span>
                <span className="detail-value">
                  {contract.signed_date || 'Brak'}
                </span>
              </div>
              {contract.paid_date && (
                <div className="detail-row">
                  <span className="detail-label">Data opłacenia:</span>
                  <span className="detail-value">{contract.paid_date}</span>
                </div>
              )}
              {contract.processed_date && (
                <div className="detail-row">
                  <span className="detail-label">Data procesowania:</span>
                  <span className="detail-value">{contract.processed_date}</span>
                </div>
              )}
            </div>

            <div className="contract-actions">
              {contract.status === 'signed' && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(contract.id, 'paid')}
                >
                  Oznacz jako Wypłacona
                </button>
              )}
              {contract.status === 'paid' && (
                <button
                  className="btn btn-success"
                  onClick={() => handleStatusChange(contract.id, 'processed')}
                >
                  Oznacz jako Zaprocesowana
                </button>
              )}
              {contract.status === 'processed' && (
                <span className="completed-badge">✓ Prowizja wypłacona</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContractList;

