<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
      <li><router-link to="/mealPlans">Meal Plans</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar', // Change the component name to AppNavbar
};
</script>

<style scoped>
/* Add your styles here */
</style>
