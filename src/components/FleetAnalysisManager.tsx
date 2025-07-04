import { useState, useEffect, useRef } from 'react'
import { StatIcon } from './ShipStatusDisplay'
import { getShipBannerPath } from '../utils/imagePaths'

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


interface TrainingCandidate {
  id: number
  instanceId: number
  shipId: number
  name: string
  level: number
  addedAt: string
  targetLevel?: number
  targetHp?: number
  targetAsw?: number
  targetLuck?: number
  mainTaskId?: number
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
  const [showTrainingCandidatesModal, setShowTrainingCandidatesModal] = useState<boolean>(false)
  const [trainingCandidates, setTrainingCandidates] = useState<TrainingCandidate[]>([])
  const [hasNewAchievements, setHasNewAchievements] = useState<boolean>(false)
  const [achievedCount, setAchievedCount] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // LocalStorage監視用（削除タイミング特定）
  useEffect(() => {
    const originalRemoveItem = localStorage.removeItem
    const originalSetItem = localStorage.setItem
    const originalClear = localStorage.clear

    localStorage.removeItem = function(key) {
      console.log('🚨 LocalStorage削除:', key, new Error().stack)
      return originalRemoveItem.call(this, key)
    }

    localStorage.setItem = function(key, value) {
      console.log('💾 LocalStorage保存:', key, value.length, '文字')
      return originalSetItem.call(this, key, value)
    }

    localStorage.clear = function() {
      console.log('🧹 LocalStorage全削除:', new Error().stack)
      return originalClear.call(this)
    }

    // ページの可視性変更を監視
    const handleVisibilityChange = () => {
      console.log('👁️ ページ可視性:', document.visibilityState)
      if (document.visibilityState === 'hidden') {
        console.log('🔍 ページが非表示になりました')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', () => {
      console.log('🚪 ページアンロード')
    })

    return () => {
      localStorage.removeItem = originalRemoveItem
      localStorage.setItem = originalSetItem
      localStorage.clear = originalClear
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // JSON艦隊データ解析エンジン（最適化版）
  const calculateFleetStats = (jsonData: string) => {
    try {
      const data = JSON.parse(jsonData)
      
      // 基本データ型のバリデーション
      if (typeof data !== 'object' || data === null) {
        throw new Error('艦隊データはオブジェクトまたは配列である必要があります。数値や文字列は無効です。')
      }
      
      // プリミティブ型（数値、文字列、真偽値）の除外
      if (typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean') {
        throw new Error('艦隊データはオブジェクトまたは配列である必要があります。数値や文字列は無効です。')
      }
      
      let totalExpValue = 0
      let shipCountValue = 0
      let marriedCountValue = 0
      let luckModTotalValue = 0
      let hpModTotalValue = 0
      let aswModTotalValue = 0

      // 配列の場合の処理（複数の形式に対応）
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      // 艦隊データの検証
      if (!Array.isArray(ships) || ships.length === 0) {
        throw new Error('艦隊データが見つかりません。正しい艦隊JSONデータを入力してください。')
      }

      // 最初の数件の船舶データを検証（条件を緩和）
      const sampleShips = ships.slice(0, Math.min(5, ships.length))
      const validShipCount = sampleShips.filter(ship => {
        return ship && typeof ship === 'object' && (
          // 経験値データがある
          (ship.exp && Array.isArray(ship.exp)) || 
          (ship.api_exp && Array.isArray(ship.api_exp)) ||
          // レベルデータがある
          (ship.lv !== undefined && ship.lv !== null) || 
          (ship.api_lv !== undefined && ship.api_lv !== null) ||
          // 艦船IDがある
          (ship.ship_id !== undefined && ship.ship_id !== null) || 
          (ship.api_ship_id !== undefined && ship.api_ship_id !== null) ||
          // 艦種IDがある
          (ship.stype !== undefined && ship.stype !== null) ||
          (ship.api_stype !== undefined && ship.api_stype !== null)
        )
      }).length

      if (validShipCount === 0) {
        console.error('艦船データサンプル:', sampleShips)
        throw new Error('有効な艦船データが見つかりません。艦隊JSONデータの形式を確認してください。')
      }
      
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
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('JSON解析に失敗しました。正しい艦隊JSONデータを入力してください。')
    }
  }

  // 艦隊データの手動更新を処理
  const handleFleetDataUpdate = () => {
    if (!fleetData.trim()) return
    
    try {
      // 育成目標達成チェック（読み取り専用）
      if (trainingCandidates.length > 0) {
        const achievementResult = checkTrainingAchievements(fleetData)
        if (achievementResult.hasAchievements) {
          setHasNewAchievements(true)
          setAchievedCount(achievementResult.achievedCount)
          const achievedNames = achievementResult.achievedCandidates.map(c => c.name).join('、')
          showToast(
            `🎉 育成目標達成！ ${achievementResult.achievedCount}隻 (${achievedNames})`, 
            'success'
          )
        }
      }
      
      // 達成チェック後に新しいエントリーを作成
      console.log('📝 新しいエントリー作成開始')
      const stats = calculateFleetStats(fleetData)
      
      // LocalStorageから最新の状態を取得（Reactの状態更新は非同期のため）
      const latestEntries = JSON.parse(localStorage.getItem(`${admiralName}_fleetEntries`) || '[]')
      const currentLatest = latestEntries.find((entry: any) => entry.isLatest)
      console.log('📊 最新エントリーの取得:', {
        sourceReactState: fleetEntries.find(entry => entry.isLatest)?.id,
        sourceLocalStorage: currentLatest?.id,
        tasksInLatest: currentLatest?.tasks?.length || 0
      })
      
      // 育成タスクは未完了のみ引き継ぎ、その他も未達成のみ引き継ぐ
      const allTasks = currentLatest?.tasks || []
      const trainingTasks = allTasks.filter((task: Task) => isTrainingTask(task.text) && !task.completed)
      const nonTrainingIncompleteTasks = allTasks.filter((task: Task) => !isTrainingTask(task.text) && !task.completed)
      const tasksToInherit = [...trainingTasks, ...nonTrainingIncompleteTasks]
      
      console.log('📋 タスク継承デバッグ:', {
        totalTasks: allTasks.length,
        incompleteTrainingTasks: trainingTasks.length,
        nonTrainingIncompleteTasks: nonTrainingIncompleteTasks.length,
        tasksToInherit: tasksToInherit.length,
        incompleteTrainingTasksList: trainingTasks.map((t: Task) => ({ id: t.id, text: t.text, completed: t.completed })),
        nonTrainingIncompleteList: nonTrainingIncompleteTasks.map((t: Task) => ({ id: t.id, text: t.text, completed: t.completed }))
      })
      
      const inheritedTasks = tasksToInherit.map(task => ({
        ...task,
        // 育成タスクは既存のIDを保持、その他は新しいIDを生成
        id: isTrainingTask(task.text) ? task.id : Date.now() + Math.floor(Math.random() * 1000),
        inheritedFrom: currentLatest.id,
        originalTaskId: task.originalTaskId || task.id,
        createdAt: new Date().toISOString() // 継承時刻を更新
      }))

      const newEntry: FleetEntry = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        admiralName,
        ...stats,
        tasks: inheritedTasks,
        isLatest: true
      }

      // 既存のエントリーの isLatest フラグを false に設定
      const updatedEntries = fleetEntries.map(entry => ({
        ...entry,
        isLatest: false
      }))

      const newFleetEntries = [...updatedEntries, newEntry]
      setFleetEntries(newFleetEntries)
      
      // 艦隊データ更新時は必ず保存
      const key = `${admiralName}_fleetEntries`
      
      // 実際の保存
      const jsonData = JSON.stringify(newFleetEntries)
      console.log('💾 保存開始 - キー:', key, 'サイズ:', jsonData.length, '文字')
      
      // 保存前にLocalStorageの状態を確認
      console.log('📊 保存前のLocalStorage使用量:', Object.keys(localStorage).length, '項目')
      
      // ブラウザストレージ容量の確認
      try {
        const testKey = 'storage_test_' + Date.now()
        const testData = 'x'.repeat(1000000) // 1MB
        localStorage.setItem(testKey, testData)
        localStorage.removeItem(testKey)
        console.log('💾 ストレージ容量: 十分')
      } catch (e) {
        console.log('⚠️ ストレージ容量不足の可能性:', e)
      }
      
      localStorage.setItem(key, jsonData)
      
      // 最新の艦隊データも保存（達成チェック用）
      localStorage.setItem(`${admiralName}_latestFleetData`, fleetData)
      console.log('💾 最新艦隊データも保存:', fleetData.length, '文字')
      
      // 保存直後の確認
      const savedCheck = localStorage.getItem(key)
      console.log('✅ 保存確認:', savedCheck ? JSON.parse(savedCheck).length : 'なし', '件')
      
      // 段階的な検証
      const verifyData = () => {
        const current = localStorage.getItem(key)
        return current ? JSON.parse(current).length : 0
      }
      
      setTimeout(() => {
        console.log('🔍 100ms後:', verifyData(), '件')
      }, 100)
      
      setTimeout(() => {
        console.log('🔍 500ms後:', verifyData(), '件')
      }, 500)
      
      setTimeout(() => {
        console.log('🔍 1000ms後:', verifyData(), '件')
      }, 1000)
      
      setTimeout(() => {
        console.log('🔍 2000ms後:', verifyData(), '件')
      }, 2000)
      
      // 初回セットアップ状態を確実に解除
      if (isFirstSetup) {
        setIsFirstSetup(false)
        setShowWelcome(false)
      }
      
      // フィールドをクリア
      setFleetData('')
      
      // 強制更新
      setForceUpdate(prev => prev + 1)
      
      // 成功メッセージを表示
      setToast({
        message: '艦隊データが正常に反映されました',
        type: 'success'
      })
    } catch (error) {
      console.error('艦隊データの処理中にエラーが発生しました:', error)
      setToast({
        message: error instanceof Error ? error.message : '艦隊データの処理中にエラーが発生しました',
        type: 'error'  
      })
    }
  }


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
    
    // 通知状態の復元
    const savedHasNewAchievements = localStorage.getItem('fleetAnalysis_hasNewAchievements')
    const savedAchievedCount = localStorage.getItem('fleetAnalysis_achievedCount')
    
    if (savedHasNewAchievements !== null) {
      setHasNewAchievements(savedHasNewAchievements === 'true')
    }
    
    if (savedAchievedCount !== null) {
      setAchievedCount(parseInt(savedAchievedCount, 10) || 0)
    }
    
    if (savedAdmiralName) {
      setAdmiralName(savedAdmiralName)
      setIsFirstSetup(false)
      loadFleetEntries(savedAdmiralName)
    } else {
      setIsFirstSetup(true)
      setShowWelcome(true)
    }
    
    // 育成候補リストを読み込み
    loadTrainingCandidates()
  }, [])

