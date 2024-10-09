// src/store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      userId: localStorage.getItem('userId') || null, // Initialize userId from local storage
      mealPlans: [],
    };
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
      localStorage.setItem('userId', userId); // Persist user ID in local storage
    },
    setMealPlans(state, mealPlans) {
      state.mealPlans = mealPlans;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        const { uid } = response.data; // Assuming your API returns user ID as uid
        commit('setUserId', uid); // Set user ID in Vuex store
      } catch (error) {
        console.error('Login failed:', error);
        throw error; // Handle error as appropriate
      }
    },
    async fetchMealPlans({ state, commit }) {
      if (!state.userId) {
        console.error('User ID is not available.');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/mealplans/user/${state.userId}`);
        commit('setMealPlans', response.data.mealPlans);
      } catch (error) {
        console.error("Error fetching meal plans:", error);
      }
    },
  },
});

export default store;
