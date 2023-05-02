import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calendar-wrapper">
      <div className="calendar-overlay" onClick={() => setSelectedDate(null)} />

      <Calendar value={selectedDate} onChange={setSelectedDate} />
    </div>
  );
}

export default App;
