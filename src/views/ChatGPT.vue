<script setup>
import { ref } from "vue";
import TodoList from "../components/TodoList.vue";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const fullScreen = computed(() => route.meta.fullScreen);
const store = useStore();
const { wids } = storeToRefs(store);
</script>
<template>
  <div :class="{ 'full-screen': fullScreen }">
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
  </div>
</template>
<style lang="less" scoped>
.full-screen {
  background: #222;
  height: 100vh;

  .chat-gpt {
    padding: var(--inner-padding) 0 0;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    border: none;
  }
  ::v-deep {
    .widget-header {
      > *:first-child {
        background-image: -webkit-linear-gradient(
          right,
          #00c157,
          #00b08c,
          #009eb7,
          #00c157
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}

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
