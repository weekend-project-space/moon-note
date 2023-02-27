<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  modelValue: Array,
});
const todolist = computed(() => props.modelValue);
const emit = defineEmits(["update:modelValue"]);
const value = ref("");

const updateModelValue = (v) => {
  emit("update:modelValue", v);
};
function add() {
  console.log(todolist);
  if (value.value.trim().length) {
    let todos = [...todolist.value, { value: value.value, done: false }];
    updateModelValue(todos);
    value.value = "";
  }
}
function remove(i) {
  let todos = [...todolist.value];
  todos.splice(i, 1);
  updateModelValue(todos);
}
</script>

<template>
  <div class="todo-warp">
    <div>
      <input
        class="todo-add-input"
        type="text"
        placeholder="Todo Enter to add"
        v-model="value"
        @keyup.enter="add"
      />
    </div>
    <ul class="todo-list">
      <li class="item" v-for="(item, index) in todolist" :key="item.value">
        <i><input type="checkbox" v-model="item.done" /></i>
        <div>
          <p v-text="item.value" :class="{ 'todo-done': item.done }"></p>
        </div>
        <div class="btn mdi mdi-close" @click="remove(index)"></div>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.todo-warp {
  // padding: 0 0.8em;
  .todo-add-input {
    margin-top: 20px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    border: none;
    background: #eee;
    padding: 0 8px;
    border-radius: 10px;
  }
  .todo-done {
    text-decoration: line-through;
    opacity: 0.6;
  }
  .todo-list {
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    .item {
      margin-block-start: 1em;
      margin-block-end: 1em;
      display: grid;
      align-items: center;
      grid-template-columns: 36px minmax(calc(100% - 56px), auto) 20px;
      p {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-block-start: 0;
        margin-block-end: 0;
      }
    }
  }
}
</style>
