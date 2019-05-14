<template>
  <div>
    <form @submit.prevent="save" @reset.prevent="cancel" class="w-full">
      <fieldset class="form-fieldset">
        <legend class="form-legend">Basic Data</legend>
        <div class="mb-4">
          <label for="domain-field" class="form-label mb-1 ml-px">Domain</label>
          <input
            name="domain-field"
            id="domain-field"
            placeholder="domain.com"
            v-model="domain.domain"
            required
            class="form-input"
          >
        </div>
        <div class="mb-1">
          <label for="redirect-field" class="form-label mb-1 ml-px">Redirect</label>
          <input
            name="redirect-field"
            id="redirect-field"
            v-model="domain.redirect"
            placeholder="redirect.com"
            required
            class="form-input"
          >
        </div>
        <div class="flex mb-4">
          <input
            type="checkbox"
            name="promotable-field"
            id="promotable-field"
            class="mr-2 bg-blue-dark"
            v-model="domain.promotable"
          >
          <label for="promotable-field" class="form-label">
            Include Path and Query-String
            <span class="text-xs">(optional)</span>
          </label>
        </div>
        <div>
          <label for="code-field" class="form-label mb-1 ml-px">HTTP Statuscode</label>
          <select
            name="code-field"
            id="code-field"
            v-model.number="domain.code"
            required
            class="bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none"
          >
            <option :value="undefined">Please choose ...</option>
            <option value="300">300 - Multiple Choices</option>
            <option value="301">301 - Moved Permanently</option>
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
        <domain-paths
          :paths="domain.paths"
          :target="domain.redirect"
          @add="addPath"
          @update="updatePath"
          @remove="removePath"
        ></domain-paths>
      </fieldset>
      <fieldset class="form-fieldset">
        <legend class="form-legend">Additional Information</legend>
        <div>
          <label for="description-field" class="form-label mb-1 ml-px">
            Description
            <span class="text-xs">(optional)</span>
          </label>
          <textarea
            rows="3"
            id="description-field"
            name="description-field"
            v-model="domain.description"
            class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none"
          ></textarea>
        </div>
      </fieldset>
      <div class="flex justify-between">
        <button class="button button-primary" type="submit">Save</button>
        <button
          v-if="!isNew"
          @click.prevent="deleteDomain"
          class="button bg-crimson hover:bg-cinnabar"
        >Delete Domain</button>
        <button class="button button-secondary" type="reset">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import DomainPaths from "../components/DomainPaths";

export default {
  name: "domain-detail",
  components: {
    DomainPaths
  },
  data() {
    return {
      isNew: false,
      domain: {}
    };
  },
  computed: {
    ...mapState("auth", ['endpoint']),
  },
  methods: {
    ...mapActions("domains", [
      "fetchOne",
      "createOne",
      "updateOne",
      "deleteOne",
      "fetchList"
    ]),
    ...mapMutations(["addNotification"]),
    reset() {
      this.domain = {};
    },
    reload() {
      this.fetchList({
        endpoint: this.endpoint,
        cursor: "reload"
        }).catch(() => {
        this.addNotification({
          type: "failure",
          text: "Domains could not be loaded"
        });
      });
      this.cancel();
    },
    save() {
      if (this.isNew) {
        this.createOne({
        endpoint: this.endpoint,
        domain: this.domain
        })
          .then(() => {
            this.addNotification({
              type: "success",
              text: "Domain created"
            });
            this.reload();
          })
          .catch(() => {
            this.addNotification({
              type: "failure",
              text: "Domain could not be created"
            });
          });
        return;
      } else
        this.updateOne({
          endpoint: this.endpoint,
          domain: this.domain,
        })
          .then(() => {
            this.addNotification({
              type: "success",
              text: "Domain updated"
            });
            this.reload();
          })
          .catch(() => {
            this.addNotification({
              type: "failure",
              text: "Domain could not be updated"
            });
          });
    },
    cancel() {
      this.reset();
      this.$router.push({ name: "domains" });
    },
    deleteDomain() {
      this.deleteOne({
        endpoint: this.endpoint,
        domain: this.domain
        })
        .then(() => {
          this.addNotification({
            type: "success",
            text: "Domain deleted"
          });
          this.reload();
        })
        .catch(() => {
          this.addNotification({
            type: "failure",
            text: "Domain could not be deleted"
          });
        });
    },
    load(id) {
      this.fetchOne({
        endpoint: this.endpoint,
        id
      })
        .then(response => {
          this.domain = {
            paths: [],
            code: "301",
            ...response.data
          };
        })
        .catch(() => {
          this.addNotification({
            type: "failure",
            text: "Domain could not be loaded"
          });
        });
    },
    loadNew() {
      this.domain = {
        paths: []
      };
    },
    addPath(path) {
      this.domain.paths.push(path);
    },
    updatePath(payload) {
      payload.path.from = payload.from;
      payload.path.to = payload.to;
    },
    removePath(path) {
      this.domain.paths = this.domain.paths.filter(p => p !== path);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.reset();

    this.isNew = to.params.domain === "new";

    if (!this.isNew) {
      this.load(to.params.domain);
    } else this.loadNew();

    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.reset();

      vm.isNew = to.params.domain === "new";

      if (!vm.isNew) {
        vm.load(to.params.domain);
      } else vm.loadNew();
    });
  }
};
</script>
