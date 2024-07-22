<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 text-center">Welcome to MyWorkToday</h1>
        <p class="headline text-center">Your ultimate business task management solution.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-img src="https://www.inabaweb.com/wp-content/uploads/2023/04/Google-tasks-1072x660.png" alt="TaskMaster" width="100%"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="title">Manage your tasks efficiently</h2>
        <p class="body-1">With TaskMaster, you can easily create, assign, and track tasks across your entire organization. No more missed deadlines or forgotten tasks.</p>
        <v-btn color="primary" large to="/admin/tasks">Get Started</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {

}
</script>
