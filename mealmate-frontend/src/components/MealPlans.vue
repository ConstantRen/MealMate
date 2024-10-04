<template>
    <div>
      <h1>My Meal Plans</h1>
      <input v-model="userId" placeholder="Enter your User ID" />
      <button @click="fetchMealPlans">Get Meal Plans</button>
  
      <ul v-if="mealPlans.length > 0">
        <li v-for="mealPlan in mealPlans" :key="mealPlan.id">
          <router-link :to="`/mealPlans/${mealPlan.id}`">{{ mealPlan.title }}</router-link>
        </li>
      </ul>
        
      <div v-else-if="errorMessage">{{ errorMessage }}</div>
  
      <div v-if="mealPlan">
        <h2>{{ mealPlan.title }}</h2>
        <p>{{ mealPlan.description }}</p>
        <p><strong>Start Date:</strong> {{ mealPlan.startDate }}</p>
        <p><strong>End Date:</strong> {{ mealPlan.endDate }}</p>
        <h3>Meals:</h3>
        <ul>
          <li v-for="meal in mealPlan.meals" :key="meal.id">{{ meal }}</li>
        </ul>
      </div>
  
      <input v-model="mealPlanId" placeholder="Enter Meal Plan ID" />
      <button @click="fetchMealPlan">Get Meal Plan</button>
      
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userId: '', // Store the user ID here
        mealPlanId: '', // Store the meal plan ID here
        mealPlans: [], // Store the list of meal plans
        mealPlan: null, // Store the fetched meal plan
        errorMessage: '' // For handling error messages
      };
    },
    methods: {
      async fetchMealPlans() {
        try {
          const response = await axios.get(`http://localhost:3000/mealPlans/user/${this.userId}`);
          this.mealPlans = response.data.mealPlans; // Update to store the fetched meal plans
          this.errorMessage = ''; // Clear error message if successful
        } catch (error) {
          console.error('Error fetching meal plans:', error);
          this.errorMessage = 'No meal plans found for this user.'; // Set an error message
          this.mealPlans = []; // Clear meal plans on error
        }
      },
      async fetchMealPlan() {
        try {
          const response = await axios.get(`http://localhost:3000/mealPlans/${this.mealPlanId}`);
          this.mealPlan = response.data.mealPlan; // Update to store the meal plan data
        } catch (error) {
          console.error('Error fetching meal plan:', error);
          this.errorMessage = 'Meal plan not found'; // Set an error message
        }
      }
    }
  };
  </script>
  