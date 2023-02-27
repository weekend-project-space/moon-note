<script setup>
import { onMounted, ref } from "vue";
import { VMarkdownEditor } from "vue3-markdown";
import "vue3-markdown/dist/style.css";

const mkdown = ref();
defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
const updateModelValue = (v) => {
  emit("update:modelValue", v);
};
const handleUpload = (file) => {
  console.log(file);
  return "https://i.postimg.cc/52qCzTVw/pngwing-com.png";
};
const viewName = ref("md-view");
const toggleView = () => {
  if (viewName.value == "md-view") {
    viewName.value = "md-edit";
  } else {
    viewName.value = "md-view";
  }
};
defineExpose({ toggleView, viewName });
onMounted(() => {
  const mkBody = mkdown.value.$el.getElementsByClassName("markdown-body")[0];
  // console.log(mkBody);
  mkBody.style.display = null;
  const textarea = mkdown.value.$el.getElementsByTagName("textarea")[0];
  textarea.placeholder = "Please input md";
});
</script>

<template>
  <VMarkdownEditor
    :modelValue="modelValue"
    @update:modelValue="updateModelValue"
    :class="viewName"
    locale="en"
    ref="mkdown"
    :upload-action="handleUpload"
  />
</template>
<style lang="less">
// ::v-deep {
.vmd-box {
  .vmd-body {
    border: none;
    display: grid;
    overflow: hidden;
    textarea,
    .vmd-view {
      box-sizing: border-box;
      padding: 0.8rem 0;
      background: transparent;
    }
    textarea {
      padding: 0.8rem;
      line-height: 1.5em;
      max-height: calc(100% - 30px);
      background-color: #f6f6f6;
      border-radius: 10px;
    }
  }
}
.md-view .vmd-body {
  textarea {
    display: none;
  }
}
.md-edit .vmd-body {
  .vmd-view {
    display: none;
  }
}
.vmd-toolbar {
  display: none;
}
// }
</style>
