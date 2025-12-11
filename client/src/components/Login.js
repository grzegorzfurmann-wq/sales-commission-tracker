import React, { useState } from 'react';
import './Login.css';

function Login({ salespeople, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email) {
      setError('Wprowadź email');
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password || undefined, // Dla handlowców hasło może być puste
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jeśli to handlowiec, upewnij się że mamy pełny obiekt salesperson
        if (data.type === 'salesperson' && data.salesperson) {
          onLogin({ type: 'salesperson', salesperson: data.salesperson });
        } else if (data.type === 'salesperson') {
          // Jeśli nie ma pełnego obiektu, użyj danych z odpowiedzi
          onLogin({ type: 'salesperson', salesperson: data });
        } else {
          // Administrator
          onLogin({ type: 'admin', ...data });
        }
      } else {
        setError(data.error || 'Błąd logowania');
      }
    } catch (error) {
      console.error('Błąd logowania:', error);
      setError('Błąd połączenia z serwerem');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Zaloguj się</h2>
        <p className="login-hint">
          Wprowadź email i hasło. System automatycznie rozpozna typ konta.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.pl"
              required
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wprowadź hasło"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <button type="submit" className="btn-login" disabled={isLoading}>
            {isLoading ? 'Logowanie...' : 'Zaloguj'}
          </button>

          <div className="login-info">
            <p><strong>Administrator:</strong> Wprowadź email i hasło</p>
            <p><strong>Handlowcy:</strong> Będą mogli logować się po utworzeniu kont</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

