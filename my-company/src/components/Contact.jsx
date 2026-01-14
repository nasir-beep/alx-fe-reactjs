import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been received. We'll contact you at ${formData.email} soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

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
        textAlign: 'center'
      }}>
        Contact Us
      </h1>
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '50px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h2 style={{ color: '#2980b9', fontSize: '1.8rem', marginBottom: '20px' }}>
            Get In Touch
          </h2>
          <p style={{ color: '#7f8c8d', lineHeight: '1.6', marginBottom: '30px' }}>
            Have questions? We'd love to hear from you. Send us a message 
            and we'll respond as soon as possible.
          </p>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '10px' }}>
              📍 Our Office
            </h3>
            <p style={{ color: '#7f8c8d' }}>
              123 Tech Street, Silicon Valley<br />
              San Francisco, CA 94107<br />
              United States
            </p>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#2c3e50', fontSize: '1.2rem', marginBottom: '10px' }}>
              📞 Contact Info
            </h3>
            <p style={{ color: '#7f8c8d' }}>
              Phone: +1 (555) 123-4567<br />
              Email: info@techcorp.com<br />
              Hours: Mon-Fri 9am-6pm PST
            </p>
          </div>
        </div>
        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <form onSubmit={handleSubmit} style={{
            backgroundColor: '#f8f9fa',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: 'bold'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: 'bold'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: 'bold'
              }}>
                Message
              </label>
              <textarea
                name="message"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={e => e.target.style.backgroundColor = '#2980b9'}
              onMouseLeave={e => e.target.style.backgroundColor = '#3498db'}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
