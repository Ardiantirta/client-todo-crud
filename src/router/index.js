import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/Todos'
import CreateTodo from '@/components/Create'
import DetailTodo from '@/components/Detail'
import EditTodo from '@/components/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TodoList',
      component: Todos
    },
    {
      path: '/todo',
      name: 'TodoList',
      component: Todos
    },
    {
      path: '/todo/new',
      name: 'CreateTodo',
      component: CreateTodo
    },
    {
      path: '/todo/detail/:id',
      name: 'DetailTodo',
      component: DetailTodo
    },
    {
      path: '/todo/edit/:id',
      name: 'EditTodo',
      component: EditTodo
    }
  ]
})
