import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
 
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        // Mock API call
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          setSubmitStatus('success');
          // Reset form after successful submission
          setFormData({ username: '', email: '', password: '' });
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        setSubmitStatus('error');
        console.error('Error submitting form:', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Registration Form (Controlled Components)</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter username"
          />
          {errors.username && <span style={styles.error}>{errors.username}</span>}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter email"
          />
          {errors.email && <span style={styles.error}>{errors.email}</span>}
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Enter password"
          />
          {errors.password && <span style={styles.error}>{errors.password}</span>}
        </div>

        <button type="submit" style={styles.button}>Register</button>
        
        {submitStatus === 'success' && (
          <div style={styles.success}>Registration successful!</div>
        )}
        
        {submitStatus === 'error' && (
          <div style={styles.error}>Registration failed. Please try again.</div>
        )}
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    fontSize: '14px'
  },
  success: {
    color: 'green',
    fontSize: '14px'
  }
};

export default RegistrationForm;
