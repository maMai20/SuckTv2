// src/Calendar.js
import React, { useState } from 'react';
import dayjs from 'dayjs';
import './Calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');
  const daysInMonth = currentDate.daysInMonth();

  const startDay = startOfMonth.day(); // Sunday = 0

  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null); // blank before month start
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const handlePrev = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNext = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrev}>Prev</button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={handleNext}>Next</button>
      </div>
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
          <div key={i} className="calendar-cell header">{d}</div>
        ))}
        {days.map((day, i) => (
          <div key={i} className="calendar-cell">
            {day ? day : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;


// src/Calendar.css
.calendar {
  width: 100%;
  max-width: 500px;
  margin: auto;
  font-family: sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-cell {
  padding: 0.75rem;
  text-align: center;
  border: 1px solid #ddd;
  background: #f9f9f9;
  min-height: 50px;
}

.calendar-cell.header {
  background: #eee;
  font-weight: bold;
}


// src/App.js
import React from 'react';
import Calendar from './Calendar';

function App() {
  return (
    <div className="App">
      <h1>My Calendar</h1>
      <Calendar />
    </div>
  );
}

export default App;


// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

