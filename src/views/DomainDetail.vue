<template>
  <div>
    <form @submit.prevent="save" @reset.prevent="cancel" class="max-w-md">
      <fieldset class="mb-3 pb-4 border-b border-blue">
        <legend class="text-blue text-lg font-bold mb-2">Basic Data</legend>
        <div class="mb-4">
          <label for="domain-field" class="block text-blue-lightest text-base font-bold mb-1 ml-px cursor-pointer">Domain</label>
          <input type="url" name="domain-field" id="domain-field" placeholder="https://domain.com" v-model="domain" required class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none">
        </div>
        <div class="mb-1">
          <label for="redirect-field" class="block text-blue-lightest text-base font-bold mb-1 ml-px cursor-pointer">Redirect Target</label>
          <input type="url" name="redirect-field" id="redirect-field" value="" placeholder="https://redirect-target.com" required class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none">
        </div>
        <div class="flex mb-4">
          <input type="checkbox" name="promotable-field" id="promotable-field" class="mr-2">
          <label for="promotable-field" class="block text-blue-lightest text-base font-bold cursor-pointer">Include Path and Query-String <span class="text-xs">(optional)</span></label>
        </div>
        <div>
          <label for="status-field" class="block text-blue-lightest text-base font-bold mb-1 ml-px cursor-pointer">HTTP Statuscode</label>
          <select name="status-field" id="status-field" required class="bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none">
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
      <fieldset class="mb-3 pb-4 border-b border-blue">
        <legend class="text-blue text-lg font-bold mb-2">Paths</legend>
        <domain-paths></domain-paths>
      </fieldset>
      <fieldset>
        <legend class="text-blue text-lg font-bold mb-2">Additional Information</legend>
        <div>
          <label for="description-field" class="block text-blue-lightest text-base font-bold mb-1 ml-px cursor-pointer">Description <span class="text-xs">(optional)</span></label>
          <textarea rows="5" id="description-field" name="description-field" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 mb-3 rounded focus:border-blue-light focus:outline-none appearance-none"></textarea>
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
import {mapState, mapMutations} from "vuex";
import DomainPaths from "../components/DomainPaths";

export default {
  name: "domain-detail",
  components: {
    DomainPaths
  },
  computed: {
    domain: {
      get() {
        return '';
      },
      set(value) {

      }
    },
    ...mapState('domains', [
      'currentDomain'
    ])
  },
  methods: {
    save() {
      console.log("save");
    },
    cancel() {
      console.log("cancel");
    }
  }
}
</script>
