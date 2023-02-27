<script setup>
defineProps({
  title: String,
  icon: String,
});
</script>

<template>
  <div class="widget" v-bind="$attrs">
    <div class="widget-header">
      <slot name="header">
        <div><span class="mdi" :class="icon"></span> {{ title }}</div>
        <div class="action">
          <slot name="action"></slot>
        </div>
      </slot>
    </div>
    <slot> </slot>
  </div>
</template>

<style lang="less" scoped>
.widget {
  background: linear-gradient(to bottom right, #05c19c, #8685ef);
  border: 1px solid #eee;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  min-height: 200px;
  .widget-header {
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
}
</style>
