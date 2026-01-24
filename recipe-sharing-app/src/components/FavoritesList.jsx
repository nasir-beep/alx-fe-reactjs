import useRecipeStore from '../stores/recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  // Get favorite recipes from the store
  const favoriteRecipes = useRecipeStore((state) => state.getFavoriteRecipes());
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favoritesCount = useRecipeStore((state) => state.favorites.length);

  // If no favorites, show a friendly message
  if (favoritesCount === 0) {
    return (
      <div style={styles.emptyState}>
        <h2 style={styles.emptyTitle}>No Favorites Yet</h2>
        <p style={styles.emptyMessage}>
          You haven't added any recipes to your favorites yet.
          Browse recipes and click the heart icon ❤️ to add them here!
        </p>
        <Link to="/" style={styles.browseButton}>
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>My Favorite Recipes</h2>
        <p style={styles.subtitle}>
          You have {favoritesCount} favorite {favoritesCount === 1 ? 'recipe' : 'recipes'}
        </p>
      </div>
      
      <div style={styles.recipesGrid}>
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={styles.recipeCard}>
            <div style={styles.recipeHeader}>
              <div style={styles.recipeMeta}>
                <span style={styles.recipeCategory}>{recipe.category}</span>
                <span style={styles.recipeDifficulty}>{recipe.difficulty}</span>
              </div>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                style={styles.removeButton}
                title="Remove from favorites"
              >
                ❤️ Remove
              </button>
            </div>
            
            <h3 style={styles.recipeTitle}>{recipe.title}</h3>
            <p style={styles.recipeDescription}>{recipe.description}</p>
            
            <div style={styles.recipeDetails}>
              <span style={styles.detailItem}>⏱️ {recipe.prepTime} min prep</span>
              <span style={styles.detailItem}>👨‍🍳 {recipe.difficulty}</span>
            </div>
            
            <div style={styles.buttonContainer}>
              <Link to={`/recipe/${recipe.id}`} style={styles.viewButton}>
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    margin: '40px auto',
    maxWidth: '600px',
  },
  emptyTitle: {
    color: '#333',
    fontSize: '1.8rem',
    marginBottom: '15px',
  },
  emptyMessage: {
    color: '#666',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  browseButton: {
    display: 'inline-block',
    padding: '12px 30px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
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
    backgroundColor: '#ffebee',
    color: '#e53935',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  recipeDifficulty: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  removeButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
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
    gap: '15px',
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

export default FavoritesList;
