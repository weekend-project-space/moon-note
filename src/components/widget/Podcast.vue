<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import Widget from "./Widget.vue";
import Aplayer from "vue3-aplayer";
import * as request from "@/utils/request";
const props = defineProps({
  modelValue: Object,
  title: String,
  style: Object,
});
const emit = defineEmits(["update:modelValue", "update:title"]);

function updateModelValue(v) {}
const url = computed(() => props.modelValue);

const data = ref([]);
const music = ref({
  title: "",
  artist: "",
  src: "",
  pic: "",
});
onMounted(() => {
  watchEffect(async () => {
    data.value = (
      await request.get(
        url.value.includes("webfollow.cc")
          ? url.value
          : "https://api.webfollow.cc/api/channels/articles?id=" + url.value
      )
    ).content.map((o) => ({
      title: o.title,
      artist: o.channelName,
      src: o.enclosure,
      pic: o.thumbnail,
    }));
    music.value = data.value[0];
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
    icon="mdi mdi-rss"
    style="
      background: linear-gradient(
        to bottom right,
        rgb(95, 234, 131),
        rgb(65, 184, 131)
      );
    "
    :title="title"
    :style="style"
  >
    <template #action>
      <button class="btn btn-1" @click="dialog = true">
        <span class="mdi mdi-tune-variant"></span>
      </button>
    </template>
    <aplayer autoplay :music="music" :list="data" />
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
    border-top: 0;
  }
  .aplayer-list ol li.aplayer-list-light {
    /* background: #efefef; */
    background: transparent;
    opacity: 0.9;
  }
}
.btn-1 {
  color: #fff;
}
</style>
