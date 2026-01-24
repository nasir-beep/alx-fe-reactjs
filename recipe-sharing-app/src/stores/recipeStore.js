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
  
  // Favorites array
  favorites: [],
  
  // Search and filter states
  searchTerm: '',
  selectedCategory: 'All',
  selectedDifficulty: 'All',
  maxPrepTime: 120,
  
  // Recipe CRUD actions
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
  
  // Favorites actions
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      return { favorites: [...state.favorites, recipeId] };
    }
    return state;
  }),
  
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId)
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
  
  // FIXED: Get recommendations - simple implementation
  getRecommendations: () => {
    const { recipes, favorites } = get();
    
    // If no favorites, show first 3 recipes as popular
    if (favorites.length === 0) {
      return recipes.slice(0, 3);
    }
    
    // Get favorite categories
    const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id));
    const favoriteCategories = favoriteRecipes.map(recipe => recipe.category);
    
    // Find recipes in favorite categories that aren't already favorites
    const recommendations = recipes.filter(recipe => {
      if (favorites.includes(recipe.id)) return false; // Skip favorites
      return favoriteCategories.includes(recipe.category);
    });
    
    // If we need more recommendations, add some random ones
    if (recommendations.length < 3) {
      const remaining = recipes.filter(recipe => 
        !favorites.includes(recipe.id) && 
        !recommendations.some(r => r.id === recipe.id)
      );
      return [...recommendations, ...remaining.slice(0, 3 - recommendations.length)];
    }
    
    return recommendations.slice(0, 3);
  },
  
  // Search and filter actions
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
  
  // Computed filtered recipes
  getFilteredRecipes: () => {
    const { recipes, searchTerm, selectedCategory, selectedDifficulty, maxPrepTime } = get();
    
    return recipes.filter(recipe => {
      const matchesSearch = !searchTerm || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
      const matchesPrepTime = recipe.prepTime <= maxPrepTime;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrepTime;
    });
  },
  
  // Helper functions
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
