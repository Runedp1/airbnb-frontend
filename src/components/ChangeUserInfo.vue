<template>
    <div class="info-page">
      <!-- Back Button -->
      <button class="back-button" @click="goBack">← Terug</button>
  
      <h1>Wijzig je persoonlijke informatie</h1>
  
      <form @submit.prevent="updateUserInfo">
        <label>Gebruikersnaam:</label>
        <input v-model="userInfo.username" type="text" />
  
        <label>Voornaam:</label>
        <input v-model="userInfo.first_name" type="text" />
  
        <label>Achternaam:</label>
        <input v-model="userInfo.last_name" type="text" />
  
        <label>Email:</label>
        <input v-model="userInfo.email" type="email" />
  
        <label>Telefoonnummer:</label>
        <input v-model="userInfo.phone_number" type="tel" />
  
        <button type="submit" class="save-button">Opslaan</button>
        <p>{{ statusMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        userId: null,
        userInfo: {
          username: "",
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
        },
        statusMessage: "",
      };
    },
    methods: {
      // Fetch user data based on the user ID
      async fetchUserInfo() {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          if (!user || !user.id) {
            console.error("No user ID found in localStorage");
            this.statusMessage = "Gebruiker niet ingelogd.";
            return;
          }
  
          this.userId = user.id; // Set user ID from localStorage
          const response = await axios.get(
            `http://localhost:3002/api/user-info/${this.userId}`
          );
  
          // Fill userInfo with response data
          this.userInfo = response.data;
        } catch (error) {
          console.error("Error fetching user info:", error.response || error);
          this.statusMessage = "Kon de gegevens niet ophalen.";
        }
      },
  
      // Update user info when clicking "Opslaan"
      async updateUserInfo() {
        try {
          await axios.put(
            `http://localhost:3002/api/user-info/${this.userId}`,
            this.userInfo
          );
          this.statusMessage = "Gegevens succesvol bijgewerkt!";
        } catch (error) {
          console.error("Error updating user info:", error.response || error);
          this.statusMessage = "Kon de gegevens niet bijwerken.";
        }
      },
  
      // Navigate back to the User Dashboard
      goBack() {
        this.$router.push("/user-main");
      },
    },
    created() {
      this.fetchUserInfo(); // Fetch user info on page load
    },
  };
  </script>
  
  <style scoped>
  .info-page {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .back-button {
    background-color: #f2f2f2;
    border: none;
    color: #333;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  
  .back-button:hover {
    background-color: #ddd;
  }
  
  form label {
    display: block;
    margin-top: 10px;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .save-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .save-button:hover {
    background-color: #45a049;
  }
  
  p {
    color: red;
  }
  </style>