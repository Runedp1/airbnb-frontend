<template>
    <div class="owner-main">
      <h1>Welkom, {{ owner.username }}!</h1>
      
      <!-- Create Spot Section -->
      <div class="create-spot">
        <h2>Maak een nieuwe kampeerplek</h2>
        <button @click="showCreateSpotForm = !showCreateSpotForm">
          {{ showCreateSpotForm ? 'Annuleer' : 'Creëer Nieuwe Plek' }}
        </button>
  
        <!-- Create Spot Form -->
        <div v-if="showCreateSpotForm" class="form-section">
          <form @submit.prevent="createSpot">
            <label>Naam:</label>
            <input v-model="name" type="text" required />
  
            <label>Beschrijving:</label>
            <textarea v-model="description"></textarea>
  
            <label>Locatie:</label>
            <input v-model="location" type="text" required />
  
            <label>Prijs per nacht (€):</label>
            <input v-model="price_per_night" type="number" required />
  
            <label>Faciliteiten:</label>
            <input v-model="facilities" type="text" />
  
            <label>Type:</label>
            <select v-model="type" required>
              <option value="tent">Tent</option>
              <option value="rv">RV</option>
              <option value="cabin">Cabin</option>
            </select>
  
            <label>Provincie:</label>
            <input v-model="province" type="text" required />
  
            <button type="submit">Maak Plek</button>
          </form>
        </div>
      </div>
  
      <!-- Owner Camping Spots -->
      <div class="camping-spots">
        <h2>Mijn Kampeerplekken</h2>
        <ul>
          <li v-for="spot in spots" :key="spot.id">
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
  import axios from 'axios';
  
  export default {
    data() {
      return {
        owner: {},
        showCreateSpotForm: false,
        spots: [], // Owner's camping spots
        name: '',
        description: '',
        location: '',
        price_per_night: '',
        facilities: '',
        type: 'tent',
        province: '',
      };
    },
    methods: {
      // Fetch Owner's Spots
      async fetchOwnerSpots() {
        const ownerId = JSON.parse(localStorage.getItem('owner'))?.id;
        try {
          const response = await axios.get(`http://localhost:3002/api/owner/campingspots/${ownerId}`);
          this.spots = response.data;
        } catch (error) {
          console.error('Error fetching spots:', error);
        }
      },
      // Create a New Spot
      async createSpot() {
        const ownerId = JSON.parse(localStorage.getItem('owner'))?.id;
        const newSpot = {
          owner_id: ownerId,
          name: this.name,
          description: this.description,
          location: this.location,
          price_per_night: this.price_per_night,
          facilities: this.facilities,
          type: this.type,
          province: this.province,
        };
  
        try {
          await axios.post('http://localhost:3002/api/owner/campingspots', newSpot);
          alert('Kampeerplek succesvol aangemaakt!');
          this.resetForm();
          this.fetchOwnerSpots();
        } catch (error) {
          console.error('Error creating spot:', error);
          alert('Fout bij het aanmaken van de kampeerplek.');
        }
      },
      resetForm() {
        this.name = '';
        this.description = '';
        this.location = '';
        this.price_per_night = '';
        this.facilities = '';
        this.type = 'tent';
        this.province = '';
      },
    },
    created() {
      this.owner = JSON.parse(localStorage.getItem('owner')) || {};
      this.fetchOwnerSpots();
    },
  };
  </script>
  
  <style scoped>
  .owner-main {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  h1,
  h2 {
    color: #3498db;
    text-align: center;
  }
  
  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  .form-section {
    margin-top: 20px;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin: 10px 0 5px;
  }
  
  input,
  textarea,
  select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    background: #f9f9f9;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  </style>
  