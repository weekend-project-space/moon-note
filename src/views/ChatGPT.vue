<script setup>
import { ref } from "vue";
import TodoList from "../components/TodoList.vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
const store = useStore();
const { wids } = storeToRefs(store);
</script>
<template>
  <template v-for="wid in wids">
    <div class="chat-gpt" v-if="wid.name == 'ChatGPT'">
      <ChatGPT
        v-model:title="wid.title"
        v-model="wid.data"
        style="background: #222"
        height="100%"
      ></ChatGPT>
    </div>
  </template>
</template>
<style lang="less" scoped>
.chat-gpt {
  margin-top: var(--inner-padding);
  height: calc(100vh - 130px);
}
.chat-gpt ::v-deep .chat-warp .chat {
  color: #fff;
  ::v-deep .vmd-box .vmd-body .vmd-view {
    color: #fff;
  }
}
.chat-gpt ::v-deep .widget {
  padding: var(--inner-padding);
}
</style>
