<template>
    <div class="create-spot">
      <h1>Nieuwe Kampeerplek</h1>
      <form @submit.prevent="createSpot">
        <label>Naam:</label>
        <input v-model="name" required />
  
        <label>Beschrijving:</label>
        <textarea v-model="description"></textarea>
  
        <label>Locatie (Adres):</label>
        <input v-model="location" required />
  
        <label>Provincie:</label>
        <select v-model="province" required>
          <option value="Antwerpen">Antwerpen</option>
          <option value="Limburg">Limburg</option>
          <option value="Oost-Vlaanderen">Oost-Vlaanderen</option>
          <option value="West-Vlaanderen">West-Vlaanderen</option>
          <option value="Vlaams-Brabant">Vlaams-Brabant</option>
        </select>
  
        <label>Prijs per nacht (€):</label>
        <input type="number" v-model="price_per_night" required />
  
        <label>Faciliteiten:</label>
        <input v-model="facilities" />
  
        <label>Type:</label>
        <select v-model="type" required>
          <option value="tent">Tent</option>
          <option value="rv">RV</option>
          <option value="cabin">Cabin</option>
        </select>
  
        <button type="submit">Plek Aanmaken</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        description: "",
        location: "",
        price_per_night: "",
        facilities: "",
        type: "tent",
        province: "Antwerpen",
      };
    },
    methods: {
      async createSpot() {
        const owner = JSON.parse(localStorage.getItem("user"));
        if (!owner) {
          this.$router.push("/owner-login");
          return;
        }
  
        const newSpot = {
          owner_id: owner.id,
          name: this.name,
          description: this.description,
          location: this.location,
          price_per_night: this.price_per_night,
          facilities: this.facilities,
          type: this.type,
          province: this.province,
        };
  
        try {
          await axios.post("http://localhost:3002/api/owner/campingspots", newSpot);
          alert("Kampeerplek succesvol aangemaakt!");
          this.$router.push("/owner-main");
        } catch (error) {
          console.error("Error creating spot:", error);
          alert("Kon de kampeerplek niet aanmaken.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input,
  textarea,
  select {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>