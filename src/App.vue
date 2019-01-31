<template>
  <div id="swerve-ui" class="flex flex-col bg-blue-darker w-screen h-full min-h-screen">
    <loading-bar v-if="isLoading"></loading-bar>
    <notifications-bar class="mt-4 z-10"></notifications-bar>
    <app-header></app-header>
  
    <!--<transition name="slide-fade" mode="out-in">-->
      <router-view class="flex-1"></router-view>
    <!--</transition>-->
    <footer class="flex px-2 items-center h-16 border-t border-blue-dark2 bg-blue-darkest"></footer>
  </div>
</template>

<script>
import {mapState} from "vuex";

import AppHeader from "./components/AppHeader";
import LoadingBar from "./components/LoadingBar";
import NotificationsBar from "./components/NotificationsBar";

export default {
  components: {
    AppHeader,
    LoadingBar,
    NotificationsBar
  },
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style>
#swerve-ui {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
