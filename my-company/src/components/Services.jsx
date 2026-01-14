function Services() {
  const services = [
    {
      id: 1,
      title: "Technology Consulting",
      description: "Expert guidance on technology strategy and implementation.",
      icon: "💻",
      color: "#3498db"
    },
    {
      id: 2,
      title: "Market Analysis",
      description: "Comprehensive market research and competitive analysis.",
      icon: "📊",
      color: "#2ecc71"
    },
    {
      id: 3,
      title: "Product Development",
      description: "End-to-end product development from concept to launch.",
      icon: "🚀",
      color: "#e74c3c"
    },
    {
      id: 4,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns for maximum ROI.",
      icon: "📱",
      color: "#9b59b6"
    },
    {
      id: 5,
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure services.",
      icon: "☁️",
      color: "#f39c12"
    },
    {
      id: 6,
      title: "Cybersecurity",
      description: "Protecting your digital assets with advanced security.",
      icon: "🛡️",
      color: "#1abc9c"
    }
  ];

  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#f8f9fa',
      minHeight: '70vh'
    }}>
      <h1 style={{
        color: '#2c3e50',
        fontSize: '2.8rem',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        Our Services
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {services.map(service => (
          <div 
            key={service.id}
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              borderTop: `5px solid ${service.color}`
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>
              {service.icon}
            </div>
            <h3 style={{
              color: service.color,
              fontSize: '1.5rem',
              marginBottom: '15px'
            }}>
              {service.title}
            </h3>
            <p style={{
              color: '#7f8c8d',
              lineHeight: '1.6'
            }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
