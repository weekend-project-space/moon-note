<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  modelValue: String,
});
const list = computed(() => props.modelValue);
const emit = defineEmits(["update:modelValue"]);
const value = ref("");

const updateModelValue = (v) => {
  emit("update:modelValue", v);
};
function add() {
  if (value.value.trim().length) {
    let list0 = [...list.value, value.value];
    updateModelValue(list0);
    value.value = "";
  }
}
function remove(i) {
  let list0 = [...list.value];
  list0.splice(i, 1);
  updateModelValue(list0);
}
</script>

<template>
  <div class="evant-warp">
    <div>
      <input
        class="add-input"
        type="text"
        placeholder="Event Enter to add"
        v-model="value"
        @keyup.enter="add"
      />
    </div>
    <ul class="evant-list">
      <li class="item" v-for="(item, index) in list" :key="item">
        <!-- <i><input type="checkbox" v-model="item.done" /></i> -->
        <div>
          <p v-text="item"></p>
        </div>
        <div class="btn mdi mdi-close" @click="remove(index)"></div>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.evant-warp {
  // padding: 0 0.8em;
  .add-input {
    margin-top: 20px;
    width: 100%;
    height: 36px;
    line-height: 36px;
    border: none;
    background: #eee;
    padding: 0 8px;
    border-radius: 10px;
  }
  .evant-list {
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    padding-inline-start: 0;
    .item {
      margin-block-start: 1em;
      margin-block-end: 1em;
      display: grid;
      align-items: center;
      grid-template-columns: minmax(calc(100% - 56px), auto) 20px;
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
