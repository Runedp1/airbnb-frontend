<template>
  <div class="login">
    <h2>Owner Login</h2>
    <form @submit.prevent="loginOwner">
      <label>Email:</label>
      <input v-model="email" type="email" required />

      <label>Password:</label>
      <input v-model="password" type="password" required />

      <button type="submit">Login</button>
    </form>
    <p v-if="message" class="error">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
    };
  },
  methods: {
    async loginOwner() {
      try {
        const response = await axios.post('http://localhost:3002/api/owners/login', {
          email: this.email,
          password: this.password,
        });
        const owner = response.data.owner;

        localStorage.setItem('owner', JSON.stringify(owner));
        this.$router.push('/owner-main'); // Redirect to owner main page
      } catch (error) {
        this.message = 'Invalid owner credentials. Please try again.';
        console.error('Error logging in owner:', error);
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  color: #3498db;
}
label {
  display: block;
  margin: 10px 0 5px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
.error {
  color: red;
  text-align: center;
}
</style>