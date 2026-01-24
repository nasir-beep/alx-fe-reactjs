import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
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

import { useState } from 'react';

const styles = {
  container: {
    marginTop: '20px',
  },
  deleteButton: {
    padding: '12px 24px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
  },
  confirmDialog: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #dc3545',
  },
  confirmText: {
    marginBottom: '20px',
    color: '#333',
    fontSize: '16px',
  },
  confirmButtons: {
    display: 'flex',
    gap: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
  },
  confirmDeleteButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
  },
};

export default DeleteRecipeButton;
