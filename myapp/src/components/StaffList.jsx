// src/components/StaffList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffList = () => {
  const [staffData, setStaffData] = useState([]);
  const navigate = useNavigate();

  

  // Load data from localStorage when component mounts + when we come back from form
 useEffect(() => {
  const loadStaff = () => {
    try {
      const stored = localStorage.getItem('staff');
      let data = stored ? JSON.parse(stored) : [];

      // Safety: always renumber on load (in case data is corrupted or from old version)
      data = data.map((item, index) => ({
        ...item,
        id: index + 1
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

  // Re-number from 1 to n
  const renumbered = updated.map((item, index) => ({
    ...item,
    id: index + 1
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

  const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }

  let storedData = JSON.parse(localStorage.getItem('staff')) || [];

  if (isEdit) {
    // Update existing record (keep old id temporarily)
    storedData = storedData.map((staff) =>
      staff.id === parseInt(id)
        ? { ...formData, id: staff.id }   // preserve original id for now
        : staff
    );
  } else {
    // Add new → temporary id (will be renumbered later)
    const tempId = storedData.length + 1;
    storedData.push({ ...formData, id: tempId });
  }

  // IMPORTANT: renumber everything after change
  const renumbered = storedData.map((item, index) => ({
    ...item,
    id: index + 1
  }));

  localStorage.setItem('staff', JSON.stringify(renumbered));
  navigate('/staff');
};
  

  return (
    <div style={{ padding: '20px', maxWidth: '100vw',maxheight:'100vh', margin: '0 auto',position:'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <h2 style={{ margin: 0 }}>Staff List</h2>
        <button
          onClick={handleCreateNew}
          style={{
            padding: '10px 24px',
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            borderRadius: '8px',
            color: '#6c757d'
          }}
        >
          <h3>No staff members yet</h3>
          <p>Click "Create New Staff" to add your first team member.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'white',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <thead>
              <tr style={{ background: '#0d6efd', color: 'white' }}>
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
                <tr key={staff.id} style={rowStyle}>
                  <td style={tdStyle}>{staff.id}</td>
                  <td style={tdStyle}>{staff.name || '-'}</td>
                  <td style={tdStyle}>{staff.email || '-'}</td>
                  <td style={tdStyle}>{staff.age || '-'}</td>
                  <td style={tdStyle}>{staff.city || '-'}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        background: getRoleColor(staff.role),
                        color: 'black',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '0.9em'
                      }}
                    >
                      {staff.role || 'Not set'}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleEdit(staff.id)}
                      style={{ ...actionBtn, background: '#ffc107', marginRight: '8px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(staff.id)}
                      style={{ ...actionBtn, background: '#dc3545' }}
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
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: '600',
  borderBottom: '2px solid #dee2e6'
};

const tdStyle = {
  padding: '12px 16px',
  color: 'black',
  borderBottom: '1px solid #dee2e6'
};

const rowStyle = {
  '&:hover': {
    backgroundColor: '#f1f3f5'
  }
};

const actionBtn = {
  padding: '6px 12px',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer',
  transition: 'opacity 0.2s'
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
    Other: '#adb5bd'
  };
  return colors[role] || '#6c757d';
};

export default StaffList;