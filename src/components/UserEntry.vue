<template>
    <div>
      <h2>User Access</h2>
      <button @click="goToSignUp">Sign Up</button>
      <button @click="goToLogin">Login</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserEntry',
    methods: {
      goToSignUp() {
        this.$router.push('/user-signup');
      },
      goToLogin() {
        this.$router.push('/user-login');
      },
    },
  };
  </script>