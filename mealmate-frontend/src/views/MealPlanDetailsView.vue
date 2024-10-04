<template>
    <div>
      <h1>Meal Plan Details</h1>
      <div v-if="mealPlan">
        <h2>{{ mealPlan.title }}</h2>
        <p><strong>Description:</strong> {{ mealPlan.description }}</p>
        <p><strong>Start Date:</strong> {{ mealPlan.startDate }}</p>
        <p><strong>End Date:</strong> {{ mealPlan.endDate }}</p>
        <h3>Meals</h3>
        <ul>
          <li v-for="(meal, index) in mealPlan.meals" :key="index">{{ meal }}</li>
        </ul>
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
        mealPlan: null,
      };
    },
    async created() {
      const mealPlanId = this.$route.params.mealPlanId; // Get mealPlanId from route params
      await this.fetchMealPlanDetails(mealPlanId); // Fetch meal plan details
    },
    methods: {
      async fetchMealPlanDetails(mealPlanId) {
        try {
          const response = await axios.get(`http://localhost:3000/mealPlans/${mealPlanId}`); // Fetch meal plan by ID
          this.mealPlan = response.data.mealPlan; // Set mealPlan data
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
  