import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );

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
        <h1 style={styles.title}>{recipe.title}</h1>
        <p style={styles.description}>{recipe.description}</p>
        
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Ingredients</h3>
          <ul style={styles.list}>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index} style={styles.listItem}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Instructions</h3>
          <p style={styles.instructions}>{recipe.instructions}</p>
        </div>
        
        <div style={styles.buttonContainer}>
          <button 
            onClick={() => navigate(`/edit/${recipe.id}`)}
            style={styles.editButton}
          >
            Edit Recipe
          </button>
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
  title: {
    marginTop: 0,
    color: '#333',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '10px',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    color: '#4CAF50',
    marginBottom: '15px',
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
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
  },
  editButton: {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: 1,
  },
};

export default RecipeDetails;
