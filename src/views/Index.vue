<script setup>
import { computed, ref, toRefs, toRef } from "vue";
import MarkDown from "../components/MarkDown.vue";
import TodoList from "../components/TodoList.vue";
import Action from "../components/Action.vue";
import "element-plus/es/components/calendar/style/css";
import { ElCalendar } from "element-plus";
import { useStore } from "../store";
import { storeToRefs } from "pinia";
import { exportData } from "../services";
const store = useStore();
const { favs, bp, days } = storeToRefs(store);
const { changeDate } = store;

// {
// urls:[''],
//  wids:[{
// name:'Podcast',
// data:'xxxxx'||{}||araray
// }]
//   bps:{
//     '2023-11'：[{
//        day: '11-01',
//        todo:[{vaule:'',done:false}],
//        note: '',
//        event:['']
//      }]
//   }
// }

const content = ref();
const date = ref(new Date());
const calendar = ref();
const note = ref();

const changeDate0 = (d) => {
  date.value = d;
  changeDate(d);
};

const toggleNote = () => {
  note.value.toggleView();
};

const mkdownLock = computed(
  () => note.value && note.value.viewName == "md-view"
);
const selectDate = (val) => {
  calendar.value.selectDate(val);
  console.log(val);
};
const addFav = () => {
  let url = prompt("请输入网址");
  if (url) {
    favs.value.push(url);
  }
};
const hasDay = (d) => {
  return new Set(days.value).has(d);
};

