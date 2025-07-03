import { useState, useEffect } from 'react'
import FleetAnalystApp from './components/FleetAnalystApp'
import FleetAnalysisManager from './components/FleetAnalysisManager'
import FleetComposer from './components/FleetComposer'
import './App.css'

type CurrentView = 'analysis-manager' | 'analyst' | 'fleet-composer'

function App() {
  const [currentView, setCurrentView] = useState<CurrentView | null>(null)
  const [sharedFleetData, setSharedFleetData] = useState<string>('')

  // ビューの初期化
  useEffect(() => {
    const savedView = localStorage.getItem('fleetAnalysisCurrentView') as CurrentView
    
    // ビューの復元
    if (savedView && (savedView === 'analysis-manager' || savedView === 'analyst' || savedView === 'fleet-composer')) {
      setCurrentView(savedView)
    } else {
      setCurrentView('analysis-manager') // デフォルト値
    }
  }, [])

  // ビューの永続化
  useEffect(() => {
    if (currentView !== null) {
      localStorage.setItem('fleetAnalysisCurrentView', currentView)
    }
  }, [currentView])

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
    if (currentView === 'analysis-manager') return <span className="material-symbols-outlined">group</span>
    if (currentView === 'analyst') return <span className="material-symbols-outlined">anchor</span>
    return <span className="material-symbols-outlined">analytics</span>
  }

  // 初期化中は何も表示しない
  if (currentView === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="app-container shipgirl">
      {/* 機能切り替えボタン（右下） */}
      <button 
        onClick={cycleView} 
        className="floating-action-button shipgirl"
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
          onFleetDataChange={setSharedFleetData}
        />
      ) : currentView === 'analyst' ? (
        <FleetAnalystApp />
      ) : (
        <FleetComposer 
          fleetData={sharedFleetData}
        />
      )}
    </div>
  )
}

export default App