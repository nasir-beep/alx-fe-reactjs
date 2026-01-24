import useRecipeStore from '../stores/recipeStore';
import { Link } from 'react-router-dom';
import RecommendationsList from './RecommendationsList';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.getFilteredRecipes());
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Recipe Collection</h1>
      
      <div style={styles.recipesGrid}>
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.category}>{recipe.category}</span>
              <button
                onClick={() => toggleFavorite(recipe.id)}
                style={isFavorite(recipe.id) ? styles.favActive : styles.fav}
                title={isFavorite(recipe.id) ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite(recipe.id) ? '❤️' : '🤍'}
              </button>
            </div>
            
            <h3 style={styles.recipeTitle}>{recipe.title}</h3>
            <p style={styles.description}>{recipe.description}</p>
            
            <div style={styles.stats}>
              <span>⏱️ {recipe.prepTime} min</span>
              <span>👨‍🍳 {recipe.difficulty}</span>
            </div>
            
            <Link to={`/recipe/${recipe.id}`} style={styles.button}>
              View Recipe
            </Link>
          </div>
        ))}
      </div>
      
      <RecommendationsList />
    </div>
  );
};

const styles = {
  container: { 
    padding: '20px', 
    maxWidth: '1200px', 
    margin: '0 auto' 
  },
  title: { 
    textAlign: 'center', 
    marginBottom: '40px',
    color: '#333'
  },
  recipesGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '25px' 
  },
  card: { 
    border: '1px solid #ddd', 
    borderRadius: '10px', 
    padding: '25px', 
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  cardHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: '20px' 
  },
  category: { 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    padding: '6px 12px', 
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  },
  fav: { 
    background: 'none', 
    border: 'none', 
    fontSize: '28px', 
    cursor: 'pointer',
    padding: '5px'
  },
  favActive: { 
    background: 'none', 
    border: 'none', 
    fontSize: '28px', 
    cursor: 'pointer', 
    color: 'red',
    padding: '5px'
  },
  recipeTitle: {
    margin: '0 0 15px 0',
    color: '#333',
    fontSize: '20px'
  },
  description: {
    color: '#666',
    lineHeight: '1.5',
    marginBottom: '20px'
  },
  stats: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    margin: '15px 0 20px 0', 
    color: '#666',
    paddingTop: '15px',
    borderTop: '1px solid #eee'
  },
  button: { 
    display: 'block', 
    textAlign: 'center', 
    padding: '12px', 
    backgroundColor: '#4CAF50', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600'
  }
};

export default RecipeList;
