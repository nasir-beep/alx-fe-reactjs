import useRecipeStore from '../stores/recipeStore';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
  const favoriteRecipes = useRecipeStore((state) => state.getFavoriteRecipes());
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  if (favoriteRecipes.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>No Favorites Yet</h2>
        <p>Browse recipes and click the heart icon to add them here!</p>
        <Link to="/" style={styles.button}>
          Browse Recipes
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Favorites ({favoriteRecipes.length})</h2>
      
      <div style={styles.grid}>
        {favoriteRecipes.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.category}>{recipe.category}</span>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                style={styles.removeButton}
              >
                ❤️ Remove
              </button>
            </div>
            
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            
            <div style={styles.actions}>
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
  container: { padding: '20px', maxWidth: '1200px', margin: '0 auto' },
  title: { textAlign: 'center', marginBottom: '40px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
  card: { 
    border: '1px solid #ffebee', 
    borderRadius: '10px', 
    padding: '25px', 
    backgroundColor: '#fff5f5',
    boxShadow: '0 4px 8px rgba(255, 107, 107, 0.1)'
  },
  cardHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: '20px' 
  },
  category: { 
    backgroundColor: '#ff4444', 
    color: 'white', 
    padding: '6px 12px', 
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  removeButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  actions: { marginTop: '20px' },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    marginTop: '20px',
    fontSize: '16px'
  }
};

export default FavoritesList;
