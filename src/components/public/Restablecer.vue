<template>
  <div class="flex h-screen">
    <div
        class="hidden lg:flex w-1/2 items-center justify-center bg-fdoscuro text-fdoscuro"
    >
      <div class="max-w-md text-center">
        <img
            class="fixed left-[7%] top-[15%] logo"
            src="https://myworktoday-images.s3.amazonaws.com/images/icon.svg"
            alt=""
            srcset=""
        />
        <section class="rotate left-[7%] top-[15%]">
          <svg viewBox="0 0 100 100" class="">
            <path
                id="circlePath"
                fill="none"
                stroke-width="5"
                stroke="none"
                d="
            M 10, 50
            a 40,40 0 1,1 80,0
            a 40,40 0 1,1 -80,0
          "
            />
            <text
                stroke="black"
                stroke-width="0.45"
                id="text"
                font-family="monospace"
                font-size="12.7"
                font-weight="bolder"
                fill="#e2e2e2"
            >
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

      <div class="max-w-md w-full p-6" style="overflow-y: auto; max-height: calc(100vh - 4rem);">

        <h1 class="text-3xl font-bold mb-6 text-black text-center lg:hidden">
          MyWorkToday
        </h1>
        <h2
            class="text-3xl font-semibold mb-6 text-black text-center sm:text-2xl lg:text-3xl"
        >
          Recover password
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Enter your email to recover your password
        </h1>
        <v-form class="space-y-4" @submit.prevent="onSubmit" ref="form">
          <v-text-field
              for="email"
              id="username"
              name="username"
              v-model="username"
              :rules="emailRules"
              label="email"
              required
              counter
          ></v-text-field>
          <div>
            <v-btn
                :loading="loading"
                type="submit"
                color="primary"
                class="w-full bg-fdoscuro text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
            >
              Recover password
            </v-btn>
          </div>
        </v-form>


      </div>
    </div>
  </div>
</template>

<script>
import {forgotPassword} from "@/services/RecuperarContraService";

export default {

  data() {
    return {
      username: "",
      loading: false,
      emailRules: [
        (v) => !!v || "The email is required",
        (v) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || "The email has an incorrect format"],
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let recuperarDto = {
          username: this.username,
        };
        await forgotPassword(recuperarDto);
        this.loading = false;
        await this.$router.push("/recover/");
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

/* Estilo para hacer invisible el scrollbar */
::-webkit-scrollbar {
  width: 0; /* Para Chrome, Safari, y Opera */
}

::-webkit-scrollbar-track {
  background: transparent; /* Para Chrome, Safari, y Opera */
}

::-webkit-scrollbar-thumb {
  background: transparent; /* Para Chrome, Safari, y Opera */
}
</style>