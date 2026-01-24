import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    // Remove from favorites first if it's there
    removeFavorite(recipeId);
    // Then delete the recipe
    deleteRecipe(recipeId);
    if (onDelete) {
      onDelete();
    }
    navigate('/');
  };

  return (
    <div style={styles.container}>
      {showConfirm ? (
        <div style={styles.confirmDialog}>
          <p style={styles.confirmText}>Are you sure you want to delete this recipe?</p>
          <div style={styles.confirmButtons}>
            <button
              onClick={() => setShowConfirm(false)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={styles.confirmDeleteButton}
            >
              Delete Recipe
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowConfirm(true)}
          style={styles.deleteButton}
        >
          Delete Recipe
        </button>
      )}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '10px',
  },
  deleteButton: {
    padding: '14px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    transition: 'all 0.2s ease',
  },
  confirmDialog: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #dc3545',
  },
  confirmText: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '16px',
    textAlign: 'center',
  },
  confirmButtons: {
    display: 'flex',
    gap: '15px',
  },
  cancelButton: {
    padding: '12px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
  },
  confirmDeleteButton: {
    padding: '12px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    flex: 1,
  },
};

export default DeleteRecipeButton;
