<template>
  <header class="flex justify-between px-2 items-center h-10 border-b border-blue-dark2 bg-blue-darkest">
    <div class="flex items-center">
      <img src="../assets/logo.svg" class="w-6">
      <pre class="ml-1 text-blue-lighter font-bold font-sans">swərv</pre>
    </div>
    <div>
      <button @click.prevent="logout" class="button button-secondary button-small mr-4" type="submit">Logout</button>
    </div>
  </header>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "app-header",
  methods: {
    ...mapMutations('auth', [
      'clearLoginData'
    ]),
    logout() {
      this.clearLoginData();
      this.$router.push({name: "login"});
    }
  }
}
</script>
