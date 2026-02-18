<template>
  <div>
    <div v-if="employees.length === 0" class="text-center text-muted py-5">
      No employees found.
    </div>
    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Type</th>
            <th class="text-end">Monthly Salary</th>
            <th>Date Hired</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>
              <strong>{{ emp.full_name }}</strong>
              <br /><small class="text-muted">{{ emp.email }}</small>
            </td>
            <td>{{ emp.position }}</td>
            <td>{{ emp.department }}</td>
            <td>
              <span :class="typeBadgeClass(emp.employment_type)" class="badge">
                {{ emp.employment_type }}
              </span>
            </td>
            <td class="text-end">{{ formatCurrency(emp.monthly_salary) }}</td>
            <td>{{ emp.date_hired }}</td>
            <td class="text-center">
              <div class="btn-group btn-group-sm">
                <button class="btn btn-outline-primary" @click="$emit('edit', emp)">Edit</button>
                <button class="btn btn-outline-danger" @click="$emit('delete', emp)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  employees: { type: Array, default: () => [] },
})
defineEmits(['edit', 'delete'])

function formatCurrency(val) {
  return '₱' + Number(val).toLocaleString('en-PH', { minimumFractionDigits: 2 })
}

function typeBadgeClass(type) {
  return {
    regular: 'bg-success',
    contractual: 'bg-warning text-dark',
    probationary: 'bg-info text-dark',
  }[type] || 'bg-secondary'
}
</script>
