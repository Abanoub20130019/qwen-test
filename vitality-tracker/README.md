# Vitality Tracker - Fitness, Health & Diet Habit Tracker

A comprehensive habit tracking application built with React and Vite, following the Vitality Design System for a premium, organic wellness experience.

## Features

### 🏃 Fitness Tracking
- **Walking**: Track daily steps with customizable goals (default: 10,000 steps)
- **Exercise**: Log workout minutes (default: 30 minutes)
- Visual progress rings for each habit

### 🧘 Health & Wellness
- **Water Intake**: Track daily water consumption (default: 8 glasses)
- **Sleep**: Monitor sleep hours (default: 8 hours)
- **Meditation**: Log mindfulness practice (default: 10 minutes)

### ⏱️ Intermittent Fasting
- Real-time fasting timer
- Customizable fasting goals (12h, 14h, 16h, 18h)
- Visual progress indicator
- Time elapsed and remaining display

### 🥗 Diet & Food Avoidance
Track foods you should avoid for optimal health:
- Processed Sugar
- Trans Fats
- Refined Carbs
- Artificial Sweeteners
- Excessive Sodium
- Fried Foods
- Sugary Drinks
- Processed Meats

### 📊 Dashboard Overview
- Daily progress summary
- Quick stats for habits, fasting, and diet
- Overall completion percentage
- At-a-glance view of all tracked metrics

## Design Philosophy

Built following the **Vitality Design System** ("The Organic Atelier"):
- **Color Palette**: Deep forest greens, restorative mints, and grounding sands
- **Typography**: Manrope for headlines, Inter for body text
- **UI Elements**: Rounded corners (1.5rem), no hard borders, tonal layering
- **Visual Style**: Editorial aesthetic with intentional asymmetry

## Tech Stack

- **Frontend**: React 18 with Vite
- **Icons**: Lucide React
- **Date Utilities**: date-fns
- **State Management**: React Hooks with localStorage persistence
- **Styling**: Custom CSS with design tokens

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd vitality-tracker
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Production files will be generated in the `dist/` directory.

## Project Structure

```
vitality-tracker/
├── src/
│   ├── components/
│   │   ├── UIComponents.jsx    # Reusable UI components
│   │   └── Views.jsx           # Page views (Dashboard, Habits, Fasting, Diet)
│   ├── hooks/
│   │   └── useHabits.js        # Custom hooks for state management
│   ├── styles/
│   │   └── design-system.css   # Vitality Design System tokens
│   ├── App.jsx                 # Main application component
│   └── main.jsx                # Application entry point
├── index.html
└── package.json
```

## Usage

### Navigation
The app features a bottom navigation bar with four tabs:
1. **Dashboard**: Overview of all your daily progress
2. **Habits**: Detailed view of fitness and health habits
3. **Fasting**: Intermittent fasting timer and controls
4. **Diet**: Food avoidance tracker

### Data Persistence
All data is stored locally in your browser's localStorage, so your progress is saved between sessions.

### Customization
- Adjust habit targets by modifying the default values in `src/hooks/useHabits.js`
- Add custom foods to avoid in the `useFoodAvoidance` hook
- Modify design tokens in `src/styles/design-system.css`

## License

MIT License - Feel free to use this project for personal or commercial purposes.
