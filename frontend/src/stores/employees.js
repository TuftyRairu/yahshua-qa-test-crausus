import { defineStore } from 'pinia'
import { ref } from 'vue'
import { employeesApi } from '../services/api.js'

export const useEmployeesStore = defineStore('employees', () => {
  const employees = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchEmployees() {
    loading.value = true
    error.value = null
    try {
      const res = await employeesApi.list()
      employees.value = res.data
    } catch (e) {
      error.value = e.response?.data?.error || 'Failed to load employees.'
    } finally {
      loading.value = false
    }
  }

  async function createEmployee(data) {
    const res = await employeesApi.create(data)
    employees.value.push(res.data)
    return res.data
  }

  async function updateEmployee(id, data) {
    const res = await employeesApi.update(id, data)
    const idx = employees.value.findIndex(e => e.id === id)
    if (idx !== -1) employees.value[idx] = res.data
    return res.data
  }

  async function deleteEmployee(id) {
    await employeesApi.delete(id)
    employees.value = employees.value.filter(e => e.id !== id)
  }

  return { employees, loading, error, fetchEmployees, createEmployee, updateEmployee, deleteEmployee }
})
