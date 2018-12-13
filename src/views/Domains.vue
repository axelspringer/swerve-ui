<template>
  <div class="flex h-full py-4">
    <domain-list class="w-1/6"></domain-list>
    <router-view class="w-5/6"></router-view>
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
