# Auth App Frontend

A modern, full-featured authentication application built with React, TypeScript, and Vite. This application provides secure user authentication with support for traditional email/password login and OAuth2 social authentication (Google & GitHub).

## ✨ Features

- 🔐 **User Authentication**: Complete login and registration system with JWT token management
- 🔄 **Token Refresh**: Automatic token refresh mechanism for seamless user experience
- 🌐 **OAuth2 Integration**: Social authentication with Google and GitHub
- 👤 **User Profile**: User profile and dashboard pages
- 🎨 **Modern UI**: Beautiful, responsive interface with Radix UI and Tailwind CSS
- 🎭 **Animations**: Smooth animations powered by Framer Motion
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🔔 **Toast Notifications**: User-friendly notifications with react-hot-toast
- 🗓️ **Date Components**: Advanced date picker with react-day-picker
- 📦 **State Management**: Efficient state management with Zustand
- 🛡️ **Type-Safe**: Written in TypeScript for better development experience and fewer bugs
- ⚡ **Fast Development**: Powered by Vite for lightning-fast HMR

## 🛠️ Tech Stack

### Frontend Framework & Tools
- **React 19** - Latest version of the popular UI library
- **TypeScript 5.9** - Static type checking
- **Vite 7** - Next generation frontend tooling
- **React Router 7** - Declarative routing

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Dialog, Avatar, Label, Slot components
- **Framer Motion** - Production-ready animation library
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - CSS variant management
- **tailwind-merge** & **clsx** - Utility class management

### State & Data Management
- **Zustand** - Lightweight state management
- **Axios** - HTTP client with interceptors
- **date-fns** - Modern date utility library

