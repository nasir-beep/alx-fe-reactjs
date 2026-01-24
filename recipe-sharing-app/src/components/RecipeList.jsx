import { Link } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={styles.container}>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p style={styles.emptyMessage}>No recipes yet. Add your first recipe!</p>
      ) : (
        <div style={styles.recipesGrid}>
          {recipes.map((recipe) => (
            <div key={recipe.id} style={styles.recipeCard}>
              <div style={styles.recipeContent}>
                <h3 style={styles.recipeTitle}>{recipe.title}</h3>
                <p style={styles.recipeDescription}>{recipe.description}</p>
                <div style={styles.recipeInfo}>
                  <span style={styles.infoItem}>
                    🧂 {recipe.ingredients?.length || 0} ingredients
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
    maxWidth: '1200px',
    margin: '0 auto',
  },
  emptyMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    padding: '40px',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '20px',
  },
  recipeCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  recipeContent: {
    flex: 1,
  },
  recipeTitle: {
    marginTop: 0,
    color: '#333',
    fontSize: '20px',
    marginBottom: '10px',
  },
  recipeDescription: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
    marginBottom: '15px',
    flex: 1,
  },
  recipeInfo: {
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #eee',
  },
  infoItem: {
    fontSize: '12px',
    color: '#888',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
  },
  editButton: {
    display: 'block',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '14px',
  },
};

export default RecipeList;