  // プライバシーモードの永続化
  useEffect(() => {
    if (privacyMode !== null) {
      localStorage.setItem('fleetAnalysisPrivacyMode', privacyMode.toString())
    }
  }, [privacyMode])

  // 通知状態の永続化
  useEffect(() => {
    localStorage.setItem('fleetAnalysis_hasNewAchievements', hasNewAchievements.toString())
  }, [hasNewAchievements])

  useEffect(() => {
    localStorage.setItem('fleetAnalysis_achievedCount', achievedCount.toString())
  }, [achievedCount])

  // 育成候補の達成状態を監視して通知を同期
  useEffect(() => {
    if (trainingCandidates.length > 0 && fleetData) {
      const currentAchievedCount = trainingCandidates.filter(candidate => 
        isTrainingCandidateAchieved(candidate)
      ).length
      
      // 達成数が変化した場合のみ更新
      if (currentAchievedCount !== achievedCount) {
        setAchievedCount(currentAchievedCount)
        setHasNewAchievements(currentAchievedCount > 0)
        console.log('🔄 達成状態同期:', currentAchievedCount, '件')
      }
    } else if (trainingCandidates.length === 0) {
      // 育成候補がない場合は通知をクリア
      setAchievedCount(0)
      setHasNewAchievements(false)
    }
  }, [trainingCandidates, fleetData, achievedCount])

