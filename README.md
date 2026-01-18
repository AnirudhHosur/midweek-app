# Mindweek - Mental Wellness App

A React Native application built with Expo and Nativewind for mental wellness tracking and support.

## Features

### Authentication System
- **Splash Screen**: Beautiful animated splash screen with app logo
- **Sign In**: Email/password authentication with form validation
- **Sign Up**: User registration with password confirmation
- **Auth Context**: Global authentication state management
- **Protected Routes**: Automatic redirection based on auth status

### Tech Stack
- **React Native** with Expo
- **Nativewind** (Tailwind CSS for React Native)
- **Expo Router** for navigation
- **TypeScript** for type safety
- **Context API** with AsyncStorage for state persistence

## Project Structure

```
app/
├── index.tsx           # Splash screen
├── _layout.tsx         # Root layout with AuthProvider
├── (auth)/
│   ├── login.tsx       # Sign in page
│   └── signup.tsx      # Sign up page
└── (tabs)/
    └── index.tsx       # Main dashboard
contexts/
└── AuthContext.tsx     # Authentication context
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open in Expo Go**:
   - Scan the QR code with Expo Go app
   - Or press `w` to open in web browser

## Current Working Features

✅ **Complete Authentication Flow**
- Splash screen with app logo
- Login/Signup forms with validation
- Protected routes
- Session persistence

✅ **UI/UX**
- Beautiful gradient backgrounds
- Responsive form layouts
- Loading states
- Error handling

✅ **Technical**
- Nativewind CSS styling
- Expo Router navigation
- AsyncStorage for persistence
- TypeScript type safety

## Authentication Flow

1. **Splash Screen** (2 seconds) → redirects to Login
2. **Login Page** → authenticate user → redirects to Dashboard
3. **Signup Page** → create new account → redirects to Dashboard
4. **Dashboard** → access main app features
5. **Logout** → clears session → redirects to Splash Screen

## Customization

### Branding
- Update `assets/images/applogo.png` with your app logo
- Modify colors in the Tailwind classes throughout the app
- Adjust splash screen duration in `app/index.tsx`

### Authentication
- Uses `@react-native-async-storage/async-storage` for session persistence
- Modify `contexts/AuthContext.tsx` to integrate with your backend API
- Update validation rules in login/signup forms
- Add additional user fields as needed

## Deployment

1. **Build for production**:
   ```bash
   expo build
   ```

2. **Publish to app stores**:
   - Follow Expo's publishing guide
   - Configure app.json with your app details

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License