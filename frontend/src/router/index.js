import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Employees from '../views/Employees.vue'
import Calculator from '../views/Calculator.vue'
import History from '../views/History.vue'
import TaxInfo from '../views/TaxInfo.vue'

const routes = [
  { path: '/', component: Dashboard, name: 'dashboard' },
  { path: '/employees', component: Employees, name: 'employees' },
  { path: '/calculate', component: Calculator, name: 'calculator' },
  { path: '/history', component: History, name: 'history' },
  { path: '/tax-info', component: TaxInfo, name: 'tax-info' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
