import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

function RecipeDetail() {
  const { id } = useParams();

  const recipe = recipesData.find(
    (item) => item.id === parseInt(id)
  );

  if (!recipe) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Recipe Not Found</h2>
        <Link to="/" className="text-blue-500 underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">
            {recipe.title}
          </h1>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              Ingredients
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">
              Cooking Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Back Button */}
          <Link
            to="/"
            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
