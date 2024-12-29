<template>
    <div class="front-page">
      <h1>Welcome to the Airbnb for Campers</h1>
      <p>Are you a User or an Owner?</p>
      <div class="navigation">
        <button @click="goToUserEntry">Continue as User</button>
        <button @click="goToOwnerEntry">Continue as Owner</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FrontPage',
    methods: {
      goToUserEntry() {
        this.$router.push('/user-entry');
      },
      goToOwnerEntry() {
        this.$router.push('/owner-entry');
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    margin: 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>