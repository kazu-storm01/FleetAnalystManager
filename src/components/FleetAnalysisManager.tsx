import { useState, useEffect } from 'react'

// 型定義
interface Task {
  id: number
  text: string
  completed: boolean
  createdAt: string
  inheritedFrom?: number
  originalTaskId?: number
}

interface URLEntry {
  id: number
  url: string
  tasks: Task[]
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
  const [urlEntries, setUrlEntries] = useState<URLEntry[]>([])
  const [currentUrl, setCurrentUrl] = useState<string>('')
  const [currentTasks, setCurrentTasks] = useState<string[]>([''])
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [showWelcome, setShowWelcome] = useState<boolean>(false)

  const ITEMS_PER_PAGE = 10

  // 初期化処理
  useEffect(() => {
    const savedAdmiralName = localStorage.getItem('admiralName')
    if (savedAdmiralName) {
      setAdmiralName(savedAdmiralName)
      setIsFirstSetup(false)
      loadUrlEntries(savedAdmiralName)
    } else {
      setIsFirstSetup(true)
      setShowWelcome(true)
    }
  }, [])

  // URLエントリーの読み込み
  const loadUrlEntries = (admiral: string) => {
    const saved = localStorage.getItem(`${admiral}_urlEntries`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUrlEntries(parsed)
      } catch (error) {
        console.error('Failed to load URL entries:', error)
        setUrlEntries([])
      }
    }
  }

  // データ保存
  const saveData = () => {
    if (admiralName) {
      localStorage.setItem(`${admiralName}_urlEntries`, JSON.stringify(urlEntries))
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
    localStorage.setItem('admiralName', name)
    setIsFirstSetup(false)
    setShowWelcome(false)
    showToast(`提督「${name}」として登録完了！`, 'success')
  }

  // 提督名変更（全データ削除）
  const changeAdmiral = () => {
    if (confirm('提督名を変更すると、すべてのデータが削除されます。続行しますか？')) {
      if (admiralName) {
        localStorage.removeItem(`${admiralName}_urlEntries`)
      }
      localStorage.removeItem('admiralName')
      setAdmiralName('')
      setTempAdmiralName('')
      setUrlEntries([])
      setCurrentUrl('')
      setCurrentTasks([''])
      setCurrentPage(0)
      setIsFirstSetup(true)
      setShowWelcome(true)
      showToast('すべてのデータが削除されました', 'success')
    }
  }

  // URL有効性チェック
  const isValidUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url)
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
    } catch {
      return false
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

  // URL・タスク登録
  const registerUrlEntry = () => {
    if (!currentUrl.trim()) {
      showToast('URLを入力してください', 'error')
      return
    }

    if (!isValidUrl(currentUrl.trim())) {
      showToast('有効なURLを入力してください（http://またはhttps://で始まる）', 'error')
      return
    }

    // 以前のエントリーをlatestではなくする
    const updatedEntries = urlEntries.map(entry => ({ ...entry, isLatest: false }))
    
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

    const newEntry: URLEntry = {
      id: Date.now(),
      url: currentUrl.trim(),
      tasks: [...continueTasks, ...newTasks],
      createdAt: new Date().toISOString(),
      admiralName,
      isLatest: true
    }

    const newEntries = [...updatedEntries, newEntry]
    
    // 100件制限
    if (newEntries.length > 100) {
      newEntries.splice(0, newEntries.length - 100)
    }

    setUrlEntries(newEntries)
    
    // フォームリセット
    setCurrentUrl('')
    setCurrentTasks([''])
    
    // 保存
    setTimeout(saveData, 100)
    
    const continueCount = continueTasks.length
    const newCount = newTasks.length
    const message = continueCount > 0 
      ? `URL登録完了！継続タスク${continueCount}件、新規タスク${newCount}件`
      : `URL登録完了！新規タスク${newCount}件`
    
    showToast(message, 'success')
  }

  // エントリー削除
  const deleteEntry = (entryId: number) => {
    if (confirm('このエントリーを削除しますか？')) {
      const filtered = urlEntries.filter(entry => entry.id !== entryId)
      
      // 最新エントリーが削除された場合、前のエントリーを最新にする
      if (filtered.length > 0) {
        const wasLatest = urlEntries.find(e => e.id === entryId)?.isLatest
        if (wasLatest) {
          filtered[filtered.length - 1].isLatest = true
        }
      }
      
      setUrlEntries(filtered)
      setTimeout(saveData, 100)
      showToast('エントリーを削除しました', 'success')
    }
  }

  // タスクの完了状態を切り替え
  const toggleTask = (entryId: number, taskId: number) => {
    setUrlEntries(prev => prev.map(entry => {
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
    setUrlEntries(prev => prev.map(entry => {
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
  const getTotalUrls = () => urlEntries.length
  const getTotalCompletedTasks = () => urlEntries.reduce((total, entry) => 
    total + entry.tasks.filter(task => task.completed).length, 0
  )
  const getPendingTasks = () => {
    const latestEntry = urlEntries.find(entry => entry.isLatest)
    return latestEntry ? latestEntry.tasks.filter(task => !task.completed).length : 0
  }

  // ページング計算
  const pastEntries = urlEntries.filter(entry => !entry.isLatest).reverse()
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
            <div className="app-logo animate-fadeInUp">
              {theme === 'shipgirl' ? (
                <>
                  <span className="logo-main">艦隊分析マネージャー</span>
                  <span className="logo-sub">-Fleet Analysis Manager-</span>
                </>
              ) : (
                <>
                  <span className="logo-main">深海艦隊分析管理システム</span>
                  <span className="logo-sub">-Abyssal Fleet Analysis System-</span>
                </>
              )}
            </div>

            {showWelcome && (
              <div className="welcome-message">
                <h2>🎉 ようこそ！</h2>
                <div className="welcome-text">
                  <p>艦隊分析マネージャーをご利用いただき、誠にありがとうございます</p>
                  <p>このアプリは自艦隊のタスクの達成と管理をおこなうためのWEBアプリです</p>
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
  const latestEntry = urlEntries.find(entry => entry.isLatest)

  return (
    <div className={`fleet-analysis-manager ${theme}`}>
      <div className="app-logo animate-fadeInUp">
        {theme === 'shipgirl' ? (
          <>
            <span className="logo-main">艦隊分析マネージャー</span>
            <span className="logo-sub">-Fleet Analysis Manager-</span>
          </>
        ) : (
          <>
            <span className="logo-main">深海艦隊分析管理システム</span>
            <span className="logo-sub">-Abyssal Fleet Analysis System-</span>
          </>
        )}
      </div>

      {/* 提督ステータス */}
      <div className="admiral-status">
        <div className="admiral-info">
          <h2>📊 {admiralName} 提督の統計</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">登録URL数</span>
              <span className="stat-value">{getTotalUrls()}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">累計達成タスク</span>
              <span className="stat-value">{getTotalCompletedTasks()}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">未達成タスク</span>
              <span className="stat-value">{getPendingTasks()}</span>
            </div>
          </div>
          <button onClick={changeAdmiral} className="change-admiral-btn">
            ⚙️ 提督名変更
          </button>
        </div>
      </div>

      {/* URL・タスク登録セクション */}
      <div className="url-registration">
        <h2>🔗 新規URL・タスク登録</h2>
        <div className="input-section">
          <div className="url-input-group">
            <label>艦隊分析URL:</label>
            <input
              type="url"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="https://example.com/fleet-analysis"
              className="url-input"
            />
          </div>

          <div className="tasks-input-group">
            <label>タスク設定:</label>
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

          <button onClick={registerUrlEntry} className="register-button">
            📝 登録
          </button>
        </div>
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
                <a
                  href={latestEntry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="url-link"
                >
                  🔗 開く
                </a>
                <button
                  onClick={() => deleteEntry(latestEntry.id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="url-display">
              <span className="url-text">{latestEntry.url}</span>
            </div>

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
          <h2>📜 過去のエントリー</h2>
          
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
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="url-link"
                    >
                      🔗 開く
                    </a>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="url-display">
                  <span className="url-text">{entry.url}</span>
                </div>

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