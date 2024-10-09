<template>
  <div class="recipes container mt-5">
    <h2>Discover Recipes</h2>

    <div v-if="loading">Loading recipes...</div>
    <p v-if="error" class="text-danger">{{ error }}</p>

    <div v-if="recipes.length">
      <div v-for="recipe in recipes" :key="recipe.id" class="recipe">
        <h4 @click="toggleDetails(recipe.id)" class="clickable">{{ recipe.title }}</h4>
        <p><strong>Cuisine:</strong> {{ recipe.cuisine }}</p>

        <!-- Toggle for detailed information -->
        <div v-if="selectedRecipeId === recipe.id">
          <p><strong>Ingredients:</strong>
            <span v-if="Array.isArray(recipe.ingredients)">
              {{ recipe.ingredients.join(', ') }}
            </span>
            <span v-else>{{ recipe.ingredients }}</span>
          </p>

          <p><strong>Instructions:</strong> {{ recipe.instructions }}</p>

          <div class="nutrition-facts" v-if="recipe.nutritionalInfo">
            <h5>Nutrition Facts</h5>
            <p v-if="recipe.nutritionalInfo.calories !== undefined"><strong>Calories:</strong> {{ recipe.nutritionalInfo.calories }} kcal</p>
            <p v-if="recipe.nutritionalInfo.protein !== undefined"><strong>Protein:</strong> {{ recipe.nutritionalInfo.protein }} g</p>
            <p v-if="recipe.nutritionalInfo.fat !== undefined"><strong>Fats:</strong> {{ recipe.nutritionalInfo.fat }} g</p>
            <p v-if="recipe.nutritionalInfo.carbohydrates !== undefined"><strong>Carbohydrates:</strong> {{ recipe.nutritionalInfo.carbohydrates }} g</p>
          </div>

          <!-- Add to Meal Plan button -->
          <div class="mt-3">
            <select v-model="selectedMealPlanId" class="form-select mb-2">
              <option value="" disabled>Select Meal Plan</option>
              <option v-for="mealPlan in mealPlans" :key="mealPlan.id" :value="mealPlan.id">
                {{ mealPlan.title }}
              </option>
            </select>
            <button @click="addRecipeToMealPlan(recipe.id)" class="btn btn-primary">
              Add to Meal Plan
            </button>
            <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
            <p v-if="addErrorMessage" class="text-danger">{{ addErrorMessage }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>No recipes available at the moment. Please check back later!</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex'; // Import mapState from Vuex

export default {
  name: 'RecipeViews',
  data() {
    return {
      recipes: [],
      loading: false,
      error: '',
      selectedRecipeId: null,
      selectedMealPlanId: '', // The selected meal plan ID
      successMessage: '', // Success message for adding recipe to meal plan
      addErrorMessage: '', // Error message for adding recipe to meal plan
    };
  },
  computed: {
    ...mapState(['userId', 'mealPlans']), // Map userId and mealPlans from Vuex
  },
  mounted() {
    this.fetchRecipes();
    if (this.userId) {
      this.fetchMealPlans(); // Fetch meal plans when user ID is available
    } else {
      console.error('User ID is not available.');
    }
  },
  methods: {
    async fetchRecipes() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/recipes'); // Adjust the URL if needed
        this.recipes = response.data.recipes;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch recipes.';
      } finally {
        this.loading = false;
      }
    },
    async fetchMealPlans() {
      if (!this.userId) {
        console.error('User ID is not available.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/mealplans/user/${this.userId}`);
        this.$store.commit('setMealPlans', response.data.mealPlans);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    },
    toggleDetails(id) {
      this.selectedRecipeId = this.selectedRecipeId === id ? null : id; // Toggle recipe details
    },
    async addRecipeToMealPlan(recipeId) {
      if (!this.selectedMealPlanId) {
        this.addErrorMessage = 'Please select a meal plan.';
        return;
      }

      try {
        const response = await axios.post(`http://localhost:3000/mealplans/add-recipe`, {
          mealPlanId: this.selectedMealPlanId,
          recipeId: recipeId
        });
        
        this.successMessage = response.data.message;
        this.addErrorMessage = ''; // Clear error message on success
      } catch (error) {
        this.addErrorMessage = error.response?.data?.message || 'Failed to add recipe to meal plan.';
        this.successMessage = ''; // Clear success message on error
      }
    },
  },
};
</script>

<style scoped>
.recipe {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

h4 {
  margin-bottom: 5px;
  cursor: pointer; /* Add cursor pointer for clickable title */
}

.nutrition-facts {
  margin-top: 10px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}
</style>
