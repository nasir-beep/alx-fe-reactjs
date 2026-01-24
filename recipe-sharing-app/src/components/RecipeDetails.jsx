import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  if (!recipe) {
    return (
      <div style={styles.container}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          Back to Recipes
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Back to Recipes
      </button>
      
      <div style={styles.recipeCard}>
        <div style={styles.recipeHeader}>
          <h1 style={styles.title}>{recipe.title}</h1>
          <button
            onClick={() => toggleFavorite(recipeId)}
            style={isFavorite(recipeId) ? styles.favoriteButtonActive : styles.favoriteButton}
            title={isFavorite(recipeId) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(recipeId) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
        
        <p style={styles.description}>{recipe.description}</p>
        
        <div style={styles.recipeMeta}>
          <span style={styles.metaItem}>Category: {recipe.category}</span>
          <span style={styles.metaItem}>Difficulty: {recipe.difficulty}</span>
          <span style={styles.metaItem}>Prep Time: {recipe.prepTime} min</span>
          <span style={styles.metaItem}>Cook Time: {recipe.cookTime} min</span>
        </div>
        
        <div style={styles.section}>
          <h3>Ingredients</h3>
          <ul style={styles.list}>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} style={styles.listItem}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div style={styles.section}>
          <h3>Instructions</h3>
          <p style={styles.instructions}>{recipe.instructions}</p>
        </div>
        
        <div style={styles.note}>
          <strong>Note:</strong> {isFavorite(recipeId) 
            ? 'This recipe is saved in your favorites!' 
            : 'Add this recipe to favorites to save it for later.'}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px',
  },
  recipeCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '30px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  recipeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  favoriteButton: {
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  favoriteButtonActive: {
    padding: '10px 20px',
    backgroundColor: '#ffebee',
    color: '#e53935',
    border: '1px solid #ffcdd2',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  recipeMeta: {
    display: 'flex',
    gap: '20px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  metaItem: {
    backgroundColor: '#f5f5f5',
    padding: '8px 16px',
    borderRadius: '4px',
    fontSize: '14px',
    color: '#555',
  },
  section: {
    marginBottom: '30px',
  },
  list: {
    paddingLeft: '20px',
  },
  listItem: {
    marginBottom: '8px',
    fontSize: '16px',
  },
  instructions: {
    fontSize: '16px',
    lineHeight: '1.8',
    whiteSpace: 'pre-line',
  },
  note: {
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#e8f5e9',
    borderRadius: '4px',
    color: '#2e7d32',
  },
};

export default RecipeDetails;
