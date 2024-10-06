import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import MealPlans from '../views/MealPlansView.vue'; // Ensure this import matches your structure
import Home from '../views/Home.vue'; // Import the Home view

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home, // Load the Home component directly
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/mealPlans/user/:userId', // Dynamic route to fetch meal plans based on user ID
    name: 'MealPlans',
    component: MealPlans, // Ensure you have a MealPlans component created
    props: true, // Allow route parameters to be passed as props
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // Use the base URL defined in your environment variables
  routes,
});

export default router;
