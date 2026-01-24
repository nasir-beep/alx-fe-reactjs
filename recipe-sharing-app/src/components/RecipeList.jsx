import { Link } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import RecommendationsList from './RecommendationsList';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.getFilteredRecipes());
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);
  
  const allRecipes = useRecipeStore((state) => state.recipes);
  const totalRecipes = allRecipes.length;
  const showingRecipes = filteredRecipes.length;

  return (
    <div style={styles.container}>
      <h1 style={styles.mainTitle}>Recipe Collection</h1>
      
      <div style={styles.resultsInfo}>
        <div style={styles.resultsCount}>
          Showing {showingRecipes} of {totalRecipes} recipes
        </div>
      </div>
      
      {showingRecipes === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyMessage}>No recipes found.</p>
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
                <button
                  onClick={() => toggleFavorite(recipe.id)}
                  style={isFavorite(recipe.id) ? styles.favoriteButtonActive : styles.favoriteButton}
                  title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
              
              <h3 style={styles.recipeTitle}>{recipe.title}</h3>
              <p style={styles.recipeDescription}>{recipe.description}</p>
              
              <div style={styles.recipeDetails}>
                <span style={styles.detailItem}>⏱️ {recipe.prepTime} min</span>
                <span style={styles.detailItem}>🍽️ {recipe.ingredients.length} ingredients</span>
              </div>
              
              <div style={styles.buttonContainer}>
                <Link to={`/recipe/${recipe.id}`} style={styles.viewButton}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add Recommendations to the main page */}
      <RecommendationsList />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  mainTitle: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
    fontSize: '2.2rem',
  },
  resultsInfo: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  resultsCount: {
    fontSize: '1rem',
    color: '#555',
    fontWeight: '600',
  },
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
  },
  emptyMessage: {
    fontSize: '1.2rem',
    color: '#666',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px',
  },
  recipeCard: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '25px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  recipeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  recipeMeta: {
    display: 'flex',
    gap: '10px',
  },
  recipeCategory: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  recipeDifficulty: {
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  favoriteButton: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  favoriteButtonActive: {
    background: 'none',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffebee',
    color: '#e53935',
  },
  recipeTitle: {
    color: '#333',
    fontSize: '1.4rem',
    margin: '0 0 15px 0',
  },
  recipeDescription: {
    color: '#666',
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  recipeDetails: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  detailItem: {
    color: '#777',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  buttonContainer: {
    marginTop: '15px',
  },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
  },
};

export default RecipeList;
