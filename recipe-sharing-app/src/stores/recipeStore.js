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
      category: "Italian",
      tags: ["pasta", "italian", "dinner", "classic"]
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
      category: "Asian",
      tags: ["vegetarian", "healthy", "quick", "asian", "dinner"]
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
      category: "Dessert",
      tags: ["dessert", "cookies", "baking", "sweet", "snack"]
    },
    {
      id: 4,
      title: "Chicken Alfredo Pasta",
      description: "Creamy Alfredo pasta with grilled chicken breast.",
      ingredients: ["Fettuccine", "Chicken breast", "Heavy cream", "Parmesan cheese", "Garlic", "Butter"],
      instructions: "1. Cook pasta. 2. Grill chicken. 3. Make Alfredo sauce. 4. Combine all ingredients.",
      prepTime: 20,
      cookTime: 25,
      difficulty: "Medium",
      category: "Italian",
      tags: ["pasta", "chicken", "creamy", "dinner", "italian"]
    }
  ],
  
  // NEW: Favorites array to store favorite recipe IDs
  favorites: [],
  
  // NEW: Recommendations array (we'll generate these dynamically)
  recommendations: [],
  
  // Search and filter states (existing)
  searchTerm: '',
  selectedCategory: 'All',
  selectedDifficulty: 'All',
  maxPrepTime: 120,
  
  // Existing recipe actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id)
  })),
  
  // ========== NEW FAVORITES ACTIONS ==========
  
  // Add a recipe to favorites
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state; // Already in favorites
  }),
  
  // Remove a recipe from favorites
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId)
  })),
  
  // Toggle favorite status (add if not in favorites, remove if already in favorites)
  toggleFavorite: (recipeId) => set((state) => {
    if (state.favorites.includes(recipeId)) {
      // Remove from favorites
      return { favorites: state.favorites.filter((id) => id !== recipeId) };
    } else {
      // Add to favorites
      return { favorites: [...state.favorites, recipeId] };
    }
  }),
  
  // Check if a recipe is in favorites
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Get all favorite recipes (full recipe objects)
  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  },
  
  // ========== NEW RECOMMENDATIONS SYSTEM ==========
  
  // Generate recommendations based on user's favorites
  generateRecommendations: () => set((state) => {
    const { recipes, favorites } = state;
    
    // If no favorites, recommend popular recipes
    if (favorites.length === 0) {
      const popularRecipes = recipes.filter(recipe => 
        recipe.tags?.includes("popular") || 
        recipe.tags?.includes("dinner") ||
        recipe.difficulty === "Easy"
      );
      return { recommendations: popularRecipes.slice(0, 3) };
    }
    
    // Get favorite recipes
    const favoriteRecipes = recipes.filter((recipe) => 
      favorites.includes(recipe.id)
    );
    
    // Extract categories and tags from favorites
    const favoriteCategories = favoriteRecipes.map(recipe => recipe.category);
    const favoriteTags = favoriteRecipes.flatMap(recipe => recipe.tags || []);
    
    // Find recipes that match favorite categories or tags but aren't already favorites
    const recommended = recipes.filter(recipe => {
      // Skip if already in favorites
      if (favorites.includes(recipe.id)) return false;
      
      // Check if recipe matches favorite categories
      const categoryMatch = favoriteCategories.includes(recipe.category);
      
      // Check if recipe has any favorite tags
      const tagMatch = recipe.tags?.some(tag => favoriteTags.includes(tag));
      
      // Recommend if matches category OR tags
      return categoryMatch || tagMatch;
    });
    
    // If we don't have enough recommendations, add some random ones
    if (recommended.length < 3) {
      const remainingRecipes = recipes.filter(recipe => 
        !favorites.includes(recipe.id) && 
        !recommended.some(rec => rec.id === recipe.id)
      );
      const additional = remainingRecipes.slice(0, 3 - recommended.length);
      return { recommendations: [...recommended, ...additional] };
    }
    
    return { recommendations: recommended.slice(0, 3) };
  }),
  
  // Get current recommendations
  getRecommendations: () => {
    return get().recommendations;
  },
  
  // Existing search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  setMaxPrepTime: (time) => set({ maxPrepTime: time }),
  clearFilters: () => set({
    searchTerm: '',
    selectedCategory: 'All',
    selectedDifficulty: 'All',
    maxPrepTime: 120
  }),
  
  // Existing computed filtered recipes
  getFilteredRecipes: () => {
    const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxPrepTime } = get();
    
    return recipes.filter(recipe => {
      const matchesSearch = !searchTerm || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
      const matchesPrepTime = recipe.prepTime <= maxPrepTime;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrepTime;
    });
  },
  
  // Existing helper functions
  getCategories: () => {
    const { recipes } = get();
    const categories = ['All', ...new Set(recipes.map(recipe => recipe.category))];
    return categories;
  },
  
  getDifficulties: () => {
    const { recipes } = get();
    const difficulties = ['All', ...new Set(recipes.map(recipe => recipe.difficulty))];
    return difficulties;
  }
}));

export default useRecipeStore;
