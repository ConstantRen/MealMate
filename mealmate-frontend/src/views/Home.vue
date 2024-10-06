<template>
    <div>
      <AppNavbar />
      <div class="container mt-4">
        <h1 class="text-center">Welcome to MealMate!</h1>
        <p class="text-center">Your go-to app for meal planning and recipe discovery.</p>
        
        <h2 class="mt-5">Meal Plans</h2>
        <p>Meal plans will be displayed here once implemented.</p>
      </div>
    </div>
  </template>
  
  <script>
  import AppNavbar from '../components/AppNavbar.vue'; // Ensure correct import
  
  export default {
    name: 'HomeView', // Change to a multi-word name
    components: {
      AppNavbar,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    color: #5a5a5a;
  }
  </style>
  