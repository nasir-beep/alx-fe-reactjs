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
    },
    {
      id: 5,
      title: "Caesar Salad",
      description: "Fresh Caesar salad with homemade dressing and croutons.",
      ingredients: ["Romaine lettuce", "Parmesan cheese", "Croutons", "Anchovy paste", "Garlic", "Lemon juice", "Olive oil"],
      instructions: "1. Wash and chop lettuce. 2. Make dressing. 3. Toss lettuce with dressing. 4. Add croutons and cheese.",
      prepTime: 15,
      cookTime: 0,
      difficulty: "Easy",
      category: "Salad",
      tags: ["salad", "healthy", "vegetarian", "lunch", "quick"]
    },
    {
      id: 6,
      title: "Beef Tacos",
      description: "Flavorful beef tacos with fresh toppings and homemade seasoning.",
      ingredients: ["Ground beef", "Taco shells", "Tomatoes", "Lettuce", "Cheese", "Sour cream", "Taco seasoning"],
      instructions: "1. Cook beef with seasoning. 2. Prepare toppings. 3. Heat taco shells. 4. Assemble tacos.",
      prepTime: 20,
      cookTime: 15,
      difficulty: "Easy",
      category: "Mexican",
      tags: ["mexican", "beef", "dinner", "family", "spicy"]
    }
  ],
  
  // User favorites state
  favorites: [],
  
  // Search and filter states
  searchTerm: '',
  selectedCategory: 'All',
  selectedDifficulty: 'All',
  maxPrepTime: 120,
  
  // Actions
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
  
  // Check if recipe is favorited
  isFavorite: (recipeId) => {
    return get().favorites.includes(recipeId);
  },
  
  // Get favorite recipes
  getFavoriteRecipes: () => {
    const { recipes, favorites } = get();
    return recipes.filter((recipe) => favorites.includes(recipe.id));
  },
  
  // Generate personalized recommendations based on favorites
  getRecommendations: () => {
    const { recipes, favorites } = get();
    
    if (favorites.length === 0) {
      // If no favorites, show popular recipes (based on tags)
      const popularTags = ["dinner", "quick", "healthy"];
      return recipes
        .filter((recipe) => 
          recipe.tags?.some((tag) => popularTags.includes(tag))
        )
        .slice(0, 4);
    }
    
    // Get favorite recipes
    const favoriteRecipes = recipes.filter((recipe) => 
      favorites.includes(recipe.id)
    );
    
    // Extract tags from favorite recipes
    const favoriteTags = favoriteRecipes.flatMap((recipe) => recipe.tags || []);
    
    // Count tag frequency
    const tagFrequency = {};
    favoriteTags.forEach((tag) => {
      tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
    });
    
    // Sort tags by frequency
    const sortedTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag)
      .slice(0, 5);
    
    // Find recipes with matching tags that aren't already favorites
    const recommendations = recipes
      .filter((recipe) => {
        if (favorites.includes(recipe.id)) return false;
        
        // Score based on tag matches
        const recipeTags = recipe.tags || [];
        const matchScore = recipeTags.reduce((score, tag) => {
          return score + (sortedTags.includes(tag) ? 1 : 0);
        }, 0);
        
        return matchScore > 0;
      })
      .sort((a, b) => {
        // Calculate scores for sorting
        const aTags = a.tags || [];
        const bTags = b.tags || [];
        
        const aScore = aTags.reduce((score, tag) => 
          score + (sortedTags.includes(tag) ? 1 : 0), 0
        );
        const bScore = bTags.reduce((score, tag) => 
          score + (sortedTags.includes(tag) ? 1 : 0), 0
        );
        
        return bScore - aScore;
      })
      .slice(0, 6);
    
    // If not enough recommendations, add some popular ones
    if (recommendations.length < 4) {
      const popularRecipes = recipes
        .filter((recipe) => 
          !favorites.includes(recipe.id) && 
          !recommendations.some((rec) => rec.id === recipe.id)
        )
        .slice(0, 4 - recommendations.length);
      
      return [...recommendations, ...popularRecipes];
    }
    
    return recommendations;
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
      // Search term filter
      const matchesSearch = !searchTerm || 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (recipe.tags && recipe.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      // Category filter
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      
      // Difficulty filter
      const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
      
      // Prep time filter
      const matchesPrepTime = recipe.prepTime <= maxPrepTime;
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrepTime;
    });
  },
  
  // Get unique categories for filter dropdown
  getCategories: () => {
    const { recipes } = get();
    const categories = ['All', ...new Set(recipes.map(recipe => recipe.category))];
    return categories;
  },
  
  // Get unique difficulties for filter dropdown
  getDifficulties: () => {
    const { recipes } = get();
    const difficulties = ['All', ...new Set(recipes.map(recipe => recipe.difficulty))];
    return difficulties;
  }
}));

export default useRecipeStore;
