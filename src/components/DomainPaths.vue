<template>
  <div>
    <div v-if="!showForm">
      <ul class="list-reset">
        <li class="flex mb-1 pb-1 border-b border-blue-dark2">
          <div>
            <div class="text-blue-lightest text-base font-bold mr-1 mb-1">From</div>
            <div class="text-blue-lightest text-base font-bold mr-1">To</div>
          </div>
          <div class="flex-1">
            <div class="text-white">/some/from/path</div>
            <div class="text-white">/some/to/path</div>
          </div>
          <div class="self-center">
            <button @click.prevent="edit" class="text-white text-xs font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">Edit</button>
          </div>
        </li>
        <li class="flex mb-1 pb-1 border-b border-blue-dark2">
          <div>
            <div class="text-blue-lightest text-base font-bold mr-1 mb-1">From</div>
            <div class="text-blue-lightest text-base font-bold mr-1">To</div>
          </div>
          <div class="flex-1">
            <div class="text-white">/some/from/path</div>
            <div class="text-white">/some/to/path</div>
          </div>
          <div class="self-center">
            <button @click.prevent="edit" class="text-white text-xs font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">Edit</button>
          </div>
        </li>
        <li class="flex mb-3">
          <div>
            <div class="text-blue-lightest text-base font-bold mr-1 mb-1">From</div>
            <div class="text-blue-lightest text-base font-bold mr-1">To</div>
          </div>
          <div class="flex-1">
            <div class="text-white">/some/from/path</div>
            <div class="text-white">/some/to/path</div>
          </div>
          <div class="self-center">
            <button @click.prevent="edit" class="text-white text-xs font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">Edit</button>
          </div>
        </li>
      </ul>
      <button @click.prevent="showForm = true" class="text-white font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">New Path</button>
    </div>
    <div v-if="showForm">
      <div class="mb-1">
        <label for="from-field" class="block text-blue-lightest text-base font-bold mb-1 cursor-pointer">From</label>
        <input v-model="from" type="text" name="from-field" id="from-field" value="" placeholder="/from/path" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none">
      </div>
      <div class="mb-4">
        <label for="to-field" class="block text-blue-lightest text-base font-bold mb-1 cursor-pointer">To</label>
        <input v-model="to" type="text" name="to-field" id="to-field" value="" placeholder="/to/path" class="w-full bg-blue-dark border border-blue-dark2 text-l text-white p-2 rounded focus:border-blue-light focus:outline-none appearance-none">
      </div>
      <div class="flex justify-between">
        <button @click.prevent="add" class="text-white font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">Add</button>
        <button @click.prevent="cancel" class="text-white font-bold rounded py-2 px-4 hover:bg-grey-dark border focus:border-blue-light focus:outline-none appearance-none" type="reset">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "domain-paths",
  props: {
    paths: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      showForm: false,
      from: null,
      to: null
    }
  },
  methods: {
    add() {
      console.log(this.from, this.to);
    },
    cancel() {
      this.from = this.to = null;
      this.showForm = false;
    },
    edit() {
      this.showForm = true;
      this.from = "/some/from/path";
      this.to = "/some/to/path";
    }
  }
}
</script>
