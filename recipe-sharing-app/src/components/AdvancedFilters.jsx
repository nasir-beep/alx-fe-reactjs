import useRecipeStore from '../stores/recipeStore';

const AdvancedFilters = () => {
  const selectedCategory = useRecipeStore((state) => state.selectedCategory);
  const selectedDifficulty = useRecipeStore((state) => state.selectedDifficulty);
  const maxPrepTime = useRecipeStore((state) => state.maxPrepTime);
  const setSelectedCategory = useRecipeStore((state) => state.setSelectedCategory);
  const setSelectedDifficulty = useRecipeStore((state) => state.setSelectedDifficulty);
  const setMaxPrepTime = useRecipeStore((state) => state.setMaxPrepTime);
  const clearFilters = useRecipeStore((state) => state.clearFilters);
  
  const categories = useRecipeStore((state) => state.getCategories());
  const difficulties = useRecipeStore((state) => state.getDifficulties());
  
  const handlePrepTimeChange = (e) => {
    setMaxPrepTime(parseInt(e.target.value));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Advanced Filters</h3>
        <button onClick={clearFilters} style={styles.clearButton}>
          Clear All
        </button>
      </div>
      
      <div style={styles.filtersGrid}>
        <div style={styles.filterGroup}>
          <label style={styles.label}>Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.label}>Difficulty</label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={styles.select}
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.filterGroup}>
          <label style={styles.label}>
            Max Prep Time: {maxPrepTime} minutes
          </label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={maxPrepTime}
            onChange={handlePrepTimeChange}
            style={styles.slider}
          />
          <div style={styles.timeRange}>
            <span>5 min</span>
            <span>120 min</span>
          </div>
        </div>
      </div>
      
      <div style={styles.activeFilters}>
        <span style={styles.activeFiltersTitle}>Active Filters:</span>
        {selectedCategory !== 'All' && (
          <span style={styles.filterTag}>
            Category: {selectedCategory}
          </span>
        )}
        {selectedDifficulty !== 'All' && (
          <span style={styles.filterTag}>
            Difficulty: {selectedDifficulty}
          </span>
        )}
        {maxPrepTime < 120 && (
          <span style={styles.filterTag}>
            Max Prep: {maxPrepTime}min
          </span>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '25px',
    marginBottom: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  title: {
    margin: 0,
    color: '#333',
    fontSize: '20px',
  },
  clearButton: {
    padding: '8px 16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.2s ease',
  },
  clearButtonHover: {
    backgroundColor: '#5a6268',
  },
  filtersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '25px',
  },
  filterGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontWeight: '600',
    color: '#555',
    fontSize: '14px',
  },
  select: {
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  slider: {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: '#ddd',
    outline: 'none',
    marginTop: '5px',
  },
  timeRange: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#777',
    marginTop: '5px',
  },
  activeFilters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    alignItems: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
  },
  activeFiltersTitle: {
    fontWeight: '600',
    color: '#555',
    fontSize: '14px',
    marginRight: '10px',
  },
  filterTag: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
};

export default AdvancedFilters;
