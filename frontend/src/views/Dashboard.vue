<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1">Dashboard</h1>
        <p class="text-muted mb-0">Philippine Payroll Calculator</p>
      </div>
      <span :class="apiStatus === 'ok' ? 'badge bg-success' : 'badge bg-danger'">
        API {{ apiStatus === 'ok' ? 'Online' : 'Offline' }}
      </span>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="display-4 fw-bold text-primary">{{ stats.employees }}</div>
            <div class="text-muted">Active Employees</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="display-4 fw-bold text-success">{{ stats.payrollRecords }}</div>
            <div class="text-muted">Payroll Records</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="display-4 fw-bold text-warning">{{ stats.departments }}</div>
            <div class="text-muted">Departments</div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card text-center h-100 shadow-sm">
          <div class="card-body">
            <div class="h4 fw-bold text-info">{{ stats.avgSalary }}</div>
            <div class="text-muted">Avg Monthly Salary</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header fw-bold">Quick Links</div>
          <div class="card-body">
            <div class="list-group list-group-flush">
              <router-link to="/employees" class="list-group-item list-group-item-action">
                👥 Manage Employees
              </router-link>
              <router-link to="/calculate" class="list-group-item list-group-item-action">
                🧮 Calculate Payroll
              </router-link>
              <router-link to="/history" class="list-group-item list-group-item-action">
                📋 Payroll History
              </router-link>
              <router-link to="/tax-info" class="list-group-item list-group-item-action">
                📊 Tax Brackets
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card shadow-sm h-100">
          <div class="card-header fw-bold">Recent Payroll Records</div>
          <div class="card-body p-0">
            <div v-if="recentRecords.length === 0" class="p-4 text-muted text-center">
              No records yet.
            </div>
            <ul v-else class="list-group list-group-flush">
              <li v-for="r in recentRecords" :key="r.id" class="list-group-item">
                <div class="d-flex justify-content-between">
                  <span>{{ r.employee_name }}</span>
                  <span class="text-success fw-bold">₱{{ Number(r.net_pay).toLocaleString('en-PH') }}</span>
                </div>
                <small class="text-muted">{{ monthName(r.period_month) }} {{ r.period_year }}</small>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { employeesApi, payrollApi, healthApi } from '../services/api.js'

const apiStatus = ref('checking')
const employees = ref([])
const records = ref([])

onMounted(async () => {
  try {
    await healthApi.check()
    apiStatus.value = 'ok'
  } catch {
    apiStatus.value = 'error'
  }
  try {
    const [empRes, histRes] = await Promise.all([
      employeesApi.list(),
      payrollApi.history(),
    ])
    employees.value = empRes.data
    records.value = histRes.data
  } catch {}
})

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
function monthName(m) { return monthNames[m] || m }

const stats = computed(() => {
  const deps = new Set(employees.value.map(e => e.department))
  const totalSalary = employees.value.reduce((s, e) => s + Number(e.monthly_salary), 0)
  const avg = employees.value.length ? (totalSalary / employees.value.length) : 0
  return {
    employees: employees.value.length,
    payrollRecords: records.value.length,
    departments: deps.size,
    avgSalary: '₱' + avg.toLocaleString('en-PH', { maximumFractionDigits: 0 }),
  }
})

const recentRecords = computed(() => records.value.slice(0, 5))
</script>
