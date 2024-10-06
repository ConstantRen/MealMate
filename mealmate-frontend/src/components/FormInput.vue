<template>
    <input :type="type" v-model="inputValue" :placeholder="placeholder" />
  </template>
  
  <script>
  export default {
    props: {
      modelValue: String,
      type: String,
      placeholder: String
    },
    computed: {
      inputValue: {
        get() {
          return this.modelValue;
        },
        set(value) {
          this.$emit('update:modelValue', value);
        }
      }
    }
  };
  </script>
  