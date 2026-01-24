import { useEffect } from 'react';
import useRecipeStore from '../stores/recipeStore';
import { Link } from 'react-router-dom';

const RecommendationsList = () => {
  // Get recommendations and favorites from store
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore((state) => state.generateRecommendations);
  const favorites = useRecipeStore((state) => state.favorites);
  
  // Generate recommendations only when component mounts or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites.length]); // Only depend on favorites length, not the generateRecommendations function

  // Don't show if no recommendations
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>
          {favorites.length > 0 ? '✨ Recommended For You' : '🔥 Popular Recipes'}
        </h2>
        <p style={styles.subtitle}>
          {favorites.length > 0 
            ? 'Based on your favorite recipes and preferences'
            : 'Try these popular recipes to get started!'}
        </p>
      </div>
      
      <div style={styles.recipesGrid}>
        {recommendations.map((recipe) => (
          <div key={recipe.id} style={styles.recipeCard}>
            <div style={styles.recipeMeta}>
              <span style={styles.recipeCategory}>{recipe.category}</span>
              <span style={styles.recipeDifficulty}>{recipe.difficulty}</span>
            </div>
            
            <h3 style={styles.recipeTitle}>{recipe.title}</h3>
            <p style={styles.recipeDescription}>{recipe.description}</p>
            
            <div style={styles.recommendationReason}>
              {favorites.length > 0 ? (
                <span style={styles.reasonText}>
                  🎯 Matches your interests
                </span>
              ) : (
                <span style={styles.reasonText}>
                  ⭐ Popular choice
                </span>
              )}
            </div>
            
            <div style={styles.buttonContainer}>
              <Link to={`/recipe/${recipe.id}`} style={styles.viewButton}>
                Try This Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {favorites.length === 0 && (
        <div style={styles.tipBox}>
          <p style={styles.tipText}>
            <strong>💡 Tip:</strong> Add recipes to your favorites to get personalized recommendations!
          </p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    marginTop: '50px',
    marginBottom: '30px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    color: '#333',
    fontSize: '1.8rem',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '25px',
  },
  recipeCard: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  },
  recipeMeta: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
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
  recipeTitle: {
    color: '#333',
    fontSize: '1.2rem',
    margin: '0 0 10px 0',
  },
  recipeDescription: {
    color: '#666',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  recommendationReason: {
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#e8f5e9',
    borderRadius: '6px',
  },
  reasonText: {
    color: '#2e7d32',
    fontSize: '14px',
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: '10px',
  },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#2196f3',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600',
  },
  tipBox: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    textAlign: 'center',
  },
  tipText: {
    color: '#856404',
    margin: 0,
    fontSize: '1rem',
  },
};

export default RecommendationsList;
