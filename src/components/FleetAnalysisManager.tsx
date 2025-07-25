import { useState, useEffect, useRef } from 'react'
import { StatIcon } from './ShipStatusDisplay'
import { getShipBannerPath } from '../utils/imagePaths'
import { parseImprovements } from '../utils/shipStatsCalculator'
import { useShipData } from '../hooks/useShipData'
import KPICard from './KPICard'

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

interface ImprovementCandidate {
  id: number
  equipmentId: number
  equipmentName: string
  currentLevel: number
  targetLevel: number
  addedAt: string
  equipmentType: number
  equipmentIcon: number
  // ベースライン記録式自動達成判定用フィールド
  baselineLevels?: Record<number, number>  // 登録時点のレベル分布 {改修レベル: 所持数}
  requiredCount?: number                   // 達成必要数（デフォルト1）
  achievedCount?: number                   // 現在の達成数
  isAchieved?: boolean                     // 達成フラグ
  wasAchieved?: boolean                    // 前回の達成状態（通知用）
}

// gear_api.json形式の装備データ型
interface GearApiItem {
  api_slotitem_id: number
  api_level: number
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

// レベルによるステータス計算（FleetComposerと同じ処理）
const calculateStatFromLevel = (level: number, statMin: number, statMax: number | undefined): number => {
  if (statMin === 0 && (!statMax || statMax === 0)) {
    return 0
  }
  if (statMax === undefined || statMax === 0) {
    return statMin
  }
  if (level <= 1) {
    return statMin
  }
  if (level >= 99) {
    return statMax
  }
  if (statMax <= statMin) {
    return statMin
  }
  
  // FleetComposerと同じ正しい計算式を使用
  const ratio = (level - 1) / (99 - 1)
  return Math.floor(statMin + (statMax - statMin) * ratio)
}

const FleetAnalysisManager: React.FC<FleetAnalysisManagerProps> = ({ onFleetDataChange, onSwitchToAnalyst }) => {
  const { getShipData } = useShipData()
  const [admiralName, setAdmiralName] = useState<string>('')
  const [isFirstSetup, setIsFirstSetup] = useState<boolean>(true)
  const [tempAdmiralName, setTempAdmiralName] = useState<string>('')
  const [fleetEntries, setFleetEntries] = useState<FleetEntry[]>([])
  const [fleetData, setFleetData] = useState<string>('')
  const [persistedFleetData, setPersistedFleetData] = useState<string>('')  // 内部的な艦隊データ保持用
  const [equipmentData, setEquipmentData] = useState<string>('')  // 装備データ

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
  const [showTaskHistoryModal, setShowTaskHistoryModal] = useState<boolean>(false)
  const [showFleetRecordsModal, setShowFleetRecordsModal] = useState<boolean>(false)
  const [showTrainingCandidatesModal, setShowTrainingCandidatesModal] = useState<boolean>(false)
  const [trainingCandidates, setTrainingCandidates] = useState<TrainingCandidate[]>([])
  const [hasNewAchievements, setHasNewAchievements] = useState<boolean>(false)
  const [achievedCount, setAchievedCount] = useState<number>(0)
  const [showImprovementCandidatesModal, setShowImprovementCandidatesModal] = useState<boolean>(false)
  const [improvementCandidates, setImprovementCandidates] = useState<ImprovementCandidate[]>([])
  const [hasNewImprovementAchievements, setHasNewImprovementAchievements] = useState<boolean>(false)
  const [improvementAchievedCount, setImprovementAchievedCount] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // LocalStorage監視用（削除タイミング特定）
  useEffect(() => {
    const originalRemoveItem = localStorage.removeItem
    const originalSetItem = localStorage.setItem
    const originalClear = localStorage.clear

    localStorage.removeItem = function(key) {
      return originalRemoveItem.call(this, key)
    }

    localStorage.setItem = function(key, value) {
      return originalSetItem.call(this, key, value)
    }

    localStorage.clear = function() {
      return originalClear.call(this)
    }

    // ページの可視性変更を監視
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', () => {
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

  // 装備データフォーマットを検出して正規化
  const normalizeEquipmentData = (data: any): any[] => {
    if (!Array.isArray(data)) {
      throw new Error('装備データは配列形式である必要があります')
    }
    
    // 空の配列の場合はそのまま返す
    if (data.length === 0) return data
    
    // 最初の要素でフォーマットを判定
    const firstItem = data[0]
    
    // gear_api.json形式: [{"api_slotitem_id":103,"api_level":10}, ...]
    if (firstItem && typeof firstItem === 'object' && 'api_slotitem_id' in firstItem && 'api_level' in firstItem) {
      return data as GearApiItem[]
    }
    
    // 新しいフォーマット: [{"id":23,"lv":4}, {"id":16,"lv":0}, ...]
    if (firstItem && typeof firstItem === 'object' && 'id' in firstItem && 'lv' in firstItem) {
      return data.map((item: any) => ({
        api_slotitem_id: item.id,  // FleetComposerで期待される形式
        api_level: item.lv
      }))
    }
    
    // 従来のフォーマット: [{"api_id":1,"api_name":"12cm単装砲",...}, ...]
    if (firstItem && typeof firstItem === 'object' && 'api_id' in firstItem) {
      return data
    }
    
    throw new Error('サポートされていない装備データフォーマットです')
  }


  // 装備データの更新を処理
  const handleEquipmentDataUpdate = () => {
    if (!equipmentData.trim()) return
    
    try {
      const parsedEquipmentData = JSON.parse(equipmentData)
      const normalizedData = normalizeEquipmentData(parsedEquipmentData)
      
      // 装備データをLocalStorageに保存
      localStorage.setItem(`${admiralName}_equipmentData`, JSON.stringify(normalizedData))
      
      showToast('装備データを保存しました', 'success')
      
    } catch (error) {
      console.error('❌ 装備データ解析エラー:', error)
      showToast(`装備データの解析に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`, 'error')
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

      // 改修目標達成チェック（自動判定）
      if (improvementCandidates.length > 0) {
        checkImprovementAchievements(improvementCandidates).then(updatedCandidates => {
          // 新規達成を検知
          const newlyAchieved = updatedCandidates.filter(candidate => 
            candidate.isAchieved && !candidate.wasAchieved
          )
          
          if (newlyAchieved.length > 0) {
            setHasNewImprovementAchievements(true)
            setImprovementAchievedCount(newlyAchieved.length)
            
            // 達成通知
            newlyAchieved.forEach(achievement => {
              showToast(
                `🔧 改修目標達成！ ${achievement.equipmentName}★${achievement.targetLevel} (${achievement.achievedCount}/${achievement.requiredCount || 1})`,
                'success'
              )
            })
            
            // LocalStorageを更新
            localStorage.setItem(`${admiralName}_improvementCandidates`, JSON.stringify(updatedCandidates))
          }
          
          setImprovementCandidates(updatedCandidates)
        }).catch(error => {
          console.error('改修達成判定エラー:', error)
        })
      }
      
      // 達成チェック後に新しいエントリーを作成
      const stats = calculateFleetStats(fleetData)
      
      // LocalStorageから最新の状態を取得（Reactの状態更新は非同期のため）
      const latestEntries = JSON.parse(localStorage.getItem(`${admiralName}_fleetEntries`) || '[]')
      const currentLatest = latestEntries.find((entry: any) => entry.isLatest)
      
      // 育成タスクは未完了のみ引き継ぎ、その他も未達成のみ引き継ぐ
      const allTasks = currentLatest?.tasks || []
      const trainingTasks = allTasks.filter((task: Task) => isTrainingTask(task.text) && !task.completed)
      const nonTrainingIncompleteTasks = allTasks.filter((task: Task) => !isTrainingTask(task.text) && !task.completed)
      const tasksToInherit = [...trainingTasks, ...nonTrainingIncompleteTasks]
      
      
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
      
      // 保存前にLocalStorageの状態を確認
      
      // ブラウザストレージ容量の確認
      try {
        const testKey = 'storage_test_' + Date.now()
        const testData = 'x'.repeat(1000000) // 1MB
        localStorage.setItem(testKey, testData)
        localStorage.removeItem(testKey)
      } catch (e) {
      }
      
      localStorage.setItem(key, jsonData)
      
      // 最新の艦隊データも保存（達成チェック用）
      localStorage.setItem(`${admiralName}_latestFleetData`, fleetData)
      setPersistedFleetData(fleetData)  // 内部保持用にも保存
      
      
      // 初回セットアップ状態を確実に解除
      if (isFirstSetup) {
        setIsFirstSetup(false)
        setShowWelcome(false)
      }
      
      // フィールドをクリア
      setFleetData('')
      
      
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

    // 改修リスト通知状態の復元
    const savedHasNewImprovementAchievements = localStorage.getItem('fleetAnalysis_hasNewImprovementAchievements')
    const savedImprovementAchievedCount = localStorage.getItem('fleetAnalysis_improvementAchievedCount')
    
    if (savedHasNewImprovementAchievements !== null) {
      setHasNewImprovementAchievements(savedHasNewImprovementAchievements === 'true')
    }
    if (savedImprovementAchievedCount !== null) {
      setImprovementAchievedCount(parseInt(savedImprovementAchievedCount, 10) || 0)
    }
    
    if (savedAdmiralName) {
      setAdmiralName(savedAdmiralName)
      setIsFirstSetup(false)
      loadFleetEntries(savedAdmiralName)
      
      // 最新の艦隊データを復元（入力フィールドには表示しない）
      const savedFleetData = localStorage.getItem(`${savedAdmiralName}_latestFleetData`)
      if (savedFleetData) {
        setPersistedFleetData(savedFleetData)
      }
    } else {
      setIsFirstSetup(true)
      setShowWelcome(true)
    }
    
    // 育成リストを読み込み
    loadTrainingCandidates()
  }, [])

  // 改修リストの初回読み込み（提督名が設定されている時のみ）
  useEffect(() => {
    if (admiralName) {
      loadImprovementCandidates()
    }
  }, [admiralName])

  // localStorageの変更を監視して育成リスト・改修リストを自動更新
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'fleetComposer_trainingCandidates' && e.newValue) {
        loadTrainingCandidates()
      }
      
      // 改修リストの監視を追加
      if (e.key === `${admiralName}_improvementCandidates` && e.newValue) {
        loadImprovementCandidates()
      }
    }

    // 同じウィンドウ内での変更も監視するためのカスタムイベント
    const handleTrainingCandidatesUpdate = () => {
      loadTrainingCandidates()
    }

    // 改修リスト用のカスタムイベント追加
    const handleImprovementCandidatesUpdate = () => {
      loadImprovementCandidates()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('trainingCandidatesUpdated', handleTrainingCandidatesUpdate)
    window.addEventListener('improvementCandidatesUpdated', handleImprovementCandidatesUpdate)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('trainingCandidatesUpdated', handleTrainingCandidatesUpdate)
      window.removeEventListener('improvementCandidatesUpdated', handleImprovementCandidatesUpdate)
    }
  }, [admiralName])

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

  // 改修リスト通知状態の永続化
  useEffect(() => {
    localStorage.setItem('fleetAnalysis_hasNewImprovementAchievements', hasNewImprovementAchievements.toString())
  }, [hasNewImprovementAchievements])

  useEffect(() => {
    localStorage.setItem('fleetAnalysis_improvementAchievedCount', improvementAchievedCount.toString())
  }, [improvementAchievedCount])

  // 育成リストの達成状態を監視して通知を同期
  useEffect(() => {
    // 育成リストデータがあり、かつ艦隊データがある場合のみ達成チェック
    const currentFleetData = fleetData || persistedFleetData
    if (trainingCandidates.length > 0 && currentFleetData) {
      const currentAchievedCount = trainingCandidates.filter(candidate => 
        isTrainingCandidateAchieved(candidate)
      ).length
      
      // 達成数が変化した場合のみ更新
      if (currentAchievedCount !== achievedCount) {
        setAchievedCount(currentAchievedCount)
        setHasNewAchievements(currentAchievedCount > 0)
      }
    }
    // 育成リストがない場合のみ通知をクリア（fleetDataが空でも通知は保持）
    else if (trainingCandidates.length === 0) {
      setAchievedCount(0)
      setHasNewAchievements(false)
    }
  }, [trainingCandidates, fleetData, persistedFleetData, achievedCount])

  // 改修リストの達成状態を監視して通知を同期（無限ループ修正版）
  useEffect(() => {
    if (improvementCandidates.length > 0) {
      checkImprovementAchievements(improvementCandidates).then(updatedCandidates => {
        // ベースラインがある（新システム）の達成済み候補数を計算
        const currentAchievedCount = updatedCandidates.filter(candidate => 
          candidate.isAchieved && candidate.baselineLevels
        ).length
        
        // 手動完了可能（従来システム）の候補数も追加
        const manualCompletableCount = updatedCandidates.filter(candidate =>
          !candidate.baselineLevels && candidate.currentLevel >= candidate.targetLevel
        ).length
        
        const totalAchievableCount = currentAchievedCount + manualCompletableCount
        
        // 達成数が変化した場合のみ更新
        if (totalAchievableCount !== improvementAchievedCount) {
          setImprovementAchievedCount(totalAchievableCount)
          setHasNewImprovementAchievements(totalAchievableCount > 0)
        }
        
        // 状態は更新しない（無限ループ防止）
        // setImprovementCandidates(updatedCandidates) // コメントアウト
      }).catch(error => {
        console.error('改修達成状態監視エラー:', error)
      })
    }
    // 改修リストがない場合は通知をクリア
    else if (improvementCandidates.length === 0) {
      setImprovementAchievedCount(0)
      setHasNewImprovementAchievements(false)
    }
  }, [improvementCandidates]) // improvementAchievedCountを依存配列から削除

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
        ;(window as any).lastStorageCount = count
      }
    }
    
    const storageInterval = setInterval(checkLocalStorage, 1000)

    // FleetComposerからのカスタムイベントを監視（即座の同期）
    const handleFleetEntriesUpdated = (event: CustomEvent) => {
      try {
        const { updatedEntries } = event.detail
        if (updatedEntries) {
          const processedEntries = updatedEntries.map((entry: FleetEntry) => ({
            ...entry,
            luckModTotal: entry.luckModTotal ?? 0,
            hpModTotal: entry.hpModTotal ?? 0,
            aswModTotal: entry.aswModTotal ?? 0
          }))
          setFleetEntries(processedEntries)
        }
      } catch (error) {
        console.error('カスタムイベント処理に失敗:', error)
      }
    }


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
  }, [fleetEntries, admiralName])

  // 艦隊エントリーの読み込み
  const loadFleetEntries = (admiral: string) => {
    const saved = localStorage.getItem(`${admiral}_fleetEntries`)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        
        // 空の配列の場合は読み込みをスキップ
        if (parsed.length === 0) {
          return
        }
        
        // 後方互換性のため、改修合計値が未定義の場合は0に設定
        const updatedEntries = parsed.map((entry: FleetEntry) => ({
          ...entry,
          luckModTotal: entry.luckModTotal ?? 0,
          hpModTotal: entry.hpModTotal ?? 0,
          aswModTotal: entry.aswModTotal ?? 0
        }))
        setFleetEntries(updatedEntries)
      } catch (error) {
        console.error('Failed to load fleet entries:', error)
        localStorage.removeItem(`${admiral}_fleetEntries`)
        setFleetEntries([])
      }
    } else {
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

  // 育成リストをタスクIDで削除
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
  const getTotalTasks = () => {
    return fleetEntries.reduce((total, entry) => {
      const filteredTasks = filterTasksForDisplay(entry.tasks)
      return total + filteredTasks.length
    }, 0)
  }

  // 育成リストのmainTaskIdを取得
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

  // 育成リストタスクのフィルタリング
  const filterTasksForDisplay = (tasks: Task[]): Task[] => {
    if (!showTrainingTasksOnly) return tasks
    
    const trainingTaskIds = getTrainingCandidatesMainTaskIds()
    
    return tasks.filter(task => {
      // 現在の育成リストにあるタスク（継承されたタスクを含む）
      const taskIdToCheck = task.originalTaskId || task.inheritedFrom || task.id
      const isInCurrentTrainingList = trainingTaskIds.includes(task.id) || 
          trainingTaskIds.includes(taskIdToCheck) ||
          (task.originalTaskId && trainingTaskIds.includes(task.originalTaskId))
      
      if (isInCurrentTrainingList) {
        return true
      }
      
      // 達成済み育成タスクは育成リストの状態に関係なく表示
      const isCompletedTrainingTask = task.completed && isTrainingTask(task.text)
      if (isCompletedTrainingTask) {
        return true
      }
      
      return false
    })
  }

  // 育成タスクかどうかの判定（シンプル版）
  const isTrainingTask = (taskText: string): boolean => {
    return taskText.includes('を育成する')
  }

  // 育成リストを読み込む
  const loadTrainingCandidates = () => {
    try {
      const stored = localStorage.getItem('fleetComposer_trainingCandidates')
      if (stored) {
        const candidates = JSON.parse(stored) as TrainingCandidate[]
        setTrainingCandidates(candidates)
      } else {
        setTrainingCandidates([])
      }
    } catch (error) {
      console.error('育成リスト読み込みエラー:', error)
      setTrainingCandidates([])
    }
  }

  // 改修リストの読み込み
  const loadImprovementCandidates = () => {
    try {
      const stored = localStorage.getItem(`${admiralName}_improvementCandidates`)
      if (stored) {
        const candidates = JSON.parse(stored) as ImprovementCandidate[]
        setImprovementCandidates(candidates)
      } else {
        setImprovementCandidates([])
      }
    } catch (error) {
      console.error('改修リスト読み込みエラー:', error)
      setImprovementCandidates([])
    }
  }

  // 装備レベル分布を取得する関数
  const getEquipmentLevelDistribution = (gearData: GearApiItem[], equipmentId: number): Record<number, number> => {
    const distribution: Record<number, number> = {}
    
    gearData
      .filter(gear => gear.api_slotitem_id === equipmentId)
      .forEach(gear => {
        const level = gear.api_level || 0
        distribution[level] = (distribution[level] || 0) + 1
      })
    
    return distribution
  }

  // gear_api.jsonからの装備データ取得
  const getCurrentEquipmentData = async (): Promise<GearApiItem[]> => {
    try {
      // FleetComposerから装備データを取得する仕組みを利用
      const stored = localStorage.getItem('fleetComposer_fleetData')
      if (stored) {
        const fleetComposerData = JSON.parse(stored)
        // gear_api.jsonがある場合はそれを優先、なければ空配列
        if (fleetComposerData.gear_api) {
          return fleetComposerData.gear_api as GearApiItem[]
        }
      }
      return []
    } catch (error) {
      console.error('装備データ取得エラー:', error)
      return []
    }
  }

  // 改修リストの自動達成判定
  const checkImprovementAchievements = async (candidates: ImprovementCandidate[]): Promise<ImprovementCandidate[]> => {
    try {
      const currentGear = await getCurrentEquipmentData()
      
      return candidates.map(candidate => {
        // ベースラインがない場合はスキップ（既存データ）
        if (!candidate.baselineLevels) {
          return candidate
        }
        
        // 現在のレベル分布を取得
        const currentLevels = getEquipmentLevelDistribution(currentGear, candidate.equipmentId)
        
        // 目標レベル以上の装備数を計算
        const currentTargetCount = Object.entries(currentLevels)
          .filter(([level, _]) => parseInt(level) >= candidate.targetLevel)
          .reduce((sum, [_, count]) => sum + count, 0)
          
        const baselineTargetCount = Object.entries(candidate.baselineLevels)
          .filter(([level, _]) => parseInt(level) >= candidate.targetLevel)
          .reduce((sum, [_, count]) => sum + count, 0)
          
        // 増分 = 新たに目標レベルに達した装備数
        const achievedCount = Math.max(0, currentTargetCount - baselineTargetCount)
        const requiredCount = candidate.requiredCount || 1
        const isAchieved = achievedCount >= requiredCount
        
        return {
          ...candidate,
          achievedCount,
          isAchieved,
          wasAchieved: candidate.isAchieved || false  // 前回の状態を保存
        }
      })
    } catch (error) {
      console.error('改修達成判定エラー:', error)
      return candidates
    }
  }

  // 改修リストから削除
  const removeFromImprovementCandidates = (candidateId: number) => {
    const updatedCandidates = improvementCandidates.filter(c => c.id !== candidateId)
    setImprovementCandidates(updatedCandidates)
    localStorage.setItem(`${admiralName}_improvementCandidates`, JSON.stringify(updatedCandidates))
    
    const candidate = improvementCandidates.find(c => c.id === candidateId)
    if (candidate) {
      showToast(`${candidate.equipmentName}★${candidate.currentLevel}の改修を完了しました！`, 'success')
    }
  }

  // 改修リストの目標値更新（将来の拡張用）
  // const updateImprovementTargetLevel = (candidateId: number, targetLevel: number) => {
  //   const updatedCandidates = improvementCandidates.map(c => 
  //     c.id === candidateId ? { ...c, targetLevel } : c
  //   )
  //   setImprovementCandidates(updatedCandidates)
  //   localStorage.setItem(`${admiralName}_improvementCandidates`, JSON.stringify(updatedCandidates))
  // }

  // 個別の育成リストの達成状態をチェック
  const isTrainingCandidateAchieved = (candidate: TrainingCandidate): boolean => {
    // fleetDataがない場合は、persistedFleetDataまたは最新エントリーから艦隊データを取得を試みる
    let currentFleetData = fleetData || persistedFleetData
    if (!currentFleetData) {
      const latestEntry = fleetEntries.find(entry => entry.isLatest)
      if (latestEntry) {
        // 最新エントリーに保存されている生のJSONデータを探す
        const savedFleetData = localStorage.getItem(`${admiralName}_latestFleetData`)
        if (savedFleetData) {
          currentFleetData = savedFleetData
        }
      }
    }
    
    if (!currentFleetData) {
      return false
    }
    
    try {
      const data = JSON.parse(currentFleetData)
      const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
      
      
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


      if (!targetShip) {
        return false
      }

      const level = targetShip.lv || targetShip.api_lv
      const shipId = targetShip.ship_id || targetShip.api_ship_id
      
      
      // マスターデータを取得（FleetComposerと同じ関数を使用）
      const masterData = getShipData(shipId)
      if (!masterData) {
        console.error('マスターデータが見つかりません:', {
          searchedShipId: shipId,
          candidateName: candidate.name,
          candidateShipId: candidate.shipId
        })
        return false
      }
      

      // 改修値を解析（艦隊編成と同じ処理）
      const improvements = parseImprovements(targetShip.api_kyouka || targetShip.st || [])
      
      // APIステータス値を取得（FleetComposerと同じフォールバック順序）
      // const apiFirepower = targetShip.api_karyoku ? targetShip.api_karyoku[0] : (targetShip.karyoku ? targetShip.karyoku[0] : masterData.initialStats.firepower)
      // const apiTorpedo = targetShip.api_raisou ? targetShip.api_raisou[0] : (targetShip.raisou ? targetShip.raisou[0] : masterData.initialStats.torpedo)
      // const apiAA = targetShip.api_taiku ? targetShip.api_taiku[0] : (targetShip.taiku ? targetShip.taiku[0] : masterData.initialStats.aa)
      // const apiArmor = targetShip.api_soukou ? targetShip.api_soukou[0] : (targetShip.soukou ? targetShip.soukou[0] : masterData.initialStats.armor)
      const apiLuck = targetShip.api_lucky ? targetShip.api_lucky[0] : (targetShip.lucky ? targetShip.lucky[0] : masterData.initialStats.luck)
      // const apiAsw = targetShip.api_taisen ? targetShip.api_taisen[0] : (targetShip.taisen ? targetShip.taisen[0] : undefined)
      
      // レベル依存ステータス（最大値の取得）- FleetComposerと同じ計算
      let aswMax = masterData.initialStats.aswMax || (
        masterData.initialStats.asw > 0 ? masterData.initialStats.asw + 20 : 0
      )
      
      // FleetComposerのaswMax計算ロジックを適用
      if (masterData.name === '吹雪改二') {
        aswMax = 94  // FleetComposerで実際に使用されている値
      }
      // const evasionMax = masterData.initialStats.evasionMax || (
      //   masterData.initialStats.evasion > 0 ? masterData.initialStats.evasion + 30 : masterData.initialStats.evasion
      // )
      // const losMax = masterData.initialStats.losMax || (
      //   masterData.initialStats.los > 0 ? masterData.initialStats.los + 20 : masterData.initialStats.los
      // )
      
      // レベル成長ステータスを計算
      const levelBasedAsw = calculateStatFromLevel(level, masterData.initialStats.asw, aswMax)
      
      // 最終ステータスを計算（艦隊編成と同じ処理）
      // ケッコン判定
      const isMarried = level >= 100
      
      // HP計算：レベル100超え（ケッコン艦）の場合はhpMarriedを参照
      const baseHp = isMarried && masterData.initialStats.hpMarried 
        ? masterData.initialStats.hpMarried 
        : masterData.initialStats.hp
      
      const hp = baseHp + (improvements.hp || 0)
      // 対潜: FleetComposerと完全に同じ計算（レベル成長値 + 改修値のみ）
      const asw = levelBasedAsw + (improvements.asw || 0)
      const luck = apiLuck + (improvements.luck || 0)


      // 目標達成チェック（目標が0の場合も未設定と同じ扱い）
      const isLevelAchieved = !candidate.targetLevel || candidate.targetLevel <= 0 || level >= candidate.targetLevel
      const isHpAchieved = !candidate.targetHp || candidate.targetHp <= 0 || hp >= candidate.targetHp
      const isAswAchieved = !candidate.targetAsw || candidate.targetAsw <= 0 || asw >= candidate.targetAsw
      const isLuckAchieved = !candidate.targetLuck || candidate.targetLuck <= 0 || luck >= candidate.targetLuck

      const allAchieved = isLevelAchieved && isHpAchieved && isAswAchieved && isLuckAchieved


      return allAchieved
    } catch (error) {
      console.error('個別育成達成チェックエラー:', error)
      return false
    }
  }

  // 育成リストを完了状態にする
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
      
    } catch (error) {
      console.error('育成リスト完了エラー:', error)
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
          const shipId = matchingShip.ship_id || matchingShip.api_ship_id
          
          // マスターデータを取得（FleetComposerと同じ関数を使用）
          const masterData = getShipData(shipId)
          if (!masterData) {
            console.error('マスターデータが見つかりません:', shipId)
            return
          }

          // 改修値を解析（艦隊編成と同じ処理）
          const improvements = parseImprovements(matchingShip.api_kyouka || matchingShip.st || [])
          
          // APIステータス値を取得（FleetComposerと同じフォールバック順序）
          const apiLuck = matchingShip.api_lucky ? matchingShip.api_lucky[0] : (matchingShip.lucky ? matchingShip.lucky[0] : masterData.initialStats.luck)
          // const apiAsw = matchingShip.api_taisen ? matchingShip.api_taisen[0] : (matchingShip.taisen ? matchingShip.taisen[0] : undefined)
          
          // レベル依存ステータス（最大値の取得）- FleetComposerと同じ計算
          let aswMax = masterData.initialStats.aswMax || (
            masterData.initialStats.asw > 0 ? masterData.initialStats.asw + 20 : 0
          )
          
          // FleetComposerのaswMax計算ロジックを適用
          if (masterData.name === '吹雪改二') {
            aswMax = 94  // FleetComposerで実際に使用されている値
          }
          
          // レベル成長ステータスを計算
          const levelBasedAsw = calculateStatFromLevel(level, masterData.initialStats.asw, aswMax)
          
          // 最終ステータスを計算（艦隊編成と同じ処理）
          // ケッコン判定
          const isMarried = level >= 100
          
          // HP計算：レベル100超え（ケッコン艦）の場合はhpMarriedを参照
          const baseHp = isMarried && masterData.initialStats.hpMarried 
            ? masterData.initialStats.hpMarried 
            : masterData.initialStats.hp
          
          const hp = baseHp + (improvements.hp || 0)
          // 対潜: FleetComposerと完全に同じ計算（レベル成長値 + 改修値のみ）
          const asw = levelBasedAsw + (improvements.asw || 0)
          const luck = apiLuck + (improvements.luck || 0)

          // 目標達成チェック
          const isLevelAchieved = !candidate.targetLevel || level >= candidate.targetLevel
          const isHpAchieved = !candidate.targetHp || hp >= candidate.targetHp
          const isAswAchieved = !candidate.targetAsw || asw >= candidate.targetAsw
          const isLuckAchieved = !candidate.targetLuck || luck >= candidate.targetLuck

          if (isLevelAchieved && isHpAchieved && isAswAchieved && isLuckAchieved) {
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

  // 育成リストの情報を取得
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

  // KPIカードデータの計算
  const calculateKPIData = () => {
    if (!latestEntry) return null;

    const previousEntry = fleetEntries
      .filter(entry => !entry.isLatest && entry.createdAt)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

    const current = latestEntry;
    const previous = previousEntry;

    return {
      totalExp: {
        current: current.totalExp,
        previous: previous?.totalExp,
        trend: previous ? (current.totalExp > previous.totalExp ? 'up' : current.totalExp < previous.totalExp ? 'down' : 'neutral') : 'neutral'
      },
      shipCount: {
        current: current.shipCount,
        previous: previous?.shipCount,
        trend: previous ? (current.shipCount > previous.shipCount ? 'up' : current.shipCount < previous.shipCount ? 'down' : 'neutral') : 'neutral'
      },
      marriedCount: {
        current: current.marriedCount,
        previous: previous?.marriedCount,
        trend: previous ? (current.marriedCount > previous.marriedCount ? 'up' : current.marriedCount < previous.marriedCount ? 'down' : 'neutral') : 'neutral'
      },
      luckMods: {
        current: current.luckModTotal,
        previous: previous?.luckModTotal,
        trend: previous ? (current.luckModTotal > previous.luckModTotal ? 'up' : current.luckModTotal < previous.luckModTotal ? 'down' : 'neutral') : 'neutral'
      },
      hpMods: {
        current: current.hpModTotal,
        previous: previous?.hpModTotal,
        trend: previous ? (current.hpModTotal > previous.hpModTotal ? 'up' : current.hpModTotal < previous.hpModTotal ? 'down' : 'neutral') : 'neutral'
      },
      aswMods: {
        current: current.aswModTotal,
        previous: previous?.aswModTotal,
        trend: previous ? (current.aswModTotal > previous.aswModTotal ? 'up' : current.aswModTotal < previous.aswModTotal ? 'down' : 'neutral') : 'neutral'
      }
    };
  };

  // メイン画面
  const latestEntry = fleetEntries.find(entry => entry.isLatest)
  const kpiData = calculateKPIData();

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
                handleFleetDataUpdate()
                // データ処理後にテキストフィールドをクリア
                setFleetData('')
              }}
              className="fleet-update-btn-inside"
              disabled={!fleetData.trim()}
              title="艦隊データを反映"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          
          <div className="fleet-input-wrapper">
            <input
              type="text"
              value={equipmentData}
              onChange={(e) => setEquipmentData(e.target.value)}
              placeholder={'装備のJSONデータをここに貼り付けてください...'}
              className="fleet-data-input"
            />
            <button
              onClick={() => {
                handleEquipmentDataUpdate()
                // データ処理後にテキストフィールドをクリア
                setEquipmentData('')
              }}
              className="fleet-update-btn-inside"
              disabled={!equipmentData.trim()}
              title="装備データを反映"
            >
              <span className="material-symbols-outlined">military_tech</span>
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
      
      {/* KPIカードダッシュボード */}
      {latestEntry && kpiData && (
        <div className="kpi-dashboard">
          <div className="kpi-grid">
            <KPICard
              title="総経験値"
              value={privacyMode === true ? '*'.repeat(4) : kpiData.totalExp.current}
              previousValue={kpiData.totalExp.previous}
              icon="trending_up"
              trend={kpiData.totalExp.trend as 'up' | 'down' | 'neutral'}
              color="primary"
              onClick={() => setShowFleetRecordsModal(true)}
            />
            <KPICard
              title="艦数"
              value={privacyMode === true ? '*'.repeat(3) : kpiData.shipCount.current}
              previousValue={kpiData.shipCount.previous}
              icon="directions_boat"
              trend={kpiData.shipCount.trend as 'up' | 'down' | 'neutral'}
              color="info"
              onClick={() => setShowFleetRecordsModal(true)}
            />
            <KPICard
              title="ケッコン艦"
              value={privacyMode === true ? '*'.repeat(2) : kpiData.marriedCount.current}
              previousValue={kpiData.marriedCount.previous}
              icon="favorite"
              trend={kpiData.marriedCount.trend as 'up' | 'down' | 'neutral'}
              color="warning"
              onClick={() => setShowFleetRecordsModal(true)}
            />
            <KPICard
              title="運改修"
              value={privacyMode === true ? '*'.repeat(3) : kpiData.luckMods.current}
              previousValue={kpiData.luckMods.previous}
              icon="luck"
              iconType="stat"
              trend={kpiData.luckMods.trend as 'up' | 'down' | 'neutral'}
              color="success"
              onClick={() => setShowFleetRecordsModal(true)}
            />
            <KPICard
              title="耐久改修"
              value={privacyMode === true ? '*'.repeat(3) : kpiData.hpMods.current}
              previousValue={kpiData.hpMods.previous}
              icon="hp"
              iconType="stat"
              trend={kpiData.hpMods.trend as 'up' | 'down' | 'neutral'}
              color="info"
              onClick={() => setShowFleetRecordsModal(true)}
            />
            <KPICard
              title="対潜改修"
              value={privacyMode === true ? '*'.repeat(3) : kpiData.aswMods.current}
              previousValue={kpiData.aswMods.previous}
              icon="asw"
              iconType="stat"
              trend={kpiData.aswMods.trend as 'up' | 'down' | 'neutral'}
              color="primary"
              onClick={() => setShowFleetRecordsModal(true)}
            />
          </div>

          {/* クイックアクション */}
          <div className="quick-actions">
            <div className="quick-action-card">
              <button
                onClick={() => {
                  loadTrainingCandidates()
                  setShowTrainingCandidatesModal(true)
                  setHasNewAchievements(false)
                }}
                className="quick-action-button"
                title="育成リストを表示"
              >
                <span className="material-symbols-outlined">psychology</span>
                <div className="quick-action-content">
                  <span className="quick-action-title">育成リスト</span>
                  <span className="quick-action-count">{trainingCandidates.length}</span>
                </div>
                {hasNewAchievements && (
                  <span className="notification-badge">{achievedCount}</span>
                )}
              </button>
            </div>
            <div className="quick-action-card">
              <button
                onClick={async () => {
                  loadImprovementCandidates()
                  try {
                    const candidates = JSON.parse(localStorage.getItem(`${admiralName}_improvementCandidates`) || '[]')
                    if (candidates.length > 0) {
                      const updatedCandidates = await checkImprovementAchievements(candidates)
                      setImprovementCandidates(updatedCandidates)
                    }
                  } catch (error) {
                    
                  }
                  setShowImprovementCandidatesModal(true)
                }}
                className="quick-action-button"
                title="改修リストを表示"
              >
                <span className="material-symbols-outlined">build</span>
                <div className="quick-action-content">
                  <span className="quick-action-title">改修リスト</span>
                  <span className="quick-action-count">{improvementCandidates.length}</span>
                </div>
                {hasNewImprovementAchievements && (
                  <span className="notification-badge">{improvementAchievedCount}</span>
                )}
              </button>
            </div>
            <div className="quick-action-card">
              <button
                onClick={() => setShowTaskHistoryModal(true)}
                className="quick-action-button"
                title="タスク履歴を表示"
              >
                <span className="material-symbols-outlined">history</span>
                <div className="quick-action-content">
                  <span className="quick-action-title">タスク履歴</span>
                  <span className="quick-action-count">{privacyMode === true ? '*' : getTotalTasks()}</span>
                </div>
              </button>
            </div>
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
              <div className="modal-header-content">
                <span className="material-symbols-outlined modal-header-icon">person</span>
                <div>
                  <h3>提督変更</h3>
                  <span className="modal-header-subtitle">提督名: {admiralName}</span>
                </div>
              </div>
              <button onClick={() => setShowAdmiralModal(false)} className="modal-close-btn">
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
              <div className="modal-header-content">
                <span className="material-symbols-outlined modal-header-icon">history</span>
                <div>
                  <h3>タスク履歴</h3>
                  <span className="modal-header-subtitle">全{fleetEntries.reduce((acc, entry) => acc + entry.tasks.length, 0)}個のタスク</span>
                </div>
              </div>
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


      {/* 艦隊記録モーダル */}
      {showFleetRecordsModal && (
        <div className="modal-overlay">
          <div className="modal-content fleet-records-modal">
            <div className="modal-header">
              <div className="modal-header-content">
                <span className="material-symbols-outlined modal-header-icon">sailing</span>
                <div>
                  <h3>艦隊記録一覧</h3>
                  <span className="modal-header-subtitle">{fleetEntries.length}件の艦隊記録</span>
                </div>
              </div>
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
                        <span className="stat-value">{privacyMode ? maskValue(entry.totalExp) : entry.totalExp.toLocaleString()}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">艦船数</span>
                        <span className="stat-value">{privacyMode ? maskValue(entry.shipCount) : entry.shipCount}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">ケッコン艦</span>
                        <span className="stat-value">{privacyMode ? maskValue(entry.marriedCount) : entry.marriedCount}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">運改修</span>
                        <span className="stat-value">{privacyMode ? maskValue(entry.luckModTotal) : entry.luckModTotal}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">耐久改修</span>
                        <span className="stat-value">{privacyMode ? maskValue(entry.hpModTotal) : entry.hpModTotal}</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">対潜改修</span>
                        <span className="stat-value">{privacyMode ? maskValue(entry.aswModTotal) : entry.aswModTotal}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 育成リストモーダル */}
      {showTrainingCandidatesModal && (
        <div className="modal-overlay">
          <div className="modal-content training-candidates-modal">
            <div className="modal-header">
              <div className="modal-header-content">
                <span className="material-symbols-outlined modal-header-icon">school</span>
                <div>
                  <h3>育成リスト</h3>
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
                  <p>育成リストがありません</p>
                  <p className="empty-hint">艦隊編成画面で艦船を育成リストにドラッグして追加してください</p>
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

      {/* 改修リストモーダル */}
      {showImprovementCandidatesModal && (
        <div className="modal-overlay">
          <div className="modal-content improvement-candidates-modal">
            <div className="modal-header">
              <div className="modal-header-content">
                <span className="material-symbols-outlined modal-header-icon">build</span>
                <div>
                  <h3>改修リスト</h3>
                  <span className="modal-header-subtitle">{improvementCandidates.length}個の装備が改修待ち</span>
                </div>
              </div>
              <button
                onClick={() => setShowImprovementCandidatesModal(false)}
                className="modal-close-btn"
              >
                <span className="material-icons">close</span>
              </button>
            </div>
            <div className="modal-body">
              {improvementCandidates.length === 0 ? (
                <div className="empty-state">
                  <span className="material-symbols-outlined empty-icon">build</span>
                  <p>改修リストがありません</p>
                  <p className="empty-hint">艦隊編成画面で装備を改修リストにドラッグして追加してください</p>
                </div>
              ) : (
                <div className="improvement-candidates-grid">
                  {improvementCandidates.map(candidate => (
                    <div key={candidate.id} className="improvement-candidate-card">
                      <div className="improvement-card-header">
                        <div className="improvement-equipment-icon">
                          <img 
                            src={`/FleetAnalystManager/images/type/icon${candidate.equipmentIcon || 1}.png`}
                            alt={candidate.equipmentName}
                            className="equipment-type-icon"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling;
                              if (fallback) fallback.classList.remove('hidden');
                            }}
                          />
                          <span className="equipment-icon-fallback hidden">⚙</span>
                        </div>
                        <div className="improvement-date-badge">
                          {new Date(candidate.addedAt).toLocaleDateString('ja-JP')}
                        </div>
                      </div>
                      
                      <div className="improvement-card-body">
                        <h4 className="improvement-equipment-name">
                          {candidate.equipmentName}
                          {candidate.isAchieved && (
                            <span className="achievement-badge">✨達成</span>
                          )}
                        </h4>
                        
                        <div className="improvement-progress-display">
                          <div className="improvement-status">
                            <span className="improvement-label">現在</span>
                            <span className="improvement-value current">★{candidate.currentLevel}</span>
                          </div>
                          <span className="improvement-arrow-icon">→</span>
                          <div className="improvement-status">
                            <span className="improvement-label">目標</span>
                            <span className="improvement-value target">★{candidate.targetLevel}</span>
                          </div>
                        </div>

                        {/* ベースライン式の進捗表示 */}
                        {candidate.baselineLevels && (
                          <div className="improvement-achievement-progress">
                            <span className="improvement-progress-text">
                              達成進捗: {candidate.achievedCount || 0}/{candidate.requiredCount || 1}本
                            </span>
                          </div>
                        )}
                        
                        <div className="improvement-progress-bar">
                          <div 
                            className="improvement-progress-fill"
                            style={{ 
                              width: candidate.baselineLevels 
                                ? `${Math.min(((candidate.achievedCount || 0) / (candidate.requiredCount || 1)) * 100, 100)}%`
                                : `${(candidate.currentLevel / candidate.targetLevel) * 100}%`
                            }}
                          />
                        </div>
                        
                        {/* 改修完了ボタン - 手動完了 or 自動達成完了 */}
                        {(candidate.isAchieved || candidate.currentLevel >= candidate.targetLevel) && (
                          <div className="improvement-complete-section">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                // 達成バッジを個別減算（育成リストと同様）
                                if (candidate.isAchieved || candidate.currentLevel >= candidate.targetLevel) {
                                  const newImprovementAchievedCount = Math.max(0, improvementAchievedCount - 1)
                                  setImprovementAchievedCount(newImprovementAchievedCount)
                                  
                                  // すべて完了した場合のみ通知をクリア
                                  if (newImprovementAchievedCount === 0) {
                                    setHasNewImprovementAchievements(false)
                                  }
                                }
                                removeFromImprovementCandidates(candidate.id)
                              }}
                              className={`complete-improvement-btn ${candidate.isAchieved ? 'achieved' : ''}`}
                              title={candidate.isAchieved ? "目標達成 - 完了" : "改修完了"}
                            >
                              <span className="material-symbols-outlined">
                                {candidate.isAchieved ? 'celebration' : 'build_circle'}
                              </span>
                              <span>{candidate.isAchieved ? '目標達成完了' : '改修完了'}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {improvementCandidates.length > 0 && (
                <div className="modal-footer-hint">
                  <span className="material-icons">info</span>
                  <span>改修目標の変更は艦隊編成画面の改修リストタブで行ってください</span>
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