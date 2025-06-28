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
  luckModTotal: number    // 自動算出: 運改修合計値
  hpModTotal: number      // 自動算出: 耐久改修合計値
  aswModTotal: number     // 自動算出: 対潜改修合計値
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
  const [activeGraphTab, setActiveGraphTab] = useState<'exp' | 'ships' | 'married' | 'luck' | 'hp' | 'asw'>('exp')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const ITEMS_PER_PAGE = 10

  // 数値サイズに応じたクラス名を取得
  const getNumberSizeClass = (value: number): string => {
    const str = value.toLocaleString()
    if (str.length >= 15) return 'xlarge-number'  // 超大きな数値（1兆以上）
    if (str.length >= 12) return 'large-number'   // 大きな数値（10億以上）
    return ''
  }

  // JSON艦隊データ解析エンジン（最適化版）
  const calculateFleetStats = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData)
      let totalExpValue = 0
      let shipCountValue = 0
      let marriedCountValue = 0
      let luckModTotalValue = 0
      let hpModTotalValue = 0
      let aswModTotalValue = 0

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
        
        // 改修値の取得（api_kyouka配列）
        const luckMod = ship.api_kyouka?.[4] || 0  // 運改修
        const hpMod = ship.api_kyouka?.[5] || 0    // 耐久改修
        const aswMod = ship.api_kyouka?.[6] || 0   // 対潜改修
        luckModTotalValue += luckMod
        hpModTotalValue += hpMod
        aswModTotalValue += aswMod
        
        shipCountValue++
      }

      return { 
        totalExp: totalExpValue, 
        shipCount: shipCountValue, 
        marriedCount: marriedCountValue, 
        luckModTotal: luckModTotalValue,
        hpModTotal: hpModTotalValue,
        aswModTotal: aswModTotalValue
      }
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
            luckModTotal: stats.luckModTotal,
            hpModTotal: stats.hpModTotal,
            aswModTotal: stats.aswModTotal,
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
        // 後方互換性のため、改修合計値が未定義の場合は0に設定
        const updatedEntries = parsed.map((entry: any) => ({
          ...entry,
          luckModTotal: entry.luckModTotal ?? 0,
          hpModTotal: entry.hpModTotal ?? 0,
          aswModTotal: entry.aswModTotal ?? 0
        }))
        setFleetEntries(updatedEntries)
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
    setShowBackup(false) // 確実にバックアップモーダルを閉じる
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
    // タスク完了メッセージは長めに表示
    const duration = message.includes('タスクが完了') ? 5000 : 3000
    setTimeout(() => setToast(null), duration)
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
  const getDifference = (current: FleetEntry, field: keyof Pick<FleetEntry, 'totalExp' | 'shipCount' | 'marriedCount' | 'luckModTotal' | 'hpModTotal' | 'aswModTotal'>) => {
    const currentIndex = fleetEntries.findIndex(e => e.id === current.id)
    if (currentIndex <= 0) return 0
    
    const previous = fleetEntries[currentIndex - 1]
    return (current[field] || 0) - (previous[field] || 0)
  }

  // 個別グラフデータ生成（SVGベース）
  const generateSingleGraphData = (type: 'exp' | 'ships' | 'married' | 'luck' | 'hp' | 'asw') => {
    if (fleetEntries.length < 2) return null
    
    const recentEntries = fleetEntries.slice(-10) // 最新10件
    const graphHeight = 300
    const graphWidth = 600
    const padding = 40
    
    let values: number[]
    let color: string
    let label: string
    
    switch (type) {
      case 'exp':
        values = recentEntries.map(e => e.totalExp)
        color = '#4096ff'
        label = '経験値'
        break
      case 'ships':
        values = recentEntries.map(e => e.shipCount)
        color = '#52c41a'
        label = '艦数'
        break
      case 'married':
        values = recentEntries.map(e => e.marriedCount)
        color = '#ff7875'
        label = 'ケッコン艦'
        break
      case 'luck':
        values = recentEntries.map(e => e.luckModTotal || 0)
        color = '#faad14'
        label = '運改修合計'
        break
      case 'hp':
        values = recentEntries.map(e => e.hpModTotal || 0)
        color = '#f759ab'
        label = '耐久改修合計'
        break
      case 'asw':
        values = recentEntries.map(e => e.aswModTotal || 0)
        color = '#13c2c2'
        label = '対潜改修合計'
        break
    }
    
    const maxValue = Math.max(...values)
    const minValue = Math.min(...values)
    const valueRange = maxValue - minValue || 1
    
    const path = values.map((value, i) => {
      const x = padding + (i * (graphWidth - 2 * padding)) / (values.length - 1)
      const y = graphHeight - padding - ((value - minValue) / valueRange) * (graphHeight - 2 * padding)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
    
    // データポイント生成
    const points = values.map((value, i) => {
      const x = padding + (i * (graphWidth - 2 * padding)) / (values.length - 1)
      const y = graphHeight - padding - ((value - minValue) / valueRange) * (graphHeight - 2 * padding)
      return { x, y, value, entry: recentEntries[i] }
    })
    
    return { path, points, maxValue, minValue, color, label, entries: recentEntries }
  }



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
                  <p>このアプリは艦隊データから艦隊の成長を管理します</p>
                  <p>より良い艦これライフを！</p>
                </div>
                
                <div className="privacy-notice">
                  <h3><span className="material-icons">lock</span> プライバシー保護について</h3>
                  <p>このアプリはローカルストレージのみを使用し、外部へのデータ送信は行いません。</p>
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
            <div className="backup-separator"></div>
            <div className="backup-controls">
              <button 
                onClick={handleAdmiralModalConfirm}
                className="backup-btn admiral-change-btn"
              >
                <span className="material-icons">person</span>
                提督変更
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="app-logo animate-fadeInUp">
        {theme === 'shipgirl' ? (
          <>
            <span className="logo-main">艦隊分析マネージャー</span>
            <span className="logo-sub">-Fleet Analyst Manager-</span>
          </>
        ) : (
          <>
            <span className="logo-main">深海艦隊分析司令部</span>
            <span className="logo-sub">-Abyssal Fleet Analysis HQ-</span>
          </>
        )}
      </h1>


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
              {/* タブナビゲーション */}
              <div className="graph-tabs">
                <button 
                  className={`graph-tab ${activeGraphTab === 'exp' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('exp')}
                >
                  <span className="material-icons">trending_up</span>
                  経験値
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'ships' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('ships')}
                >
                  <span className="material-icons">directions_boat</span>
                  艦数
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'married' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('married')}
                >
                  <span className="material-icons">favorite</span>
                  ケッコン艦
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'luck' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('luck')}
                >
                  <span className="material-icons">stars</span>
                  運改修
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'hp' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('hp')}
                >
                  <span className="material-icons">health_and_safety</span>
                  耐久改修
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'asw' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('asw')}
                >
                  <span className="material-icons">radar</span>
                  対潜改修
                </button>
              </div>

              {/* 個別グラフ表示 */}
              {(() => {
                const singleGraphData = generateSingleGraphData(activeGraphTab)
                if (!singleGraphData) return null
                
                return (
                  <div className="modal-chart-section">
                    <h3>{singleGraphData.label}の推移</h3>
                    <div className="chart-container">
                      <svg width="700" height="400" className="modal-chart-svg">
                        {/* グリッドライン */}
                        <defs>
                          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(225, 245, 254, 0.1)" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* メインライン */}
                        <path 
                          d={singleGraphData.path} 
                          stroke={singleGraphData.color} 
                          strokeWidth="3" 
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        
                        {/* データポイント */}
                        {singleGraphData.points.map((point, i) => (
                          <g key={i}>
                            <circle 
                              cx={point.x} 
                              cy={point.y} 
                              r="6" 
                              fill={singleGraphData.color}
                              stroke="white"
                              strokeWidth="2"
                            />
                            <text 
                              x={point.x} 
                              y={point.y - 12} 
                              fontSize="12" 
                              fill="#e1f5fe" 
                              textAnchor="middle"
                              fontWeight="bold"
                            >
                              {activeGraphTab === 'exp' ? point.value.toLocaleString() : point.value}
                            </text>
                          </g>
                        ))}
                        
                        {/* 軸ラベル */}
                        <text x="350" y="390" fontSize="14" fill="#e1f5fe" textAnchor="middle">
                          記録時系列
                        </text>
                        <text x="20" y="30" fontSize="14" fill="#e1f5fe" textAnchor="middle">
                          {singleGraphData.label}
                        </text>
                      </svg>
                    </div>
                    
                    {/* 統計情報 */}
                    <div className="graph-stats">
                      <div className="stat-item">
                        <span className="stat-title">最大値</span>
                        <span className="stat-number">
                          {activeGraphTab === 'exp' ? singleGraphData.maxValue.toLocaleString() : singleGraphData.maxValue}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-title">最小値</span>
                        <span className="stat-number">
                          {activeGraphTab === 'exp' ? singleGraphData.minValue.toLocaleString() : singleGraphData.minValue}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-title">変動幅</span>
                        <span className="stat-number">
                          {activeGraphTab === 'exp' ? (singleGraphData.maxValue - singleGraphData.minValue).toLocaleString() : (singleGraphData.maxValue - singleGraphData.minValue)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })()}

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
                        <th>運改修</th>
                        <th>耐久改修</th>
                        <th>対潜改修</th>
                        <th>URL</th>
                        <th>状態</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...fleetEntries].reverse().map((entry, index) => {
                        const actualIndex = fleetEntries.length - 1 - index
                        const prevEntry = actualIndex > 0 ? fleetEntries[actualIndex - 1] : null
                        return (
                          <tr key={entry.id} className={entry.isLatest ? 'current-row' : ''}>
                            <td>{new Date(entry.createdAt).toLocaleString('ja-JP', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}</td>
                            <td>
                              {entry.totalExp.toLocaleString()}
                              {prevEntry && (
                                <span className={`table-diff ${entry.totalExp - prevEntry.totalExp === 0 ? 'neutral' : entry.totalExp - prevEntry.totalExp > 0 ? 'positive' : 'negative'}`}>
                                  ({entry.totalExp - prevEntry.totalExp >= 0 ? '+' : ''}{(entry.totalExp - prevEntry.totalExp).toLocaleString()})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.shipCount}
                              {prevEntry && (
                                <span className={`table-diff ${entry.shipCount - prevEntry.shipCount === 0 ? 'neutral' : entry.shipCount - prevEntry.shipCount > 0 ? 'positive' : 'negative'}`}>
                                  ({entry.shipCount - prevEntry.shipCount >= 0 ? '+' : ''}{entry.shipCount - prevEntry.shipCount})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.marriedCount}
                              {prevEntry && (
                                <span className={`table-diff ${entry.marriedCount - prevEntry.marriedCount === 0 ? 'neutral' : entry.marriedCount - prevEntry.marriedCount > 0 ? 'positive' : 'negative'}`}>
                                  ({entry.marriedCount - prevEntry.marriedCount >= 0 ? '+' : ''}{entry.marriedCount - prevEntry.marriedCount})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.luckModTotal || 0}
                              {prevEntry && (
                                <span className={`table-diff ${(entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0) === 0 ? 'neutral' : (entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0) > 0 ? 'positive' : 'negative'}`}>
                                  ({(entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0) >= 0 ? '+' : ''}{(entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0)})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.hpModTotal || 0}
                              {prevEntry && (
                                <span className={`table-diff ${(entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0) === 0 ? 'neutral' : (entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0) > 0 ? 'positive' : 'negative'}`}>
                                  ({(entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0) >= 0 ? '+' : ''}{(entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0)})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.aswModTotal || 0}
                              {prevEntry && (
                                <span className={`table-diff ${(entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0) === 0 ? 'neutral' : (entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0) > 0 ? 'positive' : 'negative'}`}>
                                  ({(entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0) >= 0 ? '+' : ''}{(entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0)})
                                </span>
                              )}
                            </td>
                            <td>
                              {entry.url ? (
                                <a
                                  href={entry.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="url-link"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="material-icons">link</span>
                                </a>
                              ) : (
                                <span>-</span>
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

      {/* ダッシュボードヘッダー */}
      {latestEntry && (
        <div className="dashboard-header">
          <h2>⚓ {admiralName} のダッシュボード</h2>
          
          {/* アクションボタン */}
          <div className="dashboard-actions">
            <button 
              onClick={() => setShowBackup(!showBackup)} 
              className="action-button backup-button"
              title="バックアップ"
            >
              <span className="material-icons">settings</span>
            </button>
            {fleetEntries.length >= 2 && (
              <button 
                onClick={() => setShowGraphModal(true)} 
                className="action-button chart-button"
                title="分析推移表示"
              >
                <span className="material-icons">analytics</span>
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* 統計概要カード */}
      {latestEntry && (
        <div className="stats-overview">
              <div className="overview-item">
                <span className="material-icons overview-icon">trending_up</span>
                <div className="overview-text">
                  <span className="overview-label">総記録数</span>
                  <span className="overview-value">{getTotalEntries()}</span>
                </div>
              </div>
              <div className="overview-item">
                <span className="material-icons overview-icon">task_alt</span>
                <div className="overview-text">
                  <span className="overview-label">累計達成タスク</span>
                  <span className="overview-value">{getTotalCompletedTasks()}</span>
                </div>
              </div>
              <div className="overview-item">
                <span className="material-icons overview-icon">assignment</span>
                <div className="overview-text">
                  <span className="overview-label">未達成タスク</span>
                  <span className="overview-value">{getPendingTasks()}</span>
                </div>
              </div>
        </div>
      )}

      {/* 最新の艦隊状況カード */}
      {latestEntry && (
        <div className="latest-entry-section">
              <div className="entry-header">
                <div className="entry-info">
                  <h3 className="section-title">最新の艦隊状況</h3>
                  <div className="entry-meta">
                    <span className="entry-date">{new Date(latestEntry.createdAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span className="latest-badge">最新</span>
                    {!latestEntry.url && (
                      <input
                        type="text"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        onPaste={(e) => {
                          // ペーストされたデータを取得
                          const pastedData = e.clipboardData.getData('text')
                          
                          // 少し遅延してから処理（ペーストデータがstateに反映されるのを待つ）
                          setTimeout(() => {
                            if (pastedData.trim()) {
                              // URL形式チェック（簡易）
                              try {
                                new URL(pastedData.trim())
                                // 有効なURLの場合、自動登録
                                const latestEntry = fleetEntries.find(entry => entry.isLatest)
                                if (latestEntry) {
                                  const updatedEntries = fleetEntries.map(entry => 
                                    entry.id === latestEntry.id 
                                      ? { ...entry, url: pastedData.trim() }
                                      : entry
                                  )
                                  setFleetEntries(updatedEntries)
                                  localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
                                  setNewUrl('')
                                  showToast('URLを登録しました', 'success')
                                }
                              } catch {
                                // 無効なURLの場合は何もしない（通常の入力として扱う）
                              }
                            }
                          }, 100)
                        }}
                        placeholder="URL貼り付け"
                        className="url-input-compact"
                        style={{
                          marginLeft: '0.5rem',
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.875rem',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          width: '400px'
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="entry-actions">
                  {latestEntry.url && (
                    <a
                      href={latestEntry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="url-link"
                    >
                      <span className="material-icons">link</span> 開く
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

              {/* 現在の艦隊データ */}
              <div className="current-stats">
                <div className="stat-card">
                  <span className="stat-label">現在経験値</span>
                  <div className="stat-value-container">
                    <span className={`stat-value ${getNumberSizeClass(latestEntry.totalExp)}`}>{latestEntry.totalExp.toLocaleString()}</span>
                    {(() => {
                      const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                      if (latestIndex > 0) {
                        const prevEntry = fleetEntries[latestIndex - 1]
                        const diff = latestEntry.totalExp - prevEntry.totalExp
                        return (
                          <span className={`stat-diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                            ({diff >= 0 ? '+' : ''}{diff.toLocaleString()})
                          </span>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">保有艦数</span>
                  <div className="stat-value-container">
                    <span className="stat-value">{latestEntry.shipCount}</span>
                    {(() => {
                      const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                      if (latestIndex > 0) {
                        const prevEntry = fleetEntries[latestIndex - 1]
                        const diff = latestEntry.shipCount - prevEntry.shipCount
                        return (
                          <span className={`stat-diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                            ({diff >= 0 ? '+' : ''}{diff})
                          </span>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">ケッコン艦</span>
                  <div className="stat-value-container">
                    <span className="stat-value">{latestEntry.marriedCount}</span>
                    {(() => {
                      const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                      if (latestIndex > 0) {
                        const prevEntry = fleetEntries[latestIndex - 1]
                        const diff = latestEntry.marriedCount - prevEntry.marriedCount
                        return (
                          <span className={`stat-diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                            ({diff >= 0 ? '+' : ''}{diff})
                          </span>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">運改修合計</span>
                  <div className="stat-value-container">
                    <span className="stat-value">{latestEntry.luckModTotal}</span>
                    {(() => {
                      const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                      if (latestIndex > 0) {
                        const prevEntry = fleetEntries[latestIndex - 1]
                        const diff = latestEntry.luckModTotal - (prevEntry.luckModTotal || 0)
                        return (
                          <span className={`stat-diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                            ({diff >= 0 ? '+' : ''}{diff})
                          </span>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">耐久改修合計</span>
                  <div className="stat-value-container">
                    <span className="stat-value">{latestEntry.hpModTotal}</span>
                    {(() => {
                      const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                      if (latestIndex > 0) {
                        const prevEntry = fleetEntries[latestIndex - 1]
                        const diff = latestEntry.hpModTotal - (prevEntry.hpModTotal || 0)
                        return (
                          <span className={`stat-diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                            ({diff >= 0 ? '+' : ''}{diff})
                          </span>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-label">対潜改修合計</span>
                  <div className="stat-value-container">
                    <span className="stat-value">{latestEntry.aswModTotal}</span>
                    {(() => {
                      const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                      if (latestIndex > 0) {
                        const prevEntry = fleetEntries[latestIndex - 1]
                        const diff = latestEntry.aswModTotal - (prevEntry.aswModTotal || 0)
                        return (
                          <span className={`stat-diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                            ({diff >= 0 ? '+' : ''}{diff})
                          </span>
                        )
                      }
                      return null
                    })()}
                  </div>
                </div>
              </div>

              {/* URL表示・編集 */}
              {latestEntry.url && (
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

        </div>
      )}

      {/* タスク進捗カード */}
      {latestEntry && latestEntry.tasks.length > 0 && (
        <div className="tasks-section">
                  <div className="task-header">
                    <h4>タスク進捗 ({getTaskProgress(latestEntry.tasks).completed}/{getTaskProgress(latestEntry.tasks).total})</h4>
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

      {/* アクションエリア */}
      {latestEntry && (
        <div className="action-area" style={{marginTop: '1.5rem'}}>
          <div className="input-section">
            {/* <h4 style={{marginBottom: '1rem'}}>タスク・URL追加</h4> */}
            
            {/* タスク追加 */}
            <div className="input-group" style={{marginBottom: '1rem'}}>
              <div className="input-with-button" style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                <input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="タスク内容を入力してください..."
                  className="task-input"
                  onKeyDown={(e) => e.key === 'Enter' && addTaskToLatest()}
                  style={{flex: '1', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ddd'}}
                />
                <button 
                  onClick={addTaskToLatest}
                  className="add-button"
                  disabled={!newTaskText.trim()}
                  style={{padding: '0.5rem 1rem', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer'}}
                >
                  追加
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 過去エントリー */}
      {pastEntries.length > 0 && (
        <div className="history-section" style={{marginTop: '5rem'}}>
          <h2 style={{textAlign: 'left'}}>分析履歴</h2>
          
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
                    <h3 className="entry-title">{new Date(entry.createdAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</h3>
                  </div>
                  <div className="entry-actions">
                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="url-link"
                      >
                        <span className="material-icons">link</span> 開く
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
                    <span className={`stat-value ${getNumberSizeClass(entry.totalExp)}`}>{entry.totalExp.toLocaleString()}</span>
                    <span className={`diff ${getDifference(entry, 'totalExp') === 0 ? 'neutral' : getDifference(entry, 'totalExp') > 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'totalExp') >= 0 ? '+' : ''}{getDifference(entry, 'totalExp').toLocaleString()})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">保有艦数</span>
                    <span className="stat-value">{entry.shipCount}</span>
                    <span className={`diff ${getDifference(entry, 'shipCount') === 0 ? 'neutral' : getDifference(entry, 'shipCount') > 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'shipCount') >= 0 ? '+' : ''}{getDifference(entry, 'shipCount')})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">ケッコン艦</span>
                    <span className="stat-value">{entry.marriedCount}</span>
                    <span className={`diff ${getDifference(entry, 'marriedCount') === 0 ? 'neutral' : getDifference(entry, 'marriedCount') > 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'marriedCount') >= 0 ? '+' : ''}{getDifference(entry, 'marriedCount')})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">運改修合計</span>
                    <span className="stat-value">{entry.luckModTotal || 0}</span>
                    <span className={`diff ${getDifference(entry, 'luckModTotal') === 0 ? 'neutral' : getDifference(entry, 'luckModTotal') > 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'luckModTotal') >= 0 ? '+' : ''}{getDifference(entry, 'luckModTotal')})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">耐久改修合計</span>
                    <span className="stat-value">{entry.hpModTotal || 0}</span>
                    <span className={`diff ${getDifference(entry, 'hpModTotal') === 0 ? 'neutral' : getDifference(entry, 'hpModTotal') > 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'hpModTotal') >= 0 ? '+' : ''}{getDifference(entry, 'hpModTotal')})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">対潜改修合計</span>
                    <span className="stat-value">{entry.aswModTotal || 0}</span>
                    <span className={`diff ${getDifference(entry, 'aswModTotal') === 0 ? 'neutral' : getDifference(entry, 'aswModTotal') > 0 ? 'positive' : 'negative'}`}>
                      ({getDifference(entry, 'aswModTotal') >= 0 ? '+' : ''}{getDifference(entry, 'aswModTotal')})
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




      {/* 提督変更確認モーダル */}
      {showAdmiralModal && (
        <div className="modal-overlay" onClick={() => setShowAdmiralModal(false)}>
          <div className="modal-content admiral-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>提督変更</h2>
              <button onClick={() => setShowAdmiralModal(false)} className="close-button">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="warning-message">
                <span className="material-icons">warning</span>
                <p>提督を変更すると、すべての分析データが削除されます。</p>
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