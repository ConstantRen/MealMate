<template>
    <div>
      <MealPlans />
      <MealPlanForm />
    </div>
  </template>
  
  <script>
  import MealPlans from '../components/MealPlans.vue';
  import MealPlanForm from '../components/MealPlanForm.vue';
  
  export default {
    components: {
      MealPlans,
      MealPlanForm
    }
  };
  </script>
  