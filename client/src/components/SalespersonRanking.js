import React, { useState, useEffect } from 'react';
import './SalespersonRanking.css';

function SalespersonRanking({ formatCurrency }) {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthInfo, setMonthInfo] = useState(null);

  useEffect(() => {
    fetchRanking();
  }, [selectedMonth, selectedYear]);

  const fetchRanking = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL || '';
      const response = await fetch(`${apiUrl}/api/ranking?month=${selectedMonth}&year=${selectedYear}`);
      const data = await response.json();
      setRanking(data.ranking || []);
      setMonthInfo({
        month: data.month,
        year: data.year,
        startDate: data.startDate,
        endDate: data.endDate
      });
      setLoading(false);
    } catch (error) {
      console.error('Błąd pobierania rankingu:', error);
      setLoading(false);
    }
  };

  const getMonthName = (monthNumber) => {
    const months = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];
    return months[monthNumber - 1] || '';
  };

  const getMedalEmoji = (position) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `${position}.`;
  };

  if (loading) {
    return <div className="ranking-container"><div className="loading">Ładowanie rankingu...</div></div>;
  }

  return (
    <div className="ranking-container">
      <div className="ranking-header">
        <h2>Ranking Handlowców</h2>
        <p className="ranking-subtitle">Umowy ze statusem "Do wypłaty" - {getMonthName(selectedMonth)} {selectedYear}</p>
      </div>

      <div className="ranking-filters">
        <div className="filter-group">
          <label htmlFor="month">Miesiąc:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
              <option key={month} value={month}>{getMonthName(month)}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">Rok:</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {ranking.length === 0 ? (
        <div className="ranking-empty">
          <p>Brak handlowców z umowami "Do wypłaty" w wybranym miesiącu.</p>
          <p className="ranking-empty-note">W rankingu pojawiają się tylko osoby z co najmniej jedną umową na etapie "Do wypłaty".</p>
        </div>
      ) : (
        <>
          <div className="ranking-info">
            <p>Okres: {monthInfo?.startDate} - {monthInfo?.endDate}</p>
            <p>Liczba handlowców w rankingu: {ranking.length}</p>
          </div>

          <div className="ranking-list">
            {ranking.map((salesperson, index) => (
              <div key={salesperson.id} className={`ranking-item ${index < 3 ? 'top-three' : ''}`}>
                <div className="ranking-position">
                  {getMedalEmoji(index + 1)}
                </div>
                <div className="ranking-details">
                  <div className="ranking-name">{salesperson.name}</div>
                  <div className="ranking-email">{salesperson.email}</div>
                </div>
                <div className="ranking-stats">
                  <div className="ranking-stat">
                    <span className="stat-label">Umowy:</span>
                    <span className="stat-value">{salesperson.contracts_count}</span>
                  </div>
                  <div className="ranking-stat">
                    <span className="stat-label">Wartość:</span>
                    <span className="stat-value">{formatCurrency(salesperson.total_value)}</span>
                  </div>
                  <div className="ranking-stat highlight">
                    <span className="stat-label">Prowizja:</span>
                    <span className="stat-value">{formatCurrency(salesperson.total_commission)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SalespersonRanking;

