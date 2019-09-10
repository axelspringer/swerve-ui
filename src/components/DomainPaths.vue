<template>
  <div>
    <div v-if="!showForm">
      <div v-if="this.paths && this.paths.length > 0">
      <input
        name="search-field"
        id="search-field"
        placeholder="Search..."
        v-on:keyup.enter="setFilter"
        class="form-input mb-4"
        :hidden="!paths"
      >
      <button
        @click.prevent="prevPage"
        class="button button-secondary button-small mr-4"
        :disabled="pageNumber==1"
        :hidden="!paths"
      >previous</button>
      <button
        @click.prevent="nextPage"
        class="button button-primary button-small"
        :disabled="pageNumber >= pageCount"
        :hidden="!paths"
      >next</button>
      <br>
      <br>
      <div class="text-white" :hidden="!paths">{{pageNumber + "/" + pageCount}}</div>
      <br>
      <ul class="list-reset">
        <li
          class="flex mb-1 pb-1 border-b border-blue-dark2"
          v-for="path of paginatedData"
          :key="path.from + path.to"
        >
          <div class="flex-1">
            <div class="text-blue-lightest text-base font-bold mr-1 mb-1 flex">
              <div class="inline-block w-12">From</div>
              <div class="text-white">
                <div>{{path.from}}</div>
                <div class="text-xs text-nepal">{{domain}}{{path.from}}</div>
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
            <button
              @click.prevent="remove(path)"
              class="button button-secondary button-small mr-4"
              type="submit"
            >Remove</button>
            <button
              @click.prevent="edit(path)"
              class="button button-primary button-small"
              type="submit"
            >Edit</button>
          </div>
        </li>
      </ul>
      </div>
      <button
        @click.prevent="create"
        class="button button-primary button-small"
        type="submit"
      >New Path</button>
    </div>
    <div v-if="showForm">
      <div class="mb-1">
        <label for="from-field" class="form-label mb-1">From</label>
        <input
          v-model="from"
          type="text"
          name="from-field"
          id="from-field"
          placeholder="/from/path"
          class="form-input"
          autofocus
        >
      </div>
      <div class="mb-4">
        <label for="to-field" class="form-label mb-1">To</label>
        <input
          v-model="to"
          type="text"
          name="to-field"
          id="to-field"
          placeholder="/to/path"
          class="form-input"
        >
      </div>
      <div class="flex justify-between">
        <button
          @click.prevent="add"
          class="button button-primary button-small"
          type="submit"
        >{{saveLabel}}</button>
        <button
          @click.prevent="cancel"
          class="text-athens-gray text-sm font-bold rounded py-1 px-4 bg-oxford-blue hover:bg-grey-dark focus:border-blue-light focus:outline-none appearance-none"
          type="reset"
        >Cancel</button>
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
    },
    domain: {
      type: String,
      default: ""
    },
    size: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      showForm: false,
      from: "",
      to: "",
      isNew: false,
      pathToEdit: null,
      pageNumber: 1,
      currentPaths: this.paths,
      filter: ""
    };
  },
  computed: {
    saveLabel() {
      return this.isNew ? "Add Path" : "Update Path";
    },
    pageCount() {
      if (!this.currentPaths) return;
      let l = this.currentPaths.length, s = this.size;
      return Math.ceil(l/s);
    },
    paginatedData() {
      this.doFilter();
      if (!this.currentPaths) return [];
      let cpPaths = this.currentPaths.slice(0);
      const start = (this.pageNumber - 1) * this.size,
        end = start + this.size;
      return cpPaths.slice(start, end);
    }
  }, 
  methods: {
    setFilter(ev) {
      this.filter = ev.target.value;
      this.pageNumber = 1;
    },
    doFilter() {
      let filter = this.filter;
      if (filter != "" && this.paths) {
        let cpPaths = this.paths.slice(0);
        cpPaths = cpPaths.filter(path => path.from.startsWith(filter));
        this.currentPaths = [...cpPaths].sort(function(a, b) {
          if (a.from < b.from) return -1;
          if (a.from > b.from) return 1;
          return 0;
        });
        return;
      } 
      this.currentPaths = this.paths;
    },
    add() {
      this.showForm = false;

      if (this.isNew) {
        this.$emit("add", {
          from: this.from,
          to: this.to
        });


        return;
      }

      this.$emit("update", {
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
      this.$emit("remove", path);
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    }
  }
};
</script>
