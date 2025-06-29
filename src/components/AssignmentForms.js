import React, { useState } from 'react';

function AssignmentForm({ addAssignment }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && deadline) {
      addAssignment({ title, description, deadline, status: 'Pending' });
      setTitle('');
      setDescription('');
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Assignment</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Add Assignment</button>
    </form>
  );
}

export default AssignmentForm;