  // LocalStorageの変更を監視してリアルタイム更新
  useEffect(() => {
    if (!admiralName) return

    // LocalStorageの継続監視
    const checkLocalStorage = () => {
      const key = `${admiralName}_fleetEntries`
      const saved = localStorage.getItem(key)
      const count = saved ? JSON.parse(saved).length : 0
      
      // 前回の監視結果と比較
      const prevCount = (window as any).lastStorageCount || 0
      if (count !== prevCount) {
        console.log('🔄 LS変更検出:', prevCount, '→', count, '件')
        ;(window as any).lastStorageCount = count
      }
    }
    
    const storageInterval = setInterval(checkLocalStorage, 1000)

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
      clearInterval(storageInterval)
    }
  }, [admiralName])

  // fleetEntriesの変更を監視
  useEffect(() => {
    // 育成リストとタスクの同期チェック（一時的に無効化）
    // if (fleetEntries.length > 0 && admiralName) {
    //   syncTrainingListAndTasks()
    // }
    console.log('🔄 useEffect実行 - 育成リスト同期は一時的に無効化')
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
        
        // 空の配列の場合は読み込みをスキップ
        if (parsed.length === 0) {
          console.log('📥 空データのため読み込みスキップ')
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
        console.log('🗑️ loadFleetEntries: LocalStorage削除実行:', `${admiral}_fleetEntries`)
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
        console.log('🗑️ changeAdmiral: LocalStorage削除実行:', `${admiralName}_fleetEntries`)
        localStorage.removeItem(`${admiralName}_fleetEntries`)
      }
      localStorage.removeItem('fleetAnalysisAdmiralName')
      
      // Reset state removed
      
      // 状態をリセット
      setAdmiralName('')
      setTempAdmiralName('')
      setFleetEntries([])
      setFleetData('')
      setIsFirstSetup(true)
      setShowWelcome(true)
      setShowAdmiralModal(false)
      
      // Reset complete
      
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
            
            // 自動削除機能を無効化 - シンプルな表示のみ
            // if (isCompleting && isTrainingTask(task.text)) {
            //   removeTrainingCandidateByTaskId(task.originalTaskId || task.id)
            // }
            
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

  // 手動タスク削除機能
  const deleteTask = (entryId: number, taskId: number) => {
    if (!confirm('このタスクを削除しますか？')) return
    
    const updatedEntries = fleetEntries.map(entry => {
      if (entry.id === entryId) {
        const updatedTasks = entry.tasks.filter(task => task.id !== taskId)
        
        // 自動削除機能を無効化 - シンプルな表示のみ
        
        return {
          ...entry,
          tasks: updatedTasks
        }
      }
      return entry
    })
    
    setFleetEntries(updatedEntries)
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(updatedEntries))
    showToast('タスクを削除しました', 'success')
  }

  // 育成候補をタスクIDで削除
  // removeTrainingCandidateByTaskId function removed - auto-sync disabled


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
  const getTotalCompletedTasks = () => {
    const total = fleetEntries.reduce((total, entry) => {
      const filteredTasks = filterTasksForDisplay(entry.tasks)
      const completedCount = filteredTasks.filter(task => task.completed).length
      console.log(`📊 Entry ${entry.id} 完了タスク数:`, completedCount, '/', filteredTasks.length)
      return total + completedCount
    }, 0)
    console.log('📊 総完了タスク数:', total)
    return total
  }
  const getPendingTasks = () => {
    const latestEntry = fleetEntries.find(entry => entry.isLatest)
    if (!latestEntry) return 0
    const filteredTasks = filterTasksForDisplay(latestEntry.tasks)
    return filteredTasks.filter(task => !task.completed).length
  }
  const getTotalTasks = () => {
    return fleetEntries.reduce((total, entry) => {
      const filteredTasks = filterTasksForDisplay(entry.tasks)
      return total + filteredTasks.length
    }, 0)
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

  // syncTrainingListAndTasks function removed - auto-sync disabled

  // 育成候補タスクのフィルタリング
  const filterTasksForDisplay = (tasks: Task[]): Task[] => {
    if (!showTrainingTasksOnly) return tasks
    
    const trainingTaskIds = getTrainingCandidatesMainTaskIds()
    console.log('🔍 フィルタリング開始:', {
      totalTasks: tasks.length,
      trainingTaskIds: trainingTaskIds,
      showTrainingTasksOnly
    })
    
    return tasks.filter(task => {
      // 現在の育成候補リストにあるタスク（継承されたタスクを含む）
      const taskIdToCheck = task.originalTaskId || task.inheritedFrom || task.id
      const isInCurrentTrainingList = trainingTaskIds.includes(task.id) || 
          trainingTaskIds.includes(taskIdToCheck) ||
          (task.originalTaskId && trainingTaskIds.includes(task.originalTaskId))
      
      if (isInCurrentTrainingList) {
        console.log('✅ 現在の育成リストのタスク:', task.text, 'ID:', task.id)
        return true
      }
      
      // 達成済み育成タスクは育成候補リストの状態に関係なく表示
      const isCompletedTrainingTask = task.completed && isTrainingTask(task.text)
      if (isCompletedTrainingTask) {
        console.log('🏆 達成済み育成タスク判定:', {
          taskText: task.text,
          completed: task.completed,
          achievedInEntry: task.achievedInEntry,
          isTrainingTask: isTrainingTask(task.text),
          taskId: task.id
        })
        return true
      }
      
      console.log('❌ フィルタリング除外:', task.text, {
        id: task.id,
        completed: task.completed,
        isTrainingTask: isTrainingTask(task.text),
        achievedInEntry: task.achievedInEntry
      })
      return false
    })
  }

  // 育成タスクかどうかの判定（シンプル版）
  const isTrainingTask = (taskText: string): boolean => {
    return taskText.includes('を育成する')
  }

  // 育成候補リストを読み込む
  const loadTrainingCandidates = () => {
    try {
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (stored) {
        const candidates = JSON.parse(stored) as TrainingCandidate[]
        setTrainingCandidates(candidates)
        console.log('📋 育成候補リスト読み込み:', candidates.length, '件')
      } else {
        setTrainingCandidates([])
      }
    } catch (error) {
      console.error('育成候補リスト読み込みエラー:', error)
      setTrainingCandidates([])
    }
  }

  // 個別の育成候補の達成状態をチェック
  const isTrainingCandidateAchieved = (candidate: TrainingCandidate): boolean => {
    // fleetDataがない場合は、最新エントリーから艦隊データを取得を試みる
    let currentFleetData = fleetData
    if (!currentFleetData) {
      const latestEntry = fleetEntries.find(entry => entry.isLatest)
      if (latestEntry) {
        // 最新エントリーに保存されている生のJSONデータを探す
        const savedFleetData = localStorage.getItem(`${admiralName}_latestFleetData`)
        if (savedFleetData) {
          currentFleetData = savedFleetData
          console.log('🔍 LocalStorageから艦隊データを復元:', candidate.name)
        }
      }
    }
    
    if (!currentFleetData) {
      console.log('🔍 fleetDataがない:', candidate.name)
      return false
    }
    
    try {
      const data = JSON.parse(currentFleetData)
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      console.log('🔍 達成チェック開始:', {
        candidateName: candidate.name,
        candidateInstanceId: candidate.instanceId,
        candidateShipId: candidate.shipId,
        candidateLevel: candidate.level,
        targets: {
          level: candidate.targetLevel,
          hp: candidate.targetHp,
          asw: candidate.targetAsw,
          luck: candidate.targetLuck
        },
        shipsCount: ships.length,
        availableShips: ships.slice(0, 3).map((ship: any) => ({
          instanceId: ship.api_id || ship.id,
          shipId: ship.ship_id || ship.api_ship_id,
          level: ship.lv || ship.api_lv
        }))
      })
      
      // instanceIdで艦船を探す（より正確）
      const matchingShip = ships.find((ship: any) => {
        const instanceId = ship.api_id || ship.id
        return instanceId === candidate.instanceId
      })
      
      // instanceIdで見つからない場合は、shipIdとレベルで検索
      const fallbackShip = !matchingShip ? ships.find((ship: any) => {
        const shipId = ship.ship_id || ship.api_ship_id
        const level = ship.lv || ship.api_lv
        return shipId === candidate.shipId && level >= candidate.level
      }) : null
      
      const targetShip = matchingShip || fallbackShip

      console.log('🔍 艦船検索結果:', {
        candidateName: candidate.name,
        candidateInstanceId: candidate.instanceId,
        candidateShipId: candidate.shipId,
        foundByInstanceId: !!matchingShip,
        foundByShipId: !!fallbackShip,
        finalFound: !!targetShip,
        targetShipData: targetShip ? {
          instanceId: targetShip.api_id || targetShip.id,
          shipId: targetShip.ship_id || targetShip.api_ship_id,
          level: targetShip.lv || targetShip.api_lv
        } : null
      })

      if (!targetShip) {
        console.log('❌ 一致する艦船が見つからない:', {
          candidateName: candidate.name,
          candidateInstanceId: candidate.instanceId,
          candidateShipId: candidate.shipId
        })
        return false
      }

      const level = targetShip.lv || targetShip.api_lv
      const hp = targetShip.maxhp || targetShip.api_maxhp || 0
      const asw = targetShip.asw?.[0] || targetShip.api_taisen?.[0] || 0
      const luck = targetShip.luck?.[0] || targetShip.api_lucky?.[0] || 0

      console.log('🔍 現在のステータス:', {
        name: candidate.name,
        current: { level, hp, asw, luck },
        targets: { 
          level: candidate.targetLevel, 
          hp: candidate.targetHp, 
          asw: candidate.targetAsw, 
          luck: candidate.targetLuck 
        }
      })

      // 目標達成チェック（目標が0の場合も未設定と同じ扱い）
      const isLevelAchieved = !candidate.targetLevel || candidate.targetLevel <= 0 || level >= candidate.targetLevel
      const isHpAchieved = !candidate.targetHp || candidate.targetHp <= 0 || hp >= candidate.targetHp
      const isAswAchieved = !candidate.targetAsw || candidate.targetAsw <= 0 || asw >= candidate.targetAsw
      const isLuckAchieved = !candidate.targetLuck || candidate.targetLuck <= 0 || luck >= candidate.targetLuck

      const allAchieved = isLevelAchieved && isHpAchieved && isAswAchieved && isLuckAchieved

      console.log('🔍 達成状況:', {
        name: candidate.name,
        level: isLevelAchieved,
        hp: isHpAchieved,
        asw: isAswAchieved,
        luck: isLuckAchieved,
        allAchieved
      })

      return allAchieved
    } catch (error) {
      console.error('個別育成達成チェックエラー:', error)
      return false
    }
  }

  // 育成候補を完了状態にする
  const completeTrainingCandidate = (candidateId: number) => {
    try {
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (!stored) return

      const candidates = JSON.parse(stored)
      const completedCandidate = candidates.find((c: any) => c.id === candidateId)
      const updatedCandidates = candidates.filter((candidate: any) => candidate.id !== candidateId)
      
      localStorage.setItem('fleetComposer_trainingCandidates', JSON.stringify(updatedCandidates))
      
      // 状態を更新
      setTrainingCandidates(updatedCandidates)
      
      // 完了した候補が達成状態だった場合、通知カウントを減らす
      if (completedCandidate && isTrainingCandidateAchieved(completedCandidate)) {
        const newAchievedCount = Math.max(0, achievedCount - 1)
        setAchievedCount(newAchievedCount)
        
        // 達成候補がすべて完了した場合は通知をクリア
        if (newAchievedCount === 0) {
          setHasNewAchievements(false)
        }
      }
      
      if (completedCandidate) {
        showToast(`${completedCandidate.name}の育成を完了しました！`, 'success')
      }
      
      console.log('✅ 育成候補完了:', candidateId)
    } catch (error) {
      console.error('育成候補完了エラー:', error)
      showToast('育成完了処理に失敗しました', 'error')
    }
  }

  // 育成目標達成チェック（読み取り専用版）
  const checkTrainingAchievements = (fleetJsonData: string): { hasAchievements: boolean; achievedCount: number; achievedCandidates: TrainingCandidate[] } => {
    try {
      const data = JSON.parse(fleetJsonData)
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      if (!Array.isArray(ships) || ships.length === 0) {
        return { hasAchievements: false, achievedCount: 0, achievedCandidates: [] }
      }

      const candidates = trainingCandidates
      const achievedCandidates: TrainingCandidate[] = []

      candidates.forEach(candidate => {
        // 艦船IDとレベルで一致する艦船を探す
        const matchingShip = ships.find((ship: any) => {
          const shipId = ship.ship_id || ship.api_ship_id
          const level = ship.lv || ship.api_lv
          return shipId === candidate.shipId && level >= candidate.level
        })

        if (matchingShip) {
          const level = matchingShip.lv || matchingShip.api_lv
          const hp = matchingShip.maxhp || matchingShip.api_maxhp || 0
          const asw = matchingShip.asw?.[0] || matchingShip.api_taisen?.[0] || 0
          const luck = matchingShip.luck?.[0] || matchingShip.api_lucky?.[0] || 0

          // 目標達成チェック
          const isLevelAchieved = !candidate.targetLevel || level >= candidate.targetLevel
          const isHpAchieved = !candidate.targetHp || hp >= candidate.targetHp
          const isAswAchieved = !candidate.targetAsw || asw >= candidate.targetAsw
          const isLuckAchieved = !candidate.targetLuck || luck >= candidate.targetLuck

          if (isLevelAchieved && isHpAchieved && isAswAchieved && isLuckAchieved) {
            console.log('🎯 育成目標達成:', candidate.name)
            achievedCandidates.push(candidate)
          }
        }
      })

      return {
        hasAchievements: achievedCandidates.length > 0,
        achievedCount: achievedCandidates.length,
        achievedCandidates
      }
    } catch (error) {
      console.error('育成目標達成チェックエラー:', error)
      return { hasAchievements: false, achievedCount: 0, achievedCandidates: [] }
    }
  }

  // 育成タスクが達成されているかチェック（実際の艦隊データベース版）
  // isTrainingTaskAchieved function removed - auto-sync disabled

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
  // getTrainingCandidate function removed - auto-sync disabled

  // 最新の目標値でタスクテキストを生成（FleetComposerのcreateMainTaskTextと同等）
  // createUpdatedTaskText function removed - auto-sync disabled

  // checkTrainingGoalAchievements function removed - auto-sync disabled

  // 育成タスクを完了にマーク（引き継いだタスクも含む）
  // markTrainingTaskAsCompleted function removed - auto-sync disabled


  // プライバシーモード用の値マスク関数
  const maskValue = (value: number) => {
    if (privacyMode !== true) return value.toLocaleString()
    return '*'.repeat(Math.min(value.toString().length, 8))
  }

  // プライバシーモード用の差分マスク関数
  const maskDiffValue = (value: number) => {
    const sign = value > 0 ? '+' : ''
    if (privacyMode !== true) return sign + value.toLocaleString()
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
  console.log('🎯 レンダリング時状態:', { isFirstSetup, admiralName, fleetEntriesLength: fleetEntries.length, latestEntry: !!latestEntry })

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
      <div className="data-input-section" style={{ display: 'none' }}>
        <h3>{'最新の艦隊を反映する'}</h3>
        <div className="input-group">
          <div className="fleet-input-wrapper">
            <input
              type="text"
              value={fleetData}
              onChange={(e) => setFleetData(e.target.value)}
              placeholder={'艦隊のJSONデータをここに貼り付けてください...'}
              className="fleet-data-input"
            />
            <button
              onClick={() => {
                console.log('🖱️ 読み込みボタンクリック:', { fleetDataLength: fleetData.length, admiralName })
                handleFleetDataUpdate()
              }}
              className="fleet-update-btn-inside"
              disabled={!fleetData.trim()}
              title="艦隊データを反映"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* ダッシュボードヘッダー */}
      {latestEntry && (
        <div className="dashboard-header">
          <h2><span className="material-icons">anchor</span> {admiralName} のダッシュボード</h2>
          
          {/* アクションボタン（フィルター以外） */}
          <div className="dashboard-actions">
            <button 
              onClick={() => setPrivacyMode(!privacyMode)} 
              className={`action-button privacy-button ${privacyMode === true ? 'active' : ''}`}
              title={privacyMode === true ? 'プライバシーモード中 - クリックで通常表示' : '通常表示中 - クリックでプライバシーモード'}
            >
              <span className="material-symbols-outlined">{privacyMode === true ? 'visibility_off' : 'visibility'}</span>
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
              <div className="overview-item overview-clickable">
                <button
                  onClick={() => setShowTaskHistoryModal(true)}
                  className="overview-button"
                  title="タスク履歴を表示"
                >
                  <span className="material-icons overview-icon">history</span>
                  <div className="overview-text">
                    <span className="overview-label">{'タスク履歴'}</span>
                    <span className="overview-value">{privacyMode === true ? '*'.repeat(Math.min(getTotalTasks().toString().length, 6)) : getTotalTasks()}</span>
                  </div>
                </button>
              </div>

              {/* 育成候補リスト */}
              <div className="overview-item overview-clickable">
                <button 
                  onClick={() => {
                    loadTrainingCandidates()
                    
                    // fleetDataがない場合はLocalStorageから復元を試みる
                    if (!fleetData && admiralName) {
                      const savedFleetData = localStorage.getItem(`${admiralName}_latestFleetData`)
                      if (savedFleetData) {
                        setFleetData(savedFleetData)
                        console.log('🔍 モーダル開放時に艦隊データを復元')
                      }
                    }
                    
                    setShowTrainingCandidatesModal(true)
                    // 通知クリアは育成完了ボタンを押した時のみ
                  }} 
                  className="overview-button"
                  title="育成候補リストを表示"
                >
                  <span className="overview-icon material-symbols-outlined">school</span>
                  {hasNewAchievements && (
                    <span className="notification-badge">
                      {achievedCount}
                    </span>
                  )}
                  <div className="overview-text">
                    <span className="overview-label">育成候補</span>
                    <span className="overview-value">{trainingCandidates.length}</span>
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
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      {/* フィルターボタン */}
                      <button 
                        onClick={() => setShowTrainingTasksOnly(!showTrainingTasksOnly)} 
                        className={`filter-status-button`}
                        title={showTrainingTasksOnly ? '育成タスクのみ表示中 - クリックで全タスク表示' : '全タスク表示中 - クリックで育成タスクのみ表示'}
                        style={{
                          fontSize: '0.75rem', 
                          padding: '4px 8px',
                          minHeight: '28px',
                          borderRadius: '6px',
                          background: 'transparent',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <span className="material-symbols-outlined" style={{fontSize: '0.8rem'}}>{showTrainingTasksOnly ? 'filter_alt' : 'list'}</span>
                        <span>{showTrainingTasksOnly ? '育成のみ' : '全タスク'}</span>
                      </button>
                      <h4 style={{margin: '0', fontSize: '1rem', fontWeight: 'bold', color: 'white'}}>タスク進捗 ({getTaskProgress(latestEntry.tasks).completed}/{getTaskProgress(latestEntry.tasks).total})</h4>
                    </div>
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
                              <>
                                <div className="training-task-content">
                                  <label className="task-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={task.completed}
                                      onChange={() => toggleTask(latestEntry.id, task.id)}
                                    />
                                    <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
                                  </label>
                                  <button 
                                    onClick={() => deleteTask(latestEntry.id, task.id)}
                                    className="delete-task-btn training-delete"
                                    title="育成タスクを削除"
                                  >
                                    <span className="material-icons">close</span>
                                  </button>
                                </div>
                                {/* 育成タスクの完了履歴情報 */}
                                {task.completed && task.completedAt && (
                                  <div className="task-completion-info">
                                    <span className="completion-date">
                                      {'完了'}: {new Date(task.completedAt).toLocaleString('ja-JP')}
                                    </span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <label className="task-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(latestEntry.id, task.id)}
                                  />
                                  <span className={task.completed ? 'completed' : ''}>{task.text}</span>
                                </label>
                                {/* 通常タスクの完了履歴情報 */}
                                {task.completed && task.completedAt && (
                                  <div className="task-completion-info">
                                    <span className="completion-date">
                                      {'完了'}: {new Date(task.completedAt).toLocaleString('ja-JP')}
                                    </span>
                                  </div>
                                )}
                                <button 
                                  onClick={() => deleteTask(latestEntry.id, task.id)}
                                  className="delete-task-btn"
                                >
                                  <span className="material-icons">close</span>
                                </button>
                              </>
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
            
            
            {/* タスク追加フォーム */}
            <div className="task-form-container">
              <div className="task-input-wrapper">
                <div className="input-icon">
                  <span className="material-symbols-outlined">task_alt</span>
                </div>
                <input
                  type="text"
                  placeholder="新しいタスクを入力してください..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTaskToLatest()}
                  className="enhanced-task-input"
                />
                <button
                  onClick={addTaskToLatest}
                  className="enhanced-add-button"
                  disabled={!newTaskText.trim()}
                  title="タスクを追加"
                >
                  <span className="material-symbols-outlined">add_circle</span>
                  <span className="button-text">追加</span>
                </button>
              </div>
              <div className="input-helper-text">
                Enterキーでも追加できます
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

      {/* 育成候補リストモーダル */}
      {showTrainingCandidatesModal && (
        <div className="modal-overlay">
          <div className="modal-content training-candidates-modal">
            <div className="modal-header">
              <div className="modal-header-content">
                <span className="material-symbols-outlined modal-header-icon">school</span>
                <div>
                  <h3>育成候補リスト</h3>
                  <span className="modal-header-subtitle">{trainingCandidates.length}隻の艦娘が育成中</span>
                </div>
              </div>
              <button
                onClick={() => setShowTrainingCandidatesModal(false)}
                className="modal-close-btn"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              {trainingCandidates.length === 0 ? (
                <div className="empty-state">
                  <span className="material-symbols-outlined empty-icon">school</span>
                  <p>育成候補がありません</p>
                  <p className="empty-hint">艦隊編成画面で艦船を育成候補にドラッグして追加してください</p>
                </div>
              ) : (
                <div className="training-candidates-grid">
                  {trainingCandidates.map(candidate => {
                    const isAchieved = isTrainingCandidateAchieved(candidate)
                    
                    // 達成状態はuseEffectで管理
                    
                    return (
                    <div key={candidate.id} className={`training-candidate-card ${isAchieved ? 'achieved' : ''}`}>
                      <div className="candidate-banner-container">
                        <img 
                          src={getShipBannerPath(candidate.shipId)}
                          alt={candidate.name}
                          className="ship-banner"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            // フォールバック表示を追加
                            const fallback = document.createElement('div')
                            fallback.className = 'banner-fallback'
                            fallback.textContent = candidate.name
                            e.currentTarget.parentElement?.appendChild(fallback)
                          }}
                        />
                        
                        {/* オーバーレイ情報 */}
                        <div className="candidate-overlay">
                          <div className="overlay-top">
                            <div className="candidate-level-badge">Lv.{candidate.level}</div>
                            <div className="candidate-date">{new Date(candidate.addedAt).toLocaleDateString('ja-JP')}</div>
                          </div>
                          
                          <div className="overlay-bottom">
                            <h4 className="candidate-name">
                              {candidate.name}
                              {isAchieved && (
                                <span className="achievement-badge">
                                  <span className="material-symbols-outlined">check_circle</span>
                                  達成
                                </span>
                              )}
                            </h4>
                            {(candidate.targetLevel || candidate.targetHp || candidate.targetAsw || candidate.targetLuck) && (
                              <div className="candidate-targets">
                                <div className="targets-list">
                                  {candidate.targetLevel && (
                                    <div className="target-item">
                                      <span className="material-symbols-outlined target-icon">trending_up</span>
                                      <span>Lv.{candidate.targetLevel}</span>
                                    </div>
                                  )}
                                  {candidate.targetHp && (
                                    <div className="target-item">
                                      <StatIcon icon="hp" />
                                      <span>耐久{candidate.targetHp}</span>
                                    </div>
                                  )}
                                  {candidate.targetAsw && (
                                    <div className="target-item">
                                      <StatIcon icon="asw" />
                                      <span>対潜{candidate.targetAsw}</span>
                                    </div>
                                  )}
                                  {candidate.targetLuck && (
                                    <div className="target-item">
                                      <StatIcon icon="luck" />
                                      <span>運{candidate.targetLuck}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* 育成完了ボタン */}
                            {isAchieved && (
                              <div className="candidate-complete-section">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    completeTrainingCandidate(candidate.id)
                                  }}
                                  className="complete-training-btn"
                                  title="育成完了"
                                >
                                  <span className="material-symbols-outlined">military_tech</span>
                                  <span>育成完了</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    )
                  })}
                </div>
              )}
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