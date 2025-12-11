import React, { useState } from 'react';
import './ChangePassword.css';

function ChangePassword({ adminEmail, onPasswordChanged }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('Wszystkie pola są wymagane');
      return;
    }

    if (newPassword.length < 6) {
      setError('Nowe hasło musi mieć co najmniej 6 znaków');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Nowe hasła nie są identyczne');
      return;
    }

    if (oldPassword === newPassword) {
      setError('Nowe hasło musi być inne niż stare');
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/admin/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminEmail,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          setShowForm(false);
          setSuccess(false);
          if (onPasswordChanged) {
            onPasswordChanged();
          }
        }, 2000);
      } else {
        setError(data.error || 'Błąd podczas zmiany hasła');
      }
    } catch (error) {
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="change-password-section">
        <button
          className="btn-change-password"
          onClick={() => setShowForm(true)}
        >
          🔒 Zmień hasło
        </button>
      </div>
    );
  }

  return (
    <div className="change-password-form-container">
      <h3>Zmiana hasła</h3>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label htmlFor="oldPassword">Obecne hasło:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Nowe hasło:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            disabled={isSubmitting}
          />
          <small>Minimum 6 znaków</small>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Potwierdź nowe hasło:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            disabled={isSubmitting}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && (
          <div className="success-message">
            ✓ Hasło zostało zmienione pomyślnie!
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-cancel"
            onClick={() => {
              setShowForm(false);
              setError('');
              setSuccess(false);
              setOldPassword('');
              setNewPassword('');
              setConfirmPassword('');
            }}
            disabled={isSubmitting}
          >
            Anuluj
          </button>
          <button
            type="submit"
            className="btn btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Zmienianie...' : 'Zmień hasło'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;



