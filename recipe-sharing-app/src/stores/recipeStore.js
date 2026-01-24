import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      description: "A traditional Italian pasta dish with eggs, cheese, pancetta, and black pepper.",
      ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Black pepper", "Salt"],
      instructions: "1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.",
      prepTime: 15,
      cookTime: 20,
      difficulty: "Medium",
      category: "Italian"
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      description: "Quick and healthy stir-fried vegetables with soy sauce and ginger.",
      ingredients: ["Mixed vegetables", "Soy sauce", "Ginger", "Garlic", "Sesame oil", "Rice"],
      instructions: "1. Chop vegetables. 2. Heat oil. 3. Stir-fry vegetables. 4. Add sauce. 5. Serve with rice.",
      prepTime: 10,
      cookTime: 15,
      difficulty: "Easy",
      category: "Asian"
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      description: "Classic homemade chocolate chip cookies that are soft and chewy.",
      ingredients: ["Flour", "Butter", "Sugar", "Chocolate chips", "Eggs", "Vanilla extract", "Baking soda"],
      instructions: "1. Cream butter and sugar. 2. Add eggs and vanilla. 3. Mix in dry ingredients. 4. Add chocolate chips. 5. Bake at 350°F for 10-12 minutes.",
      prepTime: 15,
      cookTime: 12,
      difficulty: "Easy",
      category: "Dessert"
    }
  ],
  
  // Favorites array
  favorites: [],
  
  // Simple actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  
  toggleFavorite: (recipeId) => set((state) => {
    if (state.favorites.includes(recipeId)) {
      return { favorites: state.favorites.filter((id) => id !== recipeId) };
    } else {
      return { favorites: [...state.favorites, recipeId] };
    }
  }),
  
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  },
  
  // Simple recommendations - just returns first 3 recipes if no favorites
  // or recipes from favorite categories if there are favorites
  getRecommendations: () => {
    const { recipes, favorites } = get();
    
    if (favorites.length === 0) {
      return recipes.slice(0, 3);
    }
    
    // Get categories from favorites
    const favCategories = [];
    recipes.forEach(recipe => {
      if (favorites.includes(recipe.id) && !favCategories.includes(recipe.category)) {
        favCategories.push(recipe.category);
      }
    });
    
    // Find recipes in those categories that aren't already favorites
    const recommendations = recipes.filter(recipe => {
      if (favorites.includes(recipe.id)) return false;
      return favCategories.includes(recipe.category);
    });
    
    // Return recommendations or some default recipes
    return recommendations.length > 0 ? recommendations.slice(0, 3) : recipes.slice(0, 3);
  }
}));

export default useRecipeStore;
