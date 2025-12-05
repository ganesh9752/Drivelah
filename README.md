# Drive lah - Frontend Developer Assignment

A responsive web application for managing car listings with subscription plans and device management, built with React, TypeScript, and SASS.

## 🚀 Features

- **Responsive Design**: Fully responsive layouts for both desktop and mobile views
- **State Management**: Zustand for state management with local storage persistence
- **Subscription Plans**: Three subscription tiers (Just mates, Good mates, Best mates)
- **Device Management**: Add and manage multiple devices with image uploads
- **Pixel Perfect**: Matches the provided Adobe XD designs
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation
- **Type Safety**: Full TypeScript implementation

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project directory:

   ```bash
   cd diverlah
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues
- `npm run format` - Format code using Prettier
- `npm run test` - Run unit tests with Vitest

## 🏗️ Project Structure

```
diverlah/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Layout/
│   │   ├── Sidebar/
│   │   └── Toggle/
│   ├── pages/               # Page components
│   │   ├── Subscription/
│   │   └── Device/
│   ├── store/               # Zustand state management
│   │   ├── store.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── styles/              # Global styles and variables
│   │   ├── variables.scss
│   │   ├── mixins.scss
│   │   └── global.scss
│   ├── constants/           # Application constants
│   ├── utils/               # Utility functions
│   ├── test/                # Test setup
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── package.json
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
└── README.md
```

## 🎨 Design Implementation

The application implements designs from Adobe XD:

- **Desktop Design**: [Subscription + Device](https://xd.adobe.com/view/a713682f-3952-44fd-9785-a1ab8267d313-f240/screen/ee444f93-dbd7-4d95-ae53-9b2a9f36dbcf/)
- **Mobile Design**: [Subscription + Device](https://xd.adobe.com/view/0e1ef7ed-0d67-4508-8565-bdc247bc3bad-5b4d/)

### Screens Implemented

1. **Desktop Subscription Screen** - Plan selection with three tiers
2. **Desktop Device Management Screen** - Device form with two device sections
3. **Mobile Subscription Screen** - Mobile-optimized plan selection
4. **Mobile Device Management Screen** - Mobile-optimized device form
5. **Mobile Frozen Subscription Screen** - Read-only subscription view for active listings

## 🔧 Technical Decisions

### Framework & Tools

- **React 19**: Latest React version for optimal performance
- **TypeScript**: Type safety and better developer experience
- **Vite**: Fast build tool and development server
- **Zustand**: Lightweight state management solution
- **SASS**: CSS preprocessor for better styling organization
- **React Router**: Client-side routing

### State Management

- Zustand store with persist middleware for local storage
- All form data persists across page reloads
- State includes:
  - Selected subscription plan
  - Device information (type, serial number, images, toggles)
  - Current step in the flow
  - Frozen state for active listings

### Styling Approach

- SASS with variables and mixins for consistency
- Mobile-first responsive design
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- No external UI libraries (custom components)

### Accessibility

- WCAG 2.1 AA compliance
- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader friendly

## 📦 Third-Party Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI framework |
| react-dom | ^19.2.0 | React DOM rendering |
| react-router-dom | ^7.10.0 | Client-side routing |
| zustand | ^5.0.9 | State management |
| sass | ^1.94.2 | CSS preprocessor |
| vite | ^7.2.4 | Build tool |
| typescript | ~5.9.3 | Type safety |
| vitest | ^4.0.15 | Testing framework |
| @testing-library/react | ^16.3.0 | React testing utilities |

### Rationale

- **Zustand**: Chosen over Redux for simplicity and minimal boilerplate while still providing state persistence
- **SASS**: Provides better organization than plain CSS with variables, mixins, and nesting
- **Vite**: Faster than Webpack for development with excellent TypeScript support
- **React Router**: Industry standard for React routing with excellent TypeScript support

## 🧪 Testing

Unit tests are set up with Vitest and React Testing Library. Run tests with:

```bash
npm run test
```

Test files should be placed alongside components with `.test.tsx` or `.spec.tsx` extensions.

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Deploy to Vercel

1. Connect your repository to Vercel
2. Vercel will auto-detect Vite settings
3. Deploy!

## 🎯 Assumptions & Design Decisions

1. **Device Management**:
   - Always shows 2 device sections (Device 1 and Device 2)
   - Pre-filled with "Primary GPS" and "Secondary GPS" for new entries
   - Images are stored as base64 data URLs in local storage

2. **Subscription Plans**:
   - Users can select one plan at a time
   - Frozen state shows only "Just mates" and "Good mates" options
   - Plan selection is required before proceeding to device management

3. **Responsive Behavior**:
   - Desktop shows sidebar navigation
   - Mobile hides sidebar and uses hamburger menu in header
   - Layout adapts smoothly between breakpoints

4. **Data Persistence**:
   - All data stored in browser's local storage
   - Persists across page reloads and browser sessions
   - Storage key: `diverlah-storage`

5. **Navigation**:
   - Default route redirects to `/subscription`
   - Mobile has additional `/subscription-frozen` route
   - Navigation between steps updates the current step in store

## 🐛 Known Limitations

- Image uploads are stored as base64 (not ideal for large files, but works for demo)
- No backend integration (all data is client-side only)
- No form validation beyond basic HTML5 validation
- Frozen subscription screen is only accessible via direct URL on mobile

## 📝 Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Consistent code style and naming conventions

## 🔒 Browser Support

Tested and works on:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is created as part of a frontend developer assignment.

## 👤 Author

Frontend Developer Assignment - Drive lah

---

For questions or issues, please refer to the project repository or contact the development team.
