<template>
  <div class="user-main-page">
    <h1>Welkom, {{ userName }}</h1>

    <!-- Filter Section -->
    <div class="filters">
      <label for="province">Provincie:</label>
      <select v-model="selectedProvince">
        <option value="">Alle Provincies</option>
        <option v-for="province in provinces" :key="province" :value="province">
          {{ province }}
        </option>
      </select>

      <label for="price">Prijs per Nacht:</label>
      <input type="number" v-model.number="minPrice" placeholder="Min. prijs (€)" />
      <input type="number" v-model.number="maxPrice" placeholder="Max. prijs (€)" />

      <button @click="applyFilters">Toon Resultaten</button>
    </div>

    <!-- Camping Spots Display -->
    <div v-if="filteredSpots.length > 0">
      <div v-for="spot in filteredSpots" :key="spot.id" class="spot-card" @click="goToBookingPage(spot.id)">
        <h3>{{ spot.name }}</h3>
        <p>Locatie: {{ spot.location }}</p>
        <p>Provincie: {{ spot.province }}</p>
        <p>Prijs: €{{ spot.price_per_night }} per nacht</p>
        <p>Type: {{ spot.type }}</p>
      </div>
    </div>
    <p v-else>Geen kampeerplekken gevonden. Probeer andere filters.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: null,
      userName: '',
      campingSpots: [],
      provinces: ["Antwerpen", "Limburg", "Oost-Vlaanderen", "West-Vlaanderen", "Vlaams-Brabant", "Brussels Hoofdstedelijk Gewest", "Namen" , "Henegouwen", "Luik", "Luxemburg"],
      selectedProvince: '',
      minPrice: null,
      maxPrice: null,
      filteredSpots: [],
    };
  },
  methods: {
    async fetchCampingSpots() {
      try {
        const response = await axios.get('http://localhost:3002/api/campingspots');
        this.campingSpots = response.data;
        this.filteredSpots = this.campingSpots;
      } catch (error) {
        console.error('Error fetching camping spots:', error);
        alert('Kon geen kampeerplekken ophalen. Probeer later opnieuw.');
      }
    },
    applyFilters() {
      this.filteredSpots = this.campingSpots.filter(spot => {
        const provinceMatch = !this.selectedProvince || spot.province === this.selectedProvince;
        const priceMatch =
          (!this.minPrice || spot.price_per_night >= this.minPrice) &&
          (!this.maxPrice || spot.price_per_night <= this.maxPrice);
        return provinceMatch && priceMatch;
      });
    },
    goToBookingPage(spotId) {
      this.$router.push(`/booking/${spotId}`);
    },
  },
  created() {
    const userData = JSON.parse(localStorage.getItem('user'));
    this.userId = userData.id;
    this.userName = userData.username;
    this.fetchCampingSpots();
  },
};
</script>

<style scoped>
.user-main-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.filters {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.spot-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #f9f9f9;
  cursor: pointer;
}

.spot-card:hover {
  background-color: #eaeaea;
}

button {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
