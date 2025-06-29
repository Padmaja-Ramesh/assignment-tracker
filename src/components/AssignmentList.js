import React from 'react';

function AssignmentList({ assignments, updateStatus }) {
  return (
    <div>
      <h3>Assignment List</h3>
      {assignments.length === 0 ? (
        <p>No assignments yet.</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id} style={{ marginBottom: '10px' }}>
              <strong>{assignment.title}</strong> <br />
              <small>Deadline: {assignment.deadline}</small> <br />
              <small>Status: {assignment.status}</small> <br />
              <button
                onClick={() =>
                  updateStatus(
                    assignment.id,
                    assignment.status === 'Pending' ? 'Completed' : 'Pending'
                  )
                }
              >
                Mark as {assignment.status === 'Pending' ? 'Completed' : 'Pending'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignmentList;
