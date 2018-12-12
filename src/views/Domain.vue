<template>
  <div>
    <h1>Domain {{$route.params.domain}}</h1>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "domain",
  computed: {
    ...mapState('domains', [
      'currentDomain'
    ])
  },
  methods: {
    ...mapActions('domains', [
      'fetchOne'
    ]),
    load(domain) {
      this.fetchOne({domain});
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.load(to.params.domain);

    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.load(to.params.domain));
  }
}
</script>
