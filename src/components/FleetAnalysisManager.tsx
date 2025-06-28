import { useState, useEffect, useRef } from 'react'

// 型定義
interface Task {
  id: number
  text: string
  completed: boolean
  createdAt: string
  inheritedFrom?: number
  originalTaskId?: number
}

interface FleetEntry {
  id: number
  totalExp: number        // 自動算出: 全艦経験値合計
  shipCount: number       // 自動算出: 艦船数
  marriedCount: number    // 自動算出: ケッコン艦数
  tasks: Task[]
  url?: string           // 任意: 関連URLリンク
  createdAt: string
  admiralName: string
  isLatest: boolean
}

interface FleetAnalysisManagerProps {
  theme: 'shipgirl' | 'abyssal'
}

const FleetAnalysisManager: React.FC<FleetAnalysisManagerProps> = ({ theme }) => {
  const [admiralName, setAdmiralName] = useState<string>('')
  const [isFirstSetup, setIsFirstSetup] = useState<boolean>(true)
  const [tempAdmiralName, setTempAdmiralName] = useState<string>('')
  const [fleetEntries, setFleetEntries] = useState<FleetEntry[]>([])
  const [fleetData, setFleetData] = useState<string>('')
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [showWelcome, setShowWelcome] = useState<boolean>(false)
  const [showBackup, setShowBackup] = useState<boolean>(false)
  const [newTaskText, setNewTaskText] = useState<string>('')
  const [newUrl, setNewUrl] = useState<string>('')
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false)
  const [showAdmiralModal, setShowAdmiralModal] = useState<boolean>(false)
  const [editingUrl, setEditingUrl] = useState<boolean>(false)
  const [tempUrl, setTempUrl] = useState<string>('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const ITEMS_PER_PAGE = 10

  // JSON艦隊データ解析エンジン（最適化版）
  const calculateFleetStats = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData)
      let totalExpValue = 0
      let shipCountValue = 0
      let marriedCountValue = 0

      // 配列の場合の処理（複数の形式に対応）
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      // 効率化：forEach の代わりに for ループを使用
      for (let i = 0; i < ships.length; i++) {
        const ship = ships[i]
        
        // 経験値の取得（優先順位付き）
        const exp = ship.exp?.[0] || ship.api_exp?.[0] || 0
        totalExpValue += exp
        
        // レベルの取得とケッコン判定
        const level = ship.lv || ship.api_lv || 0
        if (level >= 100) {
          marriedCountValue++
        }
        
        shipCountValue++
      }

      return { totalExp: totalExpValue, shipCount: shipCountValue, marriedCount: marriedCountValue }
    } catch {
      throw new Error('JSON解析に失敗しました')
    }
  }

  // ペースト時の自動登録処理
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // ペーストされたデータを取得
    const pastedData = e.clipboardData.getData('text')
    
    // 少し遅延してから処理（ペーストデータがstateに反映されるのを待つ）
    setTimeout(() => {
      if (pastedData.trim() && admiralName.trim()) {
        try {
          const stats = calculateFleetStats(pastedData)
          
          // 以前のエントリーをlatestではなくする
          const updatedEntries = fleetEntries.map(entry => ({ ...entry, isLatest: false }))

          // 前回の未達成タスクを取得
          const previousLatestEntry = fleetEntries.find(entry => entry.isLatest)
          const inheritedTasks: Task[] = []
          
          if (previousLatestEntry) {
            const incompleteTasks = previousLatestEntry.tasks.filter(task => !task.completed)
            incompleteTasks.forEach(task => {
              inheritedTasks.push({
                id: Date.now() + Math.random(),
                text: task.text,
                completed: false,
                createdAt: new Date().toISOString(),
                inheritedFrom: previousLatestEntry.id,
                originalTaskId: task.originalTaskId || task.id
              })
            })
          }

          const newEntry: FleetEntry = {
            id: Date.now(),
            totalExp: stats.totalExp,
            shipCount: stats.shipCount,
            marriedCount: stats.marriedCount,
            tasks: inheritedTasks,
            url: undefined,
            createdAt: new Date().toISOString(),
            admiralName,
            isLatest: true
          }

          const newEntries = [...updatedEntries, newEntry]
          
          // 100件制限
          if (newEntries.length > 100) {
            newEntries.splice(0, newEntries.length - 100)
          }

          setFleetEntries(newEntries)
          
          // フォームリセット
          setFleetData('')
          
          // 即座にローカルストレージに保存
          localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(newEntries))
          
          if (inheritedTasks.length > 0) {
            showToast(`艦隊データ登録完了！未達成タスク${inheritedTasks.length}件を引き継ぎました`, 'success')
          } else {
            showToast('艦隊データ登録完了！', 'success')
          }
        } catch (error) {
          showToast(`エラー: ${error}`, 'error')
        }
      } else if (!admiralName.trim()) {
        showToast('提督名を設定してください', 'error')
      }
    }, 100)
  }

  // 初期化処理
  useEffect(() => {
    const savedAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName')
    if (savedAdmiralName) {
      setAdmiralName(savedAdmiralName)
      setIsFirstSetup(false)
      loadFleetEntries(savedAdmiralName)
    } else {
      setIsFirstSetup(true)
      setShowWelcome(true)
    }
  }, [])

  // 艦隊エントリーの読み込み
  const loadFleetEntries = (admiral: string) => {
    const saved = localStorage.getItem(`${admiral}_fleetEntries`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFleetEntries(parsed)
      } catch (error) {
        console.error('Failed to load fleet entries:', error)
        setFleetEntries([])
      }
    }
  }

  // データ保存（現在は各更新処理で直接保存しているため未使用）
  // const saveData = () => {
  //   if (admiralName) {
  //     localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(fleetEntries))
  //   }
  // }

  // 提督名設定（初回セットアップ）
  const setupAdmiral = () => {
    const name = tempAdmiralName.trim()
    if (name.length < 2 || name.length > 20) {
      showToast('提督名は2文字以上20文字以下で入力してください', 'error')
      return
    }

    setAdmiralName(name)
    localStorage.setItem('fleetAnalysisAdmiralName', name)
    setIsFirstSetup(false)
    setShowWelcome(false)
    showToast(`提督「${name}」として登録完了！`, 'success')
  }

  // 提督名変更（全データ削除）
  const changeAdmiral = () => {
    if (confirm('提督名を変更すると、すべてのデータが削除されます。続行しますか？')) {
      if (admiralName) {
        localStorage.removeItem(`${admiralName}_fleetEntries`)
      }
      localStorage.removeItem('fleetAnalysisAdmiralName')
      setAdmiralName('')
      setTempAdmiralName('')
      setFleetEntries([])
      setFleetData('')
      setCurrentPage(0)
      setIsFirstSetup(true)
      setShowWelcome(true)
      setShowAdmiralModal(false)
      showToast('すべてのデータが削除されました', 'success')
    }
  }

  // 提督名変更モーダル処理
  const handleAdmiralModalConfirm = () => {
    setShowAdmiralModal(true)
  }



  // エントリー削除
  const deleteEntry = (entryId: number) => {
    if (confirm('このエントリーを削除しますか？')) {
      const filtered = fleetEntries.filter(entry => entry.id !== entryId)
      
      // 最新エントリーが削除された場合、前のエントリーを最新にする
      if (filtered.length > 0) {
        const wasLatest = fleetEntries.find(e => e.id === entryId)?.isLatest
        if (wasLatest) {
          filtered[filtered.length - 1].isLatest = true
        }
      }
      
      setFleetEntries(filtered)
      localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(filtered))
      showToast('エントリーを削除しました', 'success')
    }
  }

  // タスクの完了状態を切り替え
  const toggleTask = (entryId: number, taskId: number) => {
    const updatedEntries = fleetEntries.map(entry => {
      if (entry.id === entryId) {
        const updatedTasks = entry.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
        
        // 100%達成チェック
        const completedCount = updatedTasks.filter(t => t.completed).length
        const totalCount = updatedTasks.length
        if (completedCount === totalCount && totalCount > 0) {
          showToast('すべてのタスクが完了しました！', 'success')
        }
        
        return {
          ...entry,
          tasks: updatedTasks
        }
      }
      return entry
    })
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
  }

  // タスクの削除
  const deleteTask = (entryId: number, taskId: number) => {
    const updatedEntries = fleetEntries.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          tasks: entry.tasks.filter(task => task.id !== taskId)
        }
      }
      return entry
    })
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
  }

  // タスク追加（最新エントリーのみ）
  const addTaskToLatest = () => {
    if (!newTaskText.trim()) {
      showToast('タスク内容を入力してください', 'error')
      return
    }

    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) {
      showToast('最新エントリーが見つかりません', 'error')
      return
    }

    const newTask: Task = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    const updatedEntries = fleetEntries.map(entry => 
      entry.id === latestEntry.id 
        ? { ...entry, tasks: [...entry.tasks, newTask] }
        : entry
    )
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
    
    setNewTaskText('')
    showToast('タスクを追加しました', 'success')
  }

  // URL更新（最新エントリーのみ）
  const updateLatestUrl = () => {
    if (!newUrl.trim()) {
      showToast('URLを入力してください', 'error')
      return
    }

    // URL形式チェック（簡易）
    try {
      new URL(newUrl.trim())
    } catch {
      showToast('有効なURLを入力してください', 'error')
      return
    }

    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) {
      showToast('最新エントリーが見つかりません', 'error')
      return
    }

    const updatedEntries = fleetEntries.map(entry => 
      entry.id === latestEntry.id 
        ? { ...entry, url: newUrl.trim() }
        : entry
    )
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
    
    setNewUrl('')
    showToast('URLを更新しました', 'success')
  }

  // URL編集開始
  const startEditUrl = (currentUrl: string) => {
    setTempUrl(currentUrl || '')
    setEditingUrl(true)
  }

  // URL編集保存
  const saveEditUrl = () => {
    // URL形式チェック（簡易）
    if (tempUrl.trim()) {
      try {
        new URL(tempUrl.trim())
      } catch {
        showToast('有効なURLを入力してください', 'error')
        return
      }
    }

    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) {
      showToast('最新エントリーが見つかりません', 'error')
      return
    }

    const updatedEntries = fleetEntries.map(entry => 
      entry.id === latestEntry.id 
        ? { ...entry, url: tempUrl.trim() || undefined }
        : entry
    )
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
    
    setEditingUrl(false)
    setTempUrl('')
    
    if (tempUrl.trim()) {
      showToast('URLを更新しました', 'success')
    } else {
      showToast('URLを削除しました', 'success')
    }
  }

  // URL編集キャンセル
  const cancelEditUrl = () => {
    setEditingUrl(false)
    setTempUrl('')
  }

  // トースト通知表示
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // 統計情報計算
  const getTotalEntries = () => fleetEntries.length
  const getTotalCompletedTasks = () => fleetEntries.reduce((total, entry) => 
    total + entry.tasks.filter(task => task.completed).length, 0
  )
  const getPendingTasks = () => {
    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    return latestEntry ? latestEntry.tasks.filter(task => !task.completed).length : 0
  }

  // 差分計算
  const getDifference = (current: FleetEntry, field: keyof Pick<FleetEntry, 'totalExp' | 'shipCount' | 'marriedCount'>) => {
    const currentIndex = fleetEntries.findIndex(e => e.id === current.id)
    if (currentIndex <= 0) return 0
    
    const previous = fleetEntries[currentIndex - 1]
    return current[field] - previous[field]
  }

  // グラフデータ生成（SVGベース）
  const generateGraphData = () => {
    if (fleetEntries.length < 2) return null
    
    const recentEntries = fleetEntries.slice(-10) // 最新10件
    const maxExp = Math.max(...recentEntries.map(e => e.totalExp))
    const maxShips = Math.max(...recentEntries.map(e => e.shipCount))
    const maxMarried = Math.max(...recentEntries.map(e => e.marriedCount))
    
    const graphHeight = 120
    const graphWidth = 300
    const padding = 20
    
    const expPath = recentEntries.map((entry, i) => {
      const x = padding + (i * (graphWidth - 2 * padding)) / (recentEntries.length - 1)
      const y = graphHeight - padding - ((entry.totalExp / maxExp) * (graphHeight - 2 * padding))
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    const shipPath = recentEntries.map((entry, i) => {
      const x = padding + (i * (graphWidth - 2 * padding)) / (recentEntries.length - 1)
      const y = graphHeight - padding - ((entry.shipCount / maxShips) * (graphHeight - 2 * padding))
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    const marriedPath = recentEntries.map((entry, i) => {
      const x = padding + (i * (graphWidth - 2 * padding)) / (recentEntries.length - 1)
      const y = graphHeight - padding - ((entry.marriedCount / maxMarried) * (graphHeight - 2 * padding))
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    return { expPath, shipPath, marriedPath, maxExp, maxShips, maxMarried }
  }

  const graphData = generateGraphData()

  // タスク進捗計算
  const getTaskProgress = (tasks: Task[]) => {
    if (tasks.length === 0) return { completed: 0, total: 0, percentage: 0 }
    const completed = tasks.filter(t => t.completed).length
    const total = tasks.length
    const percentage = Math.round((completed / total) * 100)
    return { completed, total, percentage }
  }

  // バックアップエクスポート
  const exportBackup = () => {
    const backup = { fleetEntries, admiralName, exportedAt: new Date().toISOString() }
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `fleet_analysis_backup_${admiralName}_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // バックアップインポート
  const importBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target?.result as string)
        
        if (backup.admiralName !== admiralName) {
          if (!confirm(`異なる提督のデータです（${backup.admiralName}）。インポートしますか？`)) {
            return
          }
        }
        
        const entries = backup.fleetEntries || []
        const admiral = backup.admiralName || ''
        
        setFleetEntries(entries)
        setAdmiralName(admiral)
        
        // 即座に保存
        if (admiral) {
          localStorage.setItem('fleetAnalysisAdmiralName', admiral)
          localStorage.setItem(`${admiral}_fleetEntries`, JSON.stringify(entries))
        }
        
        showToast('バックアップをインポートしました', 'success')
      } catch {
        showToast('バックアップファイルの読み込みに失敗しました', 'error')
      }
    }
    reader.readAsText(file)
  }

  // ページング計算
  const pastEntries = fleetEntries.filter(entry => !entry.isLatest).reverse()
  const totalPages = Math.ceil(pastEntries.length / ITEMS_PER_PAGE)
  const paginatedEntries = pastEntries.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  )

  // 初回セットアップ画面
  if (isFirstSetup) {
    return (
      <div className={`fleet-analysis-manager ${theme}`}>
        <div className="setup-container">
          <div className="welcome-card">
            <h1 className="app-logo animate-fadeInUp">
              {theme === 'shipgirl' ? (
                <>
                  <span className="logo-main">艦隊分析者マネージャー</span>
                  <span className="logo-sub">-Fleet Analyst Manager-</span>
                </>
              ) : (
                <>
                  <span className="logo-main">深海艦隊分析司令部</span>
                  <span className="logo-sub">-Abyssal Fleet Analysis HQ-</span>
                </>
              )}
            </h1>

            {showWelcome && (
              <div className="welcome-message">
                <h2>ようこそ！</h2>
                <div className="welcome-text">
                  <p>艦隊分析者マネージャーをご利用いただき、誠にありがとうございます</p>
                  <p>このアプリは艦隊JSONデータを解析し、経験値・艦数・ケッコン艦数の成長を追跡します</p>
                  <p>より良い艦これライフを！</p>
                </div>
                
                <div className="privacy-notice">
                  <h3><span className="material-icons">lock</span> プライバシー保護について</h3>
                  <p>このアプリはローカルストレージのみを使用し、外部へのデータ送信は一切行いません。</p>
                  <p>すべてのデータはお使いのブラウザ内にのみ保存されます。</p>
                </div>
              </div>
            )}

            <div className="admiral-setup">
              <h3>提督名を設定してください</h3>
              <div className="input-group">
                <input
                  type="text"
                  value={tempAdmiralName}
                  onChange={(e) => setTempAdmiralName(e.target.value)}
                  placeholder="提督名を入力（2-20文字）"
                  className="admiral-input"
                  maxLength={20}
                />
                <button onClick={setupAdmiral} className="setup-button">
                  <span className="material-icons">rocket_launch</span> 開始する
                </button>
              </div>
              <p className="input-hint">
                提督名は2文字以上20文字以下で入力してください
              </p>
            </div>
          </div>
        </div>

        {/* トースト通知 */}
        {toast && (
          <div className={`toast ${toast.type}`}>
            {toast.message}
          </div>
        )}
      </div>
    )
  }

  // メイン画面
  const latestEntry = fleetEntries.find(entry => entry.isLatest)

  return (
    <div className={`fleet-analysis-manager ${theme}`}>
      {/* バックアップボタン（左上） */}
      <div className="backup-toggle">
        <button onClick={() => setShowBackup(!showBackup)} className="backup-toggle-button">
          バックアップ
        </button>
      </div>

      {/* バックアップポップアップ */}
      {showBackup && (
        <div className="backup-popup">
          <div className="backup-popup-content">
            <div className="backup-popup-header">
              <h3>バックアップ</h3>
              <button onClick={() => setShowBackup(false)} className="close-button">
                ×
              </button>
            </div>
            <div className="backup-controls">
              <button onClick={exportBackup} className="backup-btn">
                エクスポート
              </button>
              <label className="backup-btn import-btn">
                インポート
                <input
                  type="file"
                  accept=".json"
                  onChange={importBackup}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>
        </div>
      )}

      <h1 className="app-logo animate-fadeInUp">
        {theme === 'shipgirl' ? (
          <>
            <span className="logo-main">艦隊分析者マネージャー</span>
            <span className="logo-sub">-Fleet Analyst Manager-</span>
          </>
        ) : (
          <>
            <span className="logo-main">深海艦隊分析司令部</span>
            <span className="logo-sub">-Abyssal Fleet Analysis HQ-</span>
          </>
        )}
      </h1>

      {/* 提督ダッシュボード */}
      {fleetEntries.length > 0 && (
        <div className="admiral-dashboard">
          <div className="admiral-info">
            <h2>⚓ {admiralName} 提督の分析ダッシュボード</h2>
            
            {/* 統計概要 */}
            <div className="stats-overview">
              <div className="overview-item">
                <span className="overview-icon">📈</span>
                <div className="overview-text">
                  <span className="overview-label">総記録数</span>
                  <span className="overview-value">{getTotalEntries()}</span>
                </div>
              </div>
              <div className="overview-item">
                <span className="overview-icon">✅</span>
                <div className="overview-text">
                  <span className="overview-label">累計達成タスク</span>
                  <span className="overview-value">{getTotalCompletedTasks()}</span>
                </div>
              </div>
              <div className="overview-item">
                <span className="overview-icon">📋</span>
                <div className="overview-text">
                  <span className="overview-label">未達成タスク</span>
                  <span className="overview-value">{getPendingTasks()}</span>
                </div>
              </div>
            </div>

            {/* 現在の艦隊状況 */}
            {latestEntry && (
              <>
                <h3 className="section-title">現在の艦隊状況</h3>
                <div className="current-stats">
                  <div className="stat-card">
                    <span className="stat-label">現在経験値</span>
                    <span className="stat-value">{latestEntry.totalExp.toLocaleString()}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">保有艦数</span>
                    <span className="stat-value">{latestEntry.shipCount}</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">ケッコン艦</span>
                    <span className="stat-value">{latestEntry.marriedCount}</span>
                  </div>
                </div>
              </>
            )}
            
            {/* アクションボタン */}
            <div className="analysis-actions">
              <button 
                onClick={handleAdmiralModalConfirm}
                className="admiral-change-button"
              >
                <span className="material-icons">person</span> 
                提督名変更
              </button>
              
              {fleetEntries.length >= 2 && (
                <button 
                  onClick={() => setShowGraphModal(true)} 
                  className="analysis-trend-button"
                >
                  <span className="material-icons">timeline</span> 
                  分析推移表示
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 分析推移モーダル */}
      {showGraphModal && (
        <div className="graph-modal-overlay" onClick={() => setShowGraphModal(false)}>
          <div className="graph-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="graph-modal-header">
              <h2>分析推移データ</h2>
              <button onClick={() => setShowGraphModal(false)} className="close-button">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="graph-modal-body">
              {/* グラフ表示 */}
              {graphData && (
                <div className="modal-chart-section">
                  <h3>推移グラフ</h3>
                  <div className="chart-container">
                    <svg width="600" height="300" className="modal-chart-svg">
                      <path d={graphData.expPath} stroke="#4096ff" strokeWidth="3" fill="none" />
                      <path d={graphData.shipPath} stroke="#52c41a" strokeWidth="3" fill="none" />
                      <path d={graphData.marriedPath} stroke="#ff7875" strokeWidth="3" fill="none" />
                      
                      {/* 凡例 */}
                      <g transform="translate(20, 20)">
                        <text x="0" y="15" fontSize="14" fill="#e1f5fe">経験値</text>
                        <rect x="60" y="8" width="20" height="3" fill="#4096ff" />
                        <text x="0" y="35" fontSize="14" fill="#e1f5fe">艦数</text>
                        <rect x="60" y="28" width="20" height="3" fill="#52c41a" />
                        <text x="0" y="55" fontSize="14" fill="#e1f5fe">ケッコン</text>
                        <rect x="60" y="48" width="20" height="3" fill="#ff7875" />
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* データテーブル */}
              <div className="modal-table-section">
                <h3>データ一覧</h3>
                <div className="data-table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>日時</th>
                        <th>経験値</th>
                        <th>艦数</th>
                        <th>ケッコン</th>
                        <th>状態</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fleetEntries.map((entry, index) => {
                        const prevEntry = index > 0 ? fleetEntries[index - 1] : null
                        return (
                          <tr key={entry.id} className={entry.isLatest ? 'current-row' : ''}>
                            <td>{new Date(entry.createdAt).toLocaleString()}</td>
                            <td>
                              {entry.totalExp.toLocaleString()}
                              {prevEntry && (
                                <span className={`table-diff ${entry.totalExp - prevEntry.totalExp >= 0 ? 'positive' : 'negative'}`}>
                                  ({entry.totalExp - prevEntry.totalExp >= 0 ? '+' : ''}{(entry.totalExp - prevEntry.totalExp).toLocaleString()})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.shipCount}
                              {prevEntry && (
                                <span className={`table-diff ${entry.shipCount - prevEntry.shipCount >= 0 ? 'positive' : 'negative'}`}>
                                  ({entry.shipCount - prevEntry.shipCount >= 0 ? '+' : ''}{entry.shipCount - prevEntry.shipCount})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.marriedCount}
                              {prevEntry && (
                                <span className={`table-diff ${entry.marriedCount - prevEntry.marriedCount >= 0 ? 'positive' : 'negative'}`}>
                                  ({entry.marriedCount - prevEntry.marriedCount >= 0 ? '+' : ''}{entry.marriedCount - prevEntry.marriedCount})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.isLatest ? (
                                <span className="status-badge current">最新</span>
                              ) : (
                                <span className="status-badge past">過去</span>
                              )}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* データ入力セクション */}
      <div className="data-input-section">
        <h3>最新の艦隊を反映する</h3>
        <div className="input-group">
          <input
            type="text"
            value={fleetData}
            onChange={(e) => setFleetData(e.target.value)}
            onPaste={handlePaste}
            placeholder="艦隊のJSONデータをここに貼り付けてください..."
            className="fleet-data-input"
          />
        </div>
      </div>

      {/* 最新エントリー */}
      {latestEntry && (
        <div className="latest-section">
          <h2>最新エントリー</h2>
          <div className="entry-card latest">
            <div className="entry-header">
              <div className="entry-info">
                <span className="entry-date">{new Date(latestEntry.createdAt).toLocaleString()}</span>
                <span className="latest-badge">最新</span>
              </div>
              <div className="entry-actions">
                {latestEntry.url && (
                  <a
                    href={latestEntry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="url-link"
                  >
                    <span className="material-icons">open_in_new</span> 開く
                  </a>
                )}
                <button
                  onClick={() => deleteEntry(latestEntry.id)}
                  className="delete-btn"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>
            </div>

            <div className="entry-stats">
              <div className="stat-badge">
                <span className="stat-label">現在経験値</span>
                <div className="stat-value-container">
                  <span className="stat-value">{latestEntry.totalExp.toLocaleString()}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.totalExp - prevEntry.totalExp
                      return (
                        <span className={`stat-diff ${diff >= 0 ? 'positive' : 'negative'}`}>
                          ({diff >= 0 ? '+' : ''}{diff.toLocaleString()})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
              </div>
              <div className="stat-badge">
                <span className="stat-label">保有艦数</span>
                <div className="stat-value-container">
                  <span className="stat-value">{latestEntry.shipCount}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.shipCount - prevEntry.shipCount
                      return (
                        <span className={`stat-diff ${diff >= 0 ? 'positive' : 'negative'}`}>
                          ({diff >= 0 ? '+' : ''}{diff})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
              </div>
              <div className="stat-badge">
                <span className="stat-label">ケッコン艦</span>
                <div className="stat-value-container">
                  <span className="stat-value">{latestEntry.marriedCount}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.marriedCount - prevEntry.marriedCount
                      return (
                        <span className={`stat-diff ${diff >= 0 ? 'positive' : 'negative'}`}>
                          ({diff >= 0 ? '+' : ''}{diff})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
              </div>
            </div>

            {(latestEntry.url || editingUrl) && (
              <div className="url-display">
                {editingUrl ? (
                  <div className="url-edit-form">
                    <input
                      type="text"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder="URLを入力してください..."
                      className="url-edit-input"
                      autoFocus
                    />
                    <div className="url-edit-actions">
                      <button onClick={saveEditUrl} className="save-btn">
                        <span className="material-icons">check</span>
                      </button>
                      <button onClick={cancelEditUrl} className="cancel-btn">
                        <span className="material-icons">close</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="url-text-container">
                    <span className="url-text">{latestEntry.url}</span>
                    <button 
                      onClick={() => startEditUrl(latestEntry.url || '')}
                      className="edit-url-btn"
                      title="URLを編集"
                    >
                      <span className="material-icons">edit</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {latestEntry.tasks.length > 0 && (
              <div className="tasks-section">
                <div className="task-header">
                  <h4>タスク ({getTaskProgress(latestEntry.tasks).completed}/{getTaskProgress(latestEntry.tasks).total})</h4>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill ${getTaskProgress(latestEntry.tasks).percentage === 100 ? 'completed' : ''}`}
                      style={{ width: `${getTaskProgress(latestEntry.tasks).percentage}%` }}
                    ></div>
                    <span className="progress-text">{getTaskProgress(latestEntry.tasks).percentage}%</span>
                  </div>
                </div>
                <div className="tasks-list">
                  {latestEntry.tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <label className="task-checkbox">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(latestEntry.id, task.id)}
                        />
                        <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                      </label>
                      <button 
                        onClick={() => deleteTask(latestEntry.id, task.id)}
                        className="delete-task-btn"
                      >
                        <span className="material-icons">close</span>
                      </button>
                      {task.inheritedFrom && (
                        <span className="inherited-badge">継続</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* タスク・URL追加セクション（最新エントリーのみ） */}
            <div className="add-items-section">
              <h4>タスク・URL追加</h4>
              
              {/* タスク追加 */}
              <div className="input-group">
                <div className="input-with-button">
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="タスク内容を入力してください..."
                    className="task-input"
                    onKeyDown={(e) => e.key === 'Enter' && addTaskToLatest()}
                  />
                  <button 
                    onClick={addTaskToLatest}
                    className="add-button"
                    disabled={!newTaskText.trim()}
                  >
                    追加
                  </button>
                </div>
              </div>

              {/* URL追加（URLが未登録の場合のみ表示） */}
              {!latestEntry.url && (
                <div className="input-group">
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="URLを入力してください..."
                      className="url-input"
                      onKeyDown={(e) => e.key === 'Enter' && updateLatestUrl()}
                    />
                    <button 
                      onClick={updateLatestUrl}
                      className="add-button"
                      disabled={!newUrl.trim()}
                    >
                      追加
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 過去エントリー */}
      {pastEntries.length > 0 && (
        <div className="history-section">
          <h2>分析履歴</h2>
          
          {/* ページング */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="page-btn"
              >
                ← 前
              </button>
              <span className="page-info">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="page-btn"
              >
                次 →
              </button>
            </div>
          )}

          <div className="entries-list">
            {paginatedEntries.map(entry => (
              <div key={entry.id} className="entry-card past">
                <div className="entry-header">
                  <div className="entry-info">
                    <span className="entry-date">{new Date(entry.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="entry-actions">
                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="url-link"
                      >
                        <span className="material-icons">open_in_new</span> 開く
                      </a>
                    )}
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="delete-btn"
                    >
                      <span className="material-icons">close</span>
                    </button>
                  </div>
                </div>

                <div className="entry-stats">
                  <div className="stat-badge">
                    <span className="stat-label">現在経験値</span>
                    <span className="stat-value">{entry.totalExp.toLocaleString()}</span>
                    <span className={`diff ${getDifference(entry, 'totalExp') >= 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'totalExp') >= 0 ? '+' : ''}{getDifference(entry, 'totalExp').toLocaleString()})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">保有艦数</span>
                    <span className="stat-value">{entry.shipCount}</span>
                    <span className={`diff ${getDifference(entry, 'shipCount') >= 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'shipCount') >= 0 ? '+' : ''}{getDifference(entry, 'shipCount')})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">ケッコン艦</span>
                    <span className="stat-value">{entry.marriedCount}</span>
                    <span className={`diff ${getDifference(entry, 'marriedCount') >= 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'marriedCount') >= 0 ? '+' : ''}{getDifference(entry, 'marriedCount')})
                    </span>
                  </div>
                </div>

                {entry.url && (
                  <div className="url-display">
                    <span className="url-text">{entry.url}</span>
                  </div>
                )}

                {entry.tasks.length > 0 && (
                  <div className="tasks-section">
                    <div className="task-header">
                      <h4>タスク ({getTaskProgress(entry.tasks).completed}/{getTaskProgress(entry.tasks).total})</h4>
                      <div className="progress-bar">
                        <div 
                          className={`progress-fill ${getTaskProgress(entry.tasks).percentage === 100 ? 'completed' : ''}`}
                          style={{ width: `${getTaskProgress(entry.tasks).percentage}%` }}
                        ></div>
                        <span className="progress-text">{getTaskProgress(entry.tasks).percentage}%</span>
                      </div>
                    </div>
                    <div className="tasks-list">
                      {entry.tasks.map(task => (
                        <div key={task.id} className="task-item">
                          <label className="task-checkbox">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(entry.id, task.id)}
                              disabled={true} // 過去エントリーは編集不可
                            />
                            <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                          </label>
                          {task.inheritedFrom && (
                            <span className="inherited-badge">継続</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}



      {/* 提督名変更確認モーダル */}
      {showAdmiralModal && (
        <div className="modal-overlay" onClick={() => setShowAdmiralModal(false)}>
          <div className="modal-content admiral-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>提督名変更</h2>
              <button onClick={() => setShowAdmiralModal(false)} className="close-button">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="warning-message">
                <span className="material-icons">warning</span>
                <p>提督名を変更すると、すべての分析データが削除されます。</p>
              </div>
              
              <div className="current-admiral">
                <label>現在の提督名:</label>
                <span className="current-name">{admiralName}</span>
              </div>
              
              <div className="instruction-message">
                <span className="material-icons">info</span>
                <p>新しい提督名は、データ削除後の初期セットアップ画面で設定できます。</p>
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={() => setShowAdmiralModal(false)}
                  className="cancel-button"
                >
                  キャンセル
                </button>
                <button 
                  onClick={changeAdmiral}
                  className="confirm-button danger"
                >
                  データを削除して変更
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* トースト通知 */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default FleetAnalysisManager