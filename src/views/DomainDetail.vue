<template>
  <div>
    <form @submit.prevent="save" @reset.prevent="cancel" class="max-w-md">
      <fieldset class="form-fieldset">
        <legend class="form-legend">Basic Data</legend>
        <div class="mb-4">
          <label for="domain-field" class="form-label mb-1 ml-px">Domain</label>
          <input type="url" name="domain-field" id="domain-field" placeholder="https://domain.com" v-model="domain.domain" required class="form-input">
        </div>
        <div class="mb-1">
          <label for="redirect-field" class="form-label mb-1 ml-px">Redirect Target</label>
          <input type="url" name="redirect-field" id="redirect-field" v-model="domain.redirect" placeholder="https://redirect-target.com" required class="form-input">
        </div>
        <div class="flex mb-4">
          <input type="checkbox" name="promotable-field" id="promotable-field" class="mr-2" v-model="domain.promotable">
          <label for="promotable-field" class="form-label">Include Path and Query-String <span class="text-xs">(optional)</span></label>
        </div>
        <div>
          <label for="status-field" class="form-label mb-1 ml-px">HTTP Statuscode</label>
          <select name="status-field" id="status-field" v-model="domain.status" required class="bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none">
            <option value="200">300 - Multiple Choices</option>
            <option value="301" selected>301 - Moved Permanently</option>
            <option value="302">302 - Found</option>
            <option value="303">303 - See Other</option>
            <option value="304">304 - Not Modified</option>
            <option value="305">305 - Use Proxy</option>
            <option value="307">307 - Temporary Redirect</option>
            <option value="308">308 - Permanent Redirect</option>
          </select>
        </div>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="form-legend">Paths</legend>
        <domain-paths :paths="domain.paths"></domain-paths>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="form-legend">Additional Information</legend>
        <div>
          <label for="description-field" class="form-label mb-1 ml-px">Description <span class="text-xs">(optional)</span></label>
          <textarea rows="5" id="description-field" name="description-field" v-model="domain.description" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none"></textarea>
        </div>
      </fieldset>
      <div class="flex justify-between">
        <button class="text-white font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">Save</button>
        <button class="text-white font-bold rounded py-2 px-4 hover:bg-grey-dark border focus:border-blue-light focus:outline-none appearance-none" type="reset">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";
import DomainPaths from "../components/DomainPaths";

export default {
  name: "domain-detail",
  components: {
    DomainPaths
  },
  data() {
    return {
      domain: {}
    }
  },
  computed: {
    ...mapState("domains", [
      "currentDomain"
    ])
  },
  methods: {
    ...mapActions("domains", [
      "fetchOne",
      "saveOne"
    ]),
    reset() {
      this.domain = {
        status: '301'
      };
    },
    save() {
      this.saveOne(this.domain);
    },
    cancel() {
      this.reset();
    },
    load(domain) {
      this.fetchOne({domain}).then(response => {
        this.domain = {
          ...response.data
        };
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.reset();
    this.load(to.params.domain);

    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.reset();
      vm.load(to.params.domain);
    });
  }
}
</script>
