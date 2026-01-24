import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipeId = parseInt(id);
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === recipeId)
  );
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [''],
    instructions: '',
    prepTime: 30,
    cookTime: 30,
    difficulty: 'Easy',
    category: 'Italian'
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients || [''],
        instructions: recipe.instructions || '',
        prepTime: recipe.prepTime || 30,
        cookTime: recipe.cookTime || 30,
        difficulty: recipe.difficulty || 'Easy',
        category: recipe.category || 'Italian'
      });
    }
  }, [recipe]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      updateRecipe(recipeId, formData);
      navigate(`/recipe/${recipeId}`);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({ 
      ...prev, 
      ingredients: [...prev.ingredients, ''] 
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const categories = ['Italian', 'Asian', 'Dessert', 'Mexican', 'American', 'Mediterranean', 'Vegetarian', 'Vegan'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

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
      <button onClick={() => navigate(`/recipe/${recipeId}`)} style={styles.backButton}>
        ← Back to Recipe
      </button>
      
      <h2 style={styles.title}>Edit Recipe</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Recipe Title"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              style={styles.select}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGrid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Prep Time (minutes)</label>
            <input
              type="number"
              min="5"
              max="240"
              value={formData.prepTime}
              onChange={(e) => handleChange('prepTime', parseInt(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Cook Time (minutes)</label>
            <input
              type="number"
              min="5"
              max="240"
              value={formData.cookTime}
              onChange={(e) => handleChange('cookTime', parseInt(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={(e) => handleChange('difficulty', e.target.value)}
              style={styles.select}
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Brief description of the recipe"
            required
            rows={3}
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Ingredients *</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} style={styles.ingredientRow}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient ${index + 1}`}
                required={index === 0}
                style={styles.ingredientInput}
              />
              {formData.ingredients.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            style={styles.addButton}
          >
            + Add Ingredient
          </button>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Instructions *</label>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleChange('instructions', e.target.value)}
            placeholder="Step-by-step instructions..."
            required
            rows={8}
            style={styles.textarea}
          />
        </div>

        <div style={styles.buttonContainer}>
          <button 
            type="button" 
            onClick={() => navigate(`/recipe/${recipeId}`)}
            style={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" style={styles.submitButton}>
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

// Use the same styles as AddRecipeForm
const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
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
  title: {
    color: '#333',
    marginBottom: '30px',
    fontSize: '28px',
  },
  form: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '25px',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
  },
  select: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    resize: 'vertical',
  },
  ingredientRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    alignItems: 'center',
  },
  ingredientInput: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
  },
  removeButton: {
    padding: '12px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  addButton: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: '30px',
  },
  cancelButton: {
    padding: '14px 28px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: 1,
  },
  submitButton: {
    padding: '14px 28px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    flex: 1,
  },
};

export default EditRecipeForm;
