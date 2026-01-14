function UserProfile(props) {
  return (
    <div style={{ 
      border: '1px solid gray', 
      padding: '10px', 
      margin: '10px',
      borderRadius: '5px',
      backgroundColor: '#f5f5f5',
      maxWidth: '400px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      <h2 style={{ 
        color: 'blue',  
        fontSize: '1.5rem',
        marginBottom: '8px'
      }}>{props.name}</h2>
      
      <p style={{ 
        fontSize: '1rem',
        margin: '5px 0'
      }}>
        Age: <span style={{ 
          fontWeight: 'bold', 
          color: '#333'
        }}>{props.age}</span>
      </p>
      
      <p style={{ 
        fontSize: '1rem',
        color: '#555',
        lineHeight: '1.5'
      }}>
        Bio: {props.bio}
      </p>
    </div>
  );
}

export default UserProfile;