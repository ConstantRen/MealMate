<template>
    <div class="add-meal-plan-form">
      <h3>Add New Meal Plan</h3>
      <form @submit.prevent="addMealPlan">
        <div class="form-group">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
  
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea id="description" v-model="description" required></textarea>
        </div>
  
        <div class="form-group">
          <label for="startDate">Start Date:</label>
          <input type="date" id="startDate" v-model="startDate" required />
        </div>
  
        <div class="form-group">
          <label for="endDate">End Date:</label>
          <input type="date" id="endDate" v-model="endDate" required />
        </div>
  
        <button type="submit" class="btn btn-primary">Add Meal Plan</button>
      </form>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
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
        errorMessage: '',
      };
    },
    methods: {
      async addMealPlan() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          this.errorMessage = 'You must be logged in to add a meal plan.';
          return;
        }
  
        const mealPlanData = {
          userId,
          title: this.title,
          description: this.description,
          startDate: this.startDate,
          endDate: this.endDate,
        };
  
        try {
          const response = await axios.post('http://localhost:3000/mealPlans', mealPlanData);
          this.$emit('mealPlanAdded', response.data); // Emit event to parent component
          this.resetForm(); // Reset form after successful addition
        } catch (error) {
          this.errorMessage = error.response?.data?.message || 'Failed to add meal plan.';
        }
      },
      resetForm() {
        this.title = '';
        this.description = '';
        this.startDate = '';
        this.endDate = '';
        this.errorMessage = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .add-meal-plan-form {
    margin: 20px 0;
  }
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  