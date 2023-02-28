<script setup>
import { computed, ref, toRefs, toRef } from "vue";
import EventList from "../EventList.vue";
import "element-plus/es/components/calendar/style/css";
import { ElCalendar } from "element-plus";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { exportData } from "@/services";
const store = useStore();
const { favs, bp, days } = storeToRefs(store);
const { changeDate } = store;

const date = ref(new Date());
const calendar = ref();

const changeDate0 = (d) => {
  date.value = d;
  changeDate(d);
};
const addFav = () => {
  let url = prompt("请输入网址");
  if (url) {
    favs.value.push(url);
  }
};
const selectDate = (val) => {
  calendar.value.selectDate(val);
  console.log(val);
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
</script>
<template>
  <div class="warp">
    <div class="main-warp">
      <div class="sidebar">
        <!-- <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt=""
          class="logo"
        /> -->
        <h1 class="site-title logo">
          <span class="mdi mdi-bullseye-arrow"></span>
        </h1>
        <div class="nav-warp">
          <!-- <label class="label" for="">setting</label> -->
          <nav class="navs">
            <li>
              <router-link to="/"
                ><span class="mdi mdi-home-outline"></span
              ></router-link>
            </li>
            <li>
              <router-link to="/todo"
                ><span
                  class="mdi mdi-checkbox-marked-circle-plus-outline"
                ></span
              ></router-link>
            </li>
            <li>
              <router-link to="/note"
                ><span class="mdi mdi-notebook-edit-outline"></span
              ></router-link>
            </li>
            <!-- <li><span class="mdi mdi-calendar-text"></span></li> -->
          </nav>
        </div>
      </div>
      <div class="main">
        <header>
          <h1 class="site-title">Moon bullet journal</h1>
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
        <slot />
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

      <div class="event-warp">
        <label class="label">
          <span class="mdi mdi-calendar-text"></span>
          Event
        </label>
        <EventList v-model="bp.events"></EventList>
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
              <span
                :class="
                  data.isSelected
                    ? 'mdi mdi-check-bold'
                    : hasDay(data.day)
                    ? 'mdi mdi-minus-thick'
                    : ''
                "
              ></span>
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
    grid-template-columns: 60px minmax(580px, auto);
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

//main end
// side
.sidebar {
  position: sticky;
  .nav-warp {
    text-align: center;

    .navs {
      list-style: none;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
      // padding: 0 20px;
      li {
        line-height: 3em;
        font-size: 1.4em;
        // font-weight: bold;
      }
    }
  }
  .logo {
    margin-top: var(--inner-padding);
    text-align: center;
  }
}
// side end
// panel
.panel {
  margin: var(--inner-padding);
  box-sizing: border-box;
  .panel-header {
    min-height: var(--top-height);
    display: grid;
    justify-content: flex-start;
    grid-template-columns: 5fr minmax(60px, 1fr);
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
    margin-top: var(--continer-padding);
    min-height: 60px;
    // border-radius: 10px;
    // padding: 0 1em 1em;
    // border-radius: 5px;
  }
  .num-list {
    padding-inline-start: 0;
    padding-left: 10px;
    list-style: none;

    small {
      text-align: center;
      font-size: 1.3em;
    }
  }
  .card-warp {
    margin-top: var(--continer-padding);
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
    margin-top: var(--continer-padding);
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

@media (max-width: 1400px) {
  :root {
    --continer-padding: 20px;
  }
  .warp {
    grid-template-columns: 1fr;
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
  .sidebar {
    display: grid;
    grid-template-columns: 1fr 3fr;
    .logo {
      margin-top: 0;
    }
  }
}
</style>
<style lang="less">
.label {
  font-size: 1.5em;
  font-weight: 500;
}
.flex {
  display: flex;
  justify-content: space-between;
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
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
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
    margin-top: var(--inner-padding);
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
@media (max-width: 680px) {
  :root {
    --continer-padding: 12px;
  }
  .warp .main-warp .main-card {
    grid-template-columns: 1fr;
  }
}
</style>
