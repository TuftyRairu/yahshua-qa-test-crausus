import { defineStore } from 'pinia'
import { ref } from 'vue'
import { payrollApi, taxApi } from '../services/api.js'

export const usePayrollStore = defineStore('payroll', () => {
  const history = ref([])
  const lastResult = ref(null)
  const taxBrackets = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function calculatePayroll(data) {
    loading.value = true
    error.value = null
    lastResult.value = null
    try {
      const res = await payrollApi.calculate(data)
      lastResult.value = res.data
      return res.data
    } catch (e) {
      error.value = e.response?.data?.error || 'Calculation failed.'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function fetchHistory(params) {
    loading.value = true
    error.value = null
    try {
      const res = await payrollApi.history(params)
      history.value = res.data
    } catch (e) {
      error.value = 'Failed to load payroll history.'
    } finally {
      loading.value = false
    }
  }

  async function deleteRecord(id) {
    await payrollApi.deleteRecord(id)
    history.value = history.value.filter(r => r.id !== id)
  }

  async function fetchTaxBrackets() {
    const res = await taxApi.brackets()
    taxBrackets.value = res.data.brackets
  }

  return {
    history, lastResult, taxBrackets, loading, error,
    calculatePayroll, fetchHistory, deleteRecord, fetchTaxBrackets,
  }
})
