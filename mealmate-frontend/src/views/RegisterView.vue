<template>
    <div>
      <Register />
    </div>
  </template>
  
  <script>
  import Register from '../components/RegisterForm.vue';  // Update the path to match the folder structure
  
  export default {
    name: 'RegisterView',
    components: {
      Register
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  