<script setup>
import { computed, ref, toRefs, toRef } from "vue";
import MarkDown from "../components/MarkDown.vue";
import { ElCalendar } from "element-plus";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import { exportData } from "../services";
const store = useStore();
const { bp } = storeToRefs(store);

const note = ref();

const toggleNote = () => {
  note.value.toggleView();
};

const mkdownLock = computed(
  () => note.value && note.value.viewName == "md-view"
);
</script>
<template>
  <div class="label-group">
    <label class="label">
      <i class="mdi mdi-notebook-edit-outline"></i> Note
    </label>
    <button class="btn" @click="toggleNote">
      <span
        class="mdi"
        :class="
          mkdownLock ? 'mdi-lock-outline' : 'mdi-lock-open-variant-outline'
        "
      ></span>
    </button>
  </div>
  <div class="journal">
    <MarkDown class="mkdown" ref="note" v-model="bp.note" />
  </div>
</template>
<style lang="less" scoped>
.label-group {
  margin-top: var(--inner-padding);
}
.journal {
  height: calc(100vh - 200px);
}
</style>
