import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ assignments }) {
  const tileContent = ({ date }) => {
    const hasAssignment = assignments.some(
      (a) => new Date(a.deadline).toDateString() === date.toDateString()
    );
    return hasAssignment ? <span style={{ color: 'red' }}>●</span> : null;
  };

  return (
    <div>
      <h3>Assignment Calendar</h3>
      <Calendar tileContent={tileContent} />
    </div>
  );
}

export default CalendarView;
