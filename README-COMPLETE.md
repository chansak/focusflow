# 🍅 FocusFlow - Modern Pomodoro Timer

A beautiful, feature-rich Pomodoro Timer application built with Angular 19, featuring signal-based state management, Material Design, and comprehensive accessibility support.

![Angular](https://img.shields.io/badge/Angular-19-red?logo=angular)
![Material Design](https://img.shields.io/badge/Material%20Design-3-blue?logo=material-design)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Standalone Components](https://img.shields.io/badge/Standalone-Components-green)
![Zoneless](https://img.shields.io/badge/Zoneless-Change%20Detection-orange)

## ✨ Features

### Core Functionality
- 🍅 **25-minute focus sessions** with progress visualization
- ☕ **5-minute break periods** for optimal productivity
- 📊 **Real-time progress tracking** with Material Progress Bar
- 💾 **Persistent session data** using localStorage
- 🔄 **Automatic mode switching** between focus and break

### Productivity Metrics
- 📈 **Daily/Weekly statistics** with Material Cards
- 🔥 **Streak tracking** to maintain consistency
- ⏱️ **Total focus time** calculations
- 🏆 **Achievement system** with unlockable badges
- 📋 **Session counter** for completed work periods

### User Experience
- 💬 **Motivational quotes** that rotate automatically
- 🎨 **Beautiful gradient backgrounds** with complementary colors
- 📱 **Fully responsive design** for mobile and desktop
- ♿ **Comprehensive accessibility** with ARIA labels and keyboard navigation
- 🎯 **Smooth animations** and transitions

### Technical Excellence
- 🚀 **Angular 19** with latest features
- 📡 **Signal-based state management** for reactive UI
- 🧩 **Standalone components** (no NgModules)
- ⚡ **Zoneless change detection** for better performance
- 🎨 **Custom Material Design theme** with complementary colors
- 🛠️ **Modern control flow syntax** (@if, @for, @switch)

## 🔧 Technical Requirements Fulfilled

### ✅ Must Have Requirements
- [x] **Angular 19** with standalone components (no NgModules)
- [x] **Zoneless change detection** for optimal performance
- [x] **Angular Material UI components** (Cards, Progress Bar, Buttons, Icons, Chips, Tabs, Toolbar, Grid List)
- [x] **Signal-based state management** (signal(), computed(), input(), output())
- [x] **Modern control flow syntax** (@if, @for, @switch)
- [x] **Responsive design** (mobile-friendly with CSS Grid and Flexbox)
- [x] **3+ different Material components** (Progress Bar, Cards, Buttons, Icons, Chips, Tabs, Toolbar, Grid List)

### ⭐ Bonus Features Implemented
- [x] **Custom Material theme** with complementary red/cyan color scheme
- [x] **LocalStorage persistence** for session data and statistics
- [x] **Smooth animations and transitions** with CSS keyframes
- [x] **Comprehensive accessibility features** (ARIA labels, keyboard navigation, screen reader support)
- [x] **Creative use of AI** for motivational quotes and design patterns

## 🎨 Design System

### Color Palette
- **Primary**: Red variants (#ff6b6b, #ee5a24) for focus mode
- **Secondary**: Cyan variants (#4ecdc4, #44a08d) for break mode
- **Background**: Purple gradient (#667eea to #764ba2)
- **Accent**: Material Design compliant colors

### Typography
- **Primary Font**: Roboto for UI elements
- **Monospace Font**: Roboto Mono for timer display
- **Responsive scaling** based on screen size

## 🚀 Getting Started

### Prerequisites
- Node.js 20.16+ 
- npm 10.8+
- Angular CLI 19+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FocusFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200/`

### Build for Production

```bash
ng build --configuration production
```

## 🎮 Usage

### Basic Controls
- **Spacebar/Enter**: Start/Pause timer
- **Ctrl+R**: Reset timer
- **1**: Switch to Focus mode (25 min)
- **2**: Switch to Break mode (5 min)
- **Q**: Get new motivational quote

### Features Overview
1. **Timer Tab**: Main Pomodoro timer with controls and quotes
2. **Statistics Tab**: Comprehensive productivity metrics and achievements

### Accessibility Features
- Full keyboard navigation support
- ARIA labels for screen readers
- High contrast mode support
- Reduced motion preferences respected
- Focus indicators for all interactive elements

## 🏗️ Architecture

### Components Structure
```
src/app/
├── components/
│   ├── pomodoro-timer.component.ts    # Main timer interface
│   └── stats.component.ts             # Statistics dashboard
├── services/
│   ├── pomodoro.service.ts           # Core timer logic with signals
│   └── quotes.service.ts             # Motivational quotes management
└── app.component.ts                  # Root component with navigation
```

### State Management
- **Signals**: Reactive state management with computed values
- **Services**: Dependency injection with `inject()` function
- **Effects**: Automatic data persistence with `effect()`
- **Computed**: Derived state calculations for metrics

### Key Signals
- `timeRemaining`: Current countdown value
- `isRunning`: Timer active state
- `currentMode`: 'focus' or 'break' mode
- `completedSessions`: Array of completed sessions
- `stats`: Computed productivity metrics

## 📊 Productivity Metrics

### Tracked Statistics
- **Sessions Today**: Daily completion count
- **Focus Time Today**: Total focused minutes today
- **Current Streak**: Consecutive days with sessions
- **Longest Streak**: Personal best consecutive days
- **Weekly Progress**: Sessions completed this week
- **Total Sessions**: Lifetime completion count

### Achievement System
- 🎯 **Getting Started**: Complete first session
- ⭐ **Focused Beginner**: Complete 10 sessions
- 💎 **Productivity Pro**: Complete 50 sessions
- 🏆 **Focus Master**: Complete 100 sessions
- 🔥 **Week Warrior**: 7-day streak
- 🎖️ **Consistency Champion**: 30-day streak
- ⏰ **Deep Focus**: 5+ hours total focus time
- 💼 **Work Week Champion**: 25+ hours total focus time

## 🔧 Development

### Key Technologies
- **Angular 19**: Latest framework features
- **TypeScript 5.7**: Type safety and modern syntax
- **Angular Material**: UI component library
- **SCSS**: Enhanced styling capabilities
- **RxJS**: Reactive programming (minimal usage due to signals)

### Code Quality
- **Standalone Components**: Modern Angular architecture
- **Signal-based State**: Reactive, performant state management
- **TypeScript Strict Mode**: Enhanced type safety
- **Accessibility First**: WCAG 2.1 AA compliance
- **Mobile First**: Responsive design approach

### Performance Optimizations
- **Zoneless Change Detection**: Reduced overhead
- **OnPush Strategy**: Optimized rendering (implicit with signals)
- **Lazy Loading**: Chunked bundle optimization
- **Tree Shaking**: Unused code elimination

## 🌐 Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 License
This project is licensed under the MIT License.

## 🤝 Contributing
Contributions are welcome! Please read the contributing guidelines before submitting PRs.

---

**Built with ❤️ using Angular 19, Material Design, and modern web technologies.**