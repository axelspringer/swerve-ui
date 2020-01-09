<template>
  <div class="px-2">
    <h2 class="text-blue text-lg font-bold mb-1">Domains</h2>
    <input
      name="search-field"
      id="search-field"
      placeholder="Search..."
      v-on:keyup.enter="onFilter"
      required
      class="form-input mb-4"
    />
    <div @scroll="onScroll" class="overflow-auto h-24 md:h-64">
      <div v-if="isLoadingDomains" class="text-white no-underline">Loading...</div>
      <ul class="list-reset">
        <router-link
          v-for="domain of orderedDomains"
          :key="domain.domain"
          tag="li"
          :to="{name: 'domain', params: {domain: domain.domain}}"
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
  data() {
    return {
      filter: ""
    };
  },
  computed: {
    ...mapState("domains", ["domains"]),
    ...mapState(["endpoint"]),
    ...mapState(["isLoadingDomains"]),
    orderedDomains: function() {
      let sortDomains = Object.assign({}, this.domains);
      if (sortDomains.domains) {
        if (this.filter != "")
          sortDomains.domains = sortDomains.domains.filter(domain =>
            domain.domain.startsWith(this.filter)
          );
        return [...sortDomains.domains].sort(function(a, b) {
          if (a.domain < b.domain) return -1;
          if (a.domain > b.domain) return 1;
          return 0;
        });
      }
      return 0;
    }
  },
  methods: {
    ...mapActions("domains", ["fetchList"]),
    ...mapMutations(["addNotification", "updateDomainsLoadingStatus"]),
    onFilter(ev) {
      this.filter = ev.target.value;
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        if (this.domains.cursor != "EOF") {
          this.fetchList({
            endpoint: this.endpoint,
            cursor: this.domain.cursor
          }).catch(() => {
            this.addNotification({
              type: "failure",
              text: "Domains could not be loaded"
            });
          });
        }
      }
    }
  },
  created() {
    this.updateDomainsLoadingStatus(true);
    this.fetchList({
      endpoint: this.endpoint,
      cursor: "reload"
    })
      .then(() => {
        this.updateDomainsLoadingStatus(false);
      })
      .catch(err => {
        this.updateDomainsLoadingStatus(false);
        if (err.toString() == "Error: Unauthorized") {
          this.$router.push({ name: "login" });
          return;
        }
        this.addNotification({
          type: "failure",
          text: "Domains could not be loaded"
        });
      });
  }
};
</script>
