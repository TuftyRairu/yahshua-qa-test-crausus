<template>
  <div>
    <h1 class="h3 mb-4">Payroll Calculator</h1>

    <div class="card shadow-sm mb-4">
      <div class="card-header fw-bold">Calculate Payroll</div>
      <div class="card-body">
        <LoadingSpinner v-if="empLoading" message="Loading employees..." />
        <PayrollForm
          v-else
          :employees="employees"
          :loading="payrollStore.loading"
          :error="payrollStore.error"
          @submit="handleCalculate"
        />
      </div>
    </div>

    <PayrollResults v-if="payrollStore.lastResult" :result="payrollStore.lastResult" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePayrollStore } from '../stores/payroll.js'
import { employeesApi } from '../services/api.js'
import PayrollForm from '../components/PayrollForm.vue'
import PayrollResults from '../components/PayrollResults.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const payrollStore = usePayrollStore()
const employees = ref([])
const empLoading = ref(false)

onMounted(async () => {
  empLoading.value = true
  try {
    const res = await employeesApi.list()
    employees.value = res.data
  } finally {
    empLoading.value = false
  }
})

async function handleCalculate(payload) {
  try {
    await payrollStore.calculatePayroll(payload)
  } catch {
    // error already in store
  }
}
</script>
