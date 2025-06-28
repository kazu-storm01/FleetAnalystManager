import { useState, useEffect, useRef } from 'react'

// 型定義
interface ShipData {
  exp: number[]
  lv: number
  [key: string]: unknown
}

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
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [currentTasks, setCurrentTasks] = useState<string[]>([''])
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [showWelcome, setShowWelcome] = useState<boolean>(false)
  const [previewStats, setPreviewStats] = useState<{totalExp: number, shipCount: number, marriedCount: number} | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const ITEMS_PER_PAGE = 10

  // JSON艦隊データ解析エンジン
  const calculateFleetStats = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData)
      let totalExpValue = 0
      let shipCountValue = 0
      let marriedCountValue = 0

      // 配列の場合の処理（複数の形式に対応）
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      ships.forEach((ship: ShipData) => {
        if (ship.exp && Array.isArray(ship.exp)) {
          totalExpValue += (ship.exp[0] || 0)
        }
        shipCountValue++
        if (ship.lv && ship.lv >= 100) {
          marriedCountValue++
        }
      })

      return { totalExp: totalExpValue, shipCount: shipCountValue, marriedCount: marriedCountValue }
    } catch {
      throw new Error('JSON解析に失敗しました')
    }
  }

  // プレビュー更新（リアルタイム解析）
  useEffect(() => {
    if (fleetData.trim()) {
      try {
        const stats = calculateFleetStats(fleetData)
        setPreviewStats(stats)
      } catch {
        setPreviewStats(null)
      }
    } else {
      setPreviewStats(null)
    }
  }, [fleetData])

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

  // データ保存
  const saveData = () => {
    if (admiralName) {
      localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(fleetEntries))
    }
  }

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
      setCurrentUrl('')
      setCurrentTasks([''])
      setCurrentPage(0)
      setIsFirstSetup(true)
      setShowWelcome(true)
      showToast('すべてのデータが削除されました', 'success')
    }
  }

  // タスク入力の管理
  const updateTaskInput = (index: number, value: string) => {
    const newTasks = [...currentTasks]
    newTasks[index] = value
    
    // 最後の入力欄に文字が入ったら新しい入力欄を追加（最大50個）
    if (index === currentTasks.length - 1 && value.trim() && currentTasks.length < 50) {
      newTasks.push('')
    }
    
    setCurrentTasks(newTasks)
  }

  // 艦隊データ・タスク登録
  const registerFleetEntry = () => {
    if (!fleetData.trim()) {
      showToast('艦隊JSONデータを入力してください', 'error')
      return
    }

    if (!admiralName.trim()) {
      showToast('提督名を設定してください', 'error')
      return
    }

    try {
      const stats = calculateFleetStats(fleetData)
      
      // 以前のエントリーをlatestではなくする
      const updatedEntries = fleetEntries.map(entry => ({ ...entry, isLatest: false }))
      
      // 未完了タスクを継続
      const continueTasks: Task[] = []
      if (updatedEntries.length > 0) {
        const lastEntry = updatedEntries[updatedEntries.length - 1]
        lastEntry.tasks.forEach(task => {
          if (!task.completed && task.text.trim()) {
            continueTasks.push({
              id: Date.now() + Math.random(),
              text: task.text,
              completed: false,
              createdAt: new Date().toISOString(),
              inheritedFrom: lastEntry.id,
              originalTaskId: task.id
            })
          }
        })
      }

      // 新しいタスクを追加
      const newTasks = currentTasks
        .filter(text => text.trim())
        .map(text => ({
          id: Date.now() + Math.random(),
          text: text.trim(),
          completed: false,
          createdAt: new Date().toISOString()
        }))

      const newEntry: FleetEntry = {
        id: Date.now(),
        totalExp: stats.totalExp,
        shipCount: stats.shipCount,
        marriedCount: stats.marriedCount,
        tasks: [...continueTasks, ...newTasks],
        url: currentUrl.trim() || undefined,
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
      setCurrentUrl('')
      setCurrentTasks([''])
      
      // 保存
      setTimeout(saveData, 100)
      
      const continueCount = continueTasks.length
      const newCount = newTasks.length
      const message = continueCount > 0 
        ? `艦隊データ登録完了！継続タスク${continueCount}件、新規タスク${newCount}件`
        : `艦隊データ登録完了！新規タスク${newCount}件`
      
      showToast(message, 'success')
    } catch (error) {
      showToast(`エラー: ${error}`, 'error')
    }
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
      setTimeout(saveData, 100)
      showToast('エントリーを削除しました', 'success')
    }
  }

  // タスクの完了状態を切り替え
  const toggleTask = (entryId: number, taskId: number) => {
    setFleetEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          tasks: entry.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        }
      }
      return entry
    }))
    setTimeout(saveData, 100)
  }

  // タスクの削除
  const deleteTask = (entryId: number, taskId: number) => {
    setFleetEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          tasks: entry.tasks.filter(task => task.id !== taskId)
        }
      }
      return entry
    }))
    setTimeout(saveData, 100)
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
        
        setFleetEntries(backup.fleetEntries || [])
        setAdmiralName(backup.admiralName || '')
        setTimeout(saveData, 100)
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
                <h2>🎉 ようこそ！</h2>
                <div className="welcome-text">
                  <p>艦隊分析者マネージャーをご利用いただき、誠にありがとうございます</p>
                  <p>このアプリは艦隊JSONデータを解析し、経験値・艦数・ケッコン艦数の成長を追跡します</p>
                  <p>より良い艦これライフを！</p>
                </div>
                
                <div className="privacy-notice">
                  <h3>🔒 プライバシー保護について</h3>
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
                  🚀 開始する
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

      {/* 統計ダッシュボード */}
      {fleetEntries.length > 0 && (
        <div className="stats-dashboard">
          <div className="admiral-info">
            <h2>📊 {admiralName} 提督の分析記録</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-label">総記録数</span>
                <span className="stat-value">{getTotalEntries()}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">累計達成タスク</span>
                <span className="stat-value">{getTotalCompletedTasks()}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">未達成タスク</span>
                <span className="stat-value">{getPendingTasks()}</span>
              </div>
              {latestEntry && (
                <>
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
                </>
              )}
            </div>
            <button onClick={changeAdmiral} className="change-admiral-btn">
              ⚙️ 提督名変更
            </button>
          </div>

          {/* 成長グラフ */}
          {graphData && (
            <div className="growth-chart">
              <h3>📈 分析推移グラフ</h3>
              <svg width="320" height="140" className="chart-svg">
                <path d={graphData.expPath} stroke="#4096ff" strokeWidth="2" fill="none" />
                <path d={graphData.shipPath} stroke="#52c41a" strokeWidth="2" fill="none" />
                <path d={graphData.marriedPath} stroke="#ff7875" strokeWidth="2" fill="none" />
                <text x="10" y="15" fontSize="12" fill="#666">経験値</text>
                <rect x="50" y="8" width="12" height="2" fill="#4096ff" />
                <text x="10" y="30" fontSize="12" fill="#666">艦数</text>
                <rect x="50" y="23" width="12" height="2" fill="#52c41a" />
                <text x="10" y="45" fontSize="12" fill="#666">ケッコン</text>
                <rect x="50" y="38" width="12" height="2" fill="#ff7875" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* データ入力セクション */}
      <div className="data-input-section">
        <h2>⚓ 艦隊分析データ登録</h2>
        
        <div className="input-group">
          <label>艦隊JSONデータ:</label>
          <textarea
            value={fleetData}
            onChange={(e) => setFleetData(e.target.value)}
            placeholder="艦隊のJSONデータをここに貼り付けてください..."
            className="fleet-data-input"
            rows={8}
          />
          {previewStats && (
            <div className="preview-stats">
              <span>プレビュー: </span>
              <span className="preview-value">経験値 {previewStats.totalExp.toLocaleString()}</span>
              <span className="preview-value">艦数 {previewStats.shipCount}</span>
              <span className="preview-value">ケッコン {previewStats.marriedCount}</span>
            </div>
          )}
        </div>

        <div className="input-group">
          <label>関連URL (任意):</label>
          <input
            type="url"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            placeholder="https://..."
            className="url-input"
          />
        </div>

        <div className="input-group">
          <label>新規タスク:</label>
          {currentTasks.map((task, index) => (
            <input
              key={index}
              type="text"
              value={task}
              onChange={(e) => updateTaskInput(index, e.target.value)}
              placeholder={`タスク ${index + 1}`}
              className="task-input"
            />
          ))}
          <p className="input-hint">
            最大50個のタスクを設定できます。前回の未完了タスクは自動で継続されます。
          </p>
        </div>

        <button 
          onClick={registerFleetEntry}
          className="register-button"
          disabled={!fleetData.trim() || !admiralName.trim()}
        >
          📝 データ登録
        </button>
      </div>

      {/* 最新エントリー */}
      {latestEntry && (
        <div className="latest-section">
          <h2>⭐ 最新エントリー</h2>
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
                    🔗 開く
                  </a>
                )}
                <button
                  onClick={() => deleteEntry(latestEntry.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="entry-stats">
              <div className="stat-badge">
                <span>💰 {latestEntry.totalExp.toLocaleString()}</span>
              </div>
              <div className="stat-badge">
                <span>⚓ {latestEntry.shipCount}</span>
              </div>
              <div className="stat-badge">
                <span>💒 {latestEntry.marriedCount}</span>
              </div>
            </div>

            {latestEntry.url && (
              <div className="url-display">
                <span className="url-text">{latestEntry.url}</span>
              </div>
            )}

            {latestEntry.tasks.length > 0 && (
              <div className="tasks-section">
                <h4>📋 タスク ({latestEntry.tasks.filter(t => t.completed).length}/{latestEntry.tasks.length})</h4>
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
                        🗑️
                      </button>
                      {task.inheritedFrom && (
                        <span className="inherited-badge">継続</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 過去エントリー */}
      {pastEntries.length > 0 && (
        <div className="history-section">
          <h2>📜 分析履歴</h2>
          
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
                        🔗 開く
                      </a>
                    )}
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="entry-stats">
                  <div className="stat-badge">
                    <span>💰 {entry.totalExp.toLocaleString()}</span>
                    <span className={`diff ${getDifference(entry, 'totalExp') >= 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'totalExp') >= 0 ? '+' : ''}{getDifference(entry, 'totalExp').toLocaleString()})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span>⚓ {entry.shipCount}</span>
                    <span className={`diff ${getDifference(entry, 'shipCount') >= 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'shipCount') >= 0 ? '+' : ''}{getDifference(entry, 'shipCount')})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span>💒 {entry.marriedCount}</span>
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
                    <h4>📋 タスク ({entry.tasks.filter(t => t.completed).length}/{entry.tasks.length})</h4>
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

      {/* バックアップセクション */}
      <div className="backup-section">
        <h2>💾 バックアップ</h2>
        <div className="backup-controls">
          <button onClick={exportBackup} className="backup-btn">
            📤 エクスポート
          </button>
          <label className="backup-btn import-btn">
            📥 インポート
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