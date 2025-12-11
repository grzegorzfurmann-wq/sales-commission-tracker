import React, { useState, useEffect } from 'react';
import './SetPassword.css';

function SetPassword() {
  // Pobierz token z URL
  const getTokenFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
  };
  
  const token = getTokenFromUrl();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('Brak tokenu w linku');
      setIsVerifying(false);
      return;
    }

    // Weryfikuj token
    fetch(`/api/set-password/${token}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Błąd połączenia z serwerem');
        }
        return res.json();
      })
      .then(data => {
        if (data.valid) {
          setUserInfo(data);
          setIsVerifying(false);
        } else {
          setError(data.error || 'Token jest nieprawidłowy lub wygasł');
          setIsVerifying(false);
        }
      })
      .catch(err => {
        console.error('Błąd weryfikacji tokenu:', err);
        setError('Błąd weryfikacji tokenu. Sprawdź konsolę przeglądarki (F12) dla szczegółów.');
        setIsVerifying(false);
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!password || !confirmPassword) {
      setError('Wprowadź hasło i potwierdź je');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć co najmniej 6 znaków');
      return;
    }

    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } else {
        setError(data.error || 'Błąd podczas ustawiania hasła');
      }
    } catch (error) {
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="set-password-container">
        <div className="set-password-box">
          <div className="loading-spinner">Weryfikowanie linku...</div>
        </div>
      </div>
    );
  }

  if (error && !userInfo) {
    return (
      <div className="set-password-container">
        <div className="set-password-box">
          <h2>Błąd</h2>
          <div className="error-message">{error}</div>
          <button className="btn-back" onClick={() => window.location.href = '/'}>
            Wróć do logowania
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="set-password-container">
        <div className="set-password-box">
          <div className="success-icon">✓</div>
          <h2>Hasło zostało ustawione!</h2>
          <p>Za chwilę zostaniesz przekierowany do strony logowania...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="set-password-container">
      <div className="set-password-box">
        <h2>Ustaw Hasło</h2>
        {userInfo && (
          <p className="user-info">
            Witaj <strong>{userInfo.name}</strong>!<br />
            Ustaw hasło do swojego konta.
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="set-password-form">
          <div className="form-group">
            <label htmlFor="password">Nowe Hasło *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Minimum 6 znaków"
              disabled={isLoading}
            />
            <small>Minimum 6 znaków</small>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Potwierdź Hasło *</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Wprowadź hasło ponownie"
              disabled={isLoading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Ustawianie...' : 'Ustaw Hasło'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;

