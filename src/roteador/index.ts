import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const rotas: RouteRecordRaw[] = [{
  path: '/',
  name: 'tarefas',
  component: new Object
}]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})