# Task Manager

[![CI](https://github.com/dedaFSdeveloper/task-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/dedaFSdeveloper/task-manager/actions/workflows/ci.yml) ![React](https://img.shields.io/badge/React-19-61dafb) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![License](https://img.shields.io/badge/status-portfolio-informational)

🔗 **Deploy:** https://proyecto-m4-ezequiel-molinari.vercel.app

## Cómo probarlo

Podés registrarte con tu propio email para crear una cuenta de prueba, o clonar el repo y correrlo localmente con tus propias credenciales de Firebase (ver sección de instalación).

> ⚠️ AWS SES está en modo sandbox. Los emails pueden llegar a spam.

---

## Descripción

SPA de gestión de tareas que permite a los usuarios organizar su trabajo diario de forma eficiente, persistente y accesible desde cualquier dispositivo.

## Stack

- **Frontend:** React + TypeScript
- **BaaS:** Firebase (Authentication + Cloud Firestore)
- **Notificaciones:** AWS SES + Vercel Serverless Functions
- **Deploy:** Vercel
- **Testing:** Vitest + React Testing Library

## Funcionalidades

- Registro e inicio de sesión con email y contraseña
- Edición y eliminación de tareas
- Marcar tareas como completadas
- Filtros: todas, pendientes y completadas
- Prioridad por tarea (alta, media, baja) con ordenamiento automático
- Fecha de vencimiento opcional — por decisión de diseño la fecha no es obligatoria
- Notificación por email al crear una tarea via AWS SES
- Contador de tareas pendientes en tiempo real
- Toasts de confirmación en acciones (agregar, editar, eliminar)
- Animación de entrada al agregar una tarea nueva

## Instalación local

```bash
git clone https://github.com/dedaFSdeveloper/ProyectoM4-EzequielMolinari.git
cd ProyectoM4-EzequielMolinari
npm install
cp .env.example .env
# completar variables en .env
npm run dev
```

## Variables de entorno

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# AWS SES
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
SES_FROM_EMAIL=
```

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # producción
npm run test     # tests
```

## Estructura

```
src/
├─ pages/        # Login, Register, Tasks
├─ components/   # TodoForm, TodoList, TaskFilter
├─ hooks/        # useAuth, useTasks
├─ services/     # firebase.ts, emailService.ts
├─ routes/       # ProtectedRoute
├─ types/        # interfaces TypeScript
└─ utils/        # validators
api/             # Serverless Functions (AWS SES)
tests/           # unit tests
```

---

## 👤 Autor / Author

**Ezequiel Molinari** — Full Stack Developer · AI & Automation  
📫 [molinariezequiel2@gmail.com](mailto:molinariezequiel2@gmail.com) · [LinkedIn](https://www.linkedin.com/in/ezmolinari12/) · [GitHub](https://github.com/dedaFSdeveloper) · [libreriacrayon.com.ar](https://libreriacrayon.com.ar)
