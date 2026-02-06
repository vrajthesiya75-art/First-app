// src/components/StaffList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStaff = () => {
      try {
        const stored = localStorage.getItem('staff');
        let data = stored ? JSON.parse(stored) : [];

        // Renumber IDs on load (consecutive 1,2,3...)
        data = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));

        setStaffData(data);
      } catch (err) {
        console.error('Failed to load staff:', err);
        localStorage.removeItem('staff');
        setStaffData([]);
      }
    };

    loadStaff();

    window.addEventListener('storage', loadStaff);
    return () => window.removeEventListener('storage', loadStaff);
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    const updated = staffData.filter((staff) => staff.id !== id);

    // Renumber remaining rows
    const renumbered = updated.map((item, index) => ({
      ...item,
      id: index + 1,
    }));

    setStaffData(renumbered);
    localStorage.setItem('staff', JSON.stringify(renumbered));
  };

  const handleEdit = (id) => {
    navigate(`/edit-staff/${id}`);
  };

  const handleCreateNew = () => {
    navigate('/new-staff');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '90vw', margin: '0 auto', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <h2 style={{ margin: 0, color: 'black' }}>Staff List</h2>
        <button
          onClick={handleCreateNew}
          style={{
            padding: '10px 24px',
            backgroundColor: '#0d6efd',
            color: 'white',
            border: '3px solid black',
            borderRadius: '12px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          + Create New Staff
        </button>
      </div>

      {staffData.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            color: '#6c757d',
            border: '2px dashed #ccc',
          }}
        >
          <h3>No staff members yet</h3>
          <p>Click "Create New Staff" to add your first team member.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '90%',
              margin: 'auto',
              borderCollapse: 'collapse',
              background: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid #000',
            }}
          >
            <thead >
              <tr
                style={{
                  background: '#0d6efd',
                  border : '2px solid black',
                  color: 'white',
                }}
              >
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Age</th>
                <th style={thStyle}>City</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staffData.map((staff) => (
                <tr
                  key={staff.id}
                  style={{
                    border: '2px solid #000', // ← bottom border on every row
                  }}
                >
                  <td style={tdStyle}>{staff.id}</td>
                  <td style={tdStyle}>{staff.name || '-'}</td>
                  <td style={tdStyle}>{staff.email || '-'}</td>
                  <td style={tdStyle}>{staff.age || '-'}</td>
                  <td style={tdStyle}>{staff.city || '-'}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background: getRoleColor(staff.role),
                        color: 'white',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.9em',
                        fontWeight: '500',
                        display: 'inline-block',
                        minWidth: '100px',
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }}
                    >
                      {staff.role || 'Not set'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(staff.id)}
                      style={{
                        ...actionBtn,
                        background: '#ffc107',
                        color: '#212529',
                        border: '2px solid black',
                        borderRadius: '12px',
                        marginRight: '10px',
                        padding: '8px 16px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      style={{
                        ...actionBtn,
                        background: '#dc3545',
                        border: '2px solid black',
                        borderRadius: '12px',
                        padding: '8px 16px',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Shared styles
const thStyle = {
  padding: '14px 16px',
  textAlign: 'left',
  fontWeight: '700',
  fontSize: '1rem',
};

const tdStyle = {
  padding: '14px 16px',
  color: 'black',
  fontSize: '0.95rem',
};

const actionBtn = {
  padding: '8px 16px',
  border: 'none',
  fontSize: '14px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
};

const getRoleColor = (role) => {
  const colors = {
    Developer: '#198754',
    Designer: '#6f42c1',
    'Tester / QA': '#fd7e14',
    'Project Manager': '#0dcaf0',
    HR: '#d63384',
    Administrator: '#6610f2',
    Intern: '#6c757d',
    Other: '#adb5bd',
  };
  return colors[role] || '#6c757d';
};

export default StaffList;