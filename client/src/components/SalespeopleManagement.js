import React, { useState } from 'react';
import './SalespeopleManagement.css';

function SalespeopleManagement({ salespeople, onSalespersonAdded, onSalespersonUpdated, onSalespersonDeleted }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    commission_rate: '10',
    manager_id: '',
    director_bonus: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const url = editingId 
        ? `/api/salespeople/${editingId}`
        : '/api/salespeople';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          commission_rate: parseFloat(formData.commission_rate) / 100, // Konwersja z procentów na wartość dziesiętną
          manager_id: formData.manager_id || null,
          director_bonus: formData.director_bonus,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({ name: '', email: '', commission_rate: '10', manager_id: '', director_bonus: false });
        setShowForm(false);
        setEditingId(null);
        if (editingId) {
          onSalespersonUpdated();
        } else {
          onSalespersonAdded();
        }
      } else {
        setError(data.error || 'Błąd podczas zapisywania handlowca');
      }
    } catch (error) {
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (salesperson) => {
    setFormData({
      name: salesperson.name,
      email: salesperson.email,
      commission_rate: (salesperson.commission_rate * 100).toString(), // Konwersja z wartości dziesiętnej na procenty
      manager_id: salesperson.manager_id || '',
      director_bonus: salesperson.director_bonus === 1 || salesperson.director_bonus === true,
    });
    setEditingId(salesperson.id);
    setShowForm(true);
    setError('');
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Czy na pewno chcesz usunąć handlowca "${name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/salespeople/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        onSalespersonDeleted();
      } else {
        alert(data.error || 'Błąd podczas usuwania handlowca');
      }
    } catch (error) {
      alert('Błąd połączenia z serwerem');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', email: '', commission_rate: '10', manager_id: '', director_bonus: false });
    setShowForm(false);
    setEditingId(null);
    setError('');
  };

  return (
    <div className="salespeople-management">
      <div className="management-header">
        <h3>Zarządzanie Handlowcami</h3>
        {!showForm && (
          <button
            className="btn-add-salesperson"
            onClick={() => setShowForm(true)}
          >
            + Dodaj Nowego Handlowca
          </button>
        )}
      </div>

      {showForm && (
        <div className="salesperson-form-container">
          <h4>{editingId ? 'Edytuj Handlowca' : 'Dodaj Nowego Handlowca'}</h4>
          <form onSubmit={handleSubmit} className="salesperson-form">
            <div className="form-group">
              <label htmlFor="name">Imię i Nazwisko *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="np. Jan Kowalski"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jan.kowalski@firma.pl"
                disabled={isSubmitting}
              />
              <small>Email będzie używany do logowania</small>
            </div>

            <div className="form-group">
              <label htmlFor="commission_rate">Poziom prowizyjny (%) *</label>
              <input
                type="number"
                id="commission_rate"
                name="commission_rate"
                value={formData.commission_rate}
                onChange={handleChange}
                required
                min="0"
                max="100"
                step="0.01"
                placeholder="10"
                disabled={isSubmitting}
              />
              <small>Wprowadź wartość jako procent (np. 10 dla 10%)</small>
            </div>

            <div className="form-group">
              <label htmlFor="manager_id">Osoba Nadrzędna (Dyrektor/Manager)</label>
              <select
                id="manager_id"
                name="manager_id"
                value={formData.manager_id}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">-- Brak (bez osoby nadrzędnej) --</option>
                {salespeople
                  .filter(person => !editingId || person.id !== parseInt(editingId))
                  .map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name}
                    </option>
                  ))}
              </select>
              <small>Wybierz dyrektora lub managera dla tego handlowca (opcjonalne)</small>
            </div>

            <div className="form-group">
              <label htmlFor="director_bonus" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  id="director_bonus"
                  name="director_bonus"
                  checked={formData.director_bonus}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <span>Nadprowizja dyrektorska</span>
              </label>
              <small>Jeśli zaznaczone, ta osoba otrzyma 3000 zł do każdej swojej umowy oraz do każdej umowy handlowców w swoim zespole</small>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-cancel"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Anuluj
              </button>
              <button
                type="submit"
                className="btn btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Zapisywanie...' : editingId ? 'Zapisz Zmiany' : 'Dodaj Handlowca'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="salespeople-list">
        <h4>Lista Handlowców ({salespeople.length})</h4>
        {salespeople.length === 0 ? (
          <div className="empty-state">Brak handlowców. Dodaj pierwszego handlowca.</div>
        ) : (
          <div className="salespeople-grid">
            {salespeople.map((person) => (
              <div key={person.id} className="salesperson-card">
                <div className="salesperson-info">
                  <h5>{person.name}</h5>
                  <div className="salesperson-details">
                    <div className="detail-item">
                      <span className="label">Email:</span>
                      <span className="value">{person.email || 'Brak'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Poziom prowizyjny:</span>
                      <span className="value">{(person.commission_rate * 100).toFixed(1)}%</span>
                    </div>
                    {person.manager_name && (
                      <div className="detail-item">
                        <span className="label">Manager:</span>
                        <span className="value">{person.manager_name}</span>
                      </div>
                    )}
                    {person.director_bonus === 1 && (
                      <div className="detail-item">
                        <span className="label">Nadprowizja:</span>
                        <span className="value" style={{ color: '#667eea', fontWeight: 'bold' }}>✓ Dyrektorska (3000 zł)</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="salesperson-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(person)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(person.id, person.name)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SalespeopleManagement;

