<template>
  <div class="h-full flex text-center py-4">
    <domain-list class="w-1/5"></domain-list>
    <router-view class="w-3/5"></router-view>
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
