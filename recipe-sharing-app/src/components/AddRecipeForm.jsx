import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../stores/recipeStore';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() && description.trim()) {
      addRecipe({ 
        id: Date.now(), 
        title, 
        description,
        ingredients: ingredients.filter(ing => ing.trim()),
        instructions,
        prepTime: 30,
        cookTime: 30,
        difficulty: 'Easy',
        category: 'Other',
        tags: []
      });
      navigate('/');
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <div style={styles.container}>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
          style={styles.input}
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          required
          rows={3}
          style={styles.textarea}
        />
        
        <div style={styles.ingredientsSection}>
          <label>Ingredients:</label>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              style={styles.input}
            />
          ))}
          <button type="button" onClick={addIngredient} style={styles.addButton}>
            + Add Ingredient
          </button>
        </div>
        
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions..."
          required
          rows={6}
          style={styles.textarea}
        />
        
        <button type="submit" style={styles.submitButton}>
          Add Recipe
        </button>
        <button type="button" onClick={() => navigate('/')} style={styles.cancelButton}>
          Cancel
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px' },
  textarea: { padding: '10px', fontSize: '16px', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical' },
  ingredientsSection: { display: 'flex', flexDirection: 'column', gap: '10px' },
  addButton: { padding: '10px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  submitButton: { padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' },
  cancelButton: { padding: '12px', backgroundColor: '#666', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }
};

export default AddRecipeForm;
