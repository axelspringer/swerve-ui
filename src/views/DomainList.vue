<template>
  <div class="px-2">
    <h2 class="text-blue text-lg font-bold">Domains</h2>
    <ul class="list-reset">
      <router-link v-for="domain of domains" :key="domain.ID" tag="li" :to="{name: 'domain', params: {domain: domain.ID}}" class="router-link">
        <a class="text-white no-underline">{{domain.Domain}}</a>
      </router-link>
    </ul>
    <div>
      <router-link to="/domains/new" class="inline-block text-ebony-clay-2 font-bold rounded py-1 px-4 mt-4 no-underline bg-sun hover:bg-sunglow focus:border-sun focus:outline-none">New Domain</router-link>
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
    ]),
    newEntry() {

    }
  },
  created() {
    this.fetchList();
  }
}
</script>
