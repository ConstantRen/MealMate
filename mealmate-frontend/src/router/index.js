import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';
import MealPlansView from '../views/MealPlansView.vue';
import RecipesView from '../views/RecipesView.vue';
import MealPlanDetailsView from '../views/MealPlanDetailsView.vue'; // Import the new view

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }, // Add a meta field to require authentication
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/mealPlans',
    name: 'MealPlans',
    component: MealPlansView,
    meta: { requiresAuth: true }, // Protect this route
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: RecipesView,
  },
  {
    path: '/mealPlans/:mealPlanId', // Dynamic route for meal plan details
    name: 'MealPlanDetails',
    component: MealPlanDetailsView,
    props: true, // Allow route parameters to be passed as props
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('userId'); // Check if userId is in localStorage

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' }); // Redirect to Login if not authenticated
  } else {
    next(); // Allow the route
  }
});

export default router;
