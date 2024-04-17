<template>
  <q-page class="flex flex-center">
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">Employee Login</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit="login" @reset="reset">
          <q-input v-model="email" filled label="Email" type="email" />
          <q-input v-model="password" filled label="Password" type="password" />

          <div>
            <q-btn label="Login" type="submit" color="primary" class="full-width" />
          </div>

          <q-banner v-if="loginError" class="bg-red-5 text-white">
            {{ errorMessage }}
          </q-banner>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { users } from '../data/data'

export default {
  data() {
    return {
      email: '',
      password: '',
      loginError: false,
      errorMessage: ''
    }
  },
  methods: {
    login() {
      const user = users.find((u) => u.email === this.email)
      if (!user) {
        this.errorMessage = 'Invalid email address'
        this.loginError = true
      } else if (user.password !== this.password) {
        this.errorMessage = 'Invalid password'
        this.loginError = true
      } else {
        sessionStorage.setItem('userLoggedIn', 'true') // Set user as logged in
        localStorage.setItem('user', JSON.stringify(user))
        const redirectUrl = this.$route.query.redirect || '/app'
        this.$router.push(redirectUrl) // Navigate based on redirect query if available, otherwise to app
      }
    }
  }
}
</script>



