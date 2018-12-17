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
        <domain-paths :paths="domain.paths" :target="domain.redirect"></domain-paths>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="form-legend">Additional Information</legend>
        <div>
          <label for="description-field" class="form-label mb-1 ml-px">Description <span class="text-xs">(optional)</span></label>
          <textarea rows="3" id="description-field" name="description-field" v-model="domain.description" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none"></textarea>
        </div>
      </fieldset>
      <div class="flex justify-between">
        <button class="text-ebony-clay-2 font-bold rounded py-1 px-4 bg-sun hover:bg-sunglow focus:border-sun focus:outline-none appearance-none" type="submit">Save</button>
        <button v-if="!isNew" @click.prevent="deleteDomain" class="text-ebony-clay-2 font-bold rounded py-1 px-4 bg-crimson hover:bg-cinnabar focus:border-blue-light focus:outline-none appearance-none">Delete Domain</button>
        <button class="text-athens-gray font-bold rounded py-1 px-4 bg-oxford-blue hover:bg-grey-dark focus:border-blue-light focus:outline-none appearance-none" type="reset">Cancel</button>
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
      domain: {},
      isNew: false
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
      "createOne",
      "updateOne"
    ]),
    reset() {
      this.domain = {
        status: '301'
      };
    },
    save() {
      if (this.isNew) {
        this.saveOne(this.domain);
        return;
      }

      this.updateOne(this.domain);
    },
    cancel() {
      this.reset();
      this.$router.push({name: "domains"});
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

    this.isNew = to.params.domain === 'new';

    if (!this.isNew) {
      this.load(to.params.domain);
    }

    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.reset();

      vm.isNew = to.params.domain === 'new';

      if (!vm.isNew) {
        vm.load(to.params.domain);
      }
    });
  }
}
</script>
