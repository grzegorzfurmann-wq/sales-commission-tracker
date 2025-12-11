import React, { useState, useEffect } from 'react';
import './PVCalculator.css';

const PVCalculator = () => {
  // Dane wejściowe
  const [heatingType, setHeatingType] = useState('bez PC');
  const [consumption, setConsumption] = useState(5000);
  const [pvPower, setPvPower] = useState(5);
  const [roofDirection, setRoofDirection] = useState('południe');
  const [meCapacity, setMeCapacity] = useState(5);

  // Oblicz produkcję na podstawie mocy PV i kierunku dachu - formuła z Excela: IF(B8="południe",B7*1050,B7*900)
  // Jeśli "południe": 1050 kWh/kWp, w przeciwnym razie (wschód-zachód): 900 kWh/kWp
  const production = roofDirection === 'południe' ? pvPower * 1050 : pvPower * 900;
  
  // Stan do przechowywania wyników obliczeń
  const [monthlyResults, setMonthlyResults] = useState([]);
  const [yearlySummary, setYearlySummary] = useState({
    totalDeposit: 0,
    totalPurchase: 0,
    totalDistribution: 0,
    totalNet: 0,
    avgMonthly: 0
  });

  // Dane historyczne cen energii (PLN/MWh)
  // consumptionSharePC - udział zużycia dla opcji "z PC" (z kolumny I w Excelu)
  const priceData = [
    { month: 'Styczeń', days: 31, cheapest4: 384.36, expensive4: 629.35, avg: 510.37, czn: 454.9475, productionShare: 0.02016501091153217, consumptionSharePC: 0.14 },
    { month: 'Luty', days: 28, cheapest4: 461.54, expensive4: 735.13, avg: 557.41, czn: 544.8605, productionShare: 0.04327469158701816, consumptionSharePC: 0.13 },
    { month: 'Marzec', days: 31, cheapest4: 196.8, expensive4: 643.08, avg: 408.38, czn: 466.618, productionShare: 0.09112760444425545, consumptionSharePC: 0.11 },
    { month: 'Kwiecień', days: 30, cheapest4: 142.87, expensive4: 606.91, avg: 386.09, czn: 435.8735, productionShare: 0.09791641889293141, consumptionSharePC: 0.08 },
    { month: 'Maj', days: 31, cheapest4: 197.52, expensive4: 683.2, avg: 500.72, czn: 500.72, productionShare: 0.13201581412708166, consumptionSharePC: 0.05 },
    { month: 'Czerwiec', days: 30, cheapest4: 79.65, expensive4: 777.18, avg: 580.603, czn: 580.603, productionShare: 0.13999992861247956, consumptionSharePC: 0.03 },
    { month: 'Lipiec', days: 31, cheapest4: 293.02, expensive4: 699.54, avg: 514.609, czn: 514.609, productionShare: 0.13999992861247956, consumptionSharePC: 0.03 },
    { month: 'Sierpień', days: 31, cheapest4: 177.94, expensive4: 641.89, avg: 465.6065, czn: 465.6065, productionShare: 0.13201581412708166, consumptionSharePC: 0.03 },
    { month: 'Wrzesień', days: 30, cheapest4: 263.08, expensive4: 842.14, avg: 635.819, czn: 635.819, productionShare: 0.09791641889293141, consumptionSharePC: 0.04 },
    { month: 'Październik', days: 31, cheapest4: 329.4, expensive4: 723.71, avg: 488.4, czn: 535.1535, productionShare: 0.04327469158701816, consumptionSharePC: 0.08 },
    { month: 'Listopad', days: 30, cheapest4: 389.29, expensive4: 887.12, avg: 589.33, czn: 674.052, productionShare: 0.03186378593053011, consumptionSharePC: 0.13 },
    { month: 'Grudzień', days: 31, cheapest4: 332.47, expensive4: 648.47, avg: 500.73, czn: 471.1995, productionShare: 0.01584695762663244, consumptionSharePC: 0.15 },
  ];

  // Funkcja do obliczania wyników
  const calculateResults = () => {
    const results = priceData.map((monthData) => {
      // Udział zużycia - formuła z Excela: IF($B$5="bez PC",($B$6/365*J5)/$B$6,I5)
      // Jeśli "bez PC": (zużycie/365*dni)/zużycie = dni/365
      // Jeśli "z PC": wartość z kolumny I (consumptionSharePC)
      const consumptionShare = heatingType === 'bez PC' 
        ? monthData.days / 365 
        : monthData.consumptionSharePC;

      // Produkcja miesięczna
      const monthlyProduction = monthData.productionShare * production;
      
      // Produkcja dzienna
      const dailyProduction = monthlyProduction / monthData.days;
      
      // Zużycie miesięczne
      const monthlyConsumption = consumption * consumptionShare;
      
      // Średnie zużycie dzienne
      const avgDailyConsumption = monthlyConsumption / monthData.days;
      
      // Saldo energii miesięcznie
      const monthlyBalance = monthlyProduction - monthlyConsumption;
      
      // Średnia dzienna nadwyżka energii (ograniczona do pojemności ME)
      const dailySurplus = monthlyBalance / monthData.days > 0 
        ? Math.min(monthlyBalance / monthData.days, meCapacity) 
        : 0;
      
      // Średni dzienny brak energii
      const dailyDeficit = monthlyBalance / monthData.days < 0 
        ? Math.abs(monthlyBalance / monthData.days) 
        : 0;

      // Cena odkupu (CZN) - formuła z Excela: X5*0.85-80
      const cznPrice = monthData.expensive4 * 0.85 - 80;
      
      // Wartość depozytu netto (odsprzedaż)
      const depositValue = dailySurplus > 0 
        ? dailySurplus * monthData.days * cznPrice / 1000 
        : 0;

      // CSN (cena zakupu) - formuła z Excela: W5*1.05+29+5+132
      const csnPrice = monthData.cheapest4 * 1.05 + 29 + 5 + 132;
      
      // Wartość zakupu energii netto
      const purchaseValue = dailyDeficit > 0 
        ? dailyDeficit * monthData.days * csnPrice / 1000 
        : 0;

      // Koszty dystrybucji netto - formuła z Excela: IF(T5="",(16.01+4.56+10.34+0.33),(16.01+4.56+10.34+0.33)+$B$13*(-T5)*J5)
      // B13 = 0.11 (współczynnik kosztów dystrybucji)
      const distributionCosts = dailyDeficit > 0
        ? (16.01 + 4.56 + 10.34 + 0.33) + (0.11 * dailyDeficit * monthData.days)
        : (16.01 + 4.56 + 10.34 + 0.33);

      return {
        ...monthData,
        consumptionShare,
        monthlyProduction,
        dailyProduction,
        monthlyConsumption,
        avgDailyConsumption,
        monthlyBalance,
        dailySurplus,
        dailyDeficit,
        cznPrice,
        depositValue,
        csnPrice,
        purchaseValue,
        distributionCosts,
        netValue: depositValue - purchaseValue - distributionCosts
      };
    });

    // Podsumowanie roczne
    const summary = {
      totalDeposit: results.reduce((sum, m) => sum + m.depositValue, 0),
      totalPurchase: results.reduce((sum, m) => sum + m.purchaseValue, 0),
      totalDistribution: results.reduce((sum, m) => sum + m.distributionCosts, 0),
      totalNet: results.reduce((sum, m) => sum + m.netValue, 0),
      avgMonthly: results.reduce((sum, m) => sum + m.netValue, 0) / 12
    };

    setMonthlyResults(results);
    setYearlySummary(summary);
  };

  // Oblicz przy pierwszym załadowaniu
  useEffect(() => {
    calculateResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pv-calculator">
      <div className="calculator-header">
        <h1>Kalkulator Fotowoltaiki z Magazynem Energii w Bilansowaniu ENIGA</h1>
        <p className="note">*nie uwzględnia niższych cen RB - więc wylicza bardziej negatywny scenariusz</p>
      </div>

      <div className="calculator-content">
        <div className="input-section">
          <h2>Dane wejściowe</h2>
          <div className="input-grid">
            <div className="input-group">
              <label>Rodzaj ogrzewania:</label>
              <select 
                value={heatingType} 
                onChange={(e) => setHeatingType(e.target.value)}
              >
                <option value="bez PC">bez PC</option>
                <option value="z PC">z PC</option>
              </select>
            </div>

            <div className="input-group">
              <label>Zużycie [kWh]:</label>
              <input 
                type="number" 
                value={consumption} 
                onChange={(e) => setConsumption(Number(e.target.value))}
                placeholder="wpisz zużycie"
              />
            </div>

            <div className="input-group">
              <label>Moc PV [kWp]:</label>
              <input 
                type="number" 
                value={pvPower} 
                onChange={(e) => setPvPower(Number(e.target.value))}
                placeholder="wpisz proponowaną moc PV"
              />
            </div>

            <div className="input-group">
              <label>Kierunek dachu:</label>
              <select 
                value={roofDirection} 
                onChange={(e) => setRoofDirection(e.target.value)}
              >
                <option value="południe">południe</option>
                <option value="wschód-zachód">wschód-zachód</option>
              </select>
            </div>

            <div className="input-group">
              <label>Produkcja [kWh]:</label>
              <input 
                type="number" 
                value={production} 
                readOnly
                style={{backgroundColor: '#f0f0f0', cursor: 'not-allowed'}}
              />
              <small style={{color: '#7f8c8d', fontSize: '0.85em'}}>Obliczana automatycznie z mocy PV i kierunku dachu</small>
            </div>

            <div className="input-group">
              <label>ME [kWh] (pojemność magazynu):</label>
              <input 
                type="number" 
                value={meCapacity} 
                onChange={(e) => setMeCapacity(Number(e.target.value))}
                placeholder="wpisz proponowaną pojemność ME (min. x4 zużycia)"
              />
            </div>
          </div>
          <div className="button-container">
            <button className="calculate-button" onClick={calculateResults}>
              Przelicz
            </button>
          </div>
        </div>

        <div className="summary-section">
          <h2>Podsumowanie roczne</h2>
          <div className="summary-grid-main">
            <div className={`summary-card-main ${yearlySummary.totalNet >= 0 ? 'positive' : 'negative'}`}>
              <h3>Saldo roczne</h3>
              <div className="label">
                {yearlySummary.totalNet >= 0 ? 'Rachunek 0 zł' : 'Dopłata'}
              </div>
              <p className={yearlySummary.totalNet >= 0 ? 'positive large' : 'negative large'}>
                {Math.abs(yearlySummary.totalNet).toFixed(2)} zł
              </p>
            </div>
            <div className={`summary-card-main ${yearlySummary.avgMonthly >= 0 ? 'positive' : 'negative'}`}>
              <h3>Saldo miesięczne</h3>
              <div className="label">
                {yearlySummary.avgMonthly >= 0 ? 'Rachunek 0 zł' : 'Dopłata'}
              </div>
              <p className={yearlySummary.avgMonthly >= 0 ? 'positive large' : 'negative large'}>
                {Math.abs(yearlySummary.avgMonthly).toFixed(2)} zł
              </p>
            </div>
          </div>
          <div className="summary-grid">
            <div className="summary-card">
              <h3>Sprzedaż nadwyżek do sieci</h3>
              <p className="positive large">{yearlySummary.totalDeposit.toFixed(2)} zł</p>
            </div>
            <div className="summary-card">
              <h3>Zakup energii z sieci</h3>
              <p className="negative large">{yearlySummary.totalPurchase.toFixed(2)} zł</p>
            </div>
            <div className="summary-card">
              <h3>Koszty dystrybucji</h3>
              <p className="negative large">{yearlySummary.totalDistribution.toFixed(2)} zł</p>
            </div>
          </div>
        </div>

        <div className="results-section">
          <h2>Wyniki miesięczne</h2>
          <div className="table-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Miesiąc</th>
                  <th>Dni</th>
                  <th>Produkcja miesięczna [kWh]</th>
                  <th>Produkcja dzienna [kWh]</th>
                  <th>Zużycie miesięczne [kWh]</th>
                  <th>Średnie zużycie dzienne [kWh]</th>
                  <th>Saldo energii [kWh]</th>
                  <th>Dzienna nadwyżka [kWh]</th>
                  <th>Dzienny brak [kWh]</th>
                  <th>Wartość depozytu [zł]</th>
                  <th>Wartość zakupu [zł]</th>
                  <th>Koszty dystrybucji [zł]</th>
                  <th>Wartość netto [zł]</th>
                </tr>
              </thead>
              <tbody>
                {monthlyResults.map((month, index) => (
                  <tr key={index}>
                    <td>{month.month}</td>
                    <td>{month.days}</td>
                    <td>{month.monthlyProduction.toFixed(2)}</td>
                    <td>{month.dailyProduction.toFixed(2)}</td>
                    <td>{month.monthlyConsumption.toFixed(2)}</td>
                    <td>{month.avgDailyConsumption.toFixed(2)}</td>
                    <td className={month.monthlyBalance >= 0 ? 'positive' : 'negative'}>
                      {month.monthlyBalance.toFixed(2)}
                    </td>
                    <td>{month.dailySurplus.toFixed(2)}</td>
                    <td>{month.dailyDeficit.toFixed(2)}</td>
                    <td className="positive">{month.depositValue.toFixed(2)}</td>
                    <td className="negative">{month.purchaseValue.toFixed(2)}</td>
                    <td className="negative">{month.distributionCosts.toFixed(2)}</td>
                    <td className={month.netValue >= 0 ? 'positive' : 'negative'}>
                      {month.netValue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PVCalculator;

