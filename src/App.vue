<template>
  <div id="swerve-ui" class="bg-blue-darker w-screen h-full min-h-screen">
    <header class="flex px-2 items-center h-10 border-b border-blue-dark2 bg-blue-darkest">
      <img src="./assets/logo.svg" class="w-8">
      <pre class="text-blue-lighter font-bold font-sans">swərv</pre>
    </header>
  
    <!--<transition name="slide-fade" mode="out-in">-->
      <router-view></router-view>
    <!--</transition>-->
    <footer class="flex px-2 items-center h-16 border-t border-blue-dark2 bg-blue-darkest">

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
