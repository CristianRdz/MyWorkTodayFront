<template>
  <div class="flex h-screen">
    <div class="hidden lg:flex w-1/2 items-center justify-center bg-fdoscuro text-fdoscuro">

      <div class="max-w-md text-center">
        <img class="fixed left-[7%] top-[15%] logo" src="https://myworktoday-images.s3.amazonaws.com/images/icon.svg" alt="logo">
        <section class="rotate left-[7%] top-[15%]">
          <svg viewBox="0 0 100 100" class="">
            <path id="circlePath" fill="none" stroke-width="5" stroke="none" d="
          M 10, 50
          a 40,40 0 1,1 80,0
          a 40,40 0 1,1 -80,0
        "/>
            <text stroke="black" stroke-width="0.45" id="text" font-family="monospace" font-size="12"
                  font-weight="bolder" fill="#e2e2e2">
              <textPath id="textPath" href="#circlePath">
              📝 MyWorkToday 📊 MyWorkToday 📅 MyWorkToday
              </textPath>
            </text>
          </svg>
        </section>
      </div>
    </div>
    <!-- Right Pane -->
    <div class="w-full bg-gray-200 lg:w-1/2 flex items-center justify-center">

      <div class="max-w-md w-full p-6">
        <h1 class="text-3xl font-bold mb-6 text-black text-center lg:hidden">
          MyWorkToday
        </h1>
        <h2 class="text-3xl font-semibold mb-6 text-black text-center sm:text-2xl lg:text-3xl">
          Login
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Welcome to MyWorkToday
        </h1>
        <v-form class="space-y-4" @submit.prevent="onSubmit" ref="form" v-model="valid">
          <div>
            <v-text-field for="email" id="correo" name="correo" v-model="correo" :rules="emailRules"
                          label="email" required></v-text-field>
          </div>

          <div>
            <v-text-field v-model="contrasenia" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1"
                          label="password" hint="The password is required" counter @click:append="show1 = !show1"></v-text-field>
          </div>
          <div>
            <div class="mt-4 text-sm text-gray-600 text-center">
              <p>
                Forgot your password?
                <a href="/recover/email/" class="text-black hover:underline">Click here</a>
              </p>
              <p>
                You have a code to recover your password?
                <a href="/recover/" class="text-black hover:underline">Click here</a>
              </p>

              <p>
                You are new here? Confirm your account
                <a href="/setPassword/" class="text-black hover:underline">Click here</a>
              </p>
            </div>
            <v-btn
                :loading="loading"
                type="submit"
                color="primary"
                class="w-full bg-fdoscuro text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Login
            </v-btn>
            
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      correo: '',
      contrasenia: '',
      emailRules: [
        v => !!v || 'An email is required',
        (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || "El correo electronico tiene un formato incorrecto",
      ],
      passwordRules: [
        v => !!v || 'A password is required',
      ],
      show1: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        const authStore = useAuthStore();
        await authStore.login(this.correo, this.contrasenia);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.rotate {
  position: fixed;
  width: 30rem;
  animation: spin 50s linear infinite;
  padding: 20px;
}

.logo {
  height: 30rem;
  width: 30rem;
}


@keyframes spin {
  0% {
    transform: rotate(0deg);
    /* Rotación inicial */
  }

  100% {
    transform: rotate(360deg);
    /* Rotación completa */
  }
}
</style>