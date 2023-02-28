<script setup>
import TodoList from "../components/TodoList.vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
const store = useStore();
const { favs, bp, days, wids } = storeToRefs(store);

const addFav = () => {
  let url = prompt("请输入网址");
  if (url) {
    favs.value.push(url);
  }
};
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
