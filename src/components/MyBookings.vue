<template>
    <div class="my-bookings">
      <h1>Mijn Boekingen</h1>
      <div v-if="bookings.length > 0">
        <table>
          <thead>
            <tr>
              <th>Kampeerplek</th>
              <th>Locatie</th>
              <th>Startdatum</th>
              <th>Einddatum</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings" :key="booking.id">
              <td>{{ booking.name }}</td>
              <td>{{ booking.location }}</td>
              <td>{{ formatDate(booking.start_date) }}</td>
              <td>{{ formatDate(booking.end_date) }}</td>
              <td>{{ booking.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>Je hebt nog geen boekingen.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        bookings: [],
        userId: 1, // Replace this with a dynamic user ID when authentication is set up
      };
    },
    methods: {
      async fetchBookings() {
        try {
          const response = await axios.get(
            `http://localhost:3002/api/my-bookings/${this.userId}`
          );
          this.bookings = response.data;
        } catch (error) {
          console.error("Error fetching bookings:", error);
          alert("Kon je boekingen niet ophalen. Probeer later opnieuw.");
        }
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("nl-BE");
      },
    },
    created() {
      this.fetchBookings();
    },
  };
  </script>
  
  <style scoped>
  .my-bookings {
    text-align: center;
    margin: 20px;
  }
  
  table {
    margin: 0 auto;
    width: 80%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }
  
  th {
    background-color: #4CAF50;
    color: white;
  }
  
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  
  p {
    font-size: 1.2em;
    color: #555;
  }
  </style>