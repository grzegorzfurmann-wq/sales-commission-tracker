import React, { useState } from 'react';
import './SalespersonContractList.css';
import ContractNotes from './ContractNotes';

function SalespersonContractList({ contracts, salespersonId, formatCurrency, onContractUpdated }) {
  const [editingContractId, setEditingContractId] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' lub 'list'
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'thisMonth', 'lastMonth', 'custom'
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');

  const getStatusLabel = (status) => {
    const labels = {
      signed: 'Podpisana',
      processed: 'Proces',
      paid: 'Do wypłaty',
      paid_out: 'Wypłacona',
      dropped: 'Spad'
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const calculateCommission = (contract) => {
    const rate = contract.commission_rate || 0.1;
    return contract.contract_value * rate;
  };

  // Funkcja do filtrowania umów po dacie
  const filterContractsByDate = (contractsToFilter) => {
    if (dateFilter === 'all') {
      return contractsToFilter;
    }

    const now = new Date();
    let startDate, endDate;

    if (dateFilter === 'thisMonth') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    } else if (dateFilter === 'lastMonth') {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    } else if (dateFilter === 'custom') {
      if (!customDateFrom || !customDateTo) {
        return contractsToFilter;
      }
      startDate = new Date(customDateFrom);
      endDate = new Date(customDateTo);
      endDate.setHours(23, 59, 59, 999);
    } else {
      return contractsToFilter;
    }

    return contractsToFilter.filter(contract => {
      if (!contract.signed_date) return false;
      const contractDate = new Date(contract.signed_date);
      return contractDate >= startDate && contractDate <= endDate;
    });
  };

  // Podziel umowy na własne i podwładnych
  const ownContracts = contracts.filter(c => !c.is_subordinate_contract || c.is_subordinate_contract === 0);
  const subordinateContracts = contracts.filter(c => c.is_subordinate_contract === 1);

  // Filtruj umowy po dacie
  const filteredOwnContracts = filterContractsByDate(ownContracts);
  const filteredSubordinateContracts = filterContractsByDate(subordinateContracts);

  if (contracts.length === 0) {
    return (
      <div className="salesperson-contract-list">
        <h3>Moje Umowy</h3>
        <div className="empty-state">Brak umów</div>
      </div>
    );
  }

  return (
    <div className="salesperson-contract-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Moje Umowy ({filteredOwnContracts.length})</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="date-filter">
            <label style={{ marginRight: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Filtr dat:</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                marginRight: '0.5rem'
              }}
            >
              <option value="all">Wszystkie</option>
              <option value="thisMonth">Ten miesiąc</option>
              <option value="lastMonth">Poprzedni miesiąc</option>
              <option value="custom">Konkretny zakres dat</option>
            </select>
            {dateFilter === 'custom' && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="date"
                  value={customDateFrom}
                  onChange={(e) => setCustomDateFrom(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                  placeholder="Od"
                />
                <span>—</span>
                <input
                  type="date"
                  value={customDateTo}
                  onChange={(e) => setCustomDateTo(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                  placeholder="Do"
                />
              </div>
            )}
          </div>
          <div className="view-toggle">
            <button
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Widok kafelków"
            >
              ⬜ Kafelki
            </button>
            <button
              className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Widok listy"
            >
              ☰ Lista
            </button>
          </div>
        </div>
      </div>
      {filteredOwnContracts.length === 0 ? (
        <div className="empty-state">Brak umów</div>
      ) : (
        <div className={viewMode === 'grid' ? 'contracts-grid' : 'contracts-list'}>
          {filteredOwnContracts.map((contract) => (
            <div key={contract.id} className={`contract-card contract-card-${contract.status}`}>
              <div className="contract-header">
                <h4>{contract.client_name}</h4>
                <span className={getStatusClass(contract.status)}>
                  {getStatusLabel(contract.status)}
                </span>
              </div>

              <div className="contract-details">
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

              <div className="contract-notes-section">
                {editingContractId === contract.id ? (
                  <ContractNotes
                    contract={contract}
                    salespersonId={salespersonId}
                    onSave={() => {
                      setEditingContractId(null);
                      onContractUpdated();
                    }}
                    onCancel={() => setEditingContractId(null)}
                  />
                ) : (
                  <div className="notes-display">
                    {contract.salesperson_notes ? (
                      <div className="notes-content">
                        <div className="notes-label">Moje notatki:</div>
                        <div className="notes-text">{contract.salesperson_notes}</div>
                      </div>
                    ) : (
                      <div className="no-notes">Brak notatek</div>
                    )}
                    <button
                      className="btn-edit-notes"
                      onClick={() => setEditingContractId(contract.id)}
                    >
                      {contract.salesperson_notes ? 'Edytuj notatki' : 'Dodaj notatki'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredSubordinateContracts.length > 0 && (
        <>
          <h3 style={{ marginTop: '2rem' }}>Umowy Zespołu ({filteredSubordinateContracts.length})</h3>
          <div className={viewMode === 'grid' ? 'contracts-grid' : 'contracts-list'}>
            {filteredSubordinateContracts.map((contract) => (
              <div key={contract.id} className={`contract-card contract-card-${contract.status} subordinate-contract`}>
                <div className="contract-header">
                  <h4>{contract.client_name}</h4>
                  <span className={getStatusClass(contract.status)}>
                    {getStatusLabel(contract.status)}
                  </span>
                </div>
                <div className="subordinate-badge">
                  Handlowiec: {contract.salesperson_name}
                </div>

                <div className="contract-details">
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
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SalespersonContractList;

