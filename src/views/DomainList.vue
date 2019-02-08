<template>
  <div class="px-2">
    <h2 class="text-blue text-lg font-bold mb-1">Domains</h2>
    <div class="overflow-auto h-24 md:h-auto">
    <ul class="list-reset">
      <router-link v-for="domain of domains" :key="domain.id" tag="li" :to="{name: 'domain', params: {domain: domain.id}}" class="router-link">
        <a class="text-white no-underline">{{domain.domain}}</a>
      </router-link>
    </ul>
    </div>
    <div>
      <router-link to="/domains/new" class="button button-primary inline-block mt-4 no-underline">New Domain</router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex";

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
    ...mapMutations(["addNotification"]),
  },
  created() {
    this.fetchList().catch(err => {
          console.log("err creating:", err);
          this.addNotification({
            type: "failure",
            text: "Domains could not be loaded"
          })
          });
  }
}
</script>
