<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# FocusFlow - Advanced Pomodoro Timer Application

This is a modern Angular 19 application built with standalone components and zoneless change detection, featuring advanced timer functionality and professional UI design.

## Project Requirements Completed ✅

- Angular 19 with standalone components (no NgModules)
- Zoneless change detection
- Angular Material UI components with custom theming
- Signal-based state management (signal(), computed(), input(), output())
- Modern control flow syntax (@if, @for, @switch)
- Responsive design (mobile-friendly)
- Advanced Material components integration
- Professional Pomodoro timer with sound notifications

## Core Features

### 🎯 Timer Functionality

- Customizable focus timer (1-120 minutes, default 25 minutes)
- Customizable break timer (1-60 minutes, default 5 minutes)
- Sound notifications when timer reaches 10 seconds
- Completion sound alerts using Web Audio API
- Material Progress Bar with real-time updates
- Session counter with computed signals
- Start/pause/reset controls with keyboard shortcuts

### 📊 Statistics & Analytics

- Daily session tracking
- Weekly progress metrics
- Total focus time calculation
- Session completion statistics
- LocalStorage persistence across browser sessions

### 🎨 User Interface

- Clean white header with black text navigation
- Professional Timer/Statistics menu navigation
- Custom settings dialog (1100px width, optimized spacing)
- Quick preset buttons (Traditional, Extended, Short Burst)
- Motivational quotes with refresh functionality
- Responsive design for all screen sizes
- Material Design 3 theming with purple accent colors

### ⚙️ Advanced Settings

- Timer duration customization with validation
- Sound notification toggle
- Preset configurations:
  - **Traditional**: 25min focus / 5min break
  - **Extended**: 45min focus / 15min break
  - **Short Burst**: 15min focus / 3min break
- Reset to defaults functionality
- Real-time settings persistence

### ♿ Accessibility Features

- ARIA labels and screen reader support
- Keyboard navigation shortcuts:
  - `Space/Enter`: Start/Pause timer
  - `Ctrl+R`: Reset timer
  - `1`: Switch to Focus mode
  - `2`: Switch to Break mode
  - `Q`: New motivational quote
- High contrast mode support
- Reduced motion preferences
- Focus management and visual indicators

## Project Architecture

### 🏗️ Component Structure

- **AppComponent**: Main shell with header navigation
- **PomodoroTimerComponent**: Core timer interface and controls
- **SettingsComponent**: Advanced configuration dialog
- **StatsComponent**: Analytics and progress dashboard

### 🔧 Services

- **PomodoroService**: Timer logic, settings management, Web Audio API
- **QuotesService**: Motivational content rotation

### 📱 Responsive Design

- Desktop-first approach with mobile optimizations
- Breakpoints: 768px (tablet), 480px (mobile)
- Touch-friendly interface elements
- Optimized dialog sizing for all screens

### 🎨 Styling Architecture

- SCSS with Material Design 3 integration
- Custom CSS Grid and Flexbox layouts
- Purple theme with hex color #673ab7 and complementary colors
- Smooth animations and transitions
- Custom dialog panel styling

## Technical Highlights

### 🔊 Audio System

- Web Audio API integration for sound generation
- Countdown beep at 10 seconds remaining
- Session completion chime
- User-controllable sound settings

### 💾 Data Persistence

- LocalStorage for settings and statistics
- SSR compatibility with proper guards
- Automatic save/restore functionality
- Data validation and error handling

### 🚀 Performance Optimizations

- Zoneless change detection
- Signal-based reactivity
- Efficient timer intervals
- Optimized rendering cycles

## Development Setup

### Prerequisites

- Node.js 18+
- Angular CLI 19+
- Modern browser with Web Audio API support

### Quick Start

```bash
npm install
ng serve
```

### Available Scripts

- `npm start`: Development server
- `npm run build`: Production build
- `npm test`: Unit tests
- `npm run lint`: Code linting

## Project Status: ✅ Complete & Enhanced

FocusFlow represents a fully-featured, production-ready Pomodoro timer application with:

- ✅ All core requirements implemented
- ✅ Advanced sound notification system
- ✅ Comprehensive settings customization
- ✅ Professional UI/UX design
- ✅ Complete accessibility support
- ✅ Responsive mobile design
- ✅ Optimized dialog layouts
- ✅ Clean header navigation

### Recent Enhancements (October 2025)

- Added sound notifications with Web Audio API
- Implemented customizable timer durations
- Created advanced settings dialog with presets
- Redesigned header navigation with black text links
- Optimized dialog width and spacing (1100px)
- Enhanced accessibility and keyboard shortcuts
- Improved mobile responsiveness

## Project Setup Progress

- [✅] Clarify Project Requirements
- [✅] Scaffold the Project
- [✅] Customize the Project
- [✅] Install Required Extensions
- [✅] Compile the Project
- [✅] Create and Run Task
- [✅] Launch the Project
- [✅] Ensure Documentation is Complete

## 🎉 Project Complete!

FocusFlow is a fully functional, modern Pomodoro timer application featuring:

### ✅ All Required Features Implemented

- Angular 19 with standalone components
- Zoneless change detection
- Signal-based state management
- Material Design UI components
- Modern control flow syntax
- Responsive design
- LocalStorage persistence
- Custom theme with complementary colors
- Comprehensive accessibility support

### 🏗️ Architecture Highlights

- **Services**: PomodoroService (timer logic), QuotesService (motivational content)
- **Components**: PomodoroTimerComponent (main UI), StatsComponent (metrics dashboard)
- **State Management**: Signals with computed values for reactive UI
- **Persistence**: Browser localStorage with SSR compatibility
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### 🚀 Ready to Use

Run `ng serve` to start the development server and experience the full-featured Pomodoro timer!
