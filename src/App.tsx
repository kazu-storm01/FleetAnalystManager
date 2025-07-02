import { useState, useEffect } from 'react'
import FleetAnalystApp from './components/FleetAnalystApp'
import FleetAnalysisManager from './components/FleetAnalysisManager'
import FleetComposer from './components/FleetComposer'
import './App.css'

type Theme = 'shipgirl' | 'abyssal'
type CurrentView = 'analysis-manager' | 'analyst' | 'fleet-composer'

function App() {
  const [theme, setTheme] = useState<Theme | null>(null)
  const [currentView, setCurrentView] = useState<CurrentView | null>(null)
  const [sharedFleetData, setSharedFleetData] = useState<string>('')

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
    if (savedView && (savedView === 'analysis-manager' || savedView === 'analyst' || savedView === 'fleet-composer')) {
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

  const cycleView = () => {
    setCurrentView(prev => {
      if (prev === 'analysis-manager') return 'analyst'
      if (prev === 'analyst') return 'fleet-composer'
      return 'analysis-manager'
    })
  }

  const getNextViewTitle = () => {
    if (currentView === 'analysis-manager') return '分析者管理'
    if (currentView === 'analyst') return '艦隊編成'
    return '分析管理'
  }

  const getCurrentViewIcon = () => {
    if (currentView === 'analysis-manager') return '👥'
    if (currentView === 'analyst') return <span className="material-icons">anchor</span>
    return '📊'
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
          {theme === 'shipgirl' ? '🌊 海色' : <><span className="material-icons">anchor</span> 深海</>}
        </button>
      </div>
      
      {/* 機能切り替えボタン（右下） */}
      <button 
        onClick={cycleView} 
        className={`floating-action-button ${theme}`}
        title={`${getNextViewTitle()}に切り替え`}
      >
        <span className="fab-icon">
          {getCurrentViewIcon()}
        </span>
        <span className="fab-label">
          {getNextViewTitle()}
        </span>
      </button>
      
      {/* メインコンテンツ */}
      {currentView === 'analysis-manager' ? (
        <FleetAnalysisManager 
          theme={theme} 
          onFleetDataChange={setSharedFleetData}
        />
      ) : currentView === 'analyst' ? (
        <FleetAnalystApp theme={theme} />
      ) : (
        <FleetComposer 
          theme={theme} 
          fleetData={sharedFleetData}
        />
      )}
    </div>
  )
}

export default App