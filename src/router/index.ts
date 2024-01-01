import { createRouter, createWebHistory } from 'vue-router'
import ArkNova from '@/ark-nova/index.vue'

const routes = [
  {
    path: '/',
    component: ArkNova,
    name: 'ArkNova'
  },
  {
    path: '/pandemic/fall-of-rome',
    component: () => import(`@/pandemic-fall-of-rome/index.vue`),
    name: 'PandemicFallOfRome'
  },
]
export default createRouter({
  history: createWebHistory(),
  routes,
})
