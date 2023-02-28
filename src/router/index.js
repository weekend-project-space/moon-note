// 1. Define route components.
// These can be imported from other files
import { createRouter, createWebHashHistory } from 'vue-router'

const About = { template: '<div>About</div>' }

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: () => import('@/views/Index.vue') },
    { path: '/todo', component: () => import('@/views/Todo.vue') },
    { path: '/note', component: () => import('@/views/Note.vue') },
    { path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router