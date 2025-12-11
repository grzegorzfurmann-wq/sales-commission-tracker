// Helper do wywołań API
// W produkcji używa URL z .env.production, w development używa proxy z package.json

const API_URL = process.env.REACT_APP_API_URL || '';

export const apiCall = async (endpoint, options = {}) => {
  const url = API_URL ? `${API_URL}${endpoint}` : endpoint;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Błąd serwera' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default apiCall;

