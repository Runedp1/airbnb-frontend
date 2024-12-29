<template>
    <div class="signup">
      <h2>Sign Up as {{ role }}</h2>
      <form @submit.prevent="registerUser">
        <label>Username:</label>
        <input v-model="username" type="text" required />
  
        <label>Email:</label>
        <input v-model="email" type="email" required />
  
        <label>Phone Number:</label>
        <input v-model="phone_number" type="tel" placeholder="e.g., +1234567890" required />
  
        <label>First Name:</label>
        <input v-model="first_name" type="text" required />
  
        <label>Last Name:</label>
        <input v-model="last_name" type="text" required />
  
        <label>Date of Birth:</label>
        <input v-model="date_of_birth" type="date" required />
  
        <label>Password:</label>
        <input v-model="password" type="password" required />
  
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
    </div>
  </template>
  
  <script>

import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      phone_number: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      password: '',
      role: 'user',
    };
  },
  methods: {
    async registerUser() {
      try {
        await axios.post('http://localhost:3002/api/users', {
          username: this.username,
          email: this.email,
          phone_number: this.phone_number,
          first_name: this.first_name,
          last_name: this.last_name,
          date_of_birth: this.date_of_birth,
          password: this.password,
          role: this.role,
        });

        // Redirect to login page with pre-filled data
        this.$router.push({
          path: '/user-login',
          query: { email: this.email, username: this.username },
        });
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Error creating account. Please try again.');
      }
    },
  },
};
</script>
  
  <style scoped>
  .signup {
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
  
  .success {
    color: green;
    text-align: center;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  </style>