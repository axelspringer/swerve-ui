<template>
  <div class="h-full w-full md:flex text-center py-4 px-8">
    <domain-list class="m-auto w-full mb-16 md:m-0 md:w-1/6 overflow-auto"></domain-list>
    <div class="w-12 h-full"></div>
    <router-view class="m-auto w-full md:m-0 md:w-auto md:w-2/3"></router-view>
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
