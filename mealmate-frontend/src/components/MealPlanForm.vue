<template>
    <div>
      <h2>Create a New Meal Plan</h2>
      <form @submit.prevent="submitMealPlan">
        <input v-model="title" placeholder="Title" required />
        <textarea v-model="description" placeholder="Description" required></textarea>
        <input v-model="startDate" type="date" required />
        <input v-model="endDate" type="date" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        meals: [],
        userId: '' // Store the user ID here
      };
    },
    created() {
      // Fetch the user ID dynamically (example from local storage or global state)
      this.userId = localStorage.getItem('userId') || ''; // Adjust this depending on your auth method
    },
    methods: {
      async submitMealPlan() {
        if (!this.userId) {
          console.error('User ID is missing.');
          return;
        }
  
        const mealPlanData = {
          userId: this.userId, // Use the dynamically fetched userId
          title: this.title,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
          meals: this.meals
        };
  
        try {
          const response = await axios.post('http://localhost:3000/mealPlans/user/', mealPlanData);
          console.log('Meal plan created:', response.data);
          this.$router.push('/mealPlans');
        } catch (error) {
          console.error('Error creating meal plan:', error);
        }
      }
    }
  };
  </script>
  