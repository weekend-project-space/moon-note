<script setup>
import TodoList from "../components/TodoList.vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
const store = useStore();
const { bp } = storeToRefs(store);
</script>
<template>
  <div class="label-group">
    <label class="label">
      <i class="mdi mdi-checkbox-marked-circle-plus-outline"></i>
      Todo
    </label>
  </div>
  <TodoList v-model="bp.todos"></TodoList>
</template>
<style lang="less" scoped>
.label-group {
  margin-top: var(--inner-padding);
}
</style>
