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
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      navigate('/');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          ← Back to Recipes
        </button>
        <div style={styles.headerActions}>
          <button
            onClick={() => toggleFavorite(recipeId)}
            style={isFavorite(recipeId) ? styles.favoriteButtonActive : styles.favoriteButton}
            title={isFavorite(recipeId) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite(recipeId) ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
          </button>
          <button
            onClick={() => navigate(`/edit/${recipe.id}`)}
            style={styles.editButton}
          >
            Edit Recipe
          </button>
          <button
            onClick={handleDelete}
            style={styles.deleteButton}
          >
            Delete Recipe
          </button>
        </div>
      </div>
      
      <div style={styles.recipeCard}>
        <div style={styles.recipeHeader}>
          <div style={styles.recipeMeta}>
            <span style={styles.recipeCategory}>{recipe.category}</span>
            <span style={styles.recipeDifficulty}>{recipe.difficulty}</span>
            <span style={styles.prepTime}>⏱️ Prep: {recipe.prepTime} min</span>
            <span style={styles.cookTime}>🔥 Cook: {recipe.cookTime} min</span>
          </div>
        </div>
        
        <h1 style={styles.title}>{recipe.title}</h1>
        <p style={styles.description}>{recipe.description}</p>
        
        {recipe.tags && recipe.tags.length > 0 && (
          <div style={styles.tagsContainer}>
            {recipe.tags.map((tag, index) => (
              <span key={index} style={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div style={styles.sectionsContainer}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Ingredients</h3>
            <ul style={styles.list}>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} style={styles.listItem}>
                  <span style={styles.checkbox}>□</span> {ingredient}
                </li>
              ))}
            </ul>
          </div>
          
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Instructions</h3>
            <div style={styles.instructions}>
              {recipe.instructions.split('\n').map((step, index) => (
                <div key={index} style={styles.step}>
                  <span style={styles.stepNumber}>{index + 1}.</span>
                  <span style={styles.stepText}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.note}>
          <strong>💡 Tip:</strong> {isFavorite(recipeId) 
            ? 'This recipe is in your favorites! Add more favorites to get better recommendations.' 
            : 'Add this recipe to your favorites to save it for later and improve your recommendations!'}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  backButton: {
    padding: '12px 24px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  headerActions: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  favoriteButton: {
    padding: '12px 24px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  favoriteButtonActive: {
    padding: '12px 24px',
    backgroundColor: '#ffebee',
    color: '#e53935',
    border: '1px solid #ffcdd2',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  editButton: {
    padding: '12px 24px',
    backgroundColor: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  deleteButton: {
    padding: '12px 24px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  recipeCard: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '40px',
    backgroundColor: 'white',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
  recipeHeader: {
    marginBottom: '30px',
  },
  recipeMeta: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  recipeCategory: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  recipeDifficulty: {
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  prepTime: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  cookTime: {
    backgroundColor: '#fff3e0',
    color: '#f57c00',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  title: {
    color: '#333',
    fontSize: '2.5rem',
    marginTop: 0,
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '30px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '40px',
  },
  tag: {
    backgroundColor: '#f5f5f5',
    color: '#666',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
  },
  sectionsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '40px',
    marginBottom: '40px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    color: '#4CAF50',
    fontSize: '1.5rem',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '2px solid #4CAF50',
  },
  list: {
    paddingLeft: '0',
    listStyle: 'none',
  },
  listItem: {
    marginBottom: '12px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  checkbox: {
    color: '#4CAF50',
    fontSize: '18px',
    marginTop: '2px',
  },
  instructions: {
    fontSize: '16px',
    lineHeight: '1.8',
  },
  step: {
    marginBottom: '20px',
    display: 'flex',
    gap: '15px',
  },
  stepNumber: {
    backgroundColor: '#4CAF50',
    color: 'white',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: '600',
    flexShrink: 0,
  },
  stepText: {
    flex: 1,
    paddingTop: '5px',
  },
  note: {
    backgroundColor: '#e8f5e9',
    padding: '20px',
    borderRadius: '8px',
    color: '#2e7d32',
    fontSize: '15px',
    borderLeft: '4px solid #4CAF50',
  },
};

export default RecipeDetails;
