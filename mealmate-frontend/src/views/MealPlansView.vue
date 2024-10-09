<template>
  <div class="meal-plans container mt-5">
    <h2>Your Meal Plans</h2>
    
    <button class="btn btn-success mb-3" @click="toggleAddMealPlanForm">
      {{ showAddMealPlanForm ? 'Cancel' : 'Add Meal Plan' }}
    </button>

    <!-- Show the form to add a new meal plan -->
    <AddMealPlanForm
      v-if="showAddMealPlanForm"
      @close="showAddMealPlanForm = false"
      @mealPlanAdded="handleMealPlanAdded"
    />

    <div v-if="loading">Loading meal plans...</div>
    <p v-if="error" class="text-danger">{{ error }}</p>
    
    <div v-if="mealPlans.length">
      <div
        v-for="plan in mealPlans"
        :key="plan.id"
        class="meal-plan"
        @click="goToMealPlan(plan.id)"
      >
        <h4>{{ plan.title }}</h4>
        <p>{{ plan.description }}</p>
      </div>
    </div>
    <div v-else>
      If you don't have any meal plans, consider creating one!
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AddMealPlanForm from '@/components/AddMealPlanForm.vue'; // Import the new form component

export default {
  name: 'MealPlans',
  components: {
    AddMealPlanForm,
  },
  data() {
    return {
      mealPlans: [],
      error: '',
      loading: false,
      showAddMealPlanForm: false, // Toggle for the form
    };
  },
  mounted() {
    this.fetchMealPlans();
  },
  methods: {
    async fetchMealPlans() {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        this.error = 'User not logged in. Please log in to view your meal plans.';
        return;
      }
      this.loading = true;
      try {
        const response = await axios.get(`http://localhost:3000/mealPlans/user/${userId}`);
        this.mealPlans = response.data.mealPlans || []; // Ensure it's an array
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch meal plans.';
      } finally {
        this.loading = false;
      }
    },
    toggleAddMealPlanForm() {
      this.showAddMealPlanForm = !this.showAddMealPlanForm; // Toggle form visibility
    },
    goToMealPlan(mealPlanId) {
      this.$router.push({ name: 'MealPlanDetails', params: { mealPlanId } });
    },
    handleMealPlanAdded(newMealPlan) {
      this.mealPlans.push(newMealPlan); // Add new meal plan to the list
      this.showAddMealPlanForm = false; // Hide the form after adding
    },
  },
};
</script>

<style scoped>
.meal-plan {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
}

h4 {
  margin-bottom: 5px;
}
</style>
