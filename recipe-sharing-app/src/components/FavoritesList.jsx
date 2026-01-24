import { Link } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const FavoritesList = () => {
  const favoriteRecipes = useRecipeStore((state) => state.getFavoriteRecipes());
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favoritesCount = useRecipeStore((state) => state.favorites.length);

  if (favoritesCount === 0) {
    return (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>⭐</div>
        <h3 style={styles.emptyTitle}>No Favorites Yet</h3>
        <p style={styles.emptyText}>
          You haven't added any recipes to your favorites. Browse recipes and click the heart icon to add them here!
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
        <h2 style={styles.title}>
          <span style={styles.heartIcon}>❤️</span> My Favorites ({favoritesCount})
        </h2>
        <p style={styles.subtitle}>Recipes you've loved and saved for later</p>
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
                style={styles.favoriteButtonActive}
                title="Remove from favorites"
              >
                ❤️
              </button>
            </div>
            
            <div style={styles.recipeContent}>
              <h3 style={styles.recipeTitle}>{recipe.title}</h3>
              <p style={styles.recipeDescription}>{recipe.description}</p>
              
              <div style={styles.tagsContainer}>
                {recipe.tags?.slice(0, 3).map((tag, index) => (
                  <span key={index} style={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div style={styles.recipeStats}>
                <span style={styles.stat}>
                  ⏱️ {recipe.prepTime} min
                </span>
                <span style={styles.stat}>
                  🍽️ {recipe.ingredients.length} ingredients
                </span>
              </div>
            </div>
            
            <div style={styles.buttonContainer}>
              <Link to={`/recipe/${recipe.id}`} style={styles.viewButton}>
                View Recipe
              </Link>
              <DeleteRecipeButton recipeId={recipe.id} />
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
    maxWidth: '1400px',
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  heartIcon: {
    fontSize: '2.5rem',
  },
  subtitle: {
    color: '#666',
    fontSize: '1.1rem',
  },
  recipesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '30px',
  },
  recipeCard: {
    border: '1px solid #ffebee',
    borderRadius: '12px',
    padding: '25px',
    backgroundColor: '#fff5f5',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.1)',
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
    backgroundColor: '#ffebee',
    color: '#e53935',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  recipeDifficulty: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
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
  favoriteButtonActiveHover: {
    backgroundColor: '#ffcdd2',
    transform: 'scale(1.1)',
  },
  recipeContent: {
    flex: 1,
    marginBottom: '25px',
  },
  recipeTitle: {
    marginTop: 0,
    color: '#333',
    fontSize: '22px',
    marginBottom: '15px',
  },
  recipeDescription: {
    color: '#666',
    fontSize: '15px',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '20px',
  },
  tag: {
    backgroundColor: '#fff',
    color: '#e53935',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    border: '1px solid #ffcdd2',
  },
  recipeStats: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
    paddingTop: '15px',
    borderTop: '1px solid #ffcdd2',
  },
  stat: {
    fontSize: '13px',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  viewButton: {
    display: 'block',
    textAlign: 'center',
    padding: '14px',
    backgroundColor: '#e53935',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  viewButtonHover: {
    backgroundColor: '#d32f2f',
    transform: 'translateY(-2px)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '80px 20px',
    backgroundColor: '#fff5f5',
    borderRadius: '16px',
    border: '2px dashed #ffcdd2',
    margin: '40px auto',
    maxWidth: '600px',
  },
  emptyIcon: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  emptyTitle: {
    color: '#333',
    fontSize: '24px',
    marginBottom: '15px',
  },
  emptyText: {
    color: '#666',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '30px',
    maxWidth: '400px',
    margin: '0 auto 30px',
  },
  browseButton: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  browseButtonHover: {
    backgroundColor: '#45a049',
    transform: 'translateY(-2px)',
  },
};

export default FavoritesList;
