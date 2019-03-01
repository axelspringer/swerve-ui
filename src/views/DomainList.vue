<template>
  <div class="px-2">
    <h2 class="text-blue text-lg font-bold mb-1">Domains</h2>
    <div class="overflow-auto h-24 md:h-64">
      <ul class="list-reset">
        <router-link
          v-for="domain of orderedDomains"
          :key="domain.id"
          tag="li"
          :to="{name: 'domain', params: {domain: domain.id}}"
          class="router-link"
        >
          <a class="text-white no-underline">{{domain.domain}}</a>
        </router-link>
      </ul>
    </div>
    <div>
      <router-link
        to="/domains/new"
        class="button button-primary inline-block mt-4 no-underline"
      >New Domain</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "domain-list",
  computed: {
    ...mapState("domains", ["domains"]),
    orderedDomains: function() {
      let sortDomains = JSON.parse(JSON.stringify(this.domains));
      return sortDomains.sort(function(a, b) {
        if (a.domain < b.domain) return -1;
        if (a.domain > b.domain) return 1;
        return 0;
      });
    }
  },
  methods: {
    ...mapActions("domains", ["fetchList"]),
    ...mapMutations(["addNotification"])
  },
  created() {
    this.fetchList().catch(() => {
      this.addNotification({
        type: "failure",
        text: "Domains could not be loaded"
      });
    });
  }
};
</script>
