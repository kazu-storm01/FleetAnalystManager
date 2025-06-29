import { useState, useEffect } from 'react'
import FleetAnalystApp from './components/FleetAnalystApp'
import FleetAnalysisManager from './components/FleetAnalysisManager'
import './App.css'

type Theme = 'shipgirl' | 'abyssal'
type CurrentView = 'analysis-manager' | 'analyst'

function App() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [currentView, setCurrentView] = useState<CurrentView | null>(null)

  // テーマとビューの初期化
  useEffect(() => {
    const savedTheme = localStorage.getItem('fleetAnalysisTheme') as Theme
    const savedView = localStorage.getItem('fleetAnalysisCurrentView') as CurrentView
    
    // テーマの復元
    if (savedTheme && (savedTheme === 'shipgirl' || savedTheme === 'abyssal')) {
      setTheme(savedTheme)
    } else {
      setTheme('shipgirl') // デフォルト値
    }
    
    // ビューの復元
    if (savedView && (savedView === 'analysis-manager' || savedView === 'analyst')) {
      setCurrentView(savedView)
    } else {
      setCurrentView('analysis-manager') // デフォルト値
    }
  }, [])

  // テーマの永続化
  useEffect(() => {
    if (theme !== null) {
      localStorage.setItem('fleetAnalysisTheme', theme)
    }
  }, [theme])

  // ビューの永続化
  useEffect(() => {
    if (currentView !== null) {
      localStorage.setItem('fleetAnalysisCurrentView', currentView)
    }
  }, [currentView])

  const toggleTheme = () => {
    setTheme(prev => prev === 'shipgirl' ? 'abyssal' : 'shipgirl')
  }

  const toggleView = () => {
    setCurrentView(prev => prev === 'analysis-manager' ? 'analyst' : 'analysis-manager')
  }


  const getNextViewTitle = () => {
    return currentView === 'analysis-manager' ? '分析者管理' : '分析管理'
  }

  // 初期化中は何も表示しない
  if (theme === null || currentView === null) {
    return <div>Loading...</div>
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