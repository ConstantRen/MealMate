import { createRouter, createWebHistory } from 'vue-router';
import MealPlansView from '../views/MealPlansView.vue';
import MealPlanDetailsView from '../views/MealPlanDetailsView.vue';

const routes = [
  {
    path: '/mealPlans',
    name: 'MealPlansView',
    component: MealPlansView
  },
  {
    path: '/mealPlans/:mealPlanId',
    name: 'MealPlanDetailsView',
    component: MealPlanDetailsView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
