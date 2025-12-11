import React, { useState, useEffect } from 'react';
import './ContractNotes.css';

function ContractNotes({ contract, salespersonId, onSave, onCancel }) {
  const [notes, setNotes] = useState(contract.salesperson_notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/contracts/${contract.id}/notes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          salesperson_notes: notes,
          salesperson_id: salespersonId,
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        const error = await response.json();
        alert(error.error || 'Błąd podczas zapisywania notatek');
      }
    } catch (error) {
      console.error('Błąd:', error);
      alert('Błąd podczas zapisywania notatek');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="contract-notes-editor">
      <label className="notes-editor-label">Dodaj/edytuj notatki do umowy:</label>
      <textarea
        className="notes-textarea"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Wpisz tutaj informacje o umowie, kontakcie z klientem, uwagi, itp..."
        rows={5}
      />
      <div className="notes-actions">
        <button
          className="btn btn-cancel"
          onClick={onCancel}
          disabled={isSaving}
        >
          Anuluj
        </button>
        <button
          className="btn btn-save"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Zapisywanie...' : 'Zapisz notatki'}
        </button>
      </div>
    </div>
  );
}

export default ContractNotes;



