import HistoryView from '@/views/HistoryView.vue'
import HomeView from '@/views/HomeView.vue'
import LibraryView from '@/views/LibraryView.vue'
import RecipeDetailView from '@/views/RecipeDetailView.vue'
import SearchView from '@/views/SearchView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/recipes",
      name: "recipes",
      component: SearchView
    },
    {
      path: "/recipes/:id",
      name: "recipe-detail",
      component: RecipeDetailView
    },
    {
      path: "/library",
      name: "library",
      component: LibraryView
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryView
    }
  ],
})

export default router
