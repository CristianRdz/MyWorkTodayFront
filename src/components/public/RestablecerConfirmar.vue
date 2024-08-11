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
          Recover password
        </h2>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Enter your email to recover your password
        </h1>
        <v-form ref="form" v-model="valid" class="space-y-4" @submit.prevent="onSubmit">
          <div>
            <v-text-field v-model="username" :rules="usernameRules" counter
                          hint="Email is required" label="Email" name="input-10-1"></v-text-field>

            <div>
              <v-text-field v-model="verification_code" :rules="codeRules" counter
                            hint="Code is required" label="Recovery Code"
                            name="input-10-1"></v-text-field>
            </div>
            <div>
              <v-text-field v-model="new_password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="passwordRules" :type="show1 ? 'text' : 'password'" counter
                            hint="Password required" label="password" name="input-10-1"
                            @click:append="show1 = !show1"></v-text-field>
            </div>
            <div>
              <v-btn
                  :loading="loading"
                  class="w-full bg-fdoscuro text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                  color="primary"
                  type="submit"
              >
                Change password
              </v-btn>
            </div>
          </div>
        </v-form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            Remember your password?
            <a class="text-black hover:underline" href="/home/login/">Click here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {confirmChange} from "@/services/RecuperarContraService";
import router from "@/router";

export default {
  data() {
    return {
      valid: true,
      loading: false,
      verification_code: '',
      username: '',
      new_password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Minimum 8 characters',
        v => (v && /[A-Z]/.test(v)) || 'At least one uppercase letter',
        v => (v && /[a-z]/.test(v)) || 'At least one lowercase letter',
        v => /\d/.test(v) || 'At least one number',
        v => (v && !/\s/.test(v)) || 'No white spaces',
        v => (v && /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]+/.test(v)) || 'At least one special character',
      ],
      codeRules: [
        v => !!v || 'Code is required',
      ],
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      show1: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let changeDto = {
          username: this.username,
          verification_code: this.verification_code,
          new_password: this.new_password,
        };
        const emailsent = await confirmChange(changeDto);
        this.loading = false;
        if (emailsent) {
          await router.push("/home/login/");
        } else {
          await router.push("/recover/");
        }
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