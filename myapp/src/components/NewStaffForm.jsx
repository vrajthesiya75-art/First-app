// src/components/NewStaffForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const NewStaffForm = ({ isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    city: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit && id) {
      const storedData = JSON.parse(localStorage.getItem('staff')) || [];
      const staffToEdit = storedData.find((staff) => staff.id === parseInt(id));
      if (staffToEdit) {
        setFormData(staffToEdit);
      }
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? value.replace(/\D/g, '') : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.age.trim()) { newErrors.age = 'Age is required';} 
    else if (isNaN(formData.age) || Number(formData.age) <= 0) {
    newErrors.age = 'Enter a valid age';}

    if (!formData.city.trim()) {newErrors.city = 'City is required';}
    if (!formData.role) newErrors.role = 'Please select a role';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = () => {
  console.log("handleSubmit called");                   

  if (!validateForm()) {
  return; 
}
  console.log("Form is valid. Current formData:", formData);

  let storedData = JSON.parse(localStorage.getItem('staff')) || [];
  console.log("Before save - existing data:", storedData);

  if (isEdit) {
    storedData = storedData.map((staff) =>
      staff.id === parseInt(id)
        ? { ...formData, id: parseInt(id) }
        : staff
    );  
  } else {
    const newId = storedData.length > 0
      ? Math.max(...storedData.map((s) => s.id)) + 1
      : 1;
    storedData.push({ ...formData, id: newId });
  }

  console.log("Data prepared for save:", storedData);

  localStorage.setItem('staff', JSON.stringify(storedData));
  console.log("SAVE EXECUTED → localStorage.setItem called");

  // Check immediately after save y
  const afterSave = localStorage.getItem('staff');
  console.log("localStorage right after save:", afterSave ? JSON.parse(afterSave) : "EMPTY");

  navigate('/staff');
};

  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      city: '',
      role: ''
    });
    setErrors({});
  };

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '10px 12px',
    border: `1px solid ${hasError ? '#dc3545' : '#ced4da'}`,
    borderRadius: '6px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: hasError ? '0 0 0 3px rgba(255, 2, 27, 0.25)' : 'none',
    ':focus': {
      borderColor: hasError ? '#dc3545' : '#0d6efd',
      boxShadow: hasError
        ? '0 0 0 3px rgba(220, 53, 69, 0.25)'
        : '0 0 0 3px rgba(13, 110, 253, 0.25)'
    }
  });

  return (
    <div style={{
      padding: '32px 24px',
      maxWidth: '560px',
      margin: '40px auto',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e9ecef'
    }}>
      <h2 style={{
        margin: '0 0 32px 0',
        fontSize: '28px',
        color: '#212529',
        textAlign: 'center'
      }}>
        {isEdit ? 'Edit Staff Member' : 'Add New Staff Member'}
      </h2>

      <form noValidate>
        {/* Name */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>
            Name <span style={{ color: '#dc3545' }}>*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            style={inputStyle(errors.name)}
          />
          {errors.name && <div style={errorStyle}>{errors.name}</div>}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>
            Email <span style={{ color: '#dc3545' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@company.com"
            style={inputStyle(errors.email)}
          />
          {errors.email && <div style={errorStyle}>{errors.email}</div>}
        </div>

        {/* Age */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="25"
            maxLength={2}
            style={inputStyle(errors.age)}
          />
           {errors.age && <div style={errorStyle}>{errors.age}</div>}
        </div>

        {/* City */}
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ahmedabad"
            style={inputStyle(errors.city)}
          />
           {errors.city && <div style={errorStyle}>{errors.city}</div>}
        </div>

        {/* Role */}
        <div style={{ marginBottom: '32px' }}>
          <label style={labelStyle}>
            Role <span style={{ color: '#dc3545' }}>*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{
              ...inputStyle(errors.role),
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23333' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '12px'
            }}
          >
            <option value="">-- Select Role --</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Tester">Tester / QA</option>
            <option value="Manager">Project Manager</option>
            <option value="HR">HR</option>
            <option value="Admin">Administrator</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          {errors.role && <div style={errorStyle}>{errors.role}</div>}
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center'
        }}>
          <button
            type="button"
            onClick={handleClear}
            style={clearButtonStyle}
          >
            Clear Form
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            style={submitButtonStyle}
          >
            {isEdit ? 'Update Staff' : 'Add Staff'}
          </button>
        </div>
      </form>
    </div>
  );
};

/* Reusable styles */
const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: '500',
  color: '#495057',
  fontSize: '15px'
};

const errorStyle = {
  color: '#dc3545',
  fontSize: '13px',
  marginTop: '6px'
};

const clearButtonStyle = {
  padding: '12px 28px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

const submitButtonStyle = {
  padding: '12px 36px',
  backgroundColor: '#0d6efd',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s',
  boxShadow: '0 2px 8px rgba(13, 110, 253, 0.25)'
};

// Add hover effects (inline limitation workaround)
Object.assign(clearButtonStyle, { ':hover': { backgroundColor: '#5a6268' } });
Object.assign(submitButtonStyle, { ':hover': { backgroundColor: '#0b5ed7', transform: 'translateY(-1px)' } });

export default NewStaffForm;