<template>
  <div>
    <div v-if="!showForm">
      <ul class="list-reset">
        <li class="flex mb-1 pb-1 border-b border-blue-dark2" v-for="path of paths" :key="path.from + path.to">
          <div class="flex-1">
            <div class="text-blue-lightest text-base font-bold mr-1 mb-1 flex">
              <div class="inline-block w-12">From</div>
              <div class="text-white">
                <div>/from/some/path</div>
                <div class="text-xs text-nepal">{{target}}/from/some/path</div>
              </div>
            </div>
            <div class="text-blue-lightest text-base font-bold mr-1 flex">
              <div class="inline-block w-12">To</div>
              <div class="text-white">
                <div>/to/some/path</div>
                <div class="text-xs text-nepal">{{target}}/to/some/path</div>
              </div>
            </div>
          </div>
          <div class="self-center">
            <button @click.prevent="remove" class="text-athens-gray text-sm font-bold rounded py-1 px-2 mr-4 bg-oxford-blue hover:bg-nepal hover:text-ebony-clay-2 focus:border-blue-light focus:outline-none appearance-none" type="submit">Remove</button>
            <button @click.prevent="edit" class="text-ebony-clay-2 text-sm font-bold rounded py-1 px-2 bg-sun hover:bg-sunglow focus:border-sun focus:outline-none appearance-none" type="submit">Edit</button>
          </div>
        </li>
      </ul>
      <button @click.prevent="showForm = true" class="text-ebony-clay-2 font-bold text-sm rounded py-1 px-2 mt-2 bg-sun hover:bg-sunglow focus:border-sun focus:outline-none appearance-none" type="submit">New Path</button>
    </div>
    <div v-if="showForm">
      <div class="mb-1">
        <label for="from-field" class="form-label mb-1">From</label>
        <input v-model="from" type="text" name="from-field" id="from-field" value="" placeholder="/from/path" class="form-input">
      </div>
      <div class="mb-4">
        <label for="to-field" class="form-label mb-1">To</label>
        <input v-model="to" type="text" name="to-field" id="to-field" value="" placeholder="/to/path" class="form-input">
      </div>
      <div class="flex justify-between">
        <button @click.prevent="add" class="text-white font-bold rounded py-2 px-4 bg-blue hover:bg-blue-light focus:border-blue-light focus:outline-none appearance-none" type="submit">Add</button>
        <button @click.prevent="cancel" class="text-athens-gray font-bold rounded py-2 px-4 bg-oxford-blue hover:bg-grey-dark focus:border-blue-light focus:outline-none appearance-none" type="reset">Cancel</button>
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
    },
    target: {
      type: String,
      default: ""
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
      this.from = "/from/some/path";
      this.to = "/to/some/path";
    },
    remove() {

    }
  }
}
</script>
