import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
});

const FormikForm = () => {
  const [submitStatus, setSubmitStatus] = useState(null);

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitStatus(null);
    
    try {
      
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        resetForm();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    }
    
    setSubmitting(false);
  };

  return (
    <div style={styles.container}>
      <h2>User Registration Form (Formik)</h2>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="username" style={styles.label}>Username:</label>
              <Field
                type="text"
                name="username"
                style={styles.input}
                placeholder="Enter username"
              />
              <ErrorMessage name="username" component="div" style={styles.error} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email:</label>
              <Field
                type="email"
                name="email"
                style={styles.input}
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" style={styles.error} />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password:</label>
              <Field
                type="password"
                name="password"
                style={styles.input}
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" style={styles.error} />
            </div>

            <button 
              type="submit" 
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
            
            {submitStatus === 'success' && (
              <div style={styles.success}>Registration successful!</div>
            )}
            
            {submitStatus === 'error' && (
              <div style={styles.error}>Registration failed. Please try again.</div>
            )}
          </Form>
        )}
      </Formik>
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
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    ':disabled': {
      backgroundColor: '#6c757d',
      cursor: 'not-allowed'
    }
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

export default FormikForm;
