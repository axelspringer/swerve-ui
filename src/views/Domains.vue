<template>
  <div>
    <h1>Domains</h1>
    <div class="flex h-full">
      <domain-list class="w-1/4"></domain-list>
      <router-view class="w-3/4"></router-view>
    </div>
  </div>
</template>

<script>
import DomainList from "./DomainList";

export default {
  name: "domains",
  components: {
    DomainList
  }
}
</script>
