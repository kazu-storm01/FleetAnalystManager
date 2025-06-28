import { useState } from 'react'
import FleetAnalystApp from './components/FleetAnalystApp'
import FleetAnalysisManager from './components/FleetAnalysisManager'
import './App.css'

type Theme = 'shipgirl' | 'abyssal'
type CurrentView = 'analysis-manager' | 'analyst'

function App() {
  const [theme, setTheme] = useState<Theme>('shipgirl')
  const [currentView, setCurrentView] = useState<CurrentView>('analysis-manager')

  const toggleTheme = () => {
    setTheme(prev => prev === 'shipgirl' ? 'abyssal' : 'shipgirl')
  }

  const toggleView = () => {
    setCurrentView(prev => prev === 'analysis-manager' ? 'analyst' : 'analysis-manager')
  }


  const getNextViewTitle = () => {
    return currentView === 'analysis-manager' ? '分析者管理' : '分析管理'
  }

  return (
    <div className={`app-container ${theme}`}>
      {/* テーマ切り替えボタン（右上） */}
      <div className="theme-toggle-container">
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === 'shipgirl' ? '🌊 海色' : '⚓ 深海'}
        </button>
      </div>
      
      {/* 機能切り替えボタン（右下） */}
      <button 
        onClick={toggleView} 
        className={`floating-action-button ${theme}`}
        title={`${getNextViewTitle()}に切り替え`}
      >
        <span className="fab-icon">
          {currentView === 'analysis-manager' ? '👥' : '📊'}
        </span>
        <span className="fab-label">
          {getNextViewTitle()}
        </span>
      </button>
      
      {/* メインコンテンツ */}
      {currentView === 'analysis-manager' ? (
        <FleetAnalysisManager theme={theme} />
      ) : (
        <FleetAnalystApp theme={theme} />
      )}
    </div>
  )
}

export default App