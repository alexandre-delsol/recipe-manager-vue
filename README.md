# Recipe Manager

A recipe management application built with **Vue 3**, allowing users to search for recipes, explore recipe details, manage favorites, and keep a browsing history.

The application uses **TheMealDB API** as its recipe data source and demonstrates modern Vue development practices with TypeScript, Pinia, Vue Router, Naive UI, and Tailwind CSS.

## Live Demo

[👉 Open Recipe Manager](https://recipe-manager-vue.vercel.app/)

## Features

* 🔎 Search recipes by name
* 🏷️ Filter recipes by category
* 🌍 Filter recipes by area/country
* 📖 View detailed recipe information
* ❤️ Add and remove favorite recipes
* 🕘 Keep a history of viewed recipes
* 💾 Persist favorites and history with `localStorage`
* ⏳ Loading skeletons while recipes are being fetched
* 🌙 Light and dark mode
* 📱 Responsive interface for mobile, tablet, and desktop
* ⚠️ Loading and error states
* 🧭 Client-side navigation with Vue Router

## Tech Stack

### Frontend

* [Vue 3](https://vuejs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Vue Router](https://router.vuejs.org/)
* [Pinia](https://pinia.vuejs.org/)
* [Naive UI](https://www.naiveui.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Vite](https://vite.dev/)

### Testing

* [Vitest](https://vitest.dev/)
* [Vue Test Utils](https://test-utils.vuejs.org/)

### API

* [TheMealDB](https://www.themealdb.com/)

## Architecture

The project follows a component-based architecture with a clear separation of responsibilities:

```text
src/
├── components/       # Reusable UI components
├── composables/      # Reusable Vue composition logic
├── router/           # Application routes
├── services/         # API communication
├── stores/           # Pinia state management
├── theme/            # Naive UI theme configuration
├── types/            # TypeScript types
├── views/            # Application pages
├── App.vue
└── main.ts
```

## Main Routes

| Route          | Description               |
| -------------- | ------------------------- |
| `/`            | Home page                 |
| `/recipes`     | Recipe search and filters |
| `/recipes/:id` | Recipe details            |
| `/library`     | Favorite recipes          |
| `/history`     | Recently viewed recipes   |

## Vue Concepts Demonstrated

This project was also developed as a practical exercise to apply modern Vue 3 concepts:

* `<script setup lang="ts">`
* Composition API
* `ref`
* `reactive`
* `computed`
* `watch`
* `onMounted`
* `defineProps`
* `defineEmits`
* `defineModel`
* Slots
* Composables
* Pinia setup stores
* `storeToRefs`
* Vue Router
* Typed TypeScript interfaces and types
* Async API calls
* Explicit loading, success, and error states

## Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/alexandre-delsol/recipe-manager-vue
cd recipe-manager-vue
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will then be available at the local URL provided by Vite.

## Testing

Run the unit tests:

```bash
npm run test:unit
```

Run TypeScript type checking:

```bash
npm run type-check
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## API

Recipe data is provided by **TheMealDB**.

The application uses several API endpoints to retrieve:

* Recipes
* Recipe details
* Categories
* Areas

The API layer is isolated in:

```text
src/services/mealDB.ts
```

This keeps API communication separate from the Vue components and application state.

## Data Persistence

Favorites and recipe history are stored locally using the browser's `localStorage`.

This allows the user's data to remain available after refreshing or reopening the application.

## Responsive Design

The interface is designed mobile-first and adapts to different screen sizes using Tailwind CSS responsive utilities.

The application is intended to remain usable on small screens, including approximately **320px wide** layouts.

## Project Goals

This project was created as part of a **Concepteur Développeur d'Applications (CDA)** training project.

The main objectives were to practice:

* Modern Vue 3 development
* TypeScript
* State management with Pinia
* API integration
* Component architecture
* Responsive UI development
* Form validation
* Unit testing
* Clean separation between views, components, services, stores, and types

## License

This project is intended for educational and portfolio purposes.
