import React, { useState } from 'react';
import './AdminContractList.css';

function AdminContractList({ contracts, formatCurrency, onContractUpdated }) {
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

  const statusOptions = [
    { value: 'signed', label: 'Podpisana' },
    { value: 'processed', label: 'Proces' },
    { value: 'paid', label: 'Do wypłaty' },
    { value: 'paid_out', label: 'Wypłacona' },
    { value: 'dropped', label: 'Spad' }
  ];

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const handleStatusChange = async (contractId, newStatus) => {
    try {
      const response = await fetch(`/api/contracts/${contractId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onContractUpdated();
      } else {
        alert('Błąd podczas aktualizacji statusu umowy');
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert('Błąd podczas aktualizacji statusu umowy');
    }
  };

  const handleDeleteClick = (contract) => {
    // Pierwsze potwierdzenie
    const firstConfirm = window.confirm(
      `Czy na pewno chcesz usunąć umowę z klientem "${contract.client_name}"?\n\n` +
      `Wartość: ${formatCurrency(contract.contract_value)}\n` +
      `Handlowiec: ${contract.salesperson_name}\n\n` +
      `UWAGA: Ta operacja jest nieodwracalna!`
    );

    if (!firstConfirm) {
      return;
    }

    // Drugie potwierdzenie - wymaga wpisania nazwy klienta
    const clientName = prompt(
      `Aby potwierdzić usunięcie, wpisz nazwę klienta:\n"${contract.client_name}"`
    );

    if (clientName !== contract.client_name) {
      alert('Nazwa klienta nie została wpisana poprawnie. Usuwanie anulowane.');
      return;
    }

    // Trzecie potwierdzenie - ostateczne
    const finalConfirm = window.confirm(
      `OSTATECZNE POTWIERDZENIE\n\n` +
      `Czy na pewno chcesz USUNĄĆ umowę z klientem "${contract.client_name}"?\n\n` +
      `Ta operacja jest DEFINITYWNIE nieodwracalna!`
    );

    if (!finalConfirm) {
      return;
    }

    // Wykonaj usunięcie
    deleteContract(contract.id);
  };

  const deleteContract = async (contractId) => {
    try {
      const response = await fetch(`/api/contracts/${contractId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        alert('Umowa została usunięta pomyślnie');
        onContractUpdated();
      } else {
        alert(data.error || 'Błąd podczas usuwania umowy');
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert('Błąd połączenia z serwerem');
    }
  };

  const calculateCommission = (contract) => {
    // Użyj stawki z umowy, jeśli jest przypisana, w przeciwnym razie użyj domyślnej
    // (Backend powinien przypisać stawkę handlowca przy tworzeniu umowy)
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

  const filteredContracts = filterContractsByDate(contracts);

  if (contracts.length === 0) {
    return (
      <div className="admin-contract-list">
        <h3>Wszystkie Umowy</h3>
        <div className="empty-state">Brak umów w systemie</div>
      </div>
    );
  }

  return (
    <div className="admin-contract-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Wszystkie Umowy ({filteredContracts.length})</h3>
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
      <div className={viewMode === 'grid' ? 'contracts-grid' : 'contracts-list'}>
        {filteredContracts.length === 0 ? (
          <div className="empty-state">Brak umów w wybranym zakresie dat</div>
        ) : (
          filteredContracts.map((contract) => (
          <div key={contract.id} className={`contract-card contract-card-${contract.status}`} style={{ position: 'relative' }}>
            <div className="contract-header">
              <div>
                <h4>{contract.client_name}</h4>
                <div className="contract-salesperson">
                  Handlowiec: {contract.salesperson_name}
                </div>
              </div>
              <span className={getStatusClass(contract.status)}>
                {getStatusLabel(contract.status)}
              </span>
            </div>

            <div className="contract-details">
              <div className="detail-row">
                <span className="detail-label">Marża:</span>
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
              {contract.salesperson_notes && (
                <div className="detail-row notes-row">
                  <span className="detail-label">Notatki handlowca:</span>
                  <div className="notes-content">{contract.salesperson_notes}</div>
                </div>
              )}
            </div>

            <div className="contract-actions">
              <div className="form-group" style={{ margin: 0 }}>
                <label htmlFor={`status-${contract.id}`} style={{ fontSize: '0.85rem', marginBottom: '0.5rem', display: 'block', fontWeight: 600 }}>
                  Status umowy:
                </label>
                <select
                  id={`status-${contract.id}`}
                  value={contract.status}
                  onChange={(e) => handleStatusChange(contract.id, e.target.value)}
                  className="status-select"
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    backgroundColor: 'white'
                  }}
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              className="btn-delete-x"
              onClick={() => handleDeleteClick(contract)}
              title="Usuń umowę"
              style={{
                position: 'absolute',
                bottom: '0.5rem',
                right: '0.5rem',
                width: '28px',
                height: '28px',
                background: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#b71c1c';
                e.target.style.transform = 'scale(1.1)';
                e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#d32f2f';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
              }}
            >
              ×
            </button>
          </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminContractList;

