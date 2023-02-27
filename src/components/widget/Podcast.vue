<script setup>
import { ref } from "vue";
import Widget from "./Widget.vue";
import Aplayer from "vue3-aplayer";
defineProps({
  modelValue: String,
  value: Array,
});
const list = ref([
  {
    title: "95. 徐英瑾×梁文道：ChatGPT会如何影响我们？",
    artist: "八分",
    src: "http://aod.cos.tx.xmcdn.com/storages/07a4-audiofreehighqps/D6/CF/GKwRIasHy4lCAQxiCAH6yXgr.m4a",
    pic: "http://imagev2.xmcdn.com/storages/3c93-audiofreehighqps/FB/D1/GKwRIRwHXJrWAATrWgHYPYcT.jpeg!op_type=3&columns=640&rows=640",
  },
  {
    title: "92. 如何看待“流浪气球”事件？",
    artist: "八分",
    src: "http://aod.cos.tx.xmcdn.com/storages/981b-audiofreehighqps/05/6A/GKwRIJEHu_UAANgKEwH2QDJi.m4a",
    pic: 'http://imagev2.xmcdn.com/storages/3c93-audiofreehighqps/FB/D1/GKwRIRwHXJrWAATrWgHYPYcT.jpeg!op_type=3&columns=640&rows=640"',
  },
]);
</script>

<template>
  <Widget
    icon="mdi mdi-rss"
    title="Podcast"
    style="
      background: linear-gradient(
        to bottom right,
        rgb(95, 234, 131),
        rgb(65, 184, 131)
      );
    "
    ><aplayer
      autoplay
      :music="{
        title: '95.徐英瑾×梁文道：ChatGPT会如何影响我们？',
        artist: '八分',
        src: 'http://aod.cos.tx.xmcdn.com/storages/07a4-audiofreehighqps/D6/CF/GKwRIasHy4lCAQxiCAH6yXgr.m4a',
        pic: 'http://imagev2.xmcdn.com/storages/3c93-audiofreehighqps/FB/D1/GKwRIRwHXJrWAATrWgHYPYcT.jpeg!op_type=3&columns=640&rows=640',
      }"
      :list="list"
    />
  </Widget>
</template>

<style lang="less" scoped>
::v-deep {
  .aplayer {
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    background: transparent;
    margin: 5px;
    box-shadow: none;
    -webkit-box-shadow: none;
  }
  .aplayer .aplayer-body .aplayer-info {
    padding: 0 0 0 5px;
  }
  .aplayer.aplayer-withlist .aplayer-body .aplayer-info {
    border-bottom: none;
  }
  .aplayer-controller .aplayer-time {
    color: #fff;
    opacity: 0.8;
  }
  .aplayer-controller .aplayer-time .aplayer-icon .aplayer-fill {
    fill: #fff;
  }
  .aplayer-controller .aplayer-time .aplayer-icon.inactive {
    opacity: 1;
  }
  .aplayer .aplayer-body .aplayer-info .aplayer-music .aplayer-author,
  .aplayer-list ol li .aplayer-list-author,
  .aplayer-list ol li .aplayer-list-index {
    color: #fff;
  }
  .aplayer-list ol li .aplayer-list-index {
    margin-right: 5px;
  }
  .aplayer-list ol li {
    &:hover {
      background: transparent;
      opacity: 0.7;
    }
  }
  .aplayer-list ol li {
    color: #fff;
    opacity: 0.6;
    height: 25px;
    line-height: 25px;
    border-top: 0;
  }
}
</style>
