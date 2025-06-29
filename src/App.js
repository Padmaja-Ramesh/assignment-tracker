import React, { useState, useEffect } from 'react';
import AssignmentForm from './components/AssignmentForms';
import AssignmentList from './components/AssignmentList';
import CalendarView from './components/CalendarView';
import './styles.css';

function App() {
  const [assignments, setAssignments] = useState([]);
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('userEmail') || '');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    if (userEmail) {
      fetch(`/api/assignments?email=${userEmail}`)
        .then(res => res.json())
        .then(data => setAssignments(data))
        .catch(err => setAssignments([]));
    }
  }, [userEmail]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }
  }, [assignments, userEmail]);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);

  const addAssignment = (assignment) => {
    fetch('/api/assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...assignment, email: userEmail }),
    })
      .then(res => res.json())
      .then(newAssignment => setAssignments([...assignments, newAssignment]));
  };

  const updateStatus = (id, newStatus) => {
    // Find the assignment
    const assignment = assignments.find(a => (a._id || a.id) === id);
    if (!assignment) return;
    // Update in backend
    fetch(`/api/assignments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(res => res.json())
      .then(updated => {
        setAssignments(assignments.map(a => (a._id || a.id) === id ? updated : a));
      });
  };

  const deleteAssignment = (id) => {
    fetch(`/api/assignments/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          setAssignments(assignments.filter(a => (a._id || a.id) !== id));
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setUserEmail(emailInput.trim());
      setEmailInput('');
    }
  };

  const handleLogoff = () => {
    setUserEmail('');
    setAssignments([]);
    localStorage.removeItem('assignments');
  };

  if (!userEmail) {
    return (
      <div className="App">
        <h2>Login to Assignment Tracker</h2>
        <form onSubmit={handleLogin} style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Assignment Tracker</h2>
        <div>
          <span style={{ marginRight: '1rem' }}>Logged in as: {userEmail}</span>
          <button onClick={handleLogoff}>Logoff</button>
        </div>
      </div>
      <AssignmentForm addAssignment={addAssignment} />
      <AssignmentList assignments={assignments} updateStatus={updateStatus} onDeleteAssignment={deleteAssignment} />
      <CalendarView assignments={assignments} />
    </div>
  );
}

export default App;
