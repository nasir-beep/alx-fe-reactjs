import useRecipeStore from '../stores/recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const clearFilters = useRecipeStore((state) => state.clearFilters);
  
  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchWrapper}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes by title, description, or ingredients..."
          style={styles.input}
        />
        {searchTerm && (
          <button onClick={handleClear} style={styles.clearButton}>
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={styles.searchInfo}>
          <span>Searching for: "{searchTerm}"</span>
          <button onClick={clearFilters} style={styles.clearAllButton}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginBottom: '25px',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
  },
  input: {
    width: '100%',
    padding: '15px 50px 15px 20px',
    fontSize: '16px',
    border: '2px solid #4CAF50',
    borderRadius: '50px',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  clearButton: {
    position: 'absolute',
    right: '15px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#999',
    cursor: 'pointer',
    padding: '5px',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease',
  },
  clearButtonHover: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  searchInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '10px auto 0',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    fontSize: '14px',
  },
  clearAllButton: {
    padding: '5px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
};

export default SearchBar;
