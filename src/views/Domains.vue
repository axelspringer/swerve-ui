<template>
  <div>
    <h1>Domains</h1>

    <ul>
      <li><router-link to="/domains/123">123</router-link></li>
      <li><router-link to="/domains/456">456</router-link></li>
      <li><router-link to="/domains/789">789</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "domains"
}
</script>
