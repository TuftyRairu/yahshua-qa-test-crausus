<template>
  <div class="card border-success shadow-sm">
    <div class="card-header bg-success text-white">
      <h5 class="mb-0">
        Payroll Result — {{ result.employee_name }}
        <span class="ms-2 badge bg-light text-success">{{ periodLabel }}</span>
      </h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <h6 class="text-muted text-uppercase fw-bold small mb-3">Earnings</h6>
          <table class="table table-sm">
            <tbody>
              <tr>
                <td>Basic Salary</td>
                <td class="text-end fw-bold">{{ fmt(result.basic_salary) }}</td>
              </tr>
            </tbody>
          </table>

          <h6 class="text-muted text-uppercase fw-bold small mb-3 mt-4">Government Deductions</h6>
          <table class="table table-sm">
            <thead><tr><th></th><th class="text-end">Employee</th><th class="text-end">Employer</th></tr></thead>
            <tbody>
              <tr>
                <td>SSS</td>
                <td class="text-end">{{ fmt(result.sss_employee) }}</td>
                <td class="text-end text-muted">{{ fmt(result.sss_employer) }}</td>
              </tr>
              <tr>
                <td>PhilHealth</td>
                <td class="text-end">{{ fmt(result.philhealth_employee) }}</td>
                <td class="text-end text-muted">{{ fmt(result.philhealth_employer) }}</td>
              </tr>
              <tr>
                <td>Pag-IBIG</td>
                <td class="text-end">{{ fmt(result.pagibig_employee) }}</td>
                <td class="text-end text-muted">{{ fmt(result.pagibig_employer) }}</td>
              </tr>
              <tr>
                <td>Income Tax</td>
                <td class="text-end">{{ fmt(result.income_tax) }}</td>
                <td class="text-end text-muted">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="text-center p-4 bg-light rounded">
            <div class="text-muted mb-1">Total Deductions</div>
            <div class="h4 text-danger mb-4">{{ fmt(result.total_deductions) }}</div>
            <div class="text-muted mb-1">Net Pay</div>
            <div class="display-5 fw-bold text-success">{{ fmt(result.net_pay) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: { type: Object, required: true },
})

const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const periodLabel = computed(() =>
  `${monthNames[props.result.period_month]} ${props.result.period_year}`
)

function fmt(val) {
  return '₱' + Number(val).toLocaleString('en-PH', { minimumFractionDigits: 2 })
}
</script>
