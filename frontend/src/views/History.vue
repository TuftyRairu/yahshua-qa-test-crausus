<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Payroll History</h1>
      <div class="d-flex gap-2">
        <select v-model="filterYear" class="form-select form-select-sm" style="width: auto">
          <option value="">All Years</option>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
        <button class="btn btn-sm btn-outline-secondary" @click="load">Refresh</button>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-body p-0">
        <LoadingSpinner v-if="store.loading" />
        <div v-else-if="store.error" class="alert alert-danger m-3">{{ store.error }}</div>
        <PayrollHistory
          v-else
          :records="store.history"
          @delete="confirmDelete"
        />
      </div>
    </div>

    <DeleteModal
      modal-id="deleteHistoryModal"
      :message="deleteTarget ? `Delete payroll record for ${deleteTarget.employee_name} (${monthName(deleteTarget.period_month)} ${deleteTarget.period_year})?` : ''"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Modal } from 'bootstrap'
import { usePayrollStore } from '../stores/payroll.js'
import PayrollHistory from '../components/PayrollHistory.vue'
import DeleteModal from '../components/DeleteModal.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const store = usePayrollStore()
const filterYear = ref('')
const deleteTarget = ref(null)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function monthName(m) { return monthNames[m] || m }

onMounted(() => load())
watch(filterYear, () => load())

function load() {
  const params = filterYear.value ? { year: filterYear.value } : {}
  store.fetchHistory(params)
}

function confirmDelete(record) {
  deleteTarget.value = record
  const el = document.getElementById('deleteHistoryModal')
  if (el) new Modal(el).show()
}

async function handleDelete() {
  if (!deleteTarget.value) return
  await store.deleteRecord(deleteTarget.value.id)
  deleteTarget.value = null
}
</script>
