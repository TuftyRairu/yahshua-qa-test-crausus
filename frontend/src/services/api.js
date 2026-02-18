import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const employeesApi = {
  list: () => api.get('/employees/'),
  get: (id) => api.get(`/employees/${id}/`),
  create: (data) => api.post('/employees/', data),
  update: (id, data) => api.put(`/employees/${id}/`, data),
  delete: (id) => api.delete(`/employees/${id}/`),
}

export const payrollApi = {
  calculate: (data) => api.post('/calculate-payroll/', data),
  history: (params) => api.get('/payroll-history/', { params }),
  getRecord: (id) => api.get(`/payroll-history/${id}/`),
  deleteRecord: (id) => api.delete(`/payroll-history/${id}/`),
}

export const taxApi = {
  brackets: () => api.get('/tax-brackets/'),
}

export const healthApi = {
  check: () => api.get('/health/'),
}

export default api
