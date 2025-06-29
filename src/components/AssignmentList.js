import React from 'react';

function AssignmentList({ assignments, updateStatus, onDeleteAssignment }) {
  return (
    <div>
      <h3>Assignment List</h3>
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id || assignment._id} style={{ marginBottom: '10px' }}>
              <strong>{assignment.title}</strong> <br />
              <small>Deadline: {assignment.deadline || assignment.dueDate}</small> <br />
              <small>Status: {assignment.status}</small> <br />
              <button
                onClick={() =>
                  updateStatus(
                    assignment.id || assignment._id,
                    assignment.status === 'Pending' ? 'Completed' : 'Pending'
                  )
                }
              >
                Mark as {assignment.status === 'Pending' ? 'Completed' : 'Pending'}
              </button>
              <button
                style={{ marginLeft: '10px', color: 'red' }}
                onClick={() => onDeleteAssignment(assignment.id || assignment._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignmentList;
