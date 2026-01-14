import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#2c3e50',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: '0',
      zIndex: '1000'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          backgroundColor: '#3498db',
          color: 'white',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          TC
        </div>
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}
        >
          TechCorp
        </Link>
      </div>
      
      <div style={{
        display: 'flex',
        gap: '30px'
      }}>
        <Link 
          to="/" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            padding: '8px 16px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#34495e'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          Home
        </Link>
        <Link 
          to="/about" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            padding: '8px 16px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#34495e'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          About
        </Link>
        <Link 
          to="/services" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            padding: '8px 16px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#34495e'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          Services
        </Link>
        <Link 
          to="/contact" 
          style={{
            color: 'white',
            textDecoration: 'none',
            fontSize: '1.1rem',
            padding: '8px 16px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = '#34495e'}
          onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
