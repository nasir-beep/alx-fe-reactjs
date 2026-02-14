import { useState } from "react";
import { Link } from "react-router-dom";

function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState({});

  // Separate validate function
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim() || ingredients.split(",").length < 2)
      newErrors.ingredients = "Enter at least 2 ingredients, separated by commas";
    if (!instructions.trim()) newErrors.instructions = "Instructions are required";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Normally, submit to backend or state
      console.log("New Recipe Submitted:", { title, ingredients, instructions });
      alert("Recipe submitted successfully!");

      // Reset form
      setTitle("");
      setIngredients("");
      setInstructions("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add a New Recipe 🍲</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Recipe Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Recipe Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="E.g., Spaghetti Carbonara"
            />
            {errors.title && <p className="text-red-500 mt-1 text-sm">{errors.title}</p>}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Ingredients (comma separated)
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              rows={3}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.ingredients ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="E.g., 200g spaghetti, 2 eggs, 100g bacon"
            />
            {errors.ingredients && (
              <p className="text-red-500 mt-1 text-sm">{errors.ingredients}</p>
            )}
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Preparation Steps</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={5}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.instructions ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Describe the cooking steps..."
            />
            {errors.instructions && (
              <p className="text-red-500 mt-1 text-sm">{errors.instructions}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Submit Recipe
            </button>

            <Link to="/" className="text-blue-500 hover:underline font-medium">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipeForm;
