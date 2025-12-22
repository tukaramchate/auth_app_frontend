# Auth App Frontend

A modern authentication application built with React, TypeScript, and Vite.

## Features

- **User Authentication**: Login and Signup functionality
- **Multiple Pages**: About, Services, Login, and Signup pages
- **Modern UI**: Built with custom UI components (buttons, cards, calendar, labels)
- **Type-Safe**: Written in TypeScript for better development experience
- **Fast Development**: Powered by Vite for lightning-fast HMR

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **Tailwind CSS** - Utility-first CSS framework (via components)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd auth-app-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # Base UI components
├── pages/         # Application pages
├── lib/           # Utility functions
└── assets/        # Static assets
```

## Pages

- `/` - Home page
- `/login` - User login
- `/signup` - User registration
- `/about` - About page
- `/services` - Services page

## License

MIT