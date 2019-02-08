<template>
  <div class="flex justify-center items-center sm:items-end h-screen p-4">
  <transition appear name="slide-fade">
    <form method="POST" action="" @submit.prevent="onSubmit" class="w-full max-w-screen-sm">
      <label for="username-input" class="block text-blue-lightest text-base font-bold mb-1 cursor-pointer ml-1">Username</label>
      <input type="text" name="username" id="username-input" v-model="username" required placeholder="admin" autofocus autocomplete="off" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 mb-3 rounded focus:border-blue-light focus:outline-none appearance-none">
      <label for="password-input" class="block text-blue-lightest text-base font-bold mb-1 cursor-pointer ml-1">Password</label>
      <input type="password" name="password" id="password-input" v-model="password" required placeholder="admin" autocomplete="off" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 mb-3 rounded focus:border-blue-light focus:outline-none appearance-none">
      <button :disabled="disabled" class="button button-primary ml-1 sm:w-full disabled:bg-grey-dark disabled:cursor-not-allowed disabled:text-grey-darkest" type="submit">Login</button>
    </form>
  </transition>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";

export default {
  data() {
    return {
      username: null,
      password: null,
      disabled: false
    }
  },
  methods: {
    ...mapActions('auth', [
      'fetchToken'
    ]),
    ...mapMutations(["addNotification"]),
    onSubmit() {
      this.disabled = true;

      this.fetchToken({
        username: this.username, 
        password: this.password
      }).then(() => {
        this.$router.push(this.$router.history.current.query.redirectTo || '/');
      }).catch(() => {
        this.addNotification({
            type: "failure",
            text: "Login failed",
          })
        this.disabled = false;
      });
    }
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>


