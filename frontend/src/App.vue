<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <router-link class="navbar-brand fw-bold" to="/">
          💰 PH Payroll Calculator
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Dashboard</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/employees">Employees</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/calculate">Calculator</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/history">History</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tax-info">Tax Info</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-view />
    </main>

    <footer class="bg-light border-top py-3 mt-5">
      <div class="container text-center text-muted small">
        PH Payroll Calculator &mdash; QA Assessment Application
      </div>
    </footer>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
.router-link-active.nav-link {
  font-weight: 600;
  border-bottom: 2px solid rgba(255,255,255,0.8);
}
</style>
