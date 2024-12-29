<template>
  <div class="user-main">
    <h1>Welkom, {{ user.first_name }}!</h1>

    <!-- Button to view bookings -->
    <div class="top-buttons">
      <button @click="goToBookings" class="button">Mijn Boekingen</button>
      <button @click="goToInfoPage" class="button">Mijn Gegevens</button>
    </div>

    <!-- Available Camping Spots -->
    <div class="camping-spots">
      <h2>Beschikbare Kampeerplekken</h2>
      <p v-if="spots.length === 0">Geen kampeerplekken beschikbaar.</p>
      <ul>
        <li v-for="spot in spots" :key="spot.id" @click="goToBookingPage(spot.id)">
          <h3>{{ spot.name }}</h3>
          <p>Locatie: {{ spot.location }}</p>
          <p>Prijs: €{{ spot.price_per_night }} per nacht</p>
          <p>Type: {{ spot.type }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {}, // User data loaded from localStorage
      spots: [], // Camping spots fetched from the API
    };
  },
  methods: {
    async fetchCampingSpots() {
      try {
        const response = await axios.get("http://localhost:3002/api/campingspots");
        this.spots = response.data;
      } catch (error) {
        console.error("Error fetching camping spots:", error);
        alert("Kon de campingspots niet laden. Probeer het later opnieuw.");
      }
    },
    goToBookings() {
      this.$router.push("/my-bookings");
    },
    goToInfoPage() {
      this.$router.push("/user-info");
    },
    goToBookingPage(spotId) {
      this.$router.push(`/booking/${spotId}`);
    },
  },
  created() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.fetchCampingSpots();
    } else {
      alert("Geen gebruiker ingelogd. Log opnieuw in.");
      this.$router.push("/user-login");
    }
  },
};
</script>

<style scoped>
.user-main {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #3498db;
}

.top-buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #2980b9;
}

.camping-spots h2 {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

li:hover {
  background-color: #e9e9e9;
}
</style>