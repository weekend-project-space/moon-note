<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import * as request from "@/utils/request";
import Widget from "./Widget.vue";
const props = defineProps({
  modelValue: Object,
  title: String,
  style: Object,
});
const emit = defineEmits(["update:modelValue", "update:title"]);
const url = computed(() => props.modelValue);
const data = ref([]);
onMounted(() => {
  watchEffect(async () => {
    data.value = (
      await request.get(
        url.value.includes("webfollow.cc")
          ? url.value
          : "https://api.webfollow.cc/api/channels/articles?id=" + url.value
      )
    ).content;
  });
});
const { modelValue, title: title0 } = props;
const copyUrl = ref(modelValue);
const copyTitle = ref(title0);
const dialog = ref(false);
function confirm() {
  emit("update:modelValue", copyUrl);
  emit("update:title", copyTitle.value);
  dialog.value = false;
}
</script>

<template>
  <Widget
    icon="mdi mdi-fire"
    style="
      background: linear-gradient(to bottom right, #ff9d7f, #ff614d, #ff7f66);
    "
    :title="title"
    :style="style"
    ><template #action>
      <button class="btn btn-1" @click="dialog = true">
        <span class="mdi mdi-tune-variant"></span>
      </button>
    </template>
    <ul class="links">
      <li v-for="item in data" class="hot-item">
        <a :href="item.link" target="_blank" :title="item.title">
          <span v-text="item.title"></span>
        </a>
        <a
          :href="
            item.id ? 'https://webfollow.cc/#/article/' + item.id : item.link
          "
          target="_blank"
          :title="item.title"
        >
          <small v-text="item.pubDate"></small>
        </a>
      </li>
    </ul>
  </Widget>
  <el-dialog v-model="dialog" title="settings">
    <label class="label" for="">title</label>
    <input type="text" class="input" v-model="copyTitle" />
    <label class="label">url</label>
    <input type="text" class="input" v-model="copyUrl" />
    <template #footer>
      <span class="dialog-footer">
        <button class="btn" @click="confirm">Confirm</button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.links {
  padding-inline-start: 0.5em;
  list-style: none;
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
    a {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a:last-child {
      text-align: right;
    }
  }
}
.btn-1 {
  color: #fff;
}
</style>
