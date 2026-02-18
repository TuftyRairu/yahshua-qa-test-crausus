<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">Employees</h1>
      <button class="btn btn-primary" @click="showAddForm = true" v-if="!showAddForm && !editEmployee">
        + Add Employee
      </button>
    </div>

    <div v-if="showAddForm || editEmployee" class="card shadow-sm mb-4">
      <div class="card-header fw-bold">
        {{ editEmployee ? 'Edit Employee' : 'Add New Employee' }}
      </div>
      <div class="card-body">
        <EmployeeForm
          :employee="editEmployee"
          @saved="handleSaved"
          @cancel="cancelForm"
        />
        <div v-if="formError" class="alert alert-danger mt-3">{{ formError }}</div>
      </div>
    </div>

    <div class="card shadow-sm">
      <div class="card-body p-0">
        <LoadingSpinner v-if="store.loading" />
        <div v-else-if="store.error" class="alert alert-danger m-3">{{ store.error }}</div>
        <EmployeeList
          v-else
          :employees="store.employees"
          @edit="startEdit"
          @delete="confirmDelete"
        />
      </div>
    </div>

    <DeleteModal
      modal-id="deleteEmployeeModal"
      :message="`Delete ${deleteTarget?.full_name}? This action cannot be undone.`"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { useEmployeesStore } from '../stores/employees.js'
import EmployeeForm from '../components/EmployeeForm.vue'
import EmployeeList from '../components/EmployeeList.vue'
import DeleteModal from '../components/DeleteModal.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const store = useEmployeesStore()
const showAddForm = ref(false)
const editEmployee = ref(null)
const deleteTarget = ref(null)
const formError = ref(null)

onMounted(() => store.fetchEmployees())

function startEdit(emp) {
  editEmployee.value = { ...emp }
  showAddForm.value = false
}

function cancelForm() {
  showAddForm.value = false
  editEmployee.value = null
  formError.value = null
}

async function handleSaved(data) {
  formError.value = null
  try {
    if (editEmployee.value) {
      await store.updateEmployee(editEmployee.value.id, data)
    } else {
      await store.createEmployee(data)
    }
    cancelForm()
  } catch (e) {
    formError.value = e.response?.data
      ? JSON.stringify(e.response.data)
      : 'Failed to save employee.'
  }
}

function confirmDelete(emp) {
  deleteTarget.value = emp
  const el = document.getElementById('deleteEmployeeModal')
  if (el) new Modal(el).show()
}

async function handleDelete() {
  if (!deleteTarget.value) return
  try {
    await store.deleteEmployee(deleteTarget.value.id)
  } catch {
    // handled by store
  }
  deleteTarget.value = null
}
</script>
