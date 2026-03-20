import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const API_URL = "https://csp-lab5-backend-dgfrhfg2dwfygnab.westindia-01.azurewebsites.net/api/data";

  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(apiData => {
        setData(apiData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>SE3022 - Lab 05 Deployment</h1>
        <h2>Student ID: IT23736382</h2>

        <div className="data-container">
          <h3>Backend API Connection Status</h3>

          {loading && <p>Connecting to .NET backend...</p>}

          {error && (
            <div className="error-box">
              <p>❌ Error connecting to API: {error}</p>
              <p className="hint">Make sure your .NET backend is running and the API_URL in App.js is correct.</p>
            </div>
          )}

          {data && (
            <div className="success-data">
              <p className="success">✅ Successfully connected!</p>
              <p><strong>Data retrieved for:</strong> {data.studentId}</p>

              <table className="weather-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Temp (C)</th>
                    <th>Temp (F)</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {data.weather.map((day, index) => (
                    <tr key={index}>
                      <td>{day.date}</td>
                      <td>{day.temperatureC}</td>
                      <td>{day.temperatureF}</td>
                      <td>{day.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;