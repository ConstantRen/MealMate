<template>
    <button @click="logout">Logout</button>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('userId'); // Remove user ID from localStorage
        this.$router.push('/login'); // Redirect to the login page
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles if necessary */
  </style>
  