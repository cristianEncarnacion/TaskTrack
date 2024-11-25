# TaskTrack

TaskTrackPrivate es una aplicación web interactiva para la gestión de tareas con funcionalidades avanzadas, como integración con un calendario, priorización de tareas, un temporizador Pomodoro con sonido, y tareas dinámicas. Este proyecto fue desarrollado utilizando React, TypeScript y Supabase como base de datos.

## Características principales

- **Gestión de Tareas**: Permite a los usuarios crear, editar, eliminar y priorizar tareas.
- **Calendario Integrado**: Incluye un calendario interactivo para organizar tareas por fechas.
- **Pomodoro Dinámico**: Temporizador Pomodoro con sonido de timbre al finalizar. Muestra solo las tareas no completadas.
- **Colores Interactivos**: Asigna colores a las tareas según su prioridad o estado.
- **Soporte de Prioridades**: Organiza las tareas en base a su importancia o urgencia.
- **Hooks de React**: Implementado con `useState`, `useEffect`, `useRef` y `useContext` para un manejo eficiente del estado.
- **Backend con Supabase**: Base de datos para el manejo de las tareas y persistencia de datos.

## Tecnologías utilizadas

### Frontend

- **React** con **TypeScript**
- **TailwindCSS** para estilos.
- Librerías adicionales:
  - **@mui/material**: Componentes UI modernos.
  - **react-calendar** y **react-big-calendar**: Para la funcionalidad del calendario.
  - **react-icons**, **react-feather**, **lucide-react**: Para iconografía.
  - **emailjs**: Integración de servicios de email.

### Backend

- **Supabase**: Base de datos y autenticación.

### Herramientas de desarrollo

- **Vite**: Para un entorno de desarrollo rápido.
- **ESLint**: Para análisis estático del código.
- **Typescript**: Tipado estático para mayor robustez.

## Instalación y configuración

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tasktrackprivate.git
   cd tasktrackprivate

   ```

2. Instala las dependencias:
   npm install

3. Configura las variables de entorno de un archivo .env
   VITE_SUPABASE_URL=<TU_SUPABASE_URL>
   VITE_SUPABASE_KEY=<TU_SUPABASE_KEY>

4. Inicia el servidor de desarrollo
   npm run dev

### Estructura del proyecto

src/
├── backend/         # Código relacionado con la lógica del backend
├── components/      # Componentes reutilizables de la interfaz
├── context/         # Gestión de estado global con React Context
├── pages/           #


### Como usar la aplicacion?

1. Agregar tareas: Usa el formulario principal para crear nuevas tareas.
2. Calendario: Navega por las fechas para ver las tareas asignadas.
3. Temporizador Pomodoro:
   -Selecciona una tarea pendiente.
   -Inicia el temporizador para trabajar en intervalos de tiempo.
   -Recibirás una notificación sonora al finalizar.
4. Colores interactivos:
   -Las tareas se resaltan en diferentes colores según su prioridad.

### Mejoras futuras

Mejoras futuras

Los usuarios o colaboradores pueden mejorar esta aplicación agregando:

- **Notificaciones Push**: Para recordar a los usuarios sobre tareas importantes.
- **Integración con API externas**: Por ejemplo, Google Calendar.
  Soporte offline: Usando tecnologías como IndexedDB.
- **Estadísticas de productividad**: Análisis visual del progreso de tareas completadas.
- **Autenticación avanzada**: Usando OAuth o JWT con Supabase.

### Dependencias

- **@supabase/supabase-js**: Cliente para conectar con Supabase.
- **react-big-calendar y react-calendar**: Funcionalidad de calendario.
- **react-router-dom**: Manejo de rutas.
- **@mui/material**: Componentes de interfaz de usuario.
- **emailjs**: Envío de correos electrónicos.

## DevDependencies

- **vite**: Herramienta de construcción y desarrollo rápido.
- **eslint**: Herramienta para mantener código limpio.
- **tailwindcss**: Framework CSS para estilos.

### Autor

Creado por Cristian Encarnación.

### Contribuciones

Las contribuciones son bienvenidas. Por favor, realiza un fork del repositorio y crea un pull request con tus mejoras.

### Deploy

El proyecto está desplegado en https://tasktrackdev.netlify.app/
