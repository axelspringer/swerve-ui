<template>
  <div class="px-2">
    <h2 class="text-blue text-lg font-bold">Domains</h2>
    <ul class="list-reset">
      <router-link v-for="domain of domains" :key="domain.id" tag="li" :to="{name: 'domain', params: {domain: domain.id}}" class="router-link">
        <a class="text-white no-underline">{{domain.domain}}</a>
      </router-link>
    </ul>
    <div>
      <router-link to="/domains/new" class="button button-primary inline-block mt-4 no-underline">New Domain</router-link>
    </div>
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
