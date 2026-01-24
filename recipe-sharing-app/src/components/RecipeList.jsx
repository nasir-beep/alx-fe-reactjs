import { Link } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';
import SearchBar from './SearchBar';
import AdvancedFilters from './AdvancedFilters';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.getFilteredRecipes());
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const selectedCategory = useRecipeStore((state) => state.selectedCategory);
  const selectedDifficulty = useRecipeStore((state) => state.selectedDifficulty);
  const maxPrepTime = useRecipeStore((state) => state.maxPrepTime);
  
  const allRecipes = useRecipeStore((state) => state.recipes);
  const totalRecipes = allRecipes.length;
  const showingRecipes = filteredRecipes.length;

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Recipe Collection</h1>
      
      <SearchBar />
      <AdvancedFilters />
      
      <div style={styles.resultsInfo}>
        <div style={styles.resultsCount}>
          Showing {showingRecipes} of {totalRecipes} recipes
          {(searchTerm || selectedCategory !== 'All' || selectedDifficulty !== 'All' || maxPrepTime < 120) && (
            <span style={styles.filteredText}> (filtered)</span>
          )}
        </div>
        {showingRecipes === 0 && totalRecipes > 0 && (
          <div style={styles.noResults}>
            <p>No recipes match your current filters.</p>
            <button 
              onClick={() => useRecipeStore.getState().clearFilters()}
              style={styles.resetButton}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
      
      {showingRecipes === 0 && totalRecipes === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyMessage}>No recipes yet. Add your first recipe!</p>
          <Link to="/add" style={styles.addFirstButton}>
            Add Your First Recipe
          </Link>
        </div>
      ) : (
        <div style={styles.recipesGrid}>
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} style={styles.recipeCard}>
              <div style={styles.recipeHeader}>
                <div style={styles.recipeMeta}>
                  <span style={styles.recipeCategory}>{recipe.category}</span>
                  <span style={styles.recipeDifficulty}>{recipe.difficulty}</span>
                </div>
                <div style={styles.timeInfo}>
                  <span style={styles.timeBadge}>⏱️ {recipe.prepTime} min prep</span>
                </div>
              </div>
              
              <div style={styles.recipeContent}>
                <h3 style={styles.recipeTitle}>{recipe.title}</h3>
                <p style={styles.recipeDescription}>{recipe.description}</p>
                
                <div style={styles.ingredientsPreview}>
                  <strong>Ingredients:</strong>
                  <span style={styles.ingredientsText}>
                    {recipe.ingredients.slice(0, 3).join(', ')}
                    {recipe.ingredients.length > 3 && '...'}
                  </span>
                </div>
              </div>
              
              <div style={styles.buttonContainer}>
                <Link to={`/recipe/${recipe.id}`} style={styles.viewButton}>
                  View Details
                </Link>
                <Link to={`/edit/${recipe.id}`} style={styles.editButton}>
                  Edit
                </Link>
                <DeleteRecipeButton recipeId={recipe.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  mainTitle: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '2.5rem',
  },
  resultsInfo: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  resultsCount: {
    fontSize: '16px',
    color: '#555',
    fontWeight: '600',
  },
  filteredText: {
    color: '#4CAF50',
    fontWeight: 'normal',
  },
  noResults: {
    marginTop: '15px',
    padding: '20px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
  },
  emptyMessage: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  addFirstButton: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px',
    marginTop: '20px',
  },
  recipeCard: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  recipeCardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  recipeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  recipeMeta: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  recipeCategory: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  recipeDifficulty: {
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
  },
  timeInfo: {
    textAlign: 'right',
  },
  timeBadge: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  recipeContent: {
    flex: 1,
    marginBottom: '20px',
  },
  recipeTitle: {
    marginTop: 0,
    color: '#333',
    fontSize: '20px',
    marginBottom: '10px',
    lineHeight: '1.4',
  },
  recipeDescription: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '15px',
    flex: 1,
  },
  ingredientsPreview: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  ingredientsText: {
    display: 'block',
    fontSize: '13px',
    color: '#777',
    marginTop: '5px',
    lineHeight: '1.5',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  editButton: {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
};

// Add hover effect for recipe cards
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .recipe-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
`, styleSheet.cssRules.length);

export default RecipeList;
