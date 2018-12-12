<template>
  <div>
    <ul class="list-reset">
      <li class="py-2 pl-1" v-for="domain of domains" :key="domain.ID">
        <router-link :to="{name: 'domain', params: {domain: domain.ID}}" class="text-white no-underline">{{domain.Domain}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: "domain-list",
  computed: {
    ...mapState('domains', [
      'domains'
    ])
  },
  methods: {
    ...mapActions('domains', [
      'fetchList'
    ])
  },
  created() {
    this.fetchList();
  }
}
</script>
