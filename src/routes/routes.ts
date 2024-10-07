import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import HistoryView from '../views/HistoryView.vue';


const routes = [
    { path: '/', component: HomeView },
    { path: '/history', component: HistoryView },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router;