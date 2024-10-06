<template>
  <div class="container mt-5">
    <h2>Create a New Meal Plan</h2>
    <form @submit.prevent="submitMealPlan" class="mt-4">
      <div class="form-group">
        <input v-model="title" class="form-control" placeholder="Title" required />
      </div>
      <div class="form-group">
        <textarea v-model="description" class="form-control" placeholder="Description" required></textarea>
      </div>
      <div class="form-group">
        <label for="startDate">Start Date:</label>
        <input v-model="startDate" type="date" class="form-control" id="startDate" required />
      </div>
      <div class="form-group">
        <label for="endDate">End Date:</label>
        <input v-model="endDate" type="date" class="form-control" id="endDate" required />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
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

<style scoped>
/* You can add additional styles here */
</style>
