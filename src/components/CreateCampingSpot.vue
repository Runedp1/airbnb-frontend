<template>
  <div class="create-spot">
    <h2>Maak een Nieuwe Kampeerplek</h2>
    <form @submit.prevent="createCampingSpot">
      <label>Naam:</label>
      <input v-model="name" type="text" required />

      <label>Beschrijving:</label>
      <textarea v-model="description" required></textarea>

      <label>Locatie:</label>
      <input v-model="location" type="text" required />

      <label>Prijs per Nacht:</label>
      <input v-model="price_per_night" type="number" required />

      <label>Type:</label>
      <select v-model="type" required>
        <option value="tent">Tent</option>
        <option value="rv">RV</option>
        <option value="cabin">Cabin</option>
      </select>

      <label>Faciliteiten:</label>
      <input v-model="facilities" type="text" />

      <label>Provincie:</label>
      <select v-model="province" required>
        <option disabled value="">Selecteer een provincie</option>
        <option value="Antwerpen">Antwerpen</option>
        <option value="Oost-Vlaanderen">Oost-Vlaanderen</option>
        <option value="West-Vlaanderen">West-Vlaanderen</option>
        <option value="Limburg">Limburg</option>
        <option value="Vlaams-Brabant">Vlaams-Brabant</option>
        <option value="Brussels Hoofdstedelijk Gewest">Brussels Hoofdstedelijk Gewest</option>
        <option value="Henegouwen">Henegouwen</option>
        <option value="Luik">Luik</option>
        <option value="Luxemburg">Luxemburg</option>
        <option value="Namen">Namen</option>
      </select>

      <button type="submit">Maak Kampeerplek</button>
    </form>
    <p v-if="message" :class="{ success: success, error: !success }">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      location: '',
      price_per_night: '',
      type: 'tent',
      facilities: '',
      province: '',
      message: '',
      success: false
    };
  },
  methods: {
    async createCampingSpot() {
      const owner_id = localStorage.getItem('owner_id');
      try {
        await axios.post('http://localhost:3002/api/owner/campingspots', {
          owner_id,
          name: this.name,
          description: this.description,
          location: this.location,
          price_per_night: this.price_per_night,
          type: this.type,
          facilities: this.facilities,
          province: this.province
        });
        this.success = true;
        this.message = 'Kampeerplek succesvol aangemaakt!';
        this.resetForm();
      } catch (error) {
        this.success = false;
        this.message = 'Fout bij het aanmaken van de kampeerplek.';
        console.error('Error creating camping spot:', error);
      }
    },
    resetForm() {
      this.name = '';
      this.description = '';
      this.location = '';
      this.price_per_night = '';
      this.type = 'tent';
      this.facilities = '';
      this.province = '';
    }
  }
};
</script>

<style scoped>
.create-spot {
  max-width: 600px;
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

input, select, textarea {
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
