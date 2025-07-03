import { useState, useEffect, useRef, useCallback } from 'react'
import { StatIcon } from './ShipStatusDisplay'

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
  onFleetDataChange?: (data: string) => void
}

const FleetAnalysisManager: React.FC<FleetAnalysisManagerProps> = ({ theme, onFleetDataChange }) => {
  const [admiralName, setAdmiralName] = useState<string>('')
  const [isFirstSetup, setIsFirstSetup] = useState<boolean>(true)
  const [tempAdmiralName, setTempAdmiralName] = useState<string>('')
  const [fleetEntries, setFleetEntries] = useState<FleetEntry[]>([])
  const [fleetData, setFleetData] = useState<string>('')

  // fleetDataが変更された時に親コンポーネントに通知
  useEffect(() => {
    if (onFleetDataChange && fleetData) {
      onFleetDataChange(fleetData)
    }
  }, [fleetData, onFleetDataChange])
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
  const [privacyMode, setPrivacyMode] = useState<boolean | null>(null)
  const [showTrainingTasksOnly, setShowTrainingTasksOnly] = useState<boolean>(false)
  const [forceUpdate, setForceUpdate] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const fleetEntriesRef = useRef<FleetEntry[]>([])
  const ITEMS_PER_PAGE = 10


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
        
        // 改修値の取得（api_kyouka配列またはst配列）
        const kyoukaArray = ship.api_kyouka || ship.st || []
        const luckMod = kyoukaArray[4] || 0  // 運改修
        const hpMod = kyoukaArray[5] || 0    // 耐久改修
        const aswMod = kyoukaArray[6] || 0   // 対潜改修
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
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    // ペーストされたデータを取得
    const pastedData = e.clipboardData.getData('text')
    
    console.log('🔧 ペースト処理開始, データ長:', pastedData.length, '提督名:', admiralName)
    
    // 少し遅延してから処理（ペーストデータがstateに反映されるのを待つ）
    setTimeout(() => {
      console.log('🔧 遅延処理実行')
      if (pastedData.trim() && admiralName.trim()) {
        console.log('🔧 条件チェック通過')
        try {
          const stats = calculateFleetStats(pastedData)
          console.log('🔧 統計計算完了:', stats)
          
          // 関数型更新で確実に状態更新（タスク引き継ぎも含む）
          setFleetEntries(prev => {
            console.log('🔧 関数型更新 - 前:', prev.length, '件')
            
            // 現在のエントリーの達成済みタスクを完了状態に変更
            const currentLatest = prev.find(entry => entry.isLatest)
            let updatedCurrentLatest = currentLatest
            
            if (currentLatest) {
              console.log('🔍 現在のエントリーのタスク数:', currentLatest.tasks.length)
              const updatedTasks = currentLatest.tasks.map(task => {
                if (!task.completed) {
                  const isTraining = isTrainingTask(task.text)
                  console.log('🔍 タスクチェック:', task.text, '育成タスク:', isTraining)
                  
                  if (isTraining) {
                    const isAchieved = isTrainingTaskAchieved(task.text)
                    console.log('🔍 達成チェック結果:', isAchieved, 'タスク:', task.text)
                    if (isAchieved) {
                      console.log('🎯 現在のエントリーで達成済みタスクを完了状態に変更:', task.text)
                      return { ...task, completed: true }
                    }
                  }
                }
                return task
              })
              
              updatedCurrentLatest = { ...currentLatest, tasks: updatedTasks }
              console.log('🔍 更新後のタスク数:', updatedTasks.length, '完了数:', updatedTasks.filter(t => t.completed).length)
            }

            // 未達成タスクを引き継ぎ（引き継ぎ前に達成チェック）
            const inheritedTasks = updatedCurrentLatest ? 
              updatedCurrentLatest.tasks
                .filter(task => !task.completed)
                .filter(task => {
                  // 育成タスクの場合は、引き継ぎ前に達成チェック
                  const isTraining = isTrainingTask(task.text)
                  
                  if (isTraining) {
                    const isAchieved = isTrainingTaskAchieved(task.text)
                    if (isAchieved) {
                      console.log('🎯 達成済みタスクを引き継ぎ対象から除外:', task.text)
                    }
                    return !isAchieved
                  }
                  return true
                })
                .map(task => {
                  const newTaskId = Date.now() + Math.random()
                  const originalTaskId = task.originalTaskId || task.id
                  
                  // 育成タスクの場合は最新の目標値でテキストを更新
                  let updatedText = task.text
                  if (isTrainingTask(task.text)) {
                    const newText = createUpdatedTaskText(task.id, originalTaskId, pastedData)
                    if (newText) {
                      updatedText = newText
                      console.log('🔧 育成タスクテキスト更新:', task.text, '→', newText)
                    }
                  }
                  
                  return {
                    ...task,
                    id: newTaskId,
                    text: updatedText,
                    inheritedFrom: updatedCurrentLatest!.id,
                    originalTaskId: originalTaskId,
                    createdAt: new Date().toISOString()
                  }
                }) : []

            console.log('🔧 引き継ぎタスク数:', inheritedTasks.length)

            // シンプルな新エントリー作成
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
            
            console.log('🔧 新エントリー作成:', newEntry.id, '統計:', {
              totalExp: newEntry.totalExp,
              shipCount: newEntry.shipCount,
              marriedCount: newEntry.marriedCount
            })

            const updated = prev.map(entry => {
              if (entry.isLatest && updatedCurrentLatest && entry.id === updatedCurrentLatest.id) {
                // 現在のエントリーを過去のエントリーにする（達成済みタスクは完了状態）
                return { ...updatedCurrentLatest, isLatest: false }
              }
              return { ...entry, isLatest: false }
            })
            const newEntries = [...updated, newEntry]
            console.log('🔧 関数型更新 - 後:', newEntries.length, '件')
            console.log('🔧 最新エントリー:', newEntries.find(e => e.isLatest)?.id)
            console.log('🔧 過去エントリー数:', newEntries.filter(e => !e.isLatest).length)
            
            // LocalStorage更新
            localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(newEntries))
            return newEntries
          })
          
          // フォームリセット
          setFleetData('')
          
          // 強制更新
          setForceUpdate(prev => prev + 1)
          
          console.log('🔧 シンプル処理完了')
          
          // 育成目標達成チェック（即座実行）
          checkTrainingGoalAchievements(pastedData)
          
          showToast(theme === 'shipgirl' ? '艦隊データ登録完了！' : '艦隊データ登録完了！', 'success')
        } catch (error) {
          showToast(`エラー: ${error}`, 'error')
        }
      } else if (!admiralName.trim()) {
        showToast(theme === 'shipgirl' ? '提督名を設定してください' : '司令官名ヲ設定シテクダサイ', 'error')
      }
    }, 100)
  }, [admiralName, theme])

  // 初期化処理
  useEffect(() => {
    const savedAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName')
    const savedPrivacyMode = localStorage.getItem('fleetAnalysisPrivacyMode')
    
    // プライバシーモードの復元
    if (savedPrivacyMode !== null) {
      const isPrivacy = savedPrivacyMode === 'true'
      setPrivacyMode(isPrivacy)
    } else {
      setPrivacyMode(false) // デフォルト値
    }
    
    if (savedAdmiralName) {
      setAdmiralName(savedAdmiralName)
      setIsFirstSetup(false)
      loadFleetEntries(savedAdmiralName)
    } else {
      setIsFirstSetup(true)
      setShowWelcome(true)
    }
  }, [])

  // プライバシーモードの永続化
  useEffect(() => {
    if (privacyMode !== null) {
      localStorage.setItem('fleetAnalysisPrivacyMode', privacyMode.toString())
    }
  }, [privacyMode])

  // LocalStorageの変更を監視してリアルタイム更新
  useEffect(() => {
    if (!admiralName) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `${admiralName}_fleetEntries` && e.newValue) {
        try {
          const updatedEntries = JSON.parse(e.newValue)
          const processedEntries = updatedEntries.map((entry: FleetEntry) => ({
            ...entry,
            luckModTotal: entry.luckModTotal ?? 0,
            hpModTotal: entry.hpModTotal ?? 0,
            aswModTotal: entry.aswModTotal ?? 0
          }))
          setFleetEntries(processedEntries)
          console.log('🔄 艦隊エントリーがリアルタイム更新されました')
        } catch (error) {
          console.error('LocalStorage更新の処理に失敗:', error)
        }
      }
    }

    // FleetComposerからのカスタムイベントを監視（即座の同期）
    const handleFleetEntriesUpdated = (event: CustomEvent) => {
      console.log('📨 FleetAnalysisManagerでカスタムイベントを受信:', event.detail)
      try {
        const { updatedEntries, updatedTaskId } = event.detail
        if (updatedEntries) {
          const processedEntries = updatedEntries.map((entry: FleetEntry) => ({
            ...entry,
            luckModTotal: entry.luckModTotal ?? 0,
            hpModTotal: entry.hpModTotal ?? 0,
            aswModTotal: entry.aswModTotal ?? 0
          }))
          setFleetEntries(processedEntries)
          console.log('🔄 艦隊エントリーがカスタムイベントで即座に更新されました, taskId:', updatedTaskId)
        }
      } catch (error) {
        console.error('カスタムイベント処理に失敗:', error)
      }
    }

    // 同一タブ内での変更を検知するために定期チェックも追加
    const checkForUpdates = () => {
      const saved = localStorage.getItem(`${admiralName}_fleetEntries`)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          const currentSerialized = JSON.stringify(fleetEntries)
          const newSerialized = JSON.stringify(parsed)
          
          if (currentSerialized !== newSerialized) {
            const processedEntries = parsed.map((entry: FleetEntry) => ({
              ...entry,
              luckModTotal: entry.luckModTotal ?? 0,
              hpModTotal: entry.hpModTotal ?? 0,
              aswModTotal: entry.aswModTotal ?? 0
            }))
            setFleetEntries(processedEntries)
            console.log('🔄 艦隊エントリーが定期チェックで更新されました')
          }
        } catch (error) {
          console.error('定期チェックの処理に失敗:', error)
        }
      }
    }

    console.log('🎧 FleetAnalysisManagerでイベントリスナーを登録, admiral:', admiralName)
    window.addEventListener('fleetEntriesUpdated', handleFleetEntriesUpdated as EventListener)

    return () => {
      window.removeEventListener('fleetEntriesUpdated', handleFleetEntriesUpdated as EventListener)
    }
  }, [admiralName])

  // fleetEntriesの変更を監視
  useEffect(() => {
    console.log('🔄 fleetEntries状態更新:', fleetEntries.length, '件')
    
    // 育成リストとタスクの同期チェック
    if (fleetEntries.length > 0 && admiralName) {
      syncTrainingListAndTasks()
    }
  }, [fleetEntries, admiralName])

  // 艦隊エントリーの読み込み
  const loadFleetEntries = (admiral: string) => {
    console.log('📥 loadFleetEntries呼び出し, admiral:', admiral)
    const saved = localStorage.getItem(`${admiral}_fleetEntries`)
    console.log('📥 LocalStorageから読み込み:', saved ? `${saved.length}文字` : 'なし')
    console.log('📥 LocalStorageの実際の内容:', saved)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log('📥 パースしたエントリー数:', parsed.length)
        
        // 空の配列の場合は現在の状態をチェック
        if (parsed.length === 0 && fleetEntries.length > 0) {
          console.log('📥 空データのため読み込みスキップ（現在:', fleetEntries.length, '件）')
          return
        }
        
        // 後方互換性のため、改修合計値が未定義の場合は0に設定
        const updatedEntries = parsed.map((entry: FleetEntry) => ({
          ...entry,
          luckModTotal: entry.luckModTotal ?? 0,
          hpModTotal: entry.hpModTotal ?? 0,
          aswModTotal: entry.aswModTotal ?? 0
        }))
        console.log('📥 setFleetEntriesで設定:', updatedEntries.length, '件')
        setFleetEntries(updatedEntries)
      } catch (error) {
        console.error('Failed to load fleet entries:', error)
        console.log('📥 破損データを削除します')
        localStorage.removeItem(`${admiral}_fleetEntries`)
        console.log('📥 エラーのため空配列を設定')
        setFleetEntries([])
      }
    } else {
      console.log('📥 保存データなし')
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
      showToast(theme === 'shipgirl' ? '提督名は2文字以上20文字以下で入力してください' : '司令官名ハ二文字以上二十文字以下デ入力シテクダサイ', 'error')
      return
    }

    setAdmiralName(name)
    localStorage.setItem('fleetAnalysisAdmiralName', name)
    setIsFirstSetup(false)
    setShowWelcome(false)
    setShowBackup(false) // 確実にバックアップモーダルを閉じる
    showToast(theme === 'shipgirl' ? `提督「${name}」として登録完了！` : `司令官「${name}」トシテ登録完了！`, 'success')
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
      showToast(theme === 'shipgirl' ? 'すべてのデータが削除されました' : '全テノデータガ削除サレマシタ', 'success')
    }
  }

  // 提督名変更モーダル処理
  const handleAdmiralModalConfirm = () => {
    setShowAdmiralModal(true)
  }



  // エントリー削除
  const deleteEntry = (entryId: number) => {
    if (confirm(theme === 'shipgirl' ? 'このエントリーを削除しますか？' : 'コノエントリーヲ削除シマスカスカ？')) {
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
      showToast(theme === 'shipgirl' ? 'エントリーを削除しました' : 'エントリーヲ削除シマシタ', 'success')
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
          showToast(theme === 'shipgirl' ? 'すべてのタスクが完了しました！' : '全テノ任務が完了シタ！', 'success')
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
      showToast(theme === 'shipgirl' ? 'タスク内容を入力してください' : '任務内容ヲ入力シテクダサイ', 'error')
      return
    }

    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) {
      showToast(theme === 'shipgirl' ? '最新エントリーが見つかりません' : '最新エントリーが見つからない', 'error')
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
    showToast(theme === 'shipgirl' ? 'タスクを追加しました' : '任務ヲ追加シマシタ', 'success')
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
        showToast(theme === 'shipgirl' ? '有効なURLを入力してください' : '有効なURLヲ入力シテクダサイ', 'error')
        return
      }
    }

    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) {
      showToast(theme === 'shipgirl' ? '最新エントリーが見つかりません' : '最新エントリーが見つからない', 'error')
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
      showToast(theme === 'shipgirl' ? 'URLを更新しました' : 'URLヲ更新シマシタ', 'success')
    } else {
      showToast(theme === 'shipgirl' ? 'URLを削除しました' : 'URLヲ削除シマシタ', 'success')
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
  const getTotalEntries = () => {
    console.log('📊 getTotalEntries呼び出し:', fleetEntries.length, 'entries:', fleetEntries.map(e => e.id))
    return fleetEntries.length
  }
  const getTotalCompletedTasks = () => fleetEntries.reduce((total, entry) => 
    total + entry.tasks.filter(task => task.completed).length, 0
  )
  const getPendingTasks = () => {
    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) return 0
    const filteredTasks = filterTasksForDisplay(latestEntry.tasks)
    return filteredTasks.filter(task => !task.completed).length
  }

  // 育成候補リストのmainTaskIdを取得
  const getTrainingCandidatesMainTaskIds = (): number[] => {
    try {
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (!stored) return []
      
      const candidates = JSON.parse(stored)
      return candidates
        .filter((candidate: any) => candidate.mainTaskId)
        .map((candidate: any) => candidate.mainTaskId)
    } catch (error) {
      console.error('Training candidates data load failed:', error)
      return []
    }
  }

  // 育成リストとタスクの整合性をチェックし、修正する
  const syncTrainingListAndTasks = () => {
    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) return

    const trainingTaskIds = getTrainingCandidatesMainTaskIds()
    console.log('🔄 育成リスト同期チェック - 育成ID:', trainingTaskIds)

    // 育成リストにないタスクを削除
    const syncedTasks = latestEntry.tasks.filter(task => {
      const isTrainingTask = task.text.includes('を育成する')
      if (isTrainingTask) {
        const hasTrainingCandidate = trainingTaskIds.includes(task.id) || 
                                   (task.originalTaskId && trainingTaskIds.includes(task.originalTaskId))
        if (!hasTrainingCandidate) {
          console.log('🗑️ 育成リストにないタスクを削除:', task.text)
          return false
        }
      }
      return true
    })

    // タスクが変更された場合、更新
    if (syncedTasks.length !== latestEntry.tasks.length) {
      const updatedEntries = fleetEntries.map(entry => 
        entry.isLatest ? { ...entry, tasks: syncedTasks } : entry
      )
      setFleetEntries(updatedEntries)
      localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
      console.log('🔄 育成リストとタスクの同期完了')
    }
  }

  // 育成候補タスクのフィルタリング
  const filterTasksForDisplay = (tasks: Task[]): Task[] => {
    if (!showTrainingTasksOnly) return tasks
    
    const trainingTaskIds = getTrainingCandidatesMainTaskIds()
    return tasks.filter(task => trainingTaskIds.includes(task.id))
  }

  // 育成タスクかどうかの判定（シンプル版）
  const isTrainingTask = (taskText: string): boolean => {
    return taskText.includes('を育成する')
  }

  // 育成タスクが達成されているかチェック（シンプル版）
  const isTrainingTaskAchieved = (taskText: string): boolean => {
    // 育成候補リストが空の場合、目標値未設定とみなして達成済みとする
    const trainingTaskIds = getTrainingCandidatesMainTaskIds()
    if (trainingTaskIds.length === 0 && taskText.includes('を育成する')) {
      console.log('🎯 育成候補リストが空のため達成済みと判定:', taskText)
      return true
    }
    return false
  }

  // 育成タスクの艦娘shipIdを取得（最新エントリーのタスクのみ対象）
  const getTrainingTaskShipId = (taskId: number, originalTaskId?: number, entryId?: number): number | null => {
    try {
      // 最新エントリーのタスクの場合のみ育成タスクとして扱う
      const latestEntry = fleetEntries.find(entry => entry.isLatest)
      const isFromLatestEntry = !entryId || (latestEntry && latestEntry.id === entryId)
      
      if (!isFromLatestEntry) {
        return null // 過去のエントリーのタスクは育成タスクとして扱わない
      }
      
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (!stored) return null
      
      const candidates = JSON.parse(stored)
      // まず現在のtaskIdで検索、見つからなければoriginalTaskIdで検索
      let candidate = candidates.find((c: any) => c.mainTaskId === taskId)
      if (!candidate && originalTaskId) {
        candidate = candidates.find((c: any) => c.mainTaskId === originalTaskId)
      }
      return candidate ? candidate.shipId : null
    } catch (error) {
      console.error('Training task ship ID retrieval failed:', error)
      return null
    }
  }

  // 育成候補の情報を取得
  const getTrainingCandidate = (taskId: number, originalTaskId?: number): any | null => {
    try {
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (!stored) return null
      
      const candidates = JSON.parse(stored)
      // まず現在のtaskIdで検索、見つからなければoriginalTaskIdで検索
      let candidate = candidates.find((c: any) => c.mainTaskId === taskId)
      if (!candidate && originalTaskId) {
        candidate = candidates.find((c: any) => c.mainTaskId === originalTaskId)
      }
      return candidate || null
    } catch (error) {
      console.error('Training candidate retrieval failed:', error)
      return null
    }
  }

  // 最新の目標値でタスクテキストを生成（FleetComposerのcreateMainTaskTextと同等）
  const createUpdatedTaskText = (taskId: number, originalTaskId?: number, currentFleetData?: string): string => {
    try {
      const candidate = getTrainingCandidate(taskId, originalTaskId)
      if (!candidate) return '' // 育成候補が見つからない場合は元のテキストを保持
      
      // 現在の艦船データを取得
      let currentStats = null
      if (currentFleetData) {
        try {
          const data = JSON.parse(currentFleetData)
          const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
          const ship = ships.find((s: any) => s.api_id === candidate.instanceId || s.id === candidate.instanceId)
          if (ship) {
            currentStats = {
              level: ship.api_lv || ship.lv || 0,
              hp: ship.api_maxhp || ship.maxhp || 0,
              asw: ship.api_taisen?.[0] || ship.taisen?.[0] || 0,
              luck: ship.api_lucky?.[0] || ship.lucky?.[0] || 0
            }
          }
        } catch (error) {
          console.error('Failed to parse fleet data for task text update:', error)
        }
      }
      
      const targets: string[] = []
      
      if (candidate.targetLevel && (!currentStats || candidate.targetLevel > currentStats.level)) {
        if (currentStats) {
          targets.push(`Lv${currentStats.level}→${candidate.targetLevel}`)
        } else {
          targets.push(`Lv目標${candidate.targetLevel}`)
        }
      }
      if (candidate.targetHp && (!currentStats || candidate.targetHp > currentStats.hp)) {
        if (currentStats) {
          targets.push(`耐久${currentStats.hp}→${candidate.targetHp}`)
        } else {
          targets.push(`耐久目標${candidate.targetHp}`)
        }
      }
      if (candidate.targetAsw && (!currentStats || candidate.targetAsw > currentStats.asw)) {
        if (currentStats) {
          targets.push(`対潜${currentStats.asw}→${candidate.targetAsw}`)
        } else {
          targets.push(`対潜目標${candidate.targetAsw}`)
        }
      }
      if (candidate.targetLuck && (!currentStats || candidate.targetLuck > currentStats.luck)) {
        if (currentStats) {
          targets.push(`運${currentStats.luck}→${candidate.targetLuck}`)
        } else {
          targets.push(`運目標${candidate.targetLuck}`)
        }
      }
      
      if (targets.length === 0) {
        return `${candidate.name}を育成する`
      }
      
      return `${candidate.name}を育成する（${targets.join('、')}）`
    } catch (error) {
      console.error('Task text generation failed:', error)
      return '' // エラーの場合は元のテキストを保持
    }
  }

  // 育成目標達成チェック機能
  const checkTrainingGoalAchievements = (jsonData: string) => {
    try {
      // 育成候補を取得
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (!stored) return
      
      const trainingCandidates = JSON.parse(stored)
      if (trainingCandidates.length === 0) return
      
      // 艦隊データをパース
      const data = JSON.parse(jsonData)
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      let achievedCount = 0
      const candidatesToRemove: number[] = []
      
      trainingCandidates.forEach((candidate: any) => {
        const ship = ships.find((s: any) => s.api_id === candidate.instanceId || s.id === candidate.instanceId)
        if (!ship || !candidate.mainTaskId) return
        
        // 現在のステータスを取得
        const level = ship.api_lv || ship.lv || 0
        const hp = ship.api_maxhp || ship.maxhp || 0
        const asw = ship.api_taisen?.[0] || ship.taisen?.[0] || 0
        const luck = ship.api_lucky?.[0] || ship.lucky?.[0] || 0
        
        // 目標達成チェック
        const levelAchieved = !candidate.targetLevel || level >= candidate.targetLevel
        const hpAchieved = !candidate.targetHp || hp >= candidate.targetHp  
        const aswAchieved = !candidate.targetAsw || asw >= candidate.targetAsw
        const luckAchieved = !candidate.targetLuck || luck >= candidate.targetLuck
        
        const allTargetsAchieved = levelAchieved && hpAchieved && aswAchieved && luckAchieved
        
        if (allTargetsAchieved) {
          // タスクを完了状態に更新（引き継いだタスクも含む）
          markTrainingTaskAsCompleted(candidate.mainTaskId)
          achievedCount++
          // 育成候補から削除対象に追加
          candidatesToRemove.push(candidate.id)
        }
      })
      
      // 達成した候補を育成候補リストから削除
      if (candidatesToRemove.length > 0) {
        const updatedCandidates = trainingCandidates.filter((candidate: any) => 
          !candidatesToRemove.includes(candidate.id)
        )
        localStorage.setItem('fleetComposer_trainingCandidates', JSON.stringify(updatedCandidates))
      }
      
      // 達成があった場合は通知
      if (achievedCount > 0) {
        showToast(theme === 'shipgirl' ? `${achievedCount}件の育成目標を達成しました！` : `${achievedCount}件ノ育成目標ヲ達成シマシタ！`, 'success')
      }
      
    } catch (error) {
      console.error('Training goal achievement check failed:', error)
    }
  }

  // 育成タスクを完了にマーク（引き継いだタスクも含む）
  const markTrainingTaskAsCompleted = (taskId: number) => {
    const updatedEntries = fleetEntries.map(entry => {
      const updatedTasks = entry.tasks.map(task => {
        // メインタスクの完了
        if (task.id === taskId) {
          return { ...task, completed: true }
        }
        // 引き継いだタスクの完了（originalTaskIdが一致するもの）
        else if (task.originalTaskId === taskId) {
          return { ...task, completed: true }
        }
        return task
      })
      return { ...entry, tasks: updatedTasks }
    })
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
  }

  // 差分計算
  const getDifference = (current: FleetEntry, field: keyof Pick<FleetEntry, 'totalExp' | 'shipCount' | 'marriedCount' | 'luckModTotal' | 'hpModTotal' | 'aswModTotal'>) => {
    const currentIndex = fleetEntries.findIndex(e => e.id === current.id)
    if (currentIndex <= 0) return 0
    
    const previous = fleetEntries[currentIndex - 1]
    return (current[field] || 0) - (previous[field] || 0)
  }

  // プライバシーモード用の値マスク関数
  const maskValue = (value: number) => {
    if (privacyMode !== true) return value.toLocaleString()
    return '*'.repeat(Math.min(value.toString().length, 8))
  }

  // プライバシーモード用の差分マスク関数
  const maskDiffValue = (value: number) => {
    if (privacyMode !== true) return value.toLocaleString()
    const sign = value >= 0 ? '+' : ''
    return sign + '*'.repeat(Math.min(Math.abs(value).toString().length, 6))
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



  // タスク進捗計算（フィルタリング対応）
  const getTaskProgress = (tasks: Task[]) => {
    const filteredTasks = filterTasksForDisplay(tasks)
    if (filteredTasks.length === 0) return { completed: 0, total: 0, percentage: 0 }
    const completed = filteredTasks.filter(t => t.completed).length
    const total = filteredTasks.length
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
        
        showToast(theme === 'shipgirl' ? 'バックアップをインポートしました' : 'データを収集シマシタ', 'success')
      } catch {
        showToast(theme === 'shipgirl' ? 'バックアップファイルの読み込みに失敗しました' : 'データファイルの読み込みに失敗シマシタ', 'error')
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
                <h2>{theme === 'shipgirl' ? 'ようこそ！' : '深海侵入許可！'}</h2>
                <div className="welcome-text">
                  <p>{theme === 'shipgirl' ? 'このアプリは艦隊データから艦隊の成長を管理します' : 'コノシステムハ艦隊データカラ戦力増強ヲ管理シマス'}</p>
                  <p>{theme === 'shipgirl' ? 'より良い艦これライフを！' : 'サラナル戦略的勝利ヲ！'}</p>
                </div>
                
                <div className="privacy-notice">
                  <h3><span className="material-icons">lock</span> {theme === 'shipgirl' ? 'プライバシー保護について' : '機密保護規定ニツイテ'}</h3>
                  <p>{theme === 'shipgirl' ? 'このアプリはローカルストレージのみを使用し、外部へのデータ送信は行いません。' : 'コノシステムハローカル領域ノミヲ使用シ、外部ヘノ情報送信ハ行ワナイ。'}</p>
                  <p>{theme === 'shipgirl' ? 'すべてのデータはお使いのブラウザ内にのみ保存されます。' : '全テノ情報ハ使用者ノブラウザ内ニノミ保存サレマス。'}</p>
                </div>
              </div>
            )}

            <div className="admiral-setup">
              <h3>{theme === 'shipgirl' ? '提督名を設定してください' : '司令官名ヲ設定シテクダサイ'}</h3>
              <div className="input-group">
                <input
                  type="text"
                  value={tempAdmiralName}
                  onChange={(e) => setTempAdmiralName(e.target.value)}
                  placeholder={theme === 'shipgirl' ? '提督名を入力（2-20文字）' : '司令官名ヲ入力（二文字以上二十文字以下）'}
                  className="admiral-input"
                  maxLength={20}
                />
                <button onClick={setupAdmiral} className="setup-button">
                  <span className="material-icons">rocket_launch</span> {theme === 'shipgirl' ? '開始する' : '開始スルスル'}
                </button>
              </div>
              <p className="input-hint">
                {theme === 'shipgirl' ? '提督名は2文字以上20文字以下で入力してください' : '司令官名ハ二文字以上二十文字以下デ入力シテクダサイ'}
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
              <h3>{theme === 'shipgirl' ? 'バックアップ' : 'バックアップ'}</h3>
              <button onClick={() => setShowBackup(false)} className="close-button">
                ×
              </button>
            </div>
            <div className="backup-controls">
              <button onClick={exportBackup} className="backup-btn">
                {theme === 'shipgirl' ? 'エクスポート' : 'エクスポート'}
              </button>
              <label className="backup-btn import-btn">
                {theme === 'shipgirl' ? 'インポート' : 'インポート'}
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
                {theme === 'shipgirl' ? '提督変更' : '提督変更'}
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
              <h2>{theme === 'shipgirl' ? '分析推移データ' : '分析推移データ'}</h2>
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
                  {theme === 'shipgirl' ? '経験値' : '経験値'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'ships' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('ships')}
                >
                  <span className="material-icons">directions_boat</span>
                  {theme === 'shipgirl' ? '艦数' : '艦数'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'married' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('married')}
                >
                  <span className="material-icons">favorite</span>
                  {theme === 'shipgirl' ? 'ケッコン艦' : '最大強化艦'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'luck' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('luck')}
                >
                  <StatIcon icon="luck" className="graph-tab-icon" />
                  {theme === 'shipgirl' ? '運改修' : '運改修'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'hp' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('hp')}
                >
                  <StatIcon icon="hp" className="graph-tab-icon" />
                  {theme === 'shipgirl' ? '耐久改修' : '耐久改修'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'asw' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('asw')}
                >
                  <StatIcon icon="asw" className="graph-tab-icon" />
                  {theme === 'shipgirl' ? '対潜改修' : '対潜改修'}
                </button>
              </div>

              {/* 個別グラフ表示 */}
              {(() => {
                const singleGraphData = generateSingleGraphData(activeGraphTab)
                if (!singleGraphData) return null
                
                return (
                  <div className="modal-chart-section">
                    <h3>{singleGraphData.label}{theme === 'shipgirl' ? 'の推移' : 'ノ推移'}</h3>
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
                              {privacyMode === true ? '*'.repeat(4) : (activeGraphTab === 'exp' ? point.value.toLocaleString() : point.value)}
                            </text>
                          </g>
                        ))}
                        
                        {/* 軸ラベル */}
                        <text x="350" y="390" fontSize="14" fill="#e1f5fe" textAnchor="middle">
                          {theme === 'shipgirl' ? '記録時系列' : '記録時系列'}
                        </text>
                        <text x="20" y="30" fontSize="14" fill="#e1f5fe" textAnchor="middle">
                          {singleGraphData.label}
                        </text>
                      </svg>
                    </div>
                    
                    {/* 統計情報 */}
                    <div className="graph-stats">
                      <div className="stat-item">
                        <span className="stat-title">{theme === 'shipgirl' ? '最大値' : '最大値'}</span>
                        <span className="stat-number">
                          {privacyMode === true ? maskValue(singleGraphData.maxValue) : (activeGraphTab === 'exp' ? singleGraphData.maxValue.toLocaleString() : singleGraphData.maxValue)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-title">{theme === 'shipgirl' ? '最小値' : '最小値'}</span>
                        <span className="stat-number">
                          {privacyMode === true ? maskValue(singleGraphData.minValue) : (activeGraphTab === 'exp' ? singleGraphData.minValue.toLocaleString() : singleGraphData.minValue)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-title">{theme === 'shipgirl' ? '変動幅' : '変動幅'}</span>
                        <span className="stat-number">
                          {privacyMode === true ? maskValue(singleGraphData.maxValue - singleGraphData.minValue) : (activeGraphTab === 'exp' ? (singleGraphData.maxValue - singleGraphData.minValue).toLocaleString() : (singleGraphData.maxValue - singleGraphData.minValue))}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })()}

              {/* データテーブル */}
              <div className="modal-table-section">
                <h3>{theme === 'shipgirl' ? 'データ一覧' : '情報一覧'}</h3>
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
                              {maskValue(entry.totalExp)}
                              {prevEntry && (
                                <span className={`table-diff ${entry.totalExp - prevEntry.totalExp === 0 ? 'neutral' : entry.totalExp - prevEntry.totalExp > 0 ? 'positive' : 'negative'}`}>
                                  {maskDiffValue(entry.totalExp - prevEntry.totalExp)}
                                </span>
                              )}
                            </td>
                            <td>
                              {maskValue(entry.shipCount)}
                              {prevEntry && (
                                <span className={`table-diff ${entry.shipCount - prevEntry.shipCount === 0 ? 'neutral' : entry.shipCount - prevEntry.shipCount > 0 ? 'positive' : 'negative'}`}>
                                  {maskDiffValue(entry.shipCount - prevEntry.shipCount)}
                                </span>
                              )}
                            </td>
                            <td>
                              {maskValue(entry.marriedCount)}
                              {prevEntry && (
                                <span className={`table-diff ${entry.marriedCount - prevEntry.marriedCount === 0 ? 'neutral' : entry.marriedCount - prevEntry.marriedCount > 0 ? 'positive' : 'negative'}`}>
                                  {maskDiffValue(entry.marriedCount - prevEntry.marriedCount)}
                                </span>
                              )}
                            </td>
                            <td>
                              {maskValue(entry.luckModTotal || 0)}
                              {prevEntry && (
                                <span className={`table-diff ${(entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0) === 0 ? 'neutral' : (entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0) > 0 ? 'positive' : 'negative'}`}>
                                  {maskDiffValue((entry.luckModTotal || 0) - (prevEntry.luckModTotal || 0))}
                                </span>
                              )}
                            </td>
                            <td>
                              {maskValue(entry.hpModTotal || 0)}
                              {prevEntry && (
                                <span className={`table-diff ${(entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0) === 0 ? 'neutral' : (entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0) > 0 ? 'positive' : 'negative'}`}>
                                  {maskDiffValue((entry.hpModTotal || 0) - (prevEntry.hpModTotal || 0))}
                                </span>
                              )}
                            </td>
                            <td>
                              {maskValue(entry.aswModTotal || 0)}
                              {prevEntry && (
                                <span className={`table-diff ${(entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0) === 0 ? 'neutral' : (entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0) > 0 ? 'positive' : 'negative'}`}>
                                  {maskDiffValue((entry.aswModTotal || 0) - (prevEntry.aswModTotal || 0))}
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
        <h3>{theme === 'shipgirl' ? '最新の艦隊を反映する' : '最新ノ艦隊ヲ反映シテクダサイ'}</h3>
        <div className="input-group">
          <input
            type="text"
            value={fleetData}
            onChange={(e) => setFleetData(e.target.value)}
            onPaste={handlePaste}
            placeholder={theme === 'shipgirl' ? '艦隊のJSONデータをここに貼り付けてください...' : '艦隊ノJSONデータヲココニ貼り付ケテクダサイ...'}
            className="fleet-data-input"
          />
        </div>
      </div>

      {/* ダッシュボードヘッダー */}
      {latestEntry && (
        <div className="dashboard-header">
          <h2><span className="material-icons">anchor</span> {admiralName} のダッシュボード</h2>
          
          {/* アクションボタン */}
          <div className="dashboard-actions">
            <button 
              onClick={() => setShowTrainingTasksOnly(!showTrainingTasksOnly)} 
              className={`action-button training-filter-button ${showTrainingTasksOnly ? 'active' : ''}`}
              title={theme === 'shipgirl' ? (showTrainingTasksOnly ? '全タスク表示' : '育成タスクのみ表示') : (showTrainingTasksOnly ? '全任務表示' : '育成任務ノミ表示')}
            >
              <span className="material-symbols-outlined">{showTrainingTasksOnly ? 'filter_list_off' : 'filter_list'}</span>
            </button>
            <button 
              onClick={() => setPrivacyMode(!privacyMode)} 
              className={`action-button privacy-button ${privacyMode === true ? 'active' : ''}`}
              title={theme === 'shipgirl' ? (privacyMode === true ? 'プライバシーモード解除' : 'プライバシーモード') : (privacyMode === true ? 'プライバシーモード解除' : 'プライバシーモード')}
            >
              <span className="material-symbols-outlined">{privacyMode === true ? 'visibility' : 'visibility_off'}</span>
            </button>
            {fleetEntries.length >= 2 && (
              <button 
                onClick={() => setShowGraphModal(true)} 
                className="action-button chart-button"
                title={theme === 'shipgirl' ? '分析推移表示' : '分析推移表示'}
              >
                <span className="material-symbols-outlined">analytics</span>
              </button>
            )}
            <button 
              onClick={() => setShowBackup(!showBackup)} 
              className="action-button backup-button"
              title={theme === 'shipgirl' ? 'バックアップ' : 'バックアップ'}
            >
              <span className="material-symbols-outlined">settings</span>
            </button>
          </div>
        </div>
      )}
      
      {/* 統計概要カード */}
      {latestEntry && (
        <div className="stats-overview">
              <div className="overview-item">
                <span className="material-icons overview-icon">trending_up</span>
                <div className="overview-text">
                  <span className="overview-label">{theme === 'shipgirl' ? '総記録数' : '総記録数'}</span>
                  <span className="overview-value" key={`${fleetEntries.length}-${forceUpdate}`}>{privacyMode === true ? '*'.repeat(getTotalEntries().toString().length) : getTotalEntries()}</span>
                </div>
              </div>
              <div className="overview-item">
                <span className="material-icons overview-icon">task_alt</span>
                <div className="overview-text">
                  <span className="overview-label">{theme === 'shipgirl' ? '累計達成タスク' : '累計達成タスク'}</span>
                  <span className="overview-value">{privacyMode === true ? '*'.repeat(getTotalCompletedTasks().toString().length) : getTotalCompletedTasks()}</span>
                </div>
              </div>
              <div className="overview-item">
                <span className="material-icons overview-icon">assignment</span>
                <div className="overview-text">
                  <span className="overview-label">{theme === 'shipgirl' ? '未達成タスク' : '未達成タスク'}</span>
                  <span className="overview-value">{privacyMode === true ? '*'.repeat(getPendingTasks().toString().length) : getPendingTasks()}</span>
                </div>
              </div>
        </div>
      )}

      {/* 最新の艦隊状況カード */}
      {latestEntry && (
        <div className="latest-entry-section">
              <div className="entry-header">
                <div className="entry-info">
                  <h3 className="section-title">{theme === 'shipgirl' ? '最新の艦隊状況' : '最新ノ艦隊状況'}</h3>
                  <div className="entry-meta">
                    <span className="entry-date">{new Date(latestEntry.createdAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span className="latest-badge">{theme === 'shipgirl' ? '最新' : '最新'}</span>
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
                                  showToast(theme === 'shipgirl' ? 'URLを登録しました' : 'URLヲ登録シマシタ', 'success')
                                }
                              } catch {
                                // 無効なURLの場合は何もしない（通常の入力として扱う）
                              }
                            }
                          }, 100)
                        }}
                        placeholder={theme === 'shipgirl' ? 'URL貼り付け' : 'URL貼り付ケ'}
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
                      <span className="material-icons">link</span> {theme === 'shipgirl' ? '開く' : '開ク'}
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
              <div className="entry-stats">
                <div className="stat-badge">
                  <span className="stat-label">現在経験値</span>
                  <span className="stat-value">{maskValue(latestEntry.totalExp)}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.totalExp - prevEntry.totalExp
                      return (
                        <span className={`diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                          ({maskDiffValue(diff)})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
                <div className="stat-badge">
                  <span className="stat-label">保有艦数</span>
                  <span className="stat-value">{maskValue(latestEntry.shipCount)}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.shipCount - prevEntry.shipCount
                      return (
                        <span className={`diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                          ({maskDiffValue(diff)})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
                <div className="stat-badge">
                  <span className="stat-label">ケッコン艦</span>
                  <span className="stat-value">{maskValue(latestEntry.marriedCount)}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.marriedCount - prevEntry.marriedCount
                      return (
                        <span className={`diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                          ({maskDiffValue(diff)})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
                <div className="stat-badge">
                  <span className="stat-label">運改修合計</span>
                  <span className="stat-value">{maskValue(latestEntry.luckModTotal)}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.luckModTotal - (prevEntry.luckModTotal || 0)
                      return (
                        <span className={`diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                          ({maskDiffValue(diff)})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
                <div className="stat-badge">
                  <span className="stat-label">耐久改修合計</span>
                  <span className="stat-value">{maskValue(latestEntry.hpModTotal)}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.hpModTotal - (prevEntry.hpModTotal || 0)
                      return (
                        <span className={`diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                          ({maskDiffValue(diff)})
                        </span>
                      )
                    }
                    return null
                  })()}
                </div>
                <div className="stat-badge">
                  <span className="stat-label">対潜改修合計</span>
                  <span className="stat-value">{maskValue(latestEntry.aswModTotal)}</span>
                  {(() => {
                    const latestIndex = fleetEntries.findIndex(entry => entry.id === latestEntry.id)
                    if (latestIndex > 0) {
                      const prevEntry = fleetEntries[latestIndex - 1]
                      const diff = latestEntry.aswModTotal - (prevEntry.aswModTotal || 0)
                      return (
                        <span className={`diff ${diff === 0 ? 'neutral' : diff > 0 ? 'positive' : 'negative'}`}>
                          ({maskDiffValue(diff)})
                        </span>
                      )
                    }
                    return null
                  })()}
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
                        placeholder={theme === 'shipgirl' ? 'URLを入力してください...' : 'URLヲ入力シテクダサイ...'}
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
                        title={theme === 'shipgirl' ? 'URLを編集' : 'URLヲ編集'}
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
                    <h4>{theme === 'shipgirl' ? 'タスク進捗' : '任務進捗'} ({getTaskProgress(latestEntry.tasks).completed}/{getTaskProgress(latestEntry.tasks).total})</h4>
                    <div className="progress-bar">
                      <div 
                        className={`progress-fill ${getTaskProgress(latestEntry.tasks).percentage === 100 ? 'completed' : ''}`}
                        style={{ width: `${getTaskProgress(latestEntry.tasks).percentage}%` }}
                      ></div>
                      <span className="progress-text">{getTaskProgress(latestEntry.tasks).percentage}%</span>
                    </div>
                  </div>
                  <div className="tasks-list">
                    {filterTasksForDisplay(latestEntry.tasks).map(task => {
                      const isTraining = isTrainingTask(task.text)
                      const shipId = isTraining ? getTrainingTaskShipId(task.id, task.originalTaskId, latestEntry.id) : null
                      return (
                        <div 
                          key={task.id} 
                          className={`task-item ${isTraining ? 'training-task' : ''}`}
                        >
                          {isTraining && shipId && (
                            <div className="task-banner">
                              <img 
                                src={`/FleetAnalystManager/images/banner/${shipId}.png`}
                                alt=""
                                className="task-banner-image"
                              />
                            </div>
                          )}
                          <div className="task-content">
                            {isTraining ? (
                              <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                            ) : (
                              <label className="task-checkbox">
                                <input
                                  type="checkbox"
                                  checked={task.completed}
                                  onChange={() => toggleTask(latestEntry.id, task.id)}
                                />
                                <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                              </label>
                            )}
                            {!isTraining && (
                              <button 
                                onClick={() => deleteTask(latestEntry.id, task.id)}
                                className="delete-task-btn"
                              >
                                <span className="material-icons">close</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}
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
                  placeholder={theme === 'shipgirl' ? 'タスク内容を入力してください...' : '任務内容ヲ入力シテクダサイ...'}
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
                  {theme === 'shipgirl' ? '追加' : '追加'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 過去エントリー */}
      {pastEntries.length > 0 && (
        <div className="history-section" style={{marginTop: '5rem'}}>
          <h2 style={{textAlign: 'left'}}>{theme === 'shipgirl' ? '分析履歴' : '分析履歴'}</h2>
          
          {/* ページング */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="page-btn"
              >
                {theme === 'shipgirl' ? '← 前' : '← 前'}
              </button>
              <span className="page-info">
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="page-btn"
              >
                {theme === 'shipgirl' ? '次 →' : '次 →'}
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
                        <span className="material-icons">link</span> {theme === 'shipgirl' ? '開く' : '開ク'}
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
                    <span className="stat-value">{maskValue(entry.totalExp)}</span>
                    <span className={`diff ${getDifference(entry, 'totalExp') === 0 ? 'neutral' : getDifference(entry, 'totalExp') > 0 ? 'positive' : 'negative'}`}>
                      ({maskDiffValue(getDifference(entry, 'totalExp'))})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">保有艦数</span>
                    <span className="stat-value">{maskValue(entry.shipCount)}</span>
                    <span className={`diff ${getDifference(entry, 'shipCount') === 0 ? 'neutral' : getDifference(entry, 'shipCount') > 0 ? 'positive' : 'negative'}`}>
                      ({maskDiffValue(getDifference(entry, 'shipCount'))})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">ケッコン艦</span>
                    <span className="stat-value">{maskValue(entry.marriedCount)}</span>
                    <span className={`diff ${getDifference(entry, 'marriedCount') === 0 ? 'neutral' : getDifference(entry, 'marriedCount') > 0 ? 'positive' : 'negative'}`}>
                      ({maskDiffValue(getDifference(entry, 'marriedCount'))})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">運改修合計</span>
                    <span className="stat-value">{maskValue(entry.luckModTotal || 0)}</span>
                    <span className={`diff ${getDifference(entry, 'luckModTotal') === 0 ? 'neutral' : getDifference(entry, 'luckModTotal') > 0 ? 'positive' : 'negative'}`}>
                      ({maskDiffValue(getDifference(entry, 'luckModTotal'))})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">耐久改修合計</span>
                    <span className="stat-value">{maskValue(entry.hpModTotal || 0)}</span>
                    <span className={`diff ${getDifference(entry, 'hpModTotal') === 0 ? 'neutral' : getDifference(entry, 'hpModTotal') > 0 ? 'positive' : 'negative'}`}>
                      ({maskDiffValue(getDifference(entry, 'hpModTotal'))})
                    </span>
                  </div>
                  <div className="stat-badge">
                    <span className="stat-label">対潜改修合計</span>
                    <span className="stat-value">{maskValue(entry.aswModTotal || 0)}</span>
                    <span className={`diff ${getDifference(entry, 'aswModTotal') === 0 ? 'neutral' : getDifference(entry, 'aswModTotal') > 0 ? 'positive' : 'negative'}`}>
                      ({maskDiffValue(getDifference(entry, 'aswModTotal'))})
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
                      {filterTasksForDisplay(entry.tasks).map(task => {
                        const isTraining = isTrainingTask(task.text)
                        const shipId = isTraining ? getTrainingTaskShipId(task.id, task.originalTaskId, entry.id) : null
                        return (
                          <div 
                            key={task.id} 
                            className={`task-item ${isTraining ? 'training-task' : ''}`}
                          >
                            {isTraining && shipId && (
                              <div className="task-banner">
                                <img 
                                  src={`/FleetAnalystManager/images/banner/${shipId}.png`}
                                  alt=""
                                  className="task-banner-image"
                                />
                              </div>
                            )}
                            <div className="task-content">
                              {isTraining ? (
                                <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                              ) : (
                                <label className="task-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(entry.id, task.id)}
                                    disabled={true} // 過去エントリーは編集不可
                                  />
                                  <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                                </label>
                              )}
                            </div>
                          </div>
                        )
                      })}
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
              <h2>{theme === 'shipgirl' ? '提督変更' : '司令官変更'}</h2>
              <button onClick={() => setShowAdmiralModal(false)} className="close-button">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="warning-message">
                <span className="material-icons">warning</span>
                <p>{theme === 'shipgirl' ? '提督を変更すると、すべての分析データが削除されます。' : '司令官ヲ変更スルト、全テノ分析データガ削除サレル。'}</p>
              </div>
              
              <div className="current-admiral">
                <label>{theme === 'shipgirl' ? '現在の提督名:' : '現在ノ司令官名:'}</label>
                <span className="current-name">{admiralName}</span>
              </div>
              
              <div className="instruction-message">
                <span className="material-icons">info</span>
                <p>{theme === 'shipgirl' ? '新しい提督名は、データ削除後の初期セットアップ画面で設定できます。' : '新シイ司令官名ハ、データ削除後ノ初期設定画面デ設定デキル。'}</p>
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={() => setShowAdmiralModal(false)}
                  className="cancel-button"
                >
                  {theme === 'shipgirl' ? 'キャンセル' : 'キャンセル'}
                </button>
                <button 
                  onClick={changeAdmiral}
                  className="confirm-button danger"
                >
                  {theme === 'shipgirl' ? 'データを削除して変更' : 'データヲ削除シテ変更'}
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