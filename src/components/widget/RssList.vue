<script setup>
import Widget from "./Widget.vue";
defineProps({
  modelValue: String,
  value: Array,
});
</script>

<template>
  <Widget
    icon="mdi mdi-fire"
    title="Hot"
    style="
      background: linear-gradient(to bottom right, #ff9d7f, #ff614d, #ff7f66);
    "
  >
    <ul class="links">
      <li v-for="item in value">
        <a
          :href="'https://webfollow.cc/#/article/' + item.id"
          target="_blank"
          class="hot-item"
          :title="item.title"
        >
          <span v-text="item.title"></span>
          <small v-text="item.pubDate"></small>
        </a>
      </li>
    </ul>
  </Widget>
</template>

<style lang="less" scoped>
.links {
  padding-inline-start: 20px;
  margin-block-start: 0;
  margin-block-end: 0;
  li {
    line-height: 2em;
  }
  a {
    color: #fff;
  }
  .hot-item {
    display: grid;
    grid-template-columns: 1fr 60px;
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    small {
      text-align: right;
    }
  }
}
</style>
