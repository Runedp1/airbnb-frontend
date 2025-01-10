<template>
  <div class="entry-container">
    <h2>User Access</h2>
    <div class="button-group">
      <button @click="goToSignUp">Sign Up</button>
      <button @click="goToLogin">Login</button>
    </div>
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

<style scoped>
.entry-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #3498db;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #2980b9;
}
</style>
