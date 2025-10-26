# FocusFlow - Advanced Pomodoro Timer

A modern, feature-rich Pomodoro timer application built with Angular 19, featuring customizable durations, sound notifications, and professional UI design.

## 🎯 Overview

FocusFlow helps you boost productivity using the proven Pomodoro Technique with advanced customization options:

- **Customizable focus sessions** (1-120 minutes, default 25)
- **Customizable break intervals** (1-60 minutes, default 5)
- **Sound notifications** with Web Audio API integration
- **Advanced settings** with quick presets
- **Session tracking** to monitor your daily productivity
- **Motivational quotes** to keep you inspired
- **Professional UI** with clean navigation and dialogs
- **Accessibility-first design** with full keyboard navigation
- **Responsive layout** that works perfectly on all devices

## ✨ Key Features

### 🔧 Advanced Timer Functionality

- ⏱️ **Customizable Durations**: Set focus (1-120 min) and break (1-60 min) times
- 🔊 **Sound Notifications**: Audio alerts at 10 seconds remaining and completion
- 📊 **Real-time Progress**: Visual progress bar with live updates
- ⚙️ **Quick Presets**: Traditional (25/5), Extended (45/15), Short Burst (15/3)
- � **Easy Controls**: Start/pause/reset with keyboard shortcuts

### 🎨 Professional Interface

- 🧭 **Clean Navigation**: White header with black text menu
- 💬 **Settings Dialog**: 1100px optimized layout with no scrollbars
- 🎨 **Material Design 3**: Purple theme with complementary colors
- 📱 **Responsive Design**: Perfect on desktop, tablet, and mobile
- 🌟 **Smooth Animations**: Polished transitions and interactions

### 📈 Analytics & Tracking

- 📊 **Daily Statistics**: Track completed sessions and focus time
- 📅 **Progress Metrics**: Weekly and monthly productivity insights
- 💾 **Data Persistence**: Settings and stats saved locally
- 🎯 **Session Counter**: Live tracking of daily achievements

### ♿ Accessibility Excellence

- 🔍 **Screen Reader Support**: Complete ARIA label implementation
- ⌨️ **Keyboard Navigation**: Full app control without mouse
- 🎨 **High Contrast**: Support for accessibility preferences
- 🚀 **Reduced Motion**: Respects user motion preferences

## 🛠️ Technology Stack

- **Angular 19** with standalone components
- **Zoneless change detection** for optimal performance
- **Signal-based state management** for reactive UI
- **Angular Material** with custom theming
- **Web Audio API** for sound notifications
- **TypeScript** for type safety
- **SCSS** with CSS Grid and Flexbox
- **LocalStorage** for data persistence

## 🚀 Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- Angular CLI 19+
- Modern browser with Web Audio API support

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/chansak/focusflow.git
   cd focusflow
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

   or

   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/` to use the application.

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Code linting

## 📖 Usage Guide

### Basic Operation

1. Click the **Play** button to start your focus session
2. Customize durations in **Settings** if needed
3. Work on your task until the timer completes
4. Enjoy your break when the timer switches modes
5. Track your progress in the **Statistics** section

### Settings Configuration

- **Focus Duration**: 1-120 minutes (default: 25)
- **Break Duration**: 1-60 minutes (default: 5)
- **Sound Notifications**: Toggle audio alerts
- **Quick Presets**: One-click timer configurations
- **Reset to Defaults**: Restore original settings

### Keyboard Shortcuts

- **Space/Enter**: Start or pause the timer
- **Ctrl+R**: Reset the current timer
- **1**: Switch to Focus mode
- **2**: Switch to Break mode
- **Q**: Get a new motivational quote

## 🏗️ Architecture

### Component Structure

- **AppComponent**: Main shell with header navigation
- **PomodoroTimerComponent**: Core timer interface and controls
- **SettingsComponent**: Advanced configuration dialog
- **StatsComponent**: Analytics and progress dashboard

### Services

- **PomodoroService**: Timer logic, settings management, Web Audio API
- **QuotesService**: Motivational content rotation

### State Management

- Signal-based reactive state
- Computed values for derived data
- LocalStorage persistence
- SSR compatibility

## 🎉 Recent Enhancements

### October 2025 Updates

- ✅ Sound notifications with Web Audio API
- ✅ Customizable timer durations with validation
- ✅ Advanced settings dialog with presets
- ✅ Clean header navigation with black text links
- ✅ Optimized dialog layout (1100px width, no scrollbars)
- ✅ Enhanced accessibility and keyboard shortcuts
- ✅ Improved mobile responsiveness

---

**Built with ❤️ using Angular 19 and modern web technologies**

_FocusFlow - Where productivity meets perfect timing_
