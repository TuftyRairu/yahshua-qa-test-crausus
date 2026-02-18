<template>
  <form @submit.prevent="handleSubmit">
    <div class="row g-3">
      <div class="col-md-6">
        <label class="form-label">First Name *</label>
        <input v-model="form.first_name" type="text" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Last Name *</label>
        <input v-model="form.last_name" type="text" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Email *</label>
        <input v-model="form.email" type="email" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Position *</label>
        <input v-model="form.position" type="text" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Department *</label>
        <input v-model="form.department" type="text" class="form-control" required />
      </div>
      <div class="col-md-6">
        <label class="form-label">Employment Type *</label>
        <select v-model="form.employment_type" class="form-select" required>
          <option value="regular">Regular</option>
          <option value="contractual">Contractual</option>
          <option value="probationary">Probationary</option>
        </select>
      </div>
      <div class="col-md-6">
        <label class="form-label">Monthly Salary (₱) *</label>
        <input
          v-model.number="form.monthly_salary"
          type="number"
          step="0.01"
          min="0"
          class="form-control"
          required
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Date Hired *</label>
        <input v-model="form.date_hired" type="date" class="form-control" required />
      </div>
    </div>

    <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>

    <div class="mt-4 d-flex gap-2">
      <button type="submit" class="btn btn-primary" :disabled="submitting">
        <span v-if="submitting" class="spinner-border spinner-border-sm me-1"></span>
        {{ employee ? 'Update Employee' : 'Add Employee' }}
      </button>
      <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  employee: { type: Object, default: null },
})
const emit = defineEmits(['saved', 'cancel'])

const defaultForm = () => ({
  first_name: '',
  last_name: '',
  email: '',
  position: '',
  department: '',
  employment_type: 'regular',
  monthly_salary: '',
  date_hired: '',
})

const form = ref(defaultForm())
const submitting = ref(false)
const error = ref(null)

watch(() => props.employee, (emp) => {
  if (emp) {
    form.value = { ...emp }
  } else {
    form.value = defaultForm()
  }
}, { immediate: true })

async function handleSubmit() {
  submitting.value = true
  error.value = null
  try {
    emit('saved', { ...form.value })
  } catch (e) {
    error.value = 'Failed to save employee.'
  } finally {
    submitting.value = false
  }
}
</script>
