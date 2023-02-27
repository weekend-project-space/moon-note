import NoteBook from "./NoteBook.vue"
import RssList from "./RssList.vue"
import Podcast from "./Podcast.vue"

const widgets = [NoteBook, RssList, Podcast]

export default {
    install: (app, options) => {
        widgets.forEach(widget => {
            app.component(widget.__name, widget)
        })
    }
}