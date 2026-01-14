function MainContent() {
  return (
    <main style={{ 
      padding: '30px',
      minHeight: '400px',
      backgroundColor: '#ecf0f1',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '10px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ 
          color: '#2c3e50',
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '20px'
        }}>Welcome to My Travel Blog</h2>
        
        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.7',
          color: '#34495e',
          textAlign: 'justify',
          marginBottom: '20px'
        }}>
          Exploring cities around the world is one of life's greatest adventures. 
          Each city has its own unique charm, culture, and stories to tell.
        </p>
        
        <p style={{
          fontSize: '1.2rem',
          color: 'darkblue',
          fontWeight: 'bold',
          textAlign: 'center',
          fontStyle: 'italic',
          backgroundColor: '#f8f9fa',
          padding: '15px',
          borderRadius: '8px',
          borderLeft: '4px solid darkblue',
          margin: '20px 0'
        }}>
          I love to visit New York, Paris, and Tokyo.
        </p>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginTop: '30px'
        }}>
          <div style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            width: '200px',
            textAlign: 'center',
            margin: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Paris</h3>
            <p>City of Light</p>
          </div>
          
          <div style={{
            backgroundColor: '#2ecc71',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            width: '200px',
            textAlign: 'center',
            margin: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>Tokyo</h3>
            <p>Vibrant Metropolis</p>
          </div>
          
          <div style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            width: '200px',
            textAlign: 'center',
            margin: '10px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>New York</h3>
            <p>The Big Apple</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
