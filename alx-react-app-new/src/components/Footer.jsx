function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#2c3e50', 
      color: 'white',
      textAlign: 'center',
      padding: '25px',
      marginTop: '30px',
      fontFamily: 'Arial, sans-serif',
      borderTop: '5px solid #3498db'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <p style={{ 
          fontSize: '1.2rem',
          marginBottom: '15px',
          fontWeight: 'bold'
        }}>
          © 2024 My Travel Blog - All Rights Reserved
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '15px'
        }}>
          <a href="#" style={{
            color: '#3498db',
            textDecoration: 'none',
            fontSize: '1rem'
          }}>Home</a>
          
          <a href="#" style={{
            color: '#3498db',
            textDecoration: 'none',
            fontSize: '1rem'
          }}>About</a>
          
          <a href="#" style={{
            color: '#3498db',
            textDecoration: 'none',
            fontSize: '1rem'
          }}>Contact</a>
          
          <a href="#" style={{
            color: '#3498db',
            textDecoration: 'none',
            fontSize: '1rem'
          }}>Privacy Policy</a>
        </div>
        
        <p style={{
          fontSize: '0.9rem',
          color: '#bdc3c7',
          marginTop: '20px',
          borderTop: '1px solid #34495e',
          paddingTop: '15px'
        }}>
          The world is a book, and those who do not travel read only a page. - Saint Augustine
        </p>
      </div>
    </footer>
  );
}

export default Footer;
