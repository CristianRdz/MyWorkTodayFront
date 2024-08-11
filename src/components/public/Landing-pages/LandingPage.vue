<template>
  <div class="landing-page">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="display-2 text-center">Welcome to MyWorkToday</h1>
          <p class="headline text-center">Your ultimate business task management solution.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-img src="https://myworktoday-images.s3.amazonaws.com/images/banner.webp" alt="TaskMaster" width="100%"></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <h2 class="title">Manage your tasks efficiently</h2>
          <p class="body-1">With TaskMaster, you can easily create, assign, and track tasks across your entire organization. No more missed deadlines or forgotten tasks.</p>
          <v-btn color="primary" large to="/home/login">Get Started</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
};
</script>

<style scoped>
.landing-page {
  padding: 2em 0;
}
</style>