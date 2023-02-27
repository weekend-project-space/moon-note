// stores/counter.js
import { defineStore } from 'pinia'
import { ref, reactive, onMounted, watch } from 'vue'
import moment from 'moment'
import { getUrls, getWids, readBp, listDay, saveUrls, saveWids, saveBp } from '../services'

export const useStore = defineStore('default', () => {
    let f = getUrls();
    const favs = reactive(f);
    const wids = reactive(getWids());
    const bp = reactive(readBp(moment().format('YYYY-MM-DD')))
    const days = ref(listDay(moment().format('YYYY-MM')))
    const count = ref(0)
    onMounted(() => {
        watch(favs, (v) => {
            saveUrls(v)
        })
        watch(wids, (v) => {
            saveWids(v)
        })
        watch(bp, v => {
            saveBp(v)
        })
        watch(count, v => {
            alert(v)
        })
    })

    function changeDate(date) {
        const day = moment(date).format('YYYY-MM-DD')
        const month = moment(date).format('YYYY-MM')
        let d = readBp(day)
        // console.log(d)
        bp.day = d.day
        bp.events = d.events
        bp.note = d.note
        bp.todos = d.todos
        // days.splice(0, days.length)
        console.log(days, listDay(month))
        days.value = listDay(month)
        // listDay(moment).push(o => days.push(o))
    }
    return {
        favs,
        wids,
        bp,
        days,
        count,
        changeDate
    }
})