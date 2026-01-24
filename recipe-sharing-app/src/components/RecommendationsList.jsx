import { Link } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.getRecommendations());
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const isFavorite = useRecipeStore((state) => state.isFavorite);
  const favoritesCount = useRecipeStore((state) => state.favorites.length);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          <span style={styles.sparkleIcon}>✨</span> 
          {favoritesCount > 0 ? 'Recommended For You' : 'Popular Recipes'}
        </h2>
        <p style={styles.subtitle}>
          {favoritesCount > 0 
            ? 'Based on your favorite recipes and taste preferences'
            : 'Try these popular recipes to get started!'}
        </p>
      </div>
      
      <div style={styles.recipesGrid}>
        {recommendations.map((recipe) => (
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
            
            <div style={styles.recipeContent}>
              <h3 style={styles.recipeTitle}>{recipe.title}</h3>
              <p style={styles.recipeDescription}>{recipe.description}</p>
              
              <div style={styles.matchBadge}>
                <span style={styles.matchText}>
                  {favoritesCount > 0 ? '🎯 Good match for you!' : '🔥 Popular choice'}
                </span>
              </div>
              
              <div style={styles.tagsContainer}>
                {recipe.tags?.slice(0, 4).map((tag, index) => (
                  <span key={index} style={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              <Link to={`/recipe/${recipe.id}`} style={styles.viewButton}>
                Try This Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {favoritesCount === 0 && (
        <div style={styles.tipContainer}>
          <p style={styles.tipText}>
            <strong>💡 Tip:</strong> Add recipes to your favorites to get more personalized recommendations!
          </p>
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
    marginTop: '50px',
    marginBottom: '50px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  sparkleIcon: {
    fontSize: '2.5rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
  },
  recipeCard: {
    border: '1px solid #e3f2fd',
    borderRadius: '12px',
    padding: '25px',
    backgroundColor: '#f8fdff',
    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all 0.3s ease',
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
    flexWrap: 'wrap',
  },
  recipeCategory: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  recipeDifficulty: {
    backgroundColor: '#f3e5f5',
    color: '#7b1fa2',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  favoriteButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    transition: 'all 0.2s ease',
  },
  favoriteButtonActive: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffebee',
    transition: 'all 0.2s ease',
  },
  recipeContent: {
    flex: 1,
    marginBottom: '25px',
  },
  recipeTitle: {
    marginTop: 0,
    color: '#333',
    fontSize: '20px',
    marginBottom: '15px',
  },
  recipeDescription: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  matchBadge: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '20px',
    display: 'inline-block',
  },
  matchText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '15px',
  },
  tag: {
    backgroundColor: '#fff',
    color: '#1976d2',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '11px',
    border: '1px solid #bbdefb',
  },
  buttonContainer: {
    marginTop: '15px',
  },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '14px',
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  viewButtonHover: {
    backgroundColor: '#1976d2',
    transform: 'translateY(-2px)',
  },
  tipContainer: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '12px',
    textAlign: 'center',
  },
  tipText: {
    color: '#856404',
    fontSize: '15px',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default RecommendationsList;
