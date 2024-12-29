<template>
    <div class="booking-page">
      <h1>Boek een Kampeerplek</h1>
  
      <div v-if="campingSpot">
        <h3>{{ campingSpot.name }}</h3>
        <p>Locatie: {{ campingSpot.location }}</p>
        <p>Prijs: €{{ campingSpot.price_per_night }} per nacht</p>
        <p>Type: {{ campingSpot.type }}</p>
  
        <!-- Date Picker -->
        <h4>Kies je data:</h4>
        <VueDatePicker
          v-model="bookingDates"
          :inline="true"
          range
          :disabled-dates="bookedDates"
          :enable-time-picker="false"
        />
  
        <button @click="createBooking" class="booking-button">Boek Nu</button>
      </div>
      <p v-else>Geen kampeerplek gevonden.</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import VueDatePicker from "@vuepic/vue-datepicker";
  import "@vuepic/vue-datepicker/dist/main.css";
  
  export default {
    components: { VueDatePicker },
    data() {
      return {
        campingSpot: null,
        bookingDates: null,
        bookedDates: [],
      };
    },
    methods: {
      async fetchCampingSpot() {
        const spotId = this.$route.params.spotId;
        try {
          const response = await axios.get(
            `http://localhost:3002/api/campingspots/${spotId}`
          );
          this.campingSpot = response.data;
        } catch (error) {
          console.error("Error fetching camping spot:", error);
          this.campingSpot = null;
        }
      },
      async fetchBookedDates() {
        const spotId = this.$route.params.spotId;
        try {
          const response = await axios.get(
            `http://localhost:3002/api/booked-dates/${spotId}`
          );
          this.bookedDates = response.data
            .map(booking => {
              const start = this.parseDate(booking.start_date);
              const end = this.parseDate(booking.end_date);
              if (start && end) return { start, end };
              return null;
            })
            .filter(date => date !== null);
        } catch (error) {
          console.error("Error fetching booked dates:", error);
          this.bookedDates = [];
        }
      },
      parseDate(dateString) {
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? null : date;
      },
      async createBooking() {
        if (!this.bookingDates || this.bookingDates.length !== 2) {
          alert("Selecteer een start- en einddatum.");
          return;
        }
  
        try {
          const [start_date, end_date] = this.bookingDates;
          const bookingData = {
            user_id: 1, // Replace with real user ID
            camping_spot_id: this.campingSpot.id,
            start_date: start_date.toISOString().split("T")[0],
            end_date: end_date.toISOString().split("T")[0],
            status: "pending",
          };
  
          await axios.post("http://localhost:3002/api/bookings", bookingData);
          alert("Boeking succesvol!");
  
          // Redirect to the user main page
          this.$router.push("/user-dashboard");
        } catch (error) {
          console.error("Error creating booking:", error);
          alert("Kon de boeking niet maken.");
        }
      },
    },
    created() {
      this.fetchCampingSpot();
      this.fetchBookedDates();
    },
  };
  </script>
  
  <style scoped>
  .booking-page {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .booking-button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1.2rem;
    color: white;
    background-color: #4caf50;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .booking-button:hover {
    background-color: #45a049;
  }
  </style>