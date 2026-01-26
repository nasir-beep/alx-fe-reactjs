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
      category: "Italian"
    }
  ],
  
  favorites: [],
  searchTerm: '',
  selectedCategory: 'All',
  
  // Recipe CRUD actions
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  
  // ADDED: Update recipe function
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  // ADDED: Delete recipe function
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
    // Also remove from favorites if it was favorited
    favorites: state.favorites.filter((favId) => favId !== id)
  })),
  
  // Search and filter actions
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
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
  
  isFavorite: (recipeId) => get().favorites.includes(recipeId),
  
  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  },
  
  // Simple recommendations - returns first 3 recipes
  getRecommendations: () => {
    const { recipes } = get();
    return recipes.slice(0, 3);
  },
  
  getFilteredRecipes: () => {
    const { recipes, searchTerm, selectedCategory } = get();
    
    return recipes.filter(recipe => {
      const matchesSearch = !searchTerm || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  },
  
  getCategories: () => {
    const { recipes } = get();
    const categories = ['All', ...new Set(recipes.map(recipe => recipe.category))];
    return categories;
  }
}));

export default useRecipeStore;
