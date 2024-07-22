<template>
  <div>
    <div class="v-sheet-container">
      <v-sheet :elevation="5" border rounded class="half-sheet" color="#F1F1F1" v-if="user">
        <div class="title flex justify-end text-2xl font-bold py-4">
          <h1 class="flex-grow text-center">My Profile</h1>


          <button
              @click="signOut"
              class="block px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-700 rounded"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
          >
            <v-icon dark left color="white"> mdi-logout</v-icon>
            Logout
          </button>
        </div>
        <v-divider
            :thickness="2"
            class="border-black border-opacity-50 my-4"
        ></v-divider>
        <div class="InfoCont">
          <br/>
          <v-icon large dark left color="#03071E"> mdi-account-circle </v-icon>
            <v-text-field
                class="value"
                v-model="user.full_name"
                outlined
                dense
                label="Full name"
                required
                readonly
                :rules="[
                (v) => !!v || 'Name is required',
                (v) =>
                  (v.length <= 30 && v.length >= 3) ||
                  'El nombre debe tener entre 3 y 30 caracteres',
              ]"
            ></v-text-field>
        </div>
      </v-sheet>


    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores";
import UsersServices from "@/services/UsersServices";

export default {
  data() {
    return {
      loading: false,
      user: {},
    };
  },

  methods: {
    signOut() {
      this.loading = true;
      const authStore = useAuthStore();
      authStore.logout();
      this.loading = false;
    },
    async getMyUser() {
      this.loading = true;
      this.user = await UsersServices.getMyUser();
      this.loading = false;
    },
    async updateUser() {
      if (this.$refs.formUpdateUser.validate()) {
        this.loading = true;
        await UsersServices.update(this.user);
        await this.getMyUser();
        this.loading = false;
      }
    },

  },

  mounted() {
    this.getMyUser();
  },
};
</script>

<style>
.v-sheet-container {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
}

.half-sheet {
  padding: 20px;
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}

.footer {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

.InfoCont {
  align-items: center;
  margin-top: 5vh;
  width: 70%;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
  "Lucida Sans", Arial, sans-serif;
}

.label {
  width: 300px;
  display: inline-block;
  vertical-align: top;
  font-weight: bold;
  color: #121212;
  font-size: 1.2em;
  margin-top: 10px;
  margin-left: 10px;
}

.value {
  width: 95%;
  display: inline-block;
  vertical-align: top;
  color: #424242;
  font-size: 1.2em;
  margin-top: 10px;
  margin-left: 10px;
}

.title {
  width: 100%;
  align-items: center;
  color: #000000;
  margin-bottom: 10px;
}

.v-divider {
  opacity: 0.1;
  margin-bottom: 10px;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .v-sheet-container {
    flex-direction: column;
  }

  .half-sheet {
    width: 90%;
    height: auto;
    margin-bottom: 20px;
  }
}

/* END: Custom Styles */
</style>