### Development Tools
- **ESLint** - Code linting with React-specific rules
- **TypeScript ESLint** - TypeScript linting support
- **Vite Plugin React** - Fast Refresh support

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager
- Backend API server running (default: http://localhost:8083)

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8083/api/v1
VITE_BASE_URL=http://localhost:8083
```

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd auth-app-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (TypeScript compilation + Vite build) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 📁 Project Structure

```
auth-app-frontend/
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images, fonts, and other media
│   ├── auth/
│   │   └── store.ts       # Zustand authentication state management
│   ├── components/
│   │   ├── Navbar.tsx     # Navigation bar component
│   │   ├── OAuth2Buttons.tsx  # Google & GitHub OAuth buttons
│   │   ├── home/
│   │   │   └── FuturisticAuthHome.tsx  # Landing page component
│   │   └── ui/            # Reusable UI components (Radix UI based)
│   │       ├── alert.tsx
│   │       ├── avatar.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── spinner.tsx
│   ├── config/
│   │   └── ApiClient.ts   # Axios configuration with interceptors
│   ├── lib/
│   │   └── utils.ts       # Utility functions (cn helper, etc.)
│   ├── models/            # TypeScript type definitions
│   │   ├── LoginData.ts
│   │   ├── LoginResponseData.ts
│   │   ├── RegisterData.ts
│   │   └── User.ts
│   ├── pages/
│   │   ├── About.tsx      # About page
│   │   ├── Login.tsx      # Login page
│   │   ├── Signup.tsx     # Registration page
│   │   ├── Services.tsx   # Services page
│   │   ├── OAuthSuccess.tsx   # OAuth success callback
│   │   ├── OAuthFailure.tsx   # OAuth failure callback
│   │   ├── RootLayout.tsx     # Root layout wrapper
│   │   └── users/         # Protected user pages
│   │       ├── Userhome.tsx
│   │       ├── Userlayout.tsx
│   │       └── Userprofile.tsx
│   ├── services/
│   │   └── AuthService.ts     # Authentication API calls
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── components.json        # Shadcn/ui configuration
├── eslint.config.js       # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies and scripts
```

## 🌐 Application Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | FuturisticAuthHome | Landing/Home page | No |
| `/login` | Login | User login with email/password | No |
| `/signup` | Signup | User registration | No |
| `/about` | About | About page | No |
| `/services` | Services | Services information | No |
| `/oauth/success` | OAuthSuccess | OAuth success redirect | No |
| `/oauth/failure` | OAuthFailure | OAuth failure redirect | No |
| `/user/*` | Userlayout | Protected user area | Yes |
| `/user/home` | Userhome | User dashboard | Yes |
| `/user/profile` | Userprofile | User profile page | Yes |

## 🔑 Authentication Flow

### Standard Authentication
1. User enters credentials on login page
2. Frontend sends POST request to `/auth/login`
3. Backend validates credentials and returns JWT tokens
4. Access token stored in Zustand store
5. Refresh token stored in HTTP-only cookie
6. Subsequent requests include Bearer token in Authorization header

### OAuth2 Authentication (Google/GitHub)
1. User clicks OAuth button
2. Redirected to OAuth provider (Google/GitHub)
3. User authorizes application
4. Provider redirects to backend callback
5. Backend processes OAuth response and creates session
6. Frontend receives tokens and redirects to success page

### Token Refresh
- Axios interceptors automatically detect expired tokens
- Refresh token endpoint called to get new access token
- Failed requests automatically retried with new token
- User seamlessly continues without re-authentication

## 🔧 API Integration

The application uses Axios with custom interceptors configured in `ApiClient.ts`:

- **Base URL**: Configurable via `VITE_API_BASE_URL` environment variable
- **Credentials**: Includes cookies with every request
- **Authorization**: Auto-attaches Bearer token from Zustand store
- **Timeout**: 10-second request timeout
- **Error Handling**: Automatic token refresh on 401 errors

### API Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/auth/register` | POST | User registration |
| `/auth/login` | POST | User login |
| `/auth/logout` | POST | User logout |
| `/auth/refresh` | POST | Refresh access token |
| `/users/email/{emailId}` | GET | Get user by email |
| `/oauth2/authorization/google` | GET | Google OAuth2 flow |
| `/oauth2/authorization/github` | GET | GitHub OAuth2 flow |

## 🎨 UI Components

The application uses a combination of custom components built on Radix UI primitives:

- **Button**: Multiple variants (default, outline, ghost, etc.)
- **Card**: Content containers with header, content, footer
- **Input**: Form input fields with labels
- **Avatar**: User profile pictures with fallbacks
- **Dialog**: Modal dialogs and popups
- **Calendar**: Date picker component
- **Alert**: Notification and alert messages
- **Spinner**: Loading indicators

All components are fully typed, accessible, and themeable with Tailwind CSS.

## 🔐 State Management

Authentication state is managed using Zustand store with persistence (`auth/store.ts`):

```typescript
{
  accessToken: string | null,
  user: User | null,
  authStatus: boolean,
  authLoading: boolean,
  
  // Actions
  login: (loginData: LoginData) => Promise<LoginResponseData>,
  logout: (silent?: boolean) => void,
  checkLogin: () => boolean | undefined,
  changeLocalLoginData: (accessToken, user, authStatus) => void
}
```

The state is persisted to localStorage using Zustand's persist middleware, ensuring authentication survives page refreshes.

## 🌍 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8083/api/v1` |
| `VITE_BASE_URL` | Backend base URL (for OAuth) | `http://localhost:8083` |

## 🏗️ Building for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service (Vercel, Netlify, AWS S3, etc.).

## 🧪 Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: React and TypeScript linting rules
- **Hot Module Replacement**: Instant feedback during development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tukaram Chate**

- LinkedIn: [https://www.linkedin.com/in/tukaram-chate](https://www.linkedin.com/in/tukaram-chate)
- GitHub: [https://github.com/tukaram-chate](https://github.com/tukaram-chate)

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- State management by [Zustand](https://zustand-demo.pmnd.rs/)

---

<div align="center">
  <p>Made with ❤️ by Tukaram Chate</p>
  <p>
    <a href="https://www.linkedin.com/in/tukaram-chate">LinkedIn</a> •
    <a href="https://github.com/tukaram-chate">GitHub</a>
  </p>
</div>