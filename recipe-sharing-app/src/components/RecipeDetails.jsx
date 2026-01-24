import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  const recipes = useRecipeStore((state) => state.recipes);
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
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
      
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{recipe.title}</h1>
          <button
            onClick={() => toggleFavorite(recipeId)}
            style={isFavorite(recipeId) ? styles.favActive : styles.fav}
          >
            {isFavorite(recipeId) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
        </div>
        
        <p style={styles.description}>{recipe.description}</p>
        
        <div style={styles.meta}>
          <span style={styles.metaItem}>Category: {recipe.category}</span>
          <span style={styles.metaItem}>Difficulty: {recipe.difficulty}</span>
          <span style={styles.metaItem}>Prep Time: {recipe.prepTime} min</span>
          <span style={styles.metaItem}>Cook Time: {recipe.cookTime} min</span>
        </div>
        
        <div style={styles.section}>
          <h3>Ingredients</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div style={styles.section}>
          <h3>Instructions</h3>
          <p style={styles.instructions}>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  backButton: { 
    padding: '10px 20px', 
    backgroundColor: '#666', 
    color: 'white', 
    border: 'none', 
    borderRadius: '4px', 
    cursor: 'pointer',
    marginBottom: '20px'
  },
  card: { 
    border: '1px solid #ddd', 
    borderRadius: '10px', 
    padding: '30px', 
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: { margin: 0, fontSize: '28px' },
  fav: {
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  favActive: {
    padding: '10px 20px',
    backgroundColor: '#ffebee',
    color: '#ff4444',
    border: '1px solid #ffcdd2',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '30px'
  },
  meta: {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  metaItem: {
    backgroundColor: '#f5f5f5',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  section: {
    marginBottom: '30px'
  },
  instructions: {
    fontSize: '16px',
    lineHeight: '1.8',
    whiteSpace: 'pre-line'
  }
};

export default RecipeDetails;
