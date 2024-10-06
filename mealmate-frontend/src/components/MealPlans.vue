<template>
  <div class="meal-plans container mt-5">
    <h2>Your Meal Plans</h2>
    
    <!-- Show loading spinner or message -->
    <div v-if="loading">Loading meal plans...</div>

    <!-- Show error message if any -->
    <p v-if="error" class="text-danger">{{ error }}</p>

    <!-- Display meal plans if available -->
    <div v-if="mealPlans.length">
      <div v-for="plan in mealPlans" :key="plan.id" class="meal-plan">
        <h4>{{ plan.title }}</h4>
        <p>{{ plan.description }}</p>
        <!-- You can add more details or options to edit/delete the meal plan here -->
      </div>
    </div>
    <div v-else>If you don't have any meal plans, consider creating one!</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MealPlans',
  data() {
    return {
      mealPlans: [], // Array to hold meal plans
      error: '',
      loading: false,
    };
  },
  mounted() {
    this.fetchMealPlans(); // Fetch meal plans when component is mounted
  },
  methods: {
    async fetchMealPlans() {
      const userId = localStorage.getItem('userId'); // Get user ID from localStorage

      if (!userId) {
        this.error = 'User not logged in. Please log in to view your meal plans.';
        return;
      }

      this.loading = true; // Start loading

      try {
        const response = await axios.get(`http://localhost:3000/mealPlans/user/${userId}`);
        this.mealPlans = response.data.mealPlans; // Correctly assigning meal plans from response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch meal plans.';
        console.error('Error fetching meal plans:', error);
      } finally {
        this.loading = false; // End loading
      }
    },
  },
};
</script>

<style scoped>
.meal-plan {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

h4 {
  margin-bottom: 5px;
}
</style>
