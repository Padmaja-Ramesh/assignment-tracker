import React, { useState, useEffect } from 'react';
import AssignmentForm from './components/AssignmentForms';
import AssignmentList from './components/AssignmentList';
import CalendarView from './components/CalendarView';
import './styles.css';

function App() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('assignments')) || [];
    setAssignments(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const addAssignment = (assignment) => {
    setAssignments([...assignments, { ...assignment, id: Date.now() }]);
  };

  const updateStatus = (id, newStatus) => {
    setAssignments(assignments.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    ));
  };

  return (
    <div className="App">
      <h2>Assignment Tracker</h2>
      <AssignmentForm addAssignment={addAssignment} />
      <AssignmentList assignments={assignments} updateStatus={updateStatus} />
      <CalendarView assignments={assignments} />
    </div>
  );
}

export default App;
