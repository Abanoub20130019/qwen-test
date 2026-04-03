import { useState } from 'react'
import { Navigation } from './components/UIComponents'
import { DashboardView, HabitsView, FastingView, DietView } from './components/Views'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />
      case 'habits':
        return <HabitsView />
      case 'fasting':
        return <FastingView />
      case 'diet':
        return <DietView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="surface-base">
      <main>
        {renderView()}
      </main>
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
