# MindWeek - Brain Dump to Task Management App

A modern mobile application built with Expo and React Native that transforms voice recordings into organized tasks and schedules.

## 🏗️ Project Structure

```
mindweek/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Tab navigator screens
│   └── *.tsx              # Individual screens
├── components/            # Reusable components
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   ├── screens/          # Screen components
│   └── layout/           # Layout components
├── constants/            # Application constants
│   └── AppConstants.ts   # Colors, spacing, fonts, routes
├── contexts/             # React Context providers
│   └── AuthContext.tsx   # Authentication context
├── hooks/                # Custom React hooks
│   └── types/            # Hook type definitions
├── services/             # Business logic services
│   ├── navigationService.ts  # Navigation utilities
│   └── authService.ts        # Authentication utilities
├── types/                # TypeScript type definitions
│   ├── app.d.ts          # Application interfaces
│   └── navigation.d.ts   # Navigation types
├── utils/                # Utility functions
├── assets/               # Images, fonts, and other assets
└── tests/                # Test files (future)
```

## 🚀 Key Features

- **Voice-to-Task Conversion**: Record brain dumps and convert them to structured tasks
- **Smart Task Organization**: Automatic categorization and prioritization
- **Calendar Integration**: Schedule tasks and deadlines
- **User Authentication**: Secure login and registration
- **Responsive Design**: Works on all mobile device sizes

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54
- **Navigation**: Expo Router v6
- **UI Library**: React Native with NativeWind (Tailwind CSS)
- **State Management**: React Context API
- **Authentication**: Firebase Authentication
- **Database**: Firestore
- **Storage**: AsyncStorage
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Expo configuration

## 📱 Screens Overview

### Authentication Flow
- `/login` - User login screen
- `/signup` - User registration screen

### Main App
- `/` - Home dashboard with recent captures
- `/transcribe` - Voice recording and transcription
- `/task-details` - Task editing and management
- `/profile` - User profile settings
- `/settings` - Application settings

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd mindweek

# Install dependencies
npm install

# Start development server
npm start
```

### Running on Devices
```bash
# iOS simulator
npm run ios

# Android emulator
npm run android

# Web browser
npm run web
```

## 🎨 Component Architecture

### UI Components (`components/ui/`)
Reusable, presentational components with consistent styling:
- `Button` - Primary, secondary, and outline variants
- `Card` - Elevated containers with touch handling

### Screen Components (`components/screens/`)
Complete screen implementations that combine UI components:
- `HomeScreen` - Dashboard with recent activity

### Services (`services/`)
Business logic separated from UI:
- `navigationService` - Centralized routing
- `authService` - Authentication utilities

## 🎯 Coding Standards

### TypeScript Guidelines
- Strict mode enabled
- Explicit type annotations for props and state
- Interfaces for complex objects
- Type-safe navigation routes

### Component Design
- Functional components with hooks
- Proper prop drilling avoidance
- Memoization for performance
- Consistent naming conventions

### Styling Best Practices
- Constants-based theming (`constants/AppConstants.ts`)
- Responsive spacing and typography
- Platform-specific adaptations
- Accessibility considerations

### Error Handling
- Try-catch blocks for async operations
- User-friendly error messages
- Graceful degradation
- Logging for debugging

## 🔐 Security Practices

### Authentication
- Firebase Authentication integration
- Secure token storage
- Session management
- Protected routes

### Data Protection
- Input validation and sanitization
- Secure AsyncStorage usage
- Environment variable configuration
- Firebase security rules

## 📈 Performance Optimization

### Rendering
- React.memo for expensive components
- useCallback for event handlers
- useMemo for computed values
- Virtualized lists for large datasets

### Bundle Size
- Code splitting with dynamic imports
- Image optimization
- Unused dependency removal
- Tree shaking

## 🧪 Testing Strategy

### Current Status
Testing framework to be implemented

### Planned Testing Layers
- Unit tests for services and utilities
- Component tests for UI elements
- Integration tests for flows
- End-to-end tests for critical paths

## 🚀 Deployment

### Build Process
```bash
# Production build
expo build:android
expo build:ios

# Over-the-air updates
expo publish
```

### Environment Configuration
- `.env` for development secrets
- Environment-specific configurations
- CI/CD pipeline setup

## 🤝 Contributing

### Git Workflow
- Feature branches from `main`
- Pull requests with code review
- Semantic commit messages
- Automated testing on PR

### Code Review Checklist
- [ ] TypeScript errors free
- [ ] ESLint passes
- [ ] Component accessibility
- [ ] Performance considerations
- [ ] Documentation updated

## 📚 Learning Resources

### Core Technologies
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Best Practices
- [React Patterns](https://reactpatterns.com/)
- [Mobile UX Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Material Design](https://material.io/design)

## 🆘 Troubleshooting

### Common Issues
- **Metro bundler issues**: Clear cache with `expo start -c`
- **TypeScript errors**: Check type definitions in `types/` directory
- **Navigation errors**: Verify routes in `constants/AppConstants.ts`

### Getting Help
- Check GitHub issues
- Review Expo forums
- Consult documentation
- Reach out to maintainers

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Expo team for the amazing development tools
- React Native community for continuous improvements
- Open source contributors who made this possible