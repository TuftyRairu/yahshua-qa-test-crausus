<template>
  <div class="d-flex justify-content-center align-items-center py-5">
    <div class="spinner-border text-primary me-3" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <span class="text-muted">{{ message }}</span>
  </div>
</template>

<script setup>
defineProps({
  message: { type: String, default: 'Loading...' }
})
</script>