const exportConfig = () => {
  let link = document.createElement("a");
  link.download = "config.json";
  link.href = "data:text/plain," + JSON.stringify(exportData());
  link.click();
};
const hots = ref([
  {
    id: "997937e981acfbe51439d2573e770bfb",
    title: "美团面试：MySQL 自增主键一定是连续的吗？",
    link: "https://toutiao.io/k/8favlia",
    summary: "",
    pubDate: "1天前",
    channelId: "http%3A%2F%2Ffeedmaker.kindle4rss.com%2Ffeeds%2Ftoutiao.io.xml",
    channelIcon: "http://toutiao.io/favicon.ico",
    channelName: "开发者头条",
  },
  {
    id: "17202fa05d235c254607382b5768e59f",
    title: "健康码何去何从？",
    link: "http://weixin.sogou.com/weixin?type=2&query=界面 健康码何去何从？",
    summary: "",
    pubDate: "4天前",
    channelId:
      "http%3A%2F%2Ffeedmaker.kindle4rss.com%2Ffeeds%2Fwowjiemian.weixin.xml",
    channelIcon: "https://www.sogou.com/images/logo/new/favicon.ico?v=4",
    channelName: "界面",
  },
  {
    id: "146b91d988616966f214747713cb1c9f",
    title: "《匆匆》 朱自清",
    link: "http://meiriyiwen.com",
    summary: "燕子去了，有再来的时候；杨柳枯了，有再青的时候；桃花谢了，有",
    pubDate: "2天前",
    channelId: "http%3A%2F%2Fnode2.feed43.com%2Fmryw.xml",
    channelIcon:
      "http://yile-static-files.b0.upaiyun.com/meiriyiwen_com_favicon.ico",
    channelName: "每日一文",
  },
  {
    id: "edd51c15433618f2b90c8f3ec2509a8a",
    title: "February 22, 2023",
    thumbnail: "https://pic.yupoo.com/fotomag/8b2cc6b0/df56babe.jpg",
    link: "http://m.idai.ly/se/a193iG?1676995200",
    summary: "\n February 22, 2023 \n \n  \n  \n ",
    pubDate: "2天前",
    channelId: "https%3A%2F%2Ffeedx.net%2Frss%2Fidaily.xml",
    channelName: "每日环球视野",
  },
  {
    id: "e623ae9c2a1f7bbc6facd92fa8465b5a",
    title: "你是一名游戏设计师，会如何设计一种让人恐惧但没有血腥元素的怪物？",
    thumbnail:
      "https://pic1.zhimg.com/v2-44da6d1c2d3cd6fb5056b35867610e77_720w.jpg?source=b1748391?rss",
    link: "http://www.zhihu.com/question/566903871/answer/2866181144?utm_campaign=rss&utm_medium=rss&utm_source=rss&utm_content=title",
    summary: "\n 想象平时喝水用的水杯，在你刚刚拿起来想要喝水的时候，突然",
    pubDate: "17小时前",
    channelId: "https%3A%2F%2Fwww.zhihu.com%2Frss",
    channelIcon: "https://static.zhihu.com/heifetz/favicon.ico",
    channelName: "知乎每日精选",
  },
  {
    id: "b72f303153101d6a4d745575241290e9",
    title: "想转 C++，求问什么方向/程度/行业的 C++开发能达到年薪百万？",
    link: "https://www.v2ex.com/t/918857#reply0",
    summary: "如题，其他语言方向呢，比如前端、服务端、客户端等",
    pubDate: "1天前",
    channelId: "https%3A%2F%2Fv2ex.com%2Findex.xml",
    channelIcon: "https://www.v2ex.com/static/favicon.ico",
    channelName: "V2EX",
  },
]);
</script>
<template>
  <div class="warp">
    <div class="main-warp">
      <div v-if="false" class="sidebar">
        <!-- <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt=""
          class="logo"
        /> -->
        <h1 class="site-title">
          <span class="mdi mdi-bullseye-arrow"></span> BulletPoints
        </h1>
        <div class="nav-warp">
          <!-- <label class="label" for="">setting</label> -->
          <nav class="navs">
            <li><i class="mdi mdi-home-outline"></i> Home</li>
            <li>
              <i class="mdi mdi-checkbox-marked-circle-plus-outline"></i> Todo
            </li>
            <li><i class="mdi mdi-notebook-edit-outline"></i> Note</li>
            <li><i class="mdi mdi-calendar-text"></i> Event</li>
          </nav>
        </div>
      </div>
      <div class="main">
        <header>
          <h1 class="site-title">
            <span class="mdi mdi-bullseye-arrow"></span> BulletPoints (Beta)
          </h1>
          <nav class="favs">
            <li v-for="item in favs" class="fav" :key="item">
              <a :href="item" :title="item" target="_blank">
                <img :src="item + '/favicon.ico'" alt="" />
              </a>
            </li>
            <li class="fav" @click="addFav" title="Add quick url">
              <span class="mdi mdi-plus"></span>
            </li>
          </nav>
        </header>
        <section class="main-section">
          <div class="tips">
            <div class="main-card">
              <Podcast :value="hots" />

              <RssList :value="hots" />

              <note-book v-model="noteText" />
            </div>
          </div>
          <div class="content">
            <div>
              <label class="label">
                <i class="mdi mdi-checkbox-marked-circle-plus-outline"></i>
                Todo
              </label>
              <TodoList v-model="bp.todos"></TodoList>
            </div>

            <div>
              <div class="label-group">
                <label class="label">
                  <i class="mdi mdi-notebook-edit-outline"></i> Note
                </label>
                <button class="btn" @click="toggleNote">
                  <span
                    class="mdi"
                    :class="
                      mkdownLock
                        ? 'mdi-lock-outline'
                        : 'mdi-lock-open-variant-outline'
                    "
                  ></span>
                </button>
              </div>
              <MarkDown class="mkdown" ref="note" v-model="bp.note" />
            </div>
          </div>
        </section>
      </div>
    </div>
    <div class="panel">
      <div class="panel-header">
        <div class="think-different-text">
          自由不是你想做什么就做什么，而是你不想做什么就不做什么
        </div>
        <div class="user-warp">
          <span
            title="Export config data"
            class="mdi mdi-file-export-outline"
            @click="exportConfig"
          ></span>
        </div>
      </div>

      <label class="label">
        <span class="mdi mdi-calendar-text"></span>
        Event
      </label>
      <div class="event-warp">
        <Action v-model="bp.events"></Action>
      </div>
      <div class="card-warp">
        <div class="card">
          <div class="card-header">
            <span class="mdi mdi-checkbox-marked-circle-plus-outline"></span>
            Todo
          </div>
          <ul class="num-list">
            <li>
              <p>Total num</p>
              <small v-text="bp.todos.length"></small>
            </li>
            <li>
              <p>Done num</p>
              <small v-text="bp.todos.filter((o) => o.done).length"></small>
            </li>
          </ul>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="mdi mdi-notebook-edit-outline"></span>
            Note
          </div>
          <ul class="num-list">
            <li>
              <label>Word num </label>
              <small v-text="bp.note.length"></small>
            </li>
          </ul>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="mdi mdi-calendar-text"></span>
            Event
          </div>
          <ul class="num-list">
            <li>
              <label>Total num </label>
              <small v-text="bp.events.length"></small>
            </li>
          </ul>
        </div>
      </div>
      <div class="calendar">
        <el-calendar
          :model-value="date"
          @update:model-value="changeDate0"
          ref="calendar"
        >
          <template #header="{ date }">
            <div class="calender-header">
              <span>{{ date }}</span>
              <div>
                <button
                  class="btn"
                  size="small"
                  @click="selectDate('prev-month')"
                >
                  Previous Month
                </button>
                <button class="btn" @click="selectDate('next-month')">
                  Next Month
                </button>
              </div>
            </div>
          </template>
          <template #date-cell="{ data }">
            <span :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split("-").slice(2).join("-") }}
            </span>
            <div>
              {{ data.isSelected ? "✔️" : hasDay(data.day) ? "-" : "" }}
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.warp {
  background-color: #f6f6f7;
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
  display: grid;
  grid-template-columns: auto 380px;
  font-size: 14px;
  .main-warp {
    display: grid;
    // grid-template-columns: 260px minmax(580px, auto);
    .sidebar {
      box-sizing: border-box;
      background: #fff;
      border: 1px solid #eee;
      color: #40493b;
    }
    .main {
      background: #fff;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      position: relative;
      // box-shadow: 6px 6px 3px #ccc;
      padding: var(--continer-padding);
      .main-section {
      }
      header {
        // min-height: var(--top-height);
      }
    }
  }
  .panel {
  }
}
.mt-2 {
  margin-top: 30px;
}
.site-title {
  margin-block-start: 0;
  margin-block-end: 0;
  font-size: 1.8em;
  padding: 0;
  background-image: -webkit-linear-gradient(bottom, #00c157, #00b08c, #009eb7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  .mdi {
    font-size: 1.6em;
  }
}
// main
.main {
  header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    grid-gap: var(--inner-padding);
    align-items: center;
    min-height: var(--top-height);
    .search-input {
      width: 100%;
      height: 36px;
      line-height: 36px;
      border: none;
      background: #eee;
      padding: 0 8px;
      border-radius: 10px;
    }
    .favs {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
      grid-gap: var(--inner-padding);
      .fav {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #ccc;
        text-align: center;
        // padding: 5px;
        padding-top: 4px;
        img {
          width: 30px;
          height: 30px;
        }
        .mdi {
          cursor: pointer;
          font-size: 20px;
          color: #ccc;
        }
      }
    }
  }
  .tips {
    margin-top: 30px;
    .main-card {
      display: grid;
      grid-template-columns: minmax(300px, 2fr) minmax(150px, 1fr) minmax(
          150px,
          1fr
        );
      grid-gap: var(--inner-padding);
    }
  }

  .content {
    margin-top: var(--continer-padding);
    display: grid;
    width: 100%;
    min-height: 100%;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    grid-gap: 50px;

    .item-warp {
      list-style: none;
      margin-block-start: 0;
      margin-block-end: 0;
      padding-inline-start: 0;
      // padding: 0 0.8em;

      .item {
        margin-block-start: 1em;
        margin-block-end: 1em;
        display: grid;
        align-items: center;
        grid-template-columns: 36px minmax(calc(100% - 80px), auto) 10px;
        p {
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-block-start: 0;
          margin-block-end: 0;
        }
        img {
          height: 80px;
          width: 80px;
        }
      }
    }
    .label-group {
      display: flex;
      justify-content: space-between;
    }
    .mkdown {
      margin-top: 20px;
      ::v-deep textarea {
        min-height: 30vh;
      }
      ::v-deep .vmd-body .vmd-view {
        padding: 0;
      }
    }
  }
}
//main end
// side
.sidebar {
  .nav-warp {
    padding: 20px;
    .navs {
      list-style: none;
      // padding: 0 20px;
      li {
        line-height: 3em;
        font-size: 1.1em;
        // font-weight: bold;
      }
    }
  }
  .logo {
    width: 80%;
    padding: 20px 10%;
  }
}
// side end
// panel
.panel {
  margin: var(--continer-padding);
  box-sizing: border-box;
  .panel-header {
    min-height: var(--top-height);
    display: grid;
    justify-content: flex-start;
    grid-template-columns: auto 60px;
  }
  .think-different-text {
  }
  .user-warp {
    display: flex;
    justify-content: flex-end;
    .mdi {
      height: 40px;
      width: 40px;
      line-height: 40px;
      font-size: 20px;
      text-align: center;
      background: #fff;
      border-radius: 10px;
      margin-left: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .label {
    line-height: 2em;
  }
  .event-warp {
    background: #f6f6f6;
    min-height: 60px;
    // border-radius: 10px;
    // padding: 0 1em 1em;
    // border-radius: 5px;
  }
  .num-list {
    padding-inline-start: 0;
    padding-left: 10px;
    list-style: none;
    p {
      // display: inline-block;
      // font-weight: bold;
    }
    small {
      text-align: center;
      font-size: 1.3em;
    }
  }
  .card-warp {
    margin-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--inner-padding);
    grid-template-areas:
      "a b"
      "a c";
    .card {
      box-sizing: border-box;
      padding: 10px;
      color: #fff;
      min-height: var(--top-height);
      border-radius: 10px;
      opacity: 0.7;
      &:first-child {
        background: linear-gradient(to bottom, #00c157, #00b08c, #009eb7);
        grid-area: a;
      }
      &:nth-child(2) {
        background: #889fa5;
        grid-area: b;
      }
      &:last-child {
        background: linear-gradient(to bottom right, #ff9d7f, #ff614d, #ff7f66);
        grid-area: c;
      }
      .card-header {
        font-size: 1.2em;
        font-weight: bold;
      }
    }
  }
  .calendar {
    margin-top: 40px;
    background: #fff;
    border-radius: 10px;
    min-height: 300px;
    border-radius: 10px;
    padding: 10px;
    .calender-header {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    ::v-deep {
      .el-calendar__header {
        padding: 5px;
      }
      .el-calendar__body {
        padding: 0;
      }
      .el-calendar-table .el-calendar-day {
        text-align: center;
        line-height: var(--el-calendar-cell-height);
      }
    }
  }
}

.label {
  font-size: 1.5em;
  font-weight: 500;
}
.flex {
  display: flex;
  justify-content: space-between;
}

@media (max-width: 1400px) {
  :root {
    --continer-padding: 20px;
  }
  .warp {
    grid-template-columns: 1fr;
  }
  .panel {
    display: none;
  }
}
@media (max-width: 1024px) {
  :root {
    --continer-padding: 15px;
  }
  .warp {
    .main-warp {
      display: grid;
      grid-template-columns: 1fr;
    }
    .content {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    }
  }
  .sidebar,
  .panel {
    display: none;
  }
}
@media (max-width: 680px) {
  :root {
    --continer-padding: 10px;
  }
  .warp .main-warp .main-card {
    grid-template-columns: 1fr;
  }
}
</style>
<style lang="less">
@media (max-width: 1400px) {
  :root {
    --continer-padding: 20px;
  }
}
@media (max-width: 1024px) {
  :root {
    --continer-padding: 15px;
  }
}
</style>
