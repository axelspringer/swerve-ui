<template>
  <div>
    <form method="POST" action="" @submit.prevent="onSubmit">
      <label for="username-input">Username</label>
      <input type="text" name="username" id="username-input" v-model="username" required>
      <label for="password-input">Password</label>
      <input type="password" name="password" id="password-input" v-model="password" required>
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    ...mapActions('auth', [
      'fetchToken'
    ]),
    onSubmit() {
      this.fetchToken({
        username: this.username, 
        password: this.password
      });
    }
  }
}
</script>

