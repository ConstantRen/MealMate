<template>
  <div>
    <h1>Meal Plan Details</h1>
    <div v-if="mealPlan">
      <h2>{{ mealPlan.title }}</h2>
      <p><strong>Description:</strong> {{ mealPlan.description }}</p>
      <p><strong>Start Date:</strong> {{ mealPlan.startDate }}</p>
      <p><strong>End Date:</strong> {{ mealPlan.endDate }}</p>
      
      <!-- Display meals if any -->
      <h3>Meals</h3>
      <ul v-if="mealPlan.meals.length">
        <li v-for="(meal, index) in mealPlan.meals" :key="index">{{ meal }}</li>
      </ul>
      <p v-else>No meals specified in this meal plan.</p>
    </div>
    <div v-else>
      <p>Loading meal plan details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mealPlan: null, // Initialize mealPlan
    };
  },
  async created() {
    const mealPlanId = this.$route.params.mealPlanId; // Fetch mealPlanId from route params
    await this.fetchMealPlanDetails(mealPlanId); // Fetch meal plan details
  },
  methods: {
    async fetchMealPlanDetails(mealPlanId) {
      try {
        const response = await axios.get(`http://localhost:3000/mealPlans/${mealPlanId}`);
        const { title, description, startDate, endDate, meals } = response.data.mealPlan;
        this.mealPlan = { title, description, startDate, endDate, meals }; // Only retain necessary info
      } catch (error) {
        console.error('Error fetching meal plan details:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
