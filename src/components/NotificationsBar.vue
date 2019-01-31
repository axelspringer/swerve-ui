<template>
  <div class="fixed">
    <transition-group name="list-complete" tag="ul" class="list-reset w-screen flex flex-col items-center">
      <notifications-item class="list-complete-item" v-for="note of notifications" :key="note.id" :item="note" @remove="removeNotification"></notifications-item>
    </transition-group>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import NotificationsItem from "./NotificationsItem";

export default {
  name: "notifications-bar",
  components: {
    NotificationsItem
  },
  computed: {
    ...mapState(['notifications'])
  },
  methods: {
    ...mapMutations(['removeNotification'])
  }
}
</script>

<style>
  .list-complete-item {
  transition: all 1s;
}
.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.list-complete-item-move {
  position: absolute;
  transition: transform 1s;
}
</style>

