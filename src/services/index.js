import { onMounted, watch, ref } from "vue";
import { setItem, getItem } from "../utils/storage";
import moment from 'moment'
// {
// favs:[''],
//  wids:[{
// name:'Podcast',
// title: ''
// data:'xxxxx'||{}||araray
// }]
//   bps:{
//     '2023-11'：[{
//        day: '2023-11-01',
//        todo:[{vaule:'',done:false}],
//        note: '',
//        event:['']
//      }]
//   }
// }

export function importData(str) {
    const d = JSON.parse(str);
    saveUrls(d.urls)
    saveWids(d.wids)
    let bpsIndex = []
    for (let k of d.bps) {
        bdsIndex.push(k)
        let v = d.bps[k]
        saveBps(k, v)
    }
    saveBpIndex(bdsIndex)
}

export function exportData() {
    let bps = {}
    let ix = getBPIndex()
    for (let month of ix) {
        bps[month] = getBps(month)
    }
    return {
        urls: getUrls(),
        wids: getWids(),
        bps
    }
}

export function readBp(day) {
    let k = day.substr(0, 7);
    let v = getItem(k);
    if (v) {
        let array = v.filter(o => o.day == day)
        if (array.length) {
            return array[0]
        }
    }
    if (getBPIndex().length) {
        return {
            day: day,
            todos: [],
            note: '',
            events: []
        }
    } else {
        return {
            day: day,
            todos: [{ value: 'note', done: true }, { value: 'event', done: true }, { value: 'todo', done: true }, { value: '离线使用 pwa', done: false }, { value: '数据导出', done: true }, { value: '导入', done: false }, { value: '小组件 (Podcat, RssList, Quick Note)', done: true }, { value: '自定义小组件', done: true }, { value: '三方小组件', done: false }, { value: '常用网址收藏', done: true }, { value: '日期查看跳转', done: true }],
            note: '欢迎使用 Moon bullet journals , 数据全部存放再您的个人设备上，无需担心数据泄露，可以点击右上角导出，支持离线使用，在这里[查看源码](https://github.com/weekend-project-space/moon-note) \n > Note采用md书写格式下面是语法示例 \n ## Markdown Basic Syntax \n> Dorothy followed her through many of the beautiful rooms in her castle. \n - [x] Write the press release',
            events: ['hello world']
        }
    }

}

export function listDay(month) {
    let k = month;
    let v = getBps(k);
    if (v) {
        return v.filter(o => o.note.length || o.events.length || o.todos.length).map(o => o.day)
    }
    return []
}

export function getBps(month) {
    let k = month;
    let v = getItem(k);
    return v ? v : []
}

export function getWids() {
    let k = 'wids';
    let v = getItem(k)
    return v ? v : [
        {
            name: "Podcast",
            title: "podcast",
            data: "https://rsshub.app/ximalaya/album/51101122/0/shownote",
        },
        {
            name: "RssList",
            title: "RssList",
            data: "https://api.webfollow.cc/api/articles?source=EXPLORE&sort=channel,desc",
        },
        {
            name: "NoteBook",
            title: "QuickNote",
            data: "hello world",
        },
    ]
}

export function getUrls() {
    let k = 'favs';
    let v = getItem(k)
    return v ? v : []
}

export function getBPIndex() {
    let k = 'bp-index'
    let v = getItem(k)
    return v ? v : []
}

export function saveBp(obj) {
    if (obj.note.length || obj.events.length || obj.todos.length) {
        let k = obj.day.substr(0, 7);
        let v = getItem(k)
        if (!v) {
            v = [obj]
            setItem(k, v)
        } else {
            if (!v.filter(o => o.day == obj.day).length) {
                v.push(obj)
                setItem(k, v)
            } else {
                for (let i = 0; i < v.length; i++) {
                    if (v[i].day == obj.day) {
                        v[i] = obj;
                    }
                }
                setItem(k, v)
            }
        }
        let ix = getBPIndex()
        if (!ix) {
            ix = [k]
            saveBpIndex(ix)
        } else {
            let vs = new Set(ix)
            if (!vs.has(k)) {
                ix.push(k)
                saveBpIndex(ix)
            }
        }
    }
}

export function saveBps(month, v) {
    setItem(moment, v)
}

export function saveWids(v) {
    setItem('wids', v)
}

export function saveUrls(v) {
    setItem('favs', v)
}

export function saveBpIndex(v) {
    setItem('bp-index', v)
}

// function addWid(obj) {
//     let k = 'wids';
//     let v = getItem(k)
//     if (!v) {
//         v = []
//     }
//     if (!v.filter(o => o.name == obj.name).length) {
//         v.push(obj)
//         setItem(k, v)
//     }
// }

// function addUrl(url) {
//     let k = 'urls';
//     let v = getItem(k)
//     if (!v) {
//         v = []
//     }
//     if (!v.filter(o => o == url).length) {
//         v.push(obj)
//         setItem(k, v)
//     }
// }