<template>
  <div>
    <h1 class="h3 mb-4">Tax Information</h1>

    <div class="card shadow-sm mb-4">
      <div class="card-header fw-bold">TRAIN Law Income Tax Brackets (2023)</div>
      <div class="card-body p-0">
        <LoadingSpinner v-if="loading" />
        <div v-else-if="error" class="alert alert-danger m-3">{{ error }}</div>
        <div v-else class="table-responsive">
          <table class="table mb-0">
            <thead class="table-light">
              <tr>
                <th>Annual Taxable Income</th>
                <th class="text-end">Base Tax</th>
                <th class="text-end">Rate</th>
                <th>On Excess Over</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(bracket, i) in brackets" :key="i">
                <td>{{ bracket.label }}</td>
                <td class="text-end">{{ fmt(bracket.base_tax) }}</td>
                <td class="text-end">
                  <span :class="bracket.rate === 0 ? 'badge bg-success' : 'badge bg-primary'">
                    {{ bracket.rate }}%
                  </span>
                </td>
                <td>{{ bracket.excess_over ? fmt(bracket.excess_over) : '—' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-header fw-bold">SSS Contributions</div>
          <div class="card-body">
            <dl>
              <dt>Employee Share</dt><dd>4.5% of Monthly Salary Credit</dd>
              <dt>Employer Share</dt><dd>9.5% of Monthly Salary Credit</dd>
              <dt>Salary Ceiling</dt><dd>₱20,000 (max MSC)</dd>
              <dt>Minimum MSC</dt><dd>₱3,000</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-header fw-bold">PhilHealth</div>
          <div class="card-body">
            <dl>
              <dt>Total Rate</dt><dd>5% of Monthly Basic Salary</dd>
              <dt>Employee Share</dt><dd>2.5%</dd>
              <dt>Employer Share</dt><dd>2.5%</dd>
              <dt>Salary Floor</dt><dd>₱10,000</dd>
              <dt>Salary Ceiling</dt><dd>₱100,000</dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card shadow-sm h-100">
          <div class="card-header fw-bold">Pag-IBIG / HDMF</div>
          <div class="card-body">
            <dl>
              <dt>Employee Share</dt><dd>2% of monthly salary</dd>
              <dt>Employer Share</dt><dd>2% of monthly salary</dd>
              <dt>Maximum</dt><dd>₱200/month per share (if salary &gt; ₱5,000)</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePayrollStore } from '../stores/payroll.js'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const store = usePayrollStore()
const brackets = ref([])
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  try {
    await store.fetchTaxBrackets()
    brackets.value = store.taxBrackets
  } catch {
    error.value = 'Failed to load tax brackets.'
  } finally {
    loading.value = false
  }
})

function fmt(val) {
  if (!val) return '₱0'
  return '₱' + Number(val).toLocaleString('en-PH')
}
</script>
