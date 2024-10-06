<template>
  <div class="register container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="registerUser" class="mt-4">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="formData.username" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', this.formData);
        console.log('User registered:', response.data);
        this.$router.push('/login'); // Redirect to login after successful registration
      } catch (error) {
        this.error = 'Error registering: ' + (error.response?.data?.message || error.message);
        console.error('Error registering:', error);
      }
    }
  }
};
</script>

<style scoped>
/* You can add more custom styles here if needed */
</style>
