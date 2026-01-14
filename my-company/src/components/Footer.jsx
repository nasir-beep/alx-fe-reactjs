function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '40px 20px',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        <div>
          <h3 style={{
            color: '#3498db',
            fontSize: '1.5rem',
            marginBottom: '20px'
          }}>
            TechCorp Solutions
          </h3>
          <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
            Leading the way in technology innovation since 1990. 
            We help businesses transform and succeed in the digital world.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#ecf0f1', marginBottom: '15px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: '0' }}>
            <li style={{ marginBottom: '10px' }}>
              <a href="/" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                Home
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/about" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                About Us
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/services" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                Services
              </a>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <a href="/contact" style={{ color: '#bdc3c7', textDecoration: 'none' }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: '#ecf0f1', marginBottom: '15px' }}>Contact Info</h4>
          <p style={{ color: '#bdc3c7', marginBottom: '10px' }}>
            📍 123 Tech Street, Silicon Valley
          </p>
          <p style={{ color: '#bdc3c7', marginBottom: '10px' }}>
            📞 +1 (555) 123-4567
          </p>
          <p style={{ color: '#bdc3c7', marginBottom: '10px' }}>
            ✉️ info@techcorp.com
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#ecf0f1', marginBottom: '15px' }}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{
              backgroundColor: '#34495e',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              📘
            </div>
            <div style={{
              backgroundColor: '#34495e',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              🐦
            </div>
            <div style={{
              backgroundColor: '#34495e',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}>
              🔗
            </div>
          </div>
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid #34495e',
        marginTop: '40px',
        paddingTop: '20px',
        textAlign: 'center',
        color: '#95a5a6'
      }}>
        <p>© 2024 TechCorp Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
