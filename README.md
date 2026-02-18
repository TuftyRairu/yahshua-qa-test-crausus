# PH Payroll Calculator — QA Assessment Application

A full-stack Philippine payroll calculator built with Django + Vue.js 3 for QA engineer candidate assessment.

## Tech Stack

- **Backend:** Django 4.2, Django REST Framework
- **Frontend:** Vue.js 3, Vite, Pinia, Vue Router 4, Bootstrap 5
- **Database:** SQLite (dev)
- **Containerization:** Docker + docker-compose

## Quick Start

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/ (admin / admin123)

## Features

- Employee management (CRUD)
- Philippine payroll calculation:
  - Income tax (TRAIN Law brackets)
  - SSS contributions
  - PhilHealth contributions
  - Pag-IBIG contributions
  - 13th month pay estimation
- Payroll history
- Tax bracket reference

## Development

### Backend only
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata fixtures/sample_data.json
python manage.py runserver
```

### Frontend only
```bash
cd frontend
npm install
npm run dev
```

## Running E2E Tests

See `e2e-tests/README.md` for setup instructions.
