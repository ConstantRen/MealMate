<template>
  <div class="login container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="loginUser" class="mt-4">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="formData.password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p v-if="error" class="text-danger mt-3">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
      error: '',
    };
  },
  methods: {
    async loginUser() {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', this.formData);
    const userId = response.data.uid; // Fetch 'uid' from the response

    // Save the user ID to localStorage (or Vuex if you're using it)
    localStorage.setItem('userId', userId);

    // Redirect to the user's meal plan page using their userId
    this.$router.push(`/mealPlans/user/${userId}`);
  } catch (error) {
    this.error = 'Error logging in: ' + (error.response?.data?.message || error.message);
    console.error('Error logging in:', error);
  }
}
  },
};
</script>

<style scoped>
/* You can add more custom styles here if needed */
</style>
