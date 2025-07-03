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
  completedAt?: string        // 完了日時（履歴用）
  achievedInEntry?: number    // 達成されたエントリーID（履歴用）
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
  createdAt: string
  admiralName: string
  isLatest: boolean
}

interface FleetAnalysisManagerProps {
  onFleetDataChange?: (data: string) => void
  onSwitchToAnalyst?: () => void
}

const FleetAnalysisManager: React.FC<FleetAnalysisManagerProps> = ({ onFleetDataChange, onSwitchToAnalyst }) => {
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
  const [showWelcome, setShowWelcome] = useState<boolean>(false)
  const [showBackup, setShowBackup] = useState<boolean>(false)
  const [newTaskText, setNewTaskText] = useState<string>('')
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false)
  const [showAdmiralModal, setShowAdmiralModal] = useState<boolean>(false)
  const [activeGraphTab, setActiveGraphTab] = useState<'exp' | 'ships' | 'married' | 'luck' | 'hp' | 'asw'>('exp')
  const [privacyMode, setPrivacyMode] = useState<boolean | null>(null)
  const [showTrainingTasksOnly, setShowTrainingTasksOnly] = useState<boolean>(false)
  const [forceUpdate, setForceUpdate] = useState<number>(0)
  const [showTaskHistoryModal, setShowTaskHistoryModal] = useState<boolean>(false)
  const [showPendingTasksModal, setShowPendingTasksModal] = useState<boolean>(false)
  const [showCompletedTasksModal, setShowCompletedTasksModal] = useState<boolean>(false)
  const [showFleetRecordsModal, setShowFleetRecordsModal] = useState<boolean>(false)

  const fileInputRef = useRef<HTMLInputElement>(null)


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
                    const isAchieved = isTrainingTaskAchieved(task.text, pastedData)
                    console.log('🔍 達成チェック結果:', isAchieved, 'タスク:', task.text)
                    if (isAchieved) {
                      console.log('🎯 現在のエントリーで達成済みタスクを完了状態に変更:', task.text)

                      return { 
                        ...task, 
                        completed: true,
                        completedAt: new Date().toISOString(),
                        achievedInEntry: currentLatest.id
                      }
                    }
                  }
                }
                return task
              })
              
              updatedCurrentLatest = { ...currentLatest, tasks: updatedTasks }
              console.log('🔍 更新後のタスク数:', updatedTasks.length, '完了数:', updatedTasks.filter(t => t.completed).length)
            }

            // タスクを引き継ぎ（達成済み育成タスクも履歴として継承）
            const inheritedTasks = updatedCurrentLatest ? 
              updatedCurrentLatest.tasks
                .filter(task => {
                  // 達成済み育成タスクは履歴として継承する
                  if (task.completed && task.achievedInEntry && isTrainingTask(task.text)) {
                    console.log('🏆 達成済み育成タスクを履歴として継承:', task.text)
                    return true
                  }
                  // その他の完了済みタスクは継承しない
                  if (task.completed) {
                    return false
                  }
                  // 未完了タスクの場合は達成チェック
                  const isTraining = isTrainingTask(task.text)
                  if (isTraining) {
                    const isAchieved = isTrainingTaskAchieved(task.text, pastedData)
                    if (isAchieved) {
                      console.log('🎯 達成済みタスクを継承対象から除外:', task.text)
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
          
          showToast('艦隊データ登録完了！', 'success')
        } catch (error) {
          showToast(`エラー: ${error}`, 'error')
        }
      } else if (!admiralName.trim()) {
        showToast('提督名を設定してください', 'error')
      }
    }, 100)
  }, [admiralName])

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
        const updatedTasks = entry.tasks.map(task => {
          if (task.id === taskId) {
            const isCompleting = !task.completed
            return { 
              ...task, 
              completed: isCompleting,
              completedAt: isCompleting ? new Date().toISOString() : undefined,
              achievedInEntry: isCompleting ? entryId : undefined
            }
          }
          return task
        })
        
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
    return tasks.filter(task => {
      // 現在の育成候補リストにあるタスク
      if (trainingTaskIds.includes(task.id) || 
          (task.originalTaskId && trainingTaskIds.includes(task.originalTaskId))) {
        return true
      }
      
      // 達成済み育成タスクは育成候補リストの状態に関係なく表示
      if (task.completed && task.achievedInEntry && isTrainingTask(task.text)) {
        console.log('🏆 達成済み育成タスクを履歴として表示:', task.text)
        return true
      }
      
      return false
    })
  }

  // 育成タスクかどうかの判定（シンプル版）
  const isTrainingTask = (taskText: string): boolean => {
    return taskText.includes('を育成する')
  }

  // 育成タスクが達成されているかチェック（実際の艦隊データベース版）
  const isTrainingTaskAchieved = (taskText: string, fleetJsonData?: string): boolean => {
    if (!taskText.includes('を育成する')) {
      return false
    }
    
    // 艦隊データがない場合は達成判定できない
    if (!fleetJsonData) {
      console.log('🔍 艦隊データがないため達成判定スキップ:', taskText)
      return false
    }
    
    // 育成候補リストが空の場合は達成判定できない
    const trainingTaskIds = getTrainingCandidatesMainTaskIds()
    if (trainingTaskIds.length === 0) {
      console.log('🔍 育成候補リストが空のため達成判定スキップ:', taskText)
      return false
    }
    
    try {
      // 艦隊データを解析
      const data = JSON.parse(fleetJsonData)
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      // 育成候補データを取得
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (!stored) return false
      
      const candidates = JSON.parse(stored)
      
      // タスクテキストから艦娘を特定（簡易版）
      const taskMatch = taskText.match(/(.+?)を育成する/)
      if (!taskMatch) return false
      
      const shipNameInTask = taskMatch[1]
      
      // 育成候補の中から該当する艦娘を探して達成チェック
      for (const candidate of candidates) {
        const ship = ships.find((s: any) => 
          s.api_id === candidate.instanceId || s.id === candidate.instanceId
        )
        
        if (!ship) continue
        
        // 現在のステータスを取得
        const currentLevel = ship.api_lv || ship.lv || 0
        const currentHp = ship.api_maxhp || ship.maxhp || 0
        const currentAsw = ship.api_taisen?.[0] || ship.taisen?.[0] || 0
        const currentLuck = ship.api_lucky?.[0] || ship.lucky?.[0] || 0
        
        // 各目標の達成チェック
        const levelAchieved = !candidate.targetLevel || currentLevel >= candidate.targetLevel
        const hpAchieved = !candidate.targetHp || currentHp >= candidate.targetHp
        const aswAchieved = !candidate.targetAsw || currentAsw >= candidate.targetAsw
        const luckAchieved = !candidate.targetLuck || currentLuck >= candidate.targetLuck
        
        const allTargetsAchieved = levelAchieved && hpAchieved && aswAchieved && luckAchieved
        
        if (allTargetsAchieved) {
          console.log('🎯 育成目標達成:', {
            shipName: shipNameInTask,
            instanceId: candidate.instanceId,
            level: currentLevel,
            hp: currentHp,
            asw: currentAsw,
            luck: currentLuck
          })
          return true
        }
      }
      
      return false
    } catch (error) {
      console.error('育成達成判定エラー:', error)
      return false
    }
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
          
          // 育成候補に完了フラグを追加（削除はしない）
          candidate.isCompleted = true
          candidate.completedAt = new Date().toISOString()
          candidatesToRemove.push(candidate.id)
        }
      })
      
      // 達成した候補の完了状態を更新（削除ではなく）
      if (candidatesToRemove.length > 0) {
        const updatedCandidates = trainingCandidates.map((candidate: any) => {
          if (candidatesToRemove.includes(candidate.id)) {
            return {
              ...candidate,
              isCompleted: true,
              completedAt: new Date().toISOString()
            }
          }
          return candidate
        })
        localStorage.setItem('fleetComposer_trainingCandidates', JSON.stringify(updatedCandidates))
      }
      
      // 達成があった場合は通知
      if (achievedCount > 0) {
        showToast(`${achievedCount}件の育成目標を達成しました！`, 'success')
      }
      
    } catch (error) {
      console.error('Training goal achievement check failed:', error)
    }
  }

  // 育成タスクを完了にマーク（引き継いだタスクも含む）
  const markTrainingTaskAsCompleted = (taskId: number) => {
    const completionTime = new Date().toISOString()
    let completedTaskText = ''
    
    const updatedEntries = fleetEntries.map(entry => {
      const updatedTasks = entry.tasks.map(task => {
        // メインタスクの完了
        if (task.id === taskId) {
          completedTaskText = task.text
          return { 
            ...task, 
            completed: true,
            completedAt: completionTime,
            achievedInEntry: entry.id
          }
        }
        // 引き継いだタスクの完了（originalTaskIdが一致するもの）
        else if (task.originalTaskId === taskId) {
          if (!completedTaskText) completedTaskText = task.text
          return { 
            ...task, 
            completed: true,
            completedAt: completionTime,
            achievedInEntry: entry.id
          }
        }
        return task
      })
      return { ...entry, tasks: updatedTasks }
    })
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
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
        
        showToast('バックアップをインポートしました', 'success')
      } catch {
        showToast('バックアップファイルの読み込みに失敗しました', 'error')
      }
    }
    reader.readAsText(file)
  }


  // 初回セットアップ画面
  if (isFirstSetup) {
    return (
      <div className="fleet-analysis-manager shipgirl">
        <div className="setup-container">
          <div className="welcome-card">
            <h1 className="app-logo animate-fadeInUp">
              <>
                <span className="logo-main">艦隊分析者マネージャー</span>
                <span className="logo-sub">-Fleet Analyst Manager-</span>
              </>
            </h1>

            {showWelcome && (
              <div className="welcome-message">
                <h2>{'ようこそ！'}</h2>
                <div className="welcome-text">
                  <p>{'このアプリは艦隊データから艦隊の成長を管理します'}</p>
                  <p>{'より良い艦これライフを！'}</p>
                </div>
                
                <div className="privacy-notice">
                  <h3><span className="material-icons">lock</span> {'プライバシー保護について'}</h3>
                  <p>{'このアプリはローカルストレージのみを使用し、外部へのデータ送信は行いません。'}</p>
                  <p>{'すべてのデータはお使いのブラウザ内にのみ保存されます。'}</p>
                </div>
              </div>
            )}

            <div className="admiral-setup">
              <h3>{'提督名を設定してください'}</h3>
              <div className="input-group">
                <input
                  type="text"
                  value={tempAdmiralName}
                  onChange={(e) => setTempAdmiralName(e.target.value)}
                  placeholder={'提督名を入力（2-20文字）'}
                  className="admiral-input"
                  maxLength={20}
                />
                <button onClick={setupAdmiral} className="setup-button">
                  <span className="material-icons">rocket_launch</span> {'開始する'}
                </button>
              </div>
              <p className="input-hint">
                {'提督名は2文字以上20文字以下で入力してください'}
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
    <div className="fleet-analysis-manager shipgirl">

      {/* バックアップポップアップ */}
      {showBackup && (
        <div className="backup-popup">
          <div className="backup-popup-content">
            <div className="backup-popup-header">
              <h3>{'バックアップ'}</h3>
              <button onClick={() => setShowBackup(false)} className="close-button">
                ×
              </button>
            </div>
            <div className="backup-controls">
              <button onClick={exportBackup} className="backup-btn">
                {'エクスポート'}
              </button>
              <label className="backup-btn import-btn">
                {'インポート'}
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
                {'提督変更'}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="app-logo animate-fadeInUp">
        <>
          <span className="logo-main">艦隊分析マネージャー</span>
          <span className="logo-sub">-Fleet Analyst Manager-</span>
        </>
      </h1>


      {/* 分析推移モーダル */}
      {showGraphModal && (
        <div className="graph-modal-overlay" onClick={() => setShowGraphModal(false)}>
          <div className="graph-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="graph-modal-header">
              <h2>{'分析推移データ'}</h2>
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
                  {'経験値'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'ships' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('ships')}
                >
                  <span className="material-icons">directions_boat</span>
                  {'艦数'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'married' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('married')}
                >
                  <span className="material-icons">favorite</span>
                  {'ケッコン艦'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'luck' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('luck')}
                >
                  <StatIcon icon="luck" className="graph-tab-icon" />
                  {'運改修'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'hp' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('hp')}
                >
                  <StatIcon icon="hp" className="graph-tab-icon" />
                  {'耐久改修'}
                </button>
                <button 
                  className={`graph-tab ${activeGraphTab === 'asw' ? 'active' : ''}`}
                  onClick={() => setActiveGraphTab('asw')}
                >
                  <StatIcon icon="asw" className="graph-tab-icon" />
                  {'対潜改修'}
                </button>
              </div>

              {/* 個別グラフ表示 */}
              {(() => {
                const singleGraphData = generateSingleGraphData(activeGraphTab)
                if (!singleGraphData) return null
                
                return (
                  <div className="modal-chart-section">
                    <h3>{singleGraphData.label}{'の推移'}</h3>
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
                          {'記録時系列'}
                        </text>
                        <text x="20" y="30" fontSize="14" fill="#e1f5fe" textAnchor="middle">
                          {singleGraphData.label}
                        </text>
                      </svg>
                    </div>
                    
                    {/* 統計情報 */}
                    <div className="graph-stats">
                      <div className="stat-item">
                        <span className="stat-title">{'最大値'}</span>
                        <span className="stat-number">
                          {privacyMode === true ? maskValue(singleGraphData.maxValue) : (activeGraphTab === 'exp' ? singleGraphData.maxValue.toLocaleString() : singleGraphData.maxValue)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-title">{'最小値'}</span>
                        <span className="stat-number">
                          {privacyMode === true ? maskValue(singleGraphData.minValue) : (activeGraphTab === 'exp' ? singleGraphData.minValue.toLocaleString() : singleGraphData.minValue)}
                        </span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-title">{'変動幅'}</span>
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
                <h3>{'データ一覧'}</h3>
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
        <h3>{'最新の艦隊を反映する'}</h3>
        <div className="input-group">
          <input
            type="text"
            value={fleetData}
            onChange={(e) => setFleetData(e.target.value)}
            onPaste={handlePaste}
            placeholder={'艦隊のJSONデータをここに貼り付けてください...'}
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
              title={showTrainingTasksOnly ? '全タスク表示' : '育成タスクのみ表示'}
            >
              <span className="material-symbols-outlined">{showTrainingTasksOnly ? 'filter_list_off' : 'filter_list'}</span>
            </button>
            <button 
              onClick={() => setPrivacyMode(!privacyMode)} 
              className={`action-button privacy-button ${privacyMode === true ? 'active' : ''}`}
              title={privacyMode === true ? 'プライバシーモード解除' : 'プライバシーモード'}
            >
              <span className="material-symbols-outlined">{privacyMode === true ? 'visibility' : 'visibility_off'}</span>
            </button>
            {fleetEntries.length >= 2 && (
              <button 
                onClick={() => setShowGraphModal(true)} 
                className="action-button chart-button"
                title={'分析推移表示'}
              >
                <span className="material-symbols-outlined">analytics</span>
              </button>
            )}
            <button 
              onClick={() => setShowBackup(!showBackup)} 
              className="action-button backup-button"
              title={'バックアップ'}
            >
              <span className="material-symbols-outlined">settings</span>
            </button>
            {onSwitchToAnalyst && (
              <button 
                onClick={onSwitchToAnalyst} 
                className="action-button analyst-switch-button"
                title={'分析者管理に切り替え'}
              >
                <span className="material-symbols-outlined">group</span>
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* 統計概要カード */}
      {latestEntry && (
        <div className="stats-overview">
              <div className="overview-item overview-clickable">
                <button
                  onClick={() => setShowFleetRecordsModal(true)}
                  className="overview-button"
                  title="艦隊記録を表示"
                >
                  <span className="material-icons overview-icon">trending_up</span>
                  <div className="overview-text">
                    <span className="overview-label">{'総記録数'}</span>
                    <span className="overview-value" key={`${fleetEntries.length}-${forceUpdate}`}>{privacyMode === true ? '*'.repeat(getTotalEntries().toString().length) : getTotalEntries()}</span>
                  </div>
                </button>
              </div>
              <div className="overview-item overview-clickable">
                <button
                  onClick={() => setShowCompletedTasksModal(true)}
                  className="overview-button"
                  title="達成タスクを表示"
                >
                  <span className="material-icons overview-icon">task_alt</span>
                  <div className="overview-text">
                    <span className="overview-label">{'累計達成タスク'}</span>
                    <span className="overview-value">{privacyMode === true ? '*'.repeat(getTotalCompletedTasks().toString().length) : getTotalCompletedTasks()}</span>
                  </div>
                </button>
              </div>
              <div className="overview-item overview-clickable">
                <button
                  onClick={() => setShowPendingTasksModal(true)}
                  className="overview-button"
                  title="未達成タスクを表示"
                >
                  <span className="material-icons overview-icon">assignment</span>
                  <div className="overview-text">
                    <span className="overview-label">{'未達成タスク'}</span>
                    <span className="overview-value">{privacyMode === true ? '*'.repeat(getPendingTasks().toString().length) : getPendingTasks()}</span>
                  </div>
                </button>
              </div>
              <div className="overview-item task-history-trigger">
                <button
                  onClick={() => setShowTaskHistoryModal(true)}
                  className="task-history-button"
                  title="タスク履歴を表示"
                >
                  <span className="material-icons overview-icon">history</span>
                  <div className="overview-text">
                    <span className="overview-label">{'タスク履歴'}</span>
                    <span className="overview-value">{'一覧表示'}</span>
                  </div>
                </button>
              </div>
        </div>
      )}

      {/* 最新の艦隊状況カード */}
      {latestEntry && (
        <div className="latest-entry-section">
              <div className="entry-header">
                <div className="entry-info">
                  <h3 className="section-title">{'最新の艦隊状況'}</h3>
                  <div className="entry-meta">
                    <span className="entry-date">{new Date(latestEntry.createdAt).toLocaleString('ja-JP', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                    <span className="latest-badge">{'最新'}</span>
                  </div>
                </div>
                <div className="entry-actions">
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


        </div>
      )}

      {/* タスク進捗カード */}
      {latestEntry && latestEntry.tasks.length > 0 && (
        <div className="tasks-section">
                  <div className="task-header">
                    <h4>{'タスク進捗'} ({getTaskProgress(latestEntry.tasks).completed}/{getTaskProgress(latestEntry.tasks).total})</h4>
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
                            {/* 完了履歴情報 */}
                            {task.completed && task.completedAt && (
                              <div className="task-completion-info">
                                <span className="completion-date">
                                  {'完了'}: {new Date(task.completedAt).toLocaleString('ja-JP')}
                                </span>
                              </div>
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
                  placeholder={'タスク内容を入力してください...'}
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
                  {'追加'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}





      {/* 提督変更確認モーダル */}
      {showAdmiralModal && (
        <div className="modal-overlay" onClick={() => setShowAdmiralModal(false)}>
          <div className="modal-content admiral-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{'提督変更'}</h2>
              <button onClick={() => setShowAdmiralModal(false)} className="close-button">
                <span className="material-icons">close</span>
              </button>
            </div>
            
            <div className="modal-body">
              <div className="warning-message">
                <span className="material-icons">warning</span>
                <p>{'提督を変更すると、すべての分析データが削除されます。'}</p>
              </div>
              
              <div className="current-admiral">
                <label>{'現在の提督名:'}</label>
                <span className="current-name">{admiralName}</span>
              </div>
              
              <div className="instruction-message">
                <span className="material-icons">info</span>
                <p>{'新しい提督名は、データ削除後の初期セットアップ画面で設定できます。'}</p>
              </div>
              
              <div className="modal-actions">
                <button 
                  onClick={() => setShowAdmiralModal(false)}
                  className="cancel-button"
                >
                  {'キャンセル'}
                </button>
                <button 
                  onClick={changeAdmiral}
                  className="confirm-button danger"
                >
                  {'データを削除して変更'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タスク履歴モーダル */}
      {showTaskHistoryModal && (
        <div className="modal-overlay">
          <div className="modal-content task-history-modal">
            <div className="modal-header">
              <h3>タスク履歴</h3>
              <button
                onClick={() => setShowTaskHistoryModal(false)}
                className="modal-close-btn"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="task-history-list">
                {[...fleetEntries].reverse().map(entry => {
                  const entryTasks = entry.tasks
                  if (entryTasks.length === 0) return null
                  
                  return (
                    <div key={entry.id} className="task-history-entry">
                      <div className="task-history-header">
                        <h4>{new Date(entry.createdAt).toLocaleString('ja-JP')}</h4>
                        <span className="task-count">
                          {getTaskProgress(entryTasks).completed}/{getTaskProgress(entryTasks).total}
                        </span>
                      </div>
                      <div className="task-history-tasks">
                        {entryTasks.map(task => (
                          <div key={task.id} className={`task-history-item ${task.completed ? 'completed' : 'pending'}`}>
                            <div className="task-status">
                              {task.completed ? (
                                <span className="material-icons">check_circle</span>
                              ) : (
                                <span className="material-icons">radio_button_unchecked</span>
                              )}
                            </div>
                            <div className="task-text">{task.text}</div>
                            {task.completed && task.completedAt && (
                              <div className="task-completion-date">
                                {new Date(task.completedAt).toLocaleDateString('ja-JP')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 未達成タスクモーダル */}
      {showPendingTasksModal && (
        <div className="modal-overlay">
          <div className="modal-content task-modal">
            <div className="modal-header">
              <h3>未達成タスク一覧</h3>
              <button
                onClick={() => setShowPendingTasksModal(false)}
                className="modal-close-btn"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="task-list">
                {[...fleetEntries].reverse().map(entry => {
                  const pendingTasks = entry.tasks.filter(task => !task.completed)
                  if (pendingTasks.length === 0) return null
                  
                  return (
                    <div key={entry.id} className="task-group">
                      <div className="task-group-header">
                        <h4>{new Date(entry.createdAt).toLocaleString('ja-JP')}</h4>
                        <span className="task-count pending-count">
                          {pendingTasks.length}件
                        </span>
                      </div>
                      <div className="task-items">
                        {pendingTasks.map(task => (
                          <div key={task.id} className="task-item pending">
                            <div className="task-status">
                              <span className="material-icons">radio_button_unchecked</span>
                            </div>
                            <div className="task-text">{task.text}</div>
                            <div className="task-created-date">
                              {new Date(task.createdAt).toLocaleDateString('ja-JP')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 達成タスクモーダル */}
      {showCompletedTasksModal && (
        <div className="modal-overlay">
          <div className="modal-content task-modal">
            <div className="modal-header">
              <h3>達成タスク一覧</h3>
              <button
                onClick={() => setShowCompletedTasksModal(false)}
                className="modal-close-btn"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="task-list">
                {[...fleetEntries].reverse().map(entry => {
                  const completedTasks = entry.tasks.filter(task => task.completed)
                  if (completedTasks.length === 0) return null
                  
                  return (
                    <div key={entry.id} className="task-group">
                      <div className="task-group-header">
                        <h4>{new Date(entry.createdAt).toLocaleString('ja-JP')}</h4>
                        <span className="task-count completed-count">
                          {completedTasks.length}件
                        </span>
                      </div>
                      <div className="task-items">
                        {completedTasks.map(task => (
                          <div key={task.id} className="task-item completed">
                            <div className="task-status">
                              <span className="material-icons">check_circle</span>
                            </div>
                            <div className="task-text">{task.text}</div>
                            <div className="task-completion-date">
                              {task.completedAt ? new Date(task.completedAt).toLocaleDateString('ja-JP') : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 艦隊記録モーダル */}
      {showFleetRecordsModal && (
        <div className="modal-overlay">
          <div className="modal-content fleet-records-modal">
            <div className="modal-header">
              <h3>艦隊記録一覧</h3>
              <button
                onClick={() => setShowFleetRecordsModal(false)}
                className="modal-close-btn"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="fleet-records-list">
                {[...fleetEntries].reverse().map(entry => (
                  <div key={entry.id} className="fleet-record-entry">
                    <div className="fleet-record-header">
                      <h4>{new Date(entry.createdAt).toLocaleString('ja-JP')}</h4>
                      {entry.isLatest && <span className="latest-badge">最新</span>}
                    </div>
                    <div className="fleet-record-stats">
                      <div className="stat-item">
                        <span className="stat-label">総経験値</span>
                        <span className="stat-value">{entry.totalExp.toLocaleString()}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">艦船数</span>
                        <span className="stat-value">{entry.shipCount}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">ケッコン艦</span>
                        <span className="stat-value">{entry.marriedCount}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">運改修</span>
                        <span className="stat-value">{entry.luckModTotal}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">耐久改修</span>
                        <span className="stat-value">{entry.hpModTotal}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">対潜改修</span>
                        <span className="stat-value">{entry.aswModTotal}</span>
                      </div>
                    </div>
                  </div>
                ))}
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