import React, { useState } from 'react';
import dayjs from 'dayjs';
import './Calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const startDay = currentDate.startOf('month').day();
  const daysInMonth = currentDate.daysInMonth();
  const days = [];

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))}>Prev</button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setCurrentDate(currentDate.add(1, 'month'))}>Next</button>
      </div>
      <div className="calendar-grid">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d,i)=>(
          <div key={i} className="calendar-cell header">{d}</div>
        ))}
        {days.map((day,i)=>(
          <div key={i} className="calendar-cell">{day||''}</div>
        ))}
      </div>
    </div>
  );
}
export default Calendar;