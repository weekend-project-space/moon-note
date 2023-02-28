<script setup>
import { computed, ref, toRefs, toRef } from "vue";
import MarkDown from "../components/MarkDown.vue";
import TodoList from "../components/TodoList.vue";
import EventList from "../components/EventList.vue";
import "element-plus/es/components/calendar/style/css";
import { ElCalendar } from "element-plus";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import { exportData } from "../services";
const store = useStore();
const { favs, bp, days, wids } = storeToRefs(store);
const note = ref();

const toggleNote = () => {
  note.value.toggleView();
};

const mkdownLock = computed(
  () => note.value && note.value.viewName == "md-view"
);
</script>
<template>
  <section class="main-section">
    <div class="tips">
      <div class="main-card">
        <template v-for="wid in wids">
          <component
            :is="wid.name"
            v-model:title="wid.title"
            :style="wid.style"
            v-model="wid.data"
          ></component>
        </template>
      </div>
    </div>
    <div class="content">
      <div>
        <label class="label">
          <i class="mdi mdi-checkbox-marked-circle-plus-outline"></i>
          Todo
        </label>
        <TodoList v-model="bp.todos"></TodoList>
      </div>

      <div>
        <div class="label-group">
          <label class="label">
            <i class="mdi mdi-notebook-edit-outline"></i> Note
          </label>
          <button class="btn" @click="toggleNote">
            <span
              class="mdi"
              :class="
                mkdownLock
                  ? 'mdi-lock-outline'
                  : 'mdi-lock-open-variant-outline'
              "
            ></span>
          </button>
        </div>
        <MarkDown class="mkdown" ref="note" v-model="bp.note" />
      </div>
    </div>
  </section>
</template>
