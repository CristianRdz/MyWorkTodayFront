<template>
  <div>
    <header class="w-full">
      <v-tabs background-color="primary" color="white" dark fixed-tabs>
        <v-tab v-for="item in items" :key="item.title" :to="item.to">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  setup() {
    const items = [
      {title: 'Home', icon: 'mdi-home', to: '/home/inicio'},
      {title: 'Login', icon: 'mdi-login', to: '/home/login'},
    ];
    return {items};
  }
}
</script>

<style scoped>
.v-app-bar {
  background-color: #6A040F;
}

.v-toolbar {
  color: white;
}

.v-btn {
  color: white;
}

.v-icon {
  color: white;
}

/* Estilos personalizados según sea necesario */
</style>