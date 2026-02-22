import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/FormikForm';
import './App.css';

function App() {
  const [showFormik, setShowFormik] = useState(false);

  return (
    <div className="App">
      <header style={headerStyle}>
        <h1>Form Handling in React</h1>
        <button 
          onClick={() => setShowFormik(!showFormik)}
          style={toggleButtonStyle}
        >
          Switch to {showFormik ? 'Controlled Components' : 'Formik'} Form
        </button>
      </header>
      
      <main>
        {showFormik ? <FormikForm /> : <RegistrationForm />}
      </main>
    </div>
  );
}

const headerStyle = {
  textAlign: 'center',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #dee2e6'
};

const toggleButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#6c757d',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px'
};

export default App;
