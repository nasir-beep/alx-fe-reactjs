// Quick test to verify store functions exist
import useRecipeStore from './stores/recipeStore';

console.log('Testing store functions...');

// Get the store instance
const store = useRecipeStore.getState();

// Test 1: Check if getRecommendations exists
if (typeof store.getRecommendations === 'function') {
  console.log('✅ getRecommendations function exists');
  const recommendations = store.getRecommendations();
  console.log('Recommendations:', recommendations);
} else {
  console.log('❌ getRecommendations function missing');
}

// Test 2: Check if toggleFavorite exists
if (typeof store.toggleFavorite === 'function') {
  console.log('✅ toggleFavorite function exists');
} else {
  console.log('❌ toggleFavorite function missing');
}

// Test 3: Check if getFavoriteRecipes exists
if (typeof store.getFavoriteRecipes === 'function') {
  console.log('✅ getFavoriteRecipes function exists');
  const favorites = store.getFavoriteRecipes();
  console.log('Favorites:', favorites);
} else {
  console.log('❌ getFavoriteRecipes function missing');
}

console.log('Store test complete!');
