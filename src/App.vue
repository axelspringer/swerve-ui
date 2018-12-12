<template>
  <div id="swerve-ui" class="bg-blue-darker w-screen h-full min-h-screen">
    <header>

    </header>
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/domains">About</router-link>
    </div>

    -->
  
    <!--<transition name="slide-fade" mode="out-in">-->
      <router-view></router-view>
    <!--</transition>-->
    <footer>

    </footer>
  </div>
</template>

<style>


#swerve-ui {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
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
