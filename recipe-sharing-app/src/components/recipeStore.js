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
  
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe] 
  })),
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
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
  
  // Add this function back
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
  
  getRecommendations: () => {
    const { recipes, favorites } = get();
    
    if (favorites.length === 0) {
      return recipes.slice(0, 3);
    }
    
    const favCategories = [];
    recipes.forEach(recipe => {
      if (favorites.includes(recipe.id) && !favCategories.includes(recipe.category)) {
        favCategories.push(recipe.category);
      }
    });
    
    const recommendations = recipes.filter(recipe => {
      if (favorites.includes(recipe.id)) return false;
      return favCategories.includes(recipe.category);
    });
    
    return recommendations.length > 0 ? recommendations.slice(0, 3) : recipes.slice(0, 3);
  },
  
  getCategories: () => {
    const { recipes } = get();
    const categories = ['All', ...new Set(recipes.map(recipe => recipe.category))];
    return categories;
  }
}));

export default useRecipeStore;
