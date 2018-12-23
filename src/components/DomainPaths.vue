<template>
  <div>
    <div v-if="!showForm">
      <ul class="list-reset">
        <li class="flex mb-1 pb-1 border-b border-blue-dark2" v-for="path of paths" :key="path.from + path.to">
          <div class="flex-1">
            <div class="text-blue-lightest text-base font-bold mr-1 mb-1 flex">
              <div class="inline-block w-12">From</div>
              <div class="text-white">
                <div>{{path.from}}</div>
                <div class="text-xs text-nepal">{{target}}{{path.from}}</div>
              </div>
            </div>
            <div class="text-blue-lightest text-base font-bold mr-1 flex">
              <div class="inline-block w-12">To</div>
              <div class="text-white">
                <div>{{path.to}}</div>
                <div class="text-xs text-nepal">{{target}}{{path.to}}</div>
              </div>
            </div>
          </div>
          <div class="self-center">
            <button @click.prevent="remove(path)" class="text-athens-gray text-sm font-bold rounded py-1 px-2 mr-4 bg-oxford-blue hover:bg-nepal hover:text-ebony-clay-2 focus:border-blue-light focus:outline-none appearance-none" type="submit">Remove</button>
            <button @click.prevent="edit(path)" class="text-ebony-clay-2 text-sm font-bold rounded py-1 px-2 bg-sun hover:bg-sunglow focus:border-sun focus:outline-none appearance-none" type="submit">Edit</button>
          </div>
        </li>
      </ul>
      <button @click.prevent="create" class="text-ebony-clay-2 font-bold text-sm rounded py-1 px-2 mt-2 bg-sun hover:bg-sunglow focus:border-sun focus:outline-none appearance-none" type="submit">New Path</button>
    </div>
    <div v-if="showForm">
      <div class="mb-1">
        <label for="from-field" class="form-label mb-1">From</label>
        <input v-model="from" type="text" name="from-field" id="from-field" placeholder="/from/path" class="form-input" autofocus>
      </div>
      <div class="mb-4">
        <label for="to-field" class="form-label mb-1">To</label>
        <input v-model="to" type="text" name="to-field" id="to-field" placeholder="/to/path" class="form-input">
      </div>
      <div class="flex justify-between">
        <button @click.prevent="add" class="text-ebony-clay-2 text-sm font-bold rounded py-1 px-4 bg-sun hover:bg-sunglow focus:border-sun focus:outline-none appearance-none" type="submit">{{saveLabel}}</button>
        <button @click.prevent="cancel" class="text-athens-gray text-sm font-bold rounded py-1 px-4 bg-oxford-blue hover:bg-grey-dark focus:border-blue-light focus:outline-none appearance-none" type="reset">Cancel</button>
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
      from: "",
      to: "",
      isNew: false,
      pathToEdit: null
    }
  },
  computed: {
    saveLabel() {
      return this.isNew ? "Add Path" : "Update Path";
    }
  },
  methods: {
    add() {
      this.showForm = false;

      if (this.isNew) {
        this.$emit('add', {
          from: this.from,
          to: this.to
        });

        return;
      }
      
      this.$emit('update', {
        from: this.from,
        to: this.to,
        path: this.pathToEdit
      });
    },
    cancel() {
      this.showForm = false;

      this.from = "";
      this.to = "";
    },
    edit(path) {
      this.showForm = true;
      this.isNew = false;
      
      this.from = path.from;
      this.to = path.to;
      this.pathToEdit = path;
    },
    create() {
      this.showForm = true;
      this.isNew = true;

      this.from = "";
      this.to = "";
      this.pathToEdit = null;
    },
    remove(path) {
      this.$emit('remove', path);
    }
  }
}
</script>
