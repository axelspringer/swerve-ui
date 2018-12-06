<template>
  <div>
    <form method="POST" action="" @submit.prevent="onSubmit">
      <label for="username-input" class="block text-blue-lightest text-lg font-bold mb-1 cursor-pointer">Username</label>
      <input type="text" name="username" id="username-input" v-model="username" required placeholder="admin" autofocus autocomplete="off" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 mb-3 rounded focus:border-blue-light focus:outline-none appearance-none">
      <label for="password-input" class="block text-blue-lightest text-lg font-bold mb-1 cursor-pointer">Password</label>
      <input type="password" name="password" id="password-input" v-model="password" required placeholder="admin" autocomplete="off" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 mb-3 rounded">
      <button class="text-white font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light" type="submit">Login</button>
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
      }).then(() => {
        this.$router.push(this.$router.history.current.query.redirect || '/');
      });
    }
  }
}
</script>

