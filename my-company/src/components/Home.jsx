function Home() {
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{
        color: '#2c3e50',
        fontSize: '3rem',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
      }}>
        Welcome to TechCorp Solutions
      </h1>
      <p style={{
        fontSize: '1.2rem',
        color: '#34495e',
        maxWidth: '800px',
        lineHeight: '1.6',
        marginBottom: '30px'
      }}>
        We are dedicated to delivering excellence in all our services. 
        With over 30 years of experience, we help businesses transform 
        and thrive in the digital age.
      </p>
      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{
          backgroundColor: '#3498db',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          🚀 Innovative Solutions
        </div>
        <div style={{
          backgroundColor: '#2ecc71',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          💼 Expert Team
        </div>
        <div style={{
          backgroundColor: '#9b59b6',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '8px',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          🌍 Global Reach
        </div>
      </div>
    </div>
  );
}

export default Home;
