<template>
  <div>
    <h2>Owner Access</h2>
    <button @click="goToSignUp">Sign Up</button>
    <button @click="goToLogin">Login</button>
  </div>
</template>

<script>
export default {
  name: 'OwnerEntry',
  methods: {
    goToSignUp() {
      this.$router.push('/owner-signup');
    },
    goToLogin() {
      this.$router.push('/owner-login');
    },
  },
};
</script>