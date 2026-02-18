<template>
  <form @submit.prevent="handleSubmit">
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Employee *</label>
        <select v-model="form.employee_id" class="form-select" required>
          <option value="">-- Select Employee --</option>
          <option v-for="emp in employees" :key="emp.id" :value="emp.id">
            {{ emp.full_name }} ({{ emp.employment_type }})
          </option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label">Month *</label>
        <select v-model.number="form.period_month" class="form-select" required>
          <option v-for="m in months" :key="m.value" :value="m.value">{{ m.label }}</option>
        </select>
      </div>

      <div class="col-md-3">
        <label class="form-label">Year *</label>
        <select v-model.number="form.period_year" class="form-select" required>
          <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <div class="col-md-6">
        <label class="form-label">Override Salary (₱) <small class="text-muted">optional</small></label>
        <!--
          BUG #2: This salary input is missing min="0" and has no client-side
          validation to prevent negative values. A user can type -5000 and the
          form will submit successfully, sending an invalid negative salary to
          the backend.
        -->
        <input
          v-model.number="form.override_salary"
          type="number"
          step="0.01"
          class="form-control"
          placeholder="Leave blank to use employee's salary"
        />
        <div class="form-text">Leave blank to use the employee's recorded monthly salary.</div>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <div class="mt-4">
      <button type="submit" class="btn btn-success btn-lg" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
        Calculate Payroll
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  employees: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  error: { type: String, default: null },
})
const emit = defineEmits(['submit'])

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1

const form = ref({
  employee_id: '',
  period_month: currentMonth,
  period_year: currentYear,
  override_salary: null,
})

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
]

const years = Array.from({ length: 6 }, (_, i) => currentYear - 2 + i)

function handleSubmit() {
  const payload = {
    employee_id: form.value.employee_id,
    period_month: form.value.period_month,
    period_year: form.value.period_year,
  }
  if (form.value.override_salary !== null && form.value.override_salary !== '') {
    payload.override_salary = form.value.override_salary
  }
  emit('submit', payload)
}
</script>
