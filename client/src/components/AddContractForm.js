import React, { useState } from 'react';
import './AddContractForm.css';

function AddContractForm({ salespersonId, salespeople, onContractAdded }) {
  const [formData, setFormData] = useState({
    salesperson_id: salespersonId || '',
    client_name: '',
    contract_value: '',
    signed_date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salesperson_id: parseInt(formData.salesperson_id),
          client_name: formData.client_name,
          contract_value: parseFloat(formData.contract_value),
          signed_date: formData.signed_date,
        }),
      });

      if (response.ok) {
        setFormData({
          salesperson_id: salespersonId || '',
          client_name: '',
          contract_value: '',
          signed_date: new Date().toISOString().split('T')[0],
        });
        setShowForm(false);
        onContractAdded();
      } else {
        alert('Błąd podczas dodawania umowy');
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert('Błąd podczas dodawania umowy');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="add-contract-section">
        <button
          className="btn-add-contract"
          onClick={() => setShowForm(true)}
        >
          + Dodaj Nową Umowę
        </button>
      </div>
    );
  }

  return (
    <div className="add-contract-form-container">
      <h3>Dodaj Nową Umowę</h3>
      <form onSubmit={handleSubmit} className="add-contract-form">
        {salespeople && (
          <div className="form-group">
            <label htmlFor="salesperson_id">Handlowiec *</label>
            <select
              id="salesperson_id"
              name="salesperson_id"
              value={formData.salesperson_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Wybierz handlowca --</option>
              {salespeople.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="client_name">Nazwa Klienta *</label>
          <input
            type="text"
            id="client_name"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            required
            placeholder="np. Firma ABC Sp. z o.o."
          />
        </div>

        <div className="form-group">
          <label htmlFor="contract_value">Marża (PLN) *</label>
          <input
            type="number"
            id="contract_value"
            name="contract_value"
            value={formData.contract_value}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            placeholder="50000"
          />
        </div>

        <div className="form-group">
          <label htmlFor="signed_date">Data Podpisania</label>
          <input
            type="date"
            id="signed_date"
            name="signed_date"
            value={formData.signed_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => {
              setShowForm(false);
              setFormData({
                client_name: '',
                contract_value: '',
                signed_date: new Date().toISOString().split('T')[0],
              });
            }}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Dodawanie...' : 'Dodaj Umowę'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContractForm;

