<template>
  <div>
    <h1>Welcome to MealMate</h1>
    <LogoutButton /> <!-- Include the logout button here -->
    <router-link to="/mealPlans">View Meal Plans</router-link>
    <router-link to="/recipes">Discover Recipes</router-link>
  </div>
</template>

<script>
import LogoutButton from '@/components/LogoutButton.vue'; // Import the logout button component

export default {
  name: 'HomeView',
  components: {
    LogoutButton,
  },
};
</script>

<style scoped>
/* Add styles if necessary */
</style>
