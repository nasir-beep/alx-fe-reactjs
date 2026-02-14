import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import recipesData from "../data.json";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load mock recipe data
    setRecipes(recipesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-0">
          🍽️ Recipe Sharing Platform
        </h1>

        {/* Add New Recipe Button */}
        <Link
          to="/add-recipe"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          ➕ Add New Recipe
        </Link>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Recipe Image */}
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 text-sm">{recipe.summary}</p>

              {/* View Recipe Link */}
              <Link
                to={`/recipe/${recipe.id}`}
                className="mt-4 inline-block text-blue-500 font-medium hover:underline"
              >
                View Recipe →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
