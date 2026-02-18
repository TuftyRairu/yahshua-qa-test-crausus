<template>
  <div>
    <div v-if="records.length === 0" class="text-center text-muted py-5">
      No payroll records found.
    </div>
    <div v-else class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Employee</th>
            <th>Period</th>
            <th class="text-end">Basic Salary</th>
            <th class="text-end">Total Deductions</th>
            <th class="text-end">Net Pay</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in records" :key="record.id">
            <td>{{ record.employee_name }}</td>
            <td>{{ monthName(record.period_month) }} {{ record.period_year }}</td>
            <td class="text-end">{{ fmt(record.basic_salary) }}</td>
            <td class="text-end text-danger">{{ fmt(record.total_deductions) }}</td>
            <td class="text-end text-success fw-bold">{{ fmt(record.net_pay) }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-outline-danger" @click="$emit('delete', record)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  records: { type: Array, default: () => [] },
})
defineEmits(['delete'])

const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function monthName(m) {
  return monthNames[m] || m
}

function fmt(val) {
  return '₱' + Number(val).toLocaleString('en-PH', { minimumFractionDigits: 2 })
}
</script>
