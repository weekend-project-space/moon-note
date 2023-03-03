<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const fullScreen = computed(() => route.meta.fullScreen);
</script>

<template>
  <router-view v-if="fullScreen"></router-view>
  <Layout v-else><router-view></router-view></Layout>
</template>
<style lang="less">
.btn {
  // border: 1px solid #eee;
  border: none;
  background: transparent;
  padding: 5px;
  // background: #eee;
  font-size: 12px;
  margin-left: 5px;
  &:hover {
    cursor: pointer;
  }
}
</style>
