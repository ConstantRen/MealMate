<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="register">
        <!-- Email input -->
        <input v-model="email" type="email" placeholder="Email" required />
        <!-- Password input -->
        <input v-model="password" type="password" placeholder="Password" required />
        <!-- Submit button -->
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await axios.post('http://localhost:3000/register', {
            email: this.email,
            password: this.password
          });
          console.log(response.data);
          this.$router.push('/login');  // Redirect to login after successful registration
        } catch (error) {
          console.error('Registration failed:', error);
        }
      }
    }
  };
  </script>
  