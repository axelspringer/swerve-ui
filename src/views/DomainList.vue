<template>
  <div class="px-2">
    <h2 class="text-blue text-lg font-bold">Domains</h2>
    <div>
      <!--<router-link to="/new/foo" class="text-white font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none">New Entry</router-link>-->
    </div>
    <ul class="list-reset">
      <li class="py-2 border-b border-blue-dark2" v-for="domain of domains" :key="domain.ID">
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
    ]),
    newEntry() {

    }
  },
  created() {
    this.fetchList();
  }
}
</script>
