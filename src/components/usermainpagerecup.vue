<template>
    <div class="main-page">
      <div class="top-bar">
        <h1>Welkom, {{ user.first_name }}!</h1>
        <div class="buttons">
          <button @click="goToBookings">Mijn Boekingen</button>
          <button @click="goToChangeInfo">Mijn Gegevens</button>
        </div>
      </div>
  
      <!-- Filter Section -->
      <div class="filter-section">
        <label>Filter op locatie...</label>
        <select v-model="selectedProvince">
          <option value="">Alle Provincies</option>
          <option v-for="province in provinces" :key="province" :value="province">
            {{ province }}
          </option>
        </select>
        <button @click="filterSpots">Toon Resultaten</button>
      </div>
  
      <!-- Camping Spots -->
      <div v-if="campingSpots.length" class="spots-container">
        <div v-for="spot in campingSpots" :key="spot.id" class="spot-card" @click="goToBookingPage(spot.id)">
          <h3>{{ spot.name }}</h3>
          <p>Locatie: {{ spot.location }}</p>
          <p>Prijs: €{{ spot.price_per_night }} per nacht</p>
        </div>
      </div>
      <p v-else>Geen kampeerplekken gevonden. Probeer andere filters.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        user: {},
        campingSpots: [],
        selectedProvince: "",
        provinces: ["Antwerpen", "Limburg", "Oost-Vlaanderen", "West-Vlaanderen", "Vlaams-Brabant"],
      };
    },
    methods: {
      // Navigate to Booking Page
      goToBookingPage(spotId) {
        this.$router.push(`/booking/${spotId}`);
      },
  
      // Navigate to Change User Info Page
      goToChangeInfo() {
        this.$router.push("/change-user-info");
      },
  
      // Navigate to My Bookings
      goToBookings() {
        this.$router.push("/my-bookings");
      },
  
      // Fetch User Info from LocalStorage
      fetchUserInfo() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          this.user = user; // Set user data
        } else {
          console.error("User not found in localStorage.");
          this.$router.push("/user-login"); // Redirect to login if no user
        }
      },
  
      // Fetch Camping Spots
      async fetchCampingSpots() {
        try {
          const response = await axios.get("http://localhost:3002/api/campingspots");
          this.campingSpots = response.data;
        } catch (error) {
          console.error("Error fetching camping spots:", error);
        }
      },
  
      // Filter Spots
      filterSpots() {
        this.fetchCampingSpots(); // Add logic for filtering later
      },
    },
    created() {
      this.fetchUserInfo(); // Load user data on page load
      this.fetchCampingSpots(); // Load camping spots
    },
  };
  </script>
  
  <style scoped>
  .main-page {
    padding: 20px;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .buttons button {
    margin-left: 10px;
    padding: 8px 12px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .filter-section {
    margin: 20px 0;
  }
  
  .spots-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .spot-card {
    width: 250px;
    padding: 15px;
    border: 1px solid #ddd;
    margin: 10px;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .spot-card:hover {
    background-color: #f9f9f9;
  }
  </style>