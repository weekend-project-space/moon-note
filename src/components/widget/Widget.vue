<script setup>
import { ref } from "vue";
defineProps({
  title: String,
  icon: String,
  height: {
    default: () => "260px",
  },
});
defineExpose(scrollToBottom);
const body = ref();
function scrollToBottom() {
  const domWrapper = body.value;
  const currentScroll = domWrapper.scrollTop; // 已经被卷掉的高度
  const clientHeight = domWrapper.offsetHeight; // 容器高度
  const scrollHeight = domWrapper.scrollHeight; // 内容总高度
  if (scrollHeight - 10 > currentScroll + clientHeight) {
    domWrapper.scrollTo(0, scrollHeight - clientHeight);
  }
}
</script>

<template>
  <div class="widget" v-bind="$attrs" :style="{ height }">
    <div class="widget-header">
      <slot name="header">
        <slot name="header-title">
          <div><span class="mdi" :class="icon"></span> {{ title }}</div>
        </slot>
        <div class="action">
          <slot name="action"></slot>
        </div>
      </slot>
    </div>
    <div ref="body" class="widget-body">
      <slot> </slot>
    </div>
    <div class="widget-footer" ref="footer">
      <slot name="footer"> </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.widget {
  background: linear-gradient(to bottom right, #05c19c, #8685ef);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 36px 1fr minmax(0, auto);
  .widget-header {
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .widget-body {
    overflow: auto;
  }
}
</style>
