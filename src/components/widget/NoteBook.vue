<script setup>
import { ref, computed } from "vue";
import Widget from "./Widget.vue";
import MarkDown from "../MarkDown.vue";
defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const note = ref();
const updateModelValue = (v) => {
  emit("update:modelValue", v);
};

const toggleNote = () => {
  note.value.toggleView();
};

const mkdownLock = computed(
  () => note.value && note.value.viewName == "md-view"
);
</script>

<template>
  <Widget
    icon="mdi mdi-notebook"
    style="background: linear-gradient(to bottom right, #05c19c, #8685ef)"
    class="note-book"
    :title="title"
    :style="style"
  >
    <template #action>
      <button class="btn" @click="toggleNote">
        <span
          class="mdi"
          :class="
            mkdownLock ? 'mdi-lock-outline' : 'mdi-lock-open-variant-outline'
          "
        ></span>
      </button>
    </template>
    <MarkDown
      ref="note"
      :modelValue="modelValue"
      @update:modelValue="updateModelValue"
    />
  </Widget>
</template>
<style lang="less">
.note-book {
  .vmd-box .vmd-body textarea,
  .vmd-box .vmd-body .vmd-view {
    background: transparent;
    color: #fff;
    padding: 0;
  }
  .vmd-box .vmd-body textarea {
    color: #ddd;
  }
  .vmd-box {
    margin-top: 10px;
  }
  .btn {
    color: #fff;
  }
}
</style>
