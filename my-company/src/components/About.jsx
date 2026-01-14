function About() {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: 'white',
      minHeight: '70vh'
    }}>
      <h1 style={{
        color: '#2c3e50',
        fontSize: '2.8rem',
        marginBottom: '30px',
        textAlign: 'center',
        borderBottom: '3px solid #3498db',
        paddingBottom: '15px'
      }}>
        About Us
      </h1>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'center'
      }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ color: '#2980b9', fontSize: '1.8rem', marginBottom: '20px' }}>
            Our Story
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#34495e',
            marginBottom: '20px'
          }}>
            Founded in 1990, TechCorp Solutions has been at the forefront of 
            technological innovation. What started as a small consulting firm 
            has grown into a global leader in technology solutions.
          </p>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#34495e',
            marginBottom: '20px'
          }}>
            We specialize in various fields including technology consulting, 
            digital marketing, and business transformation. Our team of over 
            500 experts works tirelessly to deliver exceptional value to our 
            clients worldwide.
          </p>
        </div>
        
        <div style={{
          flex: '1',
          minWidth: '300px',
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '10px',
          border: '1px solid #e0e0e0'
        }}>
          <h2 style={{ color: '#2980b9', fontSize: '1.8rem', marginBottom: '20px' }}>
            Our Values
          </h2>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#e8f4fc',
              borderRadius: '5px',
              borderLeft: '4px solid #3498db'
            }}>
              <strong>Innovation:</strong> Constantly pushing boundaries
            </li>
            <li style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#e8f6f3',
              borderRadius: '5px',
              borderLeft: '4px solid #2ecc71'
            }}>
              <strong>Integrity:</strong> Honest and transparent in all dealings
            </li>
            <li style={{
              padding: '15px',
              marginBottom: '10px',
              backgroundColor: '#f4ecf7',
              borderRadius: '5px',
              borderLeft: '4px solid #9b59b6'
            }}>
              <strong>Excellence:</strong> Delivering the highest quality
            </li>
            <li style={{
              padding: '15px',
              backgroundColor: '#fef9e7',
              borderRadius: '5px',
              borderLeft: '4px solid #f39c12'
            }}>
              <strong>Collaboration:</strong> Working together for success
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
