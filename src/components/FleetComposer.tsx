import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  SHIP_TYPES, 
  getShipTypeByShipType,
  calculateRarity
} from '../data/shipMasterDataCore'
import { useShipData } from '../hooks/useShipData'
import { parseImprovements } from '../utils/shipStatsCalculator'
import ShipStatusDisplay from './ShipStatusDisplay'

// 装備マスターデータの型定義
interface EquipmentMaster {
  api_id: number
  api_sortno: number
  api_name: string
  api_type: number[] // [大分類, 中分類, 小分類, アイコン種別, 0]
  api_houg: number  // 火力
  api_raig: number  // 雷装
  api_tyku: number  // 対空
  api_tais: number  // 対潜
  api_souk: number  // 装甲
  api_houm: number  // 命中
  api_houk: number  // 回避
  api_saku: number  // 索敵
  api_leng: number  // 射程
  api_rare: number  // レア度
}

// 所持装備データの型定義
interface OwnedEquipment {
  api_slotitem_id: number  // マスターデータのID
  api_level: number        // 改修値
}

// 装備データ（マスター + 所持情報）
interface Equipment extends EquipmentMaster {
  improvement_level?: number  // 改修値
  original_id?: number        // 元のマスターデータID
}

// 装備種別の定義（api_type[2]の値に基づく）
const EQUIPMENT_TYPES = {
  1: '小口径主砲',
  2: '中口径主砲',
  3: '大口径主砲',
  4: '副砲',
  5: '魚雷',
  6: '艦上戦闘機',
  7: '艦上爆撃機',
  8: '艦上攻撃機',
  9: '艦上偵察機',
  10: '水上偵察機',
  11: '水上爆撃機',
  12: '小型電探',
  13: '大型電探',
  14: 'ソナー',
  15: '爆雷',
  17: '機関部強化',
  18: '対空強化弾',
  19: '対艦強化弾',
  21: '対空機銃',
  22: '特殊潜航艇',
  23: '戦闘糧食',
  24: '上陸用舟艇',
  25: 'オートジャイロ',
  26: '対潜哨戒機',
  27: '追加装甲(中型)',
  28: '追加装甲(大型)',
  29: '探照灯',
  30: '簡易輸送部材',
  31: '艦艇修理施設',
  32: '潜水艦魚雷',
  33: '照明弾',
  34: '司令部施設',
  35: '航空要員',
  36: '高射装置',
  37: '対地装備',
  39: '水上艦要員',
  40: '潜水艦装備',
  41: '大型飛行艇',
  42: '大型探照灯',
  43: '戦闘糧食',
  44: '洋上補給',
  45: '水上戦闘機',
  46: '特型内火艇',
  47: '陸上攻撃機',
  48: '局地戦闘機',
  49: '陸上偵察機',
  50: '輸送材料',
  51: '潜水艦電探',
  52: '陸戦部隊',
  53: '大型陸上機',
  54: '発煙装置',
  57: '噴式機'
}

// 改修リストアイテムの型定義
interface ImprovementItem {
  id: number
  equipmentId?: number
  equipmentName?: string
  name?: string  // 両方のプロパティ名に対応
  equipmentIcon?: number  // 装備アイコンID
  currentLevel: number
  targetLevel: number
  materials: {
    fuel?: number
    ammo?: number
    steel?: number
    bauxite?: number
    devMat?: number
    improveMat?: number
    screw?: number
  }
  notes?: string
  createdAt: string
}

// 艦娘データの型定義
interface Ship {
  id: number
  shipId: number
  name: string
  type: string
  rarity: number
  level: number
  slotCount: number   // 装備スロット数
  aircraftSlots: number[] // 各スロットの搭載数 [18, 18, 27, 10] など
  equipments?: (Equipment | null)[] // 装備スロット
  // 実際のステータス（計算済み）
  currentStats: {
    hp: number
    firepower: number
    torpedo: number
    aa: number
    armor: number
    evasion: number
    asw: number
    los: number
    luck: number
    range: number
    speed: number
    aircraft: number
  }
  // 装備込み最終ステータス（装備補正を含む）
  finalStats?: {
    hp: number
    firepower: number
    torpedo: number
    aa: number
    armor: number
    evasion: number
    asw: number
    los: number
    luck: number
    range: number
    speed: number
    aircraft: number
  }
  // 改修値
  improvements: {
    firepower: number
    torpedo: number
    aa: number
    armor: number
    luck: number
    hp: number
    asw: number
  }
  // その他の情報
  isMarried: boolean
  avatarUrl?: string
}

// 艦隊JSONデータの型定義
interface FleetJsonShip {
  api_id?: number
  id?: number
  api_ship_id?: number
  ship_id?: number
  api_lv?: number
  lv?: number
  level?: number
  api_exp?: number[]
  exp?: number[]
  api_karyoku?: number[]
  karyoku?: number[]
  api_raisou?: number[]
  raisou?: number[]
  api_taiku?: number[]
  taiku?: number[]
  api_soukou?: number[]
  soukou?: number[]
  api_lucky?: number[]
  lucky?: number[]
  api_taisen?: number[]
  taisen?: number[]
  api_maxhp?: number
  maxhp?: number
  [key: string]: any
}

// 艦隊編成スロットの型定義
interface FleetSlot {
  position: number
  ship: Ship | null
}

interface FleetComposerProps {
  fleetData?: string // JSONデータを受け取る
  admiralName?: string // 提督名を受け取る
}

// JSONデータをShip配列に変換する関数
const parseFleetData = (jsonData: string, getShipDataFn: (shipId: number) => any): Ship[] => {
  if (!jsonData) return []
  
  try {
    const data = JSON.parse(jsonData)
    const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || [])
    
    return ships.map((ship: FleetJsonShip, index: number) => {
      // 艦娘IDの取得
      const shipId = ship.api_ship_id || ship.ship_id || 0
      
      // レベルの取得
      const level = ship.api_lv || ship.lv || ship.level || 1
      
      // マスターデータから基本情報を取得（高速版）
      const masterData = getShipDataFn(shipId)
      
      // 改修値の解析
      const improvements = parseImprovements(ship.api_kyouka || ship.st)
      
      // ケッコン判定
      const isMarried = level >= 100
      
      // HP計算：レベル100超え（ケッコン艦）の場合はhpMarriedを参照
      const baseHp = isMarried && masterData.initialStats.hpMarried 
        ? masterData.initialStats.hpMarried 
        : masterData.initialStats.hp
      
      // APIから取得したステータス値（現在値）を使用
      const apiFirepower = ship.api_karyoku ? ship.api_karyoku[0] : (ship.karyoku ? ship.karyoku[0] : masterData.initialStats.firepower)
      const apiTorpedo = ship.api_raisou ? ship.api_raisou[0] : (ship.raisou ? ship.raisou[0] : masterData.initialStats.torpedo)
      const apiAA = ship.api_taiku ? ship.api_taiku[0] : (ship.taiku ? ship.taiku[0] : masterData.initialStats.aa)
      const apiArmor = ship.api_soukou ? ship.api_soukou[0] : (ship.soukou ? ship.soukou[0] : masterData.initialStats.armor)
      const apiLuck = ship.api_lucky ? ship.api_lucky[0] : (ship.lucky ? ship.lucky[0] : masterData.initialStats.luck)
      
      // 回避・索敵・対潜は以前の線形補間処理を復元
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
        if (statMax <= statMin) {
          return statMin
        }
        
        // レベル99以上の場合は最大値を返す
        if (level >= 99) {
          return statMax
        }
        
        // 線形補間でレベルに応じたステータスを計算（FleetAnalysisManagerと同じ正しい計算式）
        const ratio = (level - 1) / (99 - 1)
        return Math.floor(statMin + (statMax - statMin) * ratio)
      }
      
      let aswMax = masterData.initialStats.aswMax || (
        masterData.initialStats.asw > 0 ? masterData.initialStats.asw + 20 : 0
      )
      
      // 吹雪改二の対潜最大値を調整（FleetAnalysisManagerと同じ）
      if (masterData.name === '吹雪改二' && aswMax < 94) {
        aswMax = 94
      }
      const evasionMax = masterData.initialStats.evasionMax || (
        masterData.initialStats.evasion > 0 ? masterData.initialStats.evasion + 30 : masterData.initialStats.evasion
      )
      const losMax = masterData.initialStats.losMax || (
        masterData.initialStats.los > 0 ? masterData.initialStats.los + 20 : masterData.initialStats.los
      )
      
      const levelBasedAsw = calculateStatFromLevel(level, masterData.initialStats.asw, aswMax)
      const levelBasedEvasion = calculateStatFromLevel(level, masterData.initialStats.evasion, evasionMax)
      const levelBasedLos = calculateStatFromLevel(level, masterData.initialStats.los, losMax)
      
      // 改修値から最終ステータスを計算（火力・雷装・装甲・対空・運はAPI値、回避・索敵・対潜はレベル成長値）
      const currentStats = {
        hp: baseHp + (improvements.hp || 0),
        firepower: apiFirepower + (improvements.firepower || 0),
        torpedo: apiTorpedo + (improvements.torpedo || 0),
        aa: apiAA + (improvements.aa || 0),
        armor: apiArmor + (improvements.armor || 0),
        evasion: levelBasedEvasion,
        asw: levelBasedAsw + (improvements.asw || 0),
        los: levelBasedLos,
        luck: apiLuck + (improvements.luck || 0),
        range: masterData.initialStats.range,
        speed: masterData.initialStats.speed,
        aircraft: masterData.initialStats.aircraft
      }
      
      // 艦種の取得（マスターデータのshipTypeから）
      const shipType = getShipTypeByShipType(masterData.shipType)
      
      const shipData: Ship = {
        id: ship.api_id || ship.id || index + 1,
        shipId,
        name: masterData.name,
        type: shipType,
        rarity: calculateRarity(level),
        level,
        slotCount: masterData.slotCount || 2, // マスターデータから取得
        aircraftSlots: masterData.aircraft || [], // 搭載数配列を追加
        currentStats,
        finalStats: { ...currentStats }, // 初期状態では装備がないので、finalStatsはcurrentStatsと同じ
        improvements,
        isMarried,
        avatarUrl: `/FleetAnalystManager/images/ships/card/${shipId}.png`
      }

      return shipData
    }).filter((ship: Ship) => ship.shipId > 0) // 無効な艦娘をフィルター
  } catch (error) {
    console.error('艦隊データの解析に失敗しました:', error)
    return []
  }
}

// LocalStorage用のキー
const FLEET_DATA_STORAGE_KEY = 'fleetComposer_fleetData'
const FLEET_COMPOSITION_STORAGE_KEY = 'fleetComposer_composition'
const SAVED_FORMATIONS_STORAGE_KEY = 'fleetComposer_savedFormations'
const getImprovementItemsStorageKey = (admiralName: string) => `improvementItems_${admiralName}`
const TRAINING_CANDIDATES_STORAGE_KEY = 'fleetComposer_trainingCandidates'

// 保存された編成の型定義
interface SavedFormation {
  id: string
  name: string
  ships: (number | null)[] // 艦娘IDの配列（6要素）
  createdAt: string
  updatedAt: string
}

// 育成リストの型定義
interface TrainingCandidate {
  id: number
  instanceId: number // 固有インスタンスID（同名別艦娘を区別）
  shipId: number     // マスターデータ参照用
  name: string
  level: number
  addedAt: string
  // 目標値
  targetLevel?: number
  targetHp?: number
  targetAsw?: number
  targetLuck?: number
  // タスク連動用
  mainTaskId?: number // メインの「●●を育成する」タスクID
}

// 育成リスト管理
const getTrainingCandidatesFromStorage = (): TrainingCandidate[] => {
  try {
    const stored = localStorage.getItem(TRAINING_CANDIDATES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('育成リスト読み込みエラー:', error)
    return []
  }
}

const saveTrainingCandidatesToStorage = (candidates: TrainingCandidate[]) => {
  try {
    localStorage.setItem(TRAINING_CANDIDATES_STORAGE_KEY, JSON.stringify(candidates))
    // カスタムイベントを発火して同じウィンドウ内の他コンポーネントに通知
    window.dispatchEvent(new Event('trainingCandidatesUpdated'))
  } catch (error) {
    console.error('育成リスト保存エラー:', error)
  }
}

const deleteTrainingCandidateFromStorage = (candidateId: number) => {
  const candidates = getTrainingCandidatesFromStorage()
  const filtered = candidates.filter(c => c.id !== candidateId)
  saveTrainingCandidatesToStorage(filtered)
}

// タスク管理連動機能
const getFleetEntriesFromStorage = () => {
  try {
    const admiralName = localStorage.getItem('fleetAnalysisAdmiralName') || localStorage.getItem('admiralName') || '提督'
    const saved = localStorage.getItem(`${admiralName}_fleetEntries`)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('艦隊エントリー読み込みエラー:', error)
    return []
  }
}

const saveFleetEntriesToStorage = (entries: any[]) => {
  try {
    const admiralName = localStorage.getItem('fleetAnalysisAdmiralName') || localStorage.getItem('admiralName') || '提督'
    localStorage.setItem(`${admiralName}_fleetEntries`, JSON.stringify(entries))
  } catch (error) {
    console.error('艦隊エントリー保存エラー:', error)
  }
}

// addTaskToLatestFleetEntry function removed - auto-sync disabled

// removeTaskFromFleetEntry function removed - auto-sync disabled

const updateTaskText = (taskId: number, newText: string) => {
  const entries = getFleetEntriesFromStorage()
  let updatedCount = 0
  
  // 最新エントリーのみを対象とする
  const latestEntry = entries.find((entry: any) => entry.isLatest)
  
  if (latestEntry && latestEntry.tasks) {
    latestEntry.tasks.forEach((task: any) => {
      // 最新エントリーの未達成タスクで、元のタスクIDまたは引き継がれたタスクのoriginalTaskIdが一致する場合のみ更新
      if (!task.completed && (task.id === taskId || task.originalTaskId === taskId)) {
        task.text = newText
        updatedCount++
      }
    })
  }
  
  saveFleetEntriesToStorage(entries)
  
  // FleetAnalysisManagerの状態も即座に同期
  window.dispatchEvent(new CustomEvent('fleetEntriesUpdated', {
    detail: { updatedEntries: entries, updatedTaskId: taskId }
  }))
}

// LocalStorageユーティリティ関数
const saveFleetDataToStorage = (data: any) => {
  try {
    localStorage.setItem(FLEET_DATA_STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    console.error('艦隊データの保存に失敗:', error)
  }
}

const loadFleetDataFromStorage = (): any | null => {
  try {
    const saved = localStorage.getItem(FLEET_DATA_STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('艦隊データの読み込みに失敗:', error)
    return null
  }
}

const saveFleetCompositionToStorage = (slots: FleetSlot[], name: string) => {
  try {
    const compositionData = {
      slots: slots.map(slot => slot.ship ? {
        position: slot.position,
        shipId: slot.ship.id
      } : { position: slot.position, shipId: null }),
      name
    }
    localStorage.setItem(FLEET_COMPOSITION_STORAGE_KEY, JSON.stringify(compositionData))
  } catch (error) {
    console.error('編成データの保存に失敗:', error)
  }
}

const loadFleetCompositionFromStorage = (): any | null => {
  try {
    const saved = localStorage.getItem(FLEET_COMPOSITION_STORAGE_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('編成データの読み込みに失敗:', error)
    return null
  }
}

// 保存された編成管理関数
const saveFormationToStorage = (formation: SavedFormation) => {
  try {
    const saved = getSavedFormationsFromStorage()
    const existingIndex = saved.findIndex(f => f.id === formation.id)
    
    if (existingIndex >= 0) {
      // 既存の編成を更新
      saved[existingIndex] = { ...formation, updatedAt: new Date().toISOString() }
    } else {
      // 新しい編成を追加
      saved.push(formation)
    }
    
    localStorage.setItem(SAVED_FORMATIONS_STORAGE_KEY, JSON.stringify(saved))
  } catch (error) {
    console.error('編成の保存に失敗:', error)
  }
}

const getSavedFormationsFromStorage = (): SavedFormation[] => {
  try {
    const saved = localStorage.getItem(SAVED_FORMATIONS_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('保存された編成の読み込みに失敗:', error)
    return []
  }
}

const deleteFormationFromStorage = (formationId: string) => {
  try {
    const saved = getSavedFormationsFromStorage()
    const filtered = saved.filter(f => f.id !== formationId)
    localStorage.setItem(SAVED_FORMATIONS_STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('編成の削除に失敗:', error)
  }
}

// 改修リスト用LocalStorage関数
const saveImprovementItemsToStorage = (items: ImprovementItem[], admiralName: string) => {
  try {
    // FleetComposer用のキーに保存
    localStorage.setItem(getImprovementItemsStorageKey(admiralName), JSON.stringify(items))
    
    // FleetAnalysisManager用のキーにも同期保存
    const analysisManagerItems = items.map(item => ({
      id: item.id,
      equipmentId: item.equipmentId,
      equipmentName: item.equipmentName,
      equipmentIcon: item.equipmentIcon, // 装備アイコンIDを追加
      currentLevel: item.currentLevel,
      targetLevel: item.targetLevel,
      addedAt: item.createdAt
    }))
    localStorage.setItem(`${admiralName}_improvementCandidates`, JSON.stringify(analysisManagerItems))
    
    // リアルタイム更新イベントを発火
    window.dispatchEvent(new CustomEvent('improvementCandidatesUpdated'))
    
  } catch (error) {
    console.error('改修リストの保存に失敗:', error)
  }
}

// 削除された関数（分析管理画面と同期のため不要）
// const getImprovementItemsFromStorage = (): ImprovementItem[] => {
//   try {
//     const saved = localStorage.getItem(IMPROVEMENT_ITEMS_STORAGE_KEY)
//     return saved ? JSON.parse(saved) : []
//   } catch (error) {
//     console.error('改修リストの読み込みに失敗:', error)
//     return []
//   }
// }

const FleetComposer: React.FC<FleetComposerProps> = ({ fleetData, admiralName = 'テスト提督' }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [sortType, setSortType] = useState<'level' | 'id' | 'shipId'>('level')
  const [fleetSlots, setFleetSlots] = useState<FleetSlot[]>(
    Array.from({ length: 6 }, (_, i) => ({ position: i, ship: null }))
  )
  const [draggedShip, setDraggedShip] = useState<Ship | null>(null)
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null)
  const [isDraggingFormation, setIsDraggingFormation] = useState(false)
  const [draggedFromSlot, setDraggedFromSlot] = useState<number | null>(null)
  const [fleetName, setFleetName] = useState<string>('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const candidatesListRef = useRef<HTMLDivElement>(null)
  const [ships, setShips] = useState<Ship[]>([])
  const [storedFleetData, setStoredFleetData] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [pendingTaskUpdates, setPendingTaskUpdates] = useState<Set<number>>(new Set())
  const [savedFormations, setSavedFormations] = useState<SavedFormation[]>([])
  const [trainingCandidates, setTrainingCandidates] = useState<TrainingCandidate[]>(getTrainingCandidatesFromStorage())
  const [isDroppedOnTrainingCandidates, setIsDroppedOnTrainingCandidates] = useState(false)
  const [sidebarActiveTab, setSidebarActiveTab] = useState<'formations' | 'training' | 'improvements'>('formations')
  const [isDraggingOverTrainingArea, setIsDraggingOverTrainingArea] = useState(false)
  const [isDraggingShip, setIsDraggingShip] = useState(false)
  
  // 改修リスト関連の状態
  const [improvementItems, setImprovementItems] = useState<ImprovementItem[]>([])
  
  // 改修リストの目標値を更新
  const updateImprovementTargetLevel = (itemId: number, targetLevel: number) => {
    const actualAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName') || '提督'
    const stored = localStorage.getItem(`${actualAdmiralName}_improvementCandidates`)
    if (stored) {
      try {
        const candidates = JSON.parse(stored)
        const updatedCandidates = candidates.map((c: any) => 
          c.id === itemId ? { ...c, targetLevel } : c
        )
        localStorage.setItem(`${actualAdmiralName}_improvementCandidates`, JSON.stringify(updatedCandidates))
        
        // FleetComposerのstateも更新
        setImprovementItems(prev => prev.map(item => 
          item.id === itemId ? { ...item, targetLevel } : item
        ))
      } catch (error) {
        console.error('改修リスト目標値更新エラー:', error)
      }
    }
  }
  
  const [isDragOverImprovementList, setIsDragOverImprovementList] = useState(false)
  
  // 装備関連の状態
  const [equipmentMasterList, setEquipmentMasterList] = useState<EquipmentMaster[]>([])
  const [ownedEquipmentList, setOwnedEquipmentList] = useState<OwnedEquipment[]>([])
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
  const [selectedShipSlot, setSelectedShipSlot] = useState<{position: number, slotIndex: number} | null>(null)
  const [isEquipmentPanelOpen, setIsEquipmentPanelOpen] = useState(false)
  const [equipmentTypeFilter, setEquipmentTypeFilter] = useState<number | 'all'>('all')
  const [equipmentCategoryTab, setEquipmentCategoryTab] = useState<'gun' | 'torpedo' | 'aircraft' | 'radar' | 'other'>('gun')
  const [draggedEquipment, setDraggedEquipment] = useState<Equipment | null>(null)

  // 高速化されたShipDataフック
  const { getShipData, isFullDataLoaded, loadingProgress } = useShipData()

  // 装備マスターデータの読み込み
  useEffect(() => {
    const loadEquipmentMasterData = async () => {
      try {
        const response = await fetch('/FleetAnalystManager/gear.json')
        const data = await response.json()
        setEquipmentMasterList(data)
      } catch (error) {
        console.error('装備マスターデータの読み込みに失敗:', error)
      }
    }
    loadEquipmentMasterData()
  }, [])

  // 保存された装備データの読み込み
  useEffect(() => {
    const loadSavedEquipmentData = () => {
      try {
        const admiralName = localStorage.getItem('fleetAnalysisAdmiralName') || localStorage.getItem('admiralName') || '提督'
        const saved = localStorage.getItem(`${admiralName}_equipmentData`)
        if (saved) {
          const parsedData = JSON.parse(saved)
          setOwnedEquipmentList(parsedData)
        }
      } catch (error) {
        console.error('❌ 装備データ読み込みエラー:', error)
      }
    }

    // 初回読み込み
    loadSavedEquipmentData()

    // StorageEventでLocalStorageの変更を監視
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.endsWith('_equipmentData')) {
        loadSavedEquipmentData()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // 所持装備データと装備一覧の更新
  useEffect(() => {
    if (equipmentMasterList.length === 0 || ownedEquipmentList.length === 0) {
      setEquipmentList([])
      return
    }

    // 所持装備とマスターデータを結合（ユニークIDを生成）
    const combinedEquipment: Equipment[] = ownedEquipmentList.map((owned, index) => {
      const master = equipmentMasterList.find(m => m.api_id === owned.api_slotitem_id)
      if (master) {
        return {
          ...master,
          api_id: master.api_id * 10000 + index, // ユニークIDを生成
          original_id: master.api_id, // 元のIDを保持
          improvement_level: owned.api_level
        }
      }
      return null
    }).filter(Boolean) as Equipment[]

    setEquipmentList(combinedEquipment)
  }, [equipmentMasterList, ownedEquipmentList])

  // 改修リストを読み込む（分析管理画面と同期）
  const loadImprovementCandidates = useCallback(() => {
    
    const admiralName = localStorage.getItem('fleetAnalysisAdmiralName') || '提督'
    const stored = localStorage.getItem(`${admiralName}_improvementCandidates`)
    if (stored) {
      try {
        const candidates = JSON.parse(stored)
        // 分析管理画面の形式をFleetComposerの形式に変換し、targetLevelとequipmentIconを含める
        const items = candidates.map((c: any, index: number) => {
          // equipmentIconがない既存データの場合は、装備データから取得を試みる
          let equipmentIcon = c.equipmentIcon;
          
          // デバッグログ：元データの確認
          
          // 装備データが利用可能な場合のみアイコン検索を実行
          if ((equipmentIcon === null || equipmentIcon === undefined) && c.equipmentId && equipmentList.length > 0) {
            // equipmentListの最初のアイテムの構造を確認
            if (index === 0 && equipmentList.length > 0) {
            }
            // より幅広い検索条件で装備を探す（equipmentListから検索）
            
            const equipment = equipmentList.find((eq: any, eqIndex) => {
              const match1 = (eq.original_id || eq.api_id || eq.api_slotitem_id) === c.equipmentId;
              const match2 = eq.api_slotitem_id === c.equipmentId;
              const match3 = (eq.original_id && eq.original_id === c.equipmentId);
              const isMatch = match1 || match2 || match3;
              
              if (index === 0 && eqIndex < 3) { // 1番目のアイテム検索時に最初の3個の装備をログ出力
              }
              
              return isMatch;
            });
            
            
            if (equipment && (equipment as any).api_type) {
              equipmentIcon = (equipment as any).api_type[3];
            }
          }
          
          
          return {
            id: c.id,
            equipmentId: c.equipmentId,
            equipmentName: c.equipmentName,
            equipmentIcon: equipmentIcon, // undefinedの場合は後でuseEffectで補完される
            currentLevel: c.currentLevel,
            targetLevel: c.targetLevel || 10, // 目標レベルを追加
            materials: {},
            createdAt: c.addedAt
          };
        })
        setImprovementItems(items)
      } catch (error) {
        console.error('改修リスト読み込みエラー:', error)
      }
    }
  }, [equipmentList])

  // 初回読み込みとLocalStorage変更監視（装備データ読み込み後に再実行）
  useEffect(() => {
    loadImprovementCandidates()
    
    const handleStorageChange = (e: StorageEvent) => {
      const admiralName = localStorage.getItem('fleetAnalysisAdmiralName') || '提督'
      if (e.key === `${admiralName}_improvementCandidates` || e.key === 'fleetAnalysisAdmiralName') {
        loadImprovementCandidates()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // 定期的にチェック（フォーカス時）
    const handleFocus = () => {
      loadImprovementCandidates()
    }
    window.addEventListener('focus', handleFocus)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', handleFocus)
    }
  }, [loadImprovementCandidates]) // loadImprovementCandidatesの依存関係によって装備データ変更時に再実行

  // 装備データ読み込み完了後、改修アイテムの欠損アイコンを補完
  useEffect(() => {
    if (equipmentList.length > 0) {
      setImprovementItems(currentItems => {
        if (currentItems.length === 0) return currentItems
        
        let needsUpdate = false
        const updatedItems = currentItems.map((item, index) => {
          
          if ((item.equipmentIcon === null || item.equipmentIcon === undefined) && item.equipmentId) {
            // より幅広い検索条件で装備を探す（equipmentListから検索）
            
            const equipment = equipmentList.find((eq: any, eqIndex) => {
              const match1 = (eq.original_id || eq.api_id || eq.api_slotitem_id) === item.equipmentId;
              const match2 = eq.api_slotitem_id === item.equipmentId;
              const match3 = (eq.original_id && eq.original_id === item.equipmentId);
              const isMatch = match1 || match2 || match3;
              
              if (index === 0 && eqIndex < 3) { // 1番目のアイテム検索時に最初の3個の装備をログ出力
              }
              
              return isMatch;
            });
            
            
            if (equipment && (equipment as any).api_type) {
              needsUpdate = true
              return {
                ...item,
                equipmentIcon: (equipment as any).api_type[3]
              }
            } else {
            }
          }
          return item
        })
        
        if (needsUpdate) {
          return updatedItems
        }
        return currentItems
      })
    }
  }, [equipmentList])

  // サイドバーが閉じられた時の処理
  useEffect(() => {
    if (!isSidebarOpen && pendingTaskUpdates.size > 0) {
      // サイドバーが閉じられた時、保留中のタスク更新を実行
      pendingTaskUpdates.forEach(candidateId => {
        const candidate = trainingCandidates.find(c => c.id === candidateId)
        if (candidate && candidate.mainTaskId) {
          const newTaskText = createMainTaskText(candidate)
          updateTaskText(candidate.mainTaskId, newTaskText)
        }
      })
      
      if (pendingTaskUpdates.size > 0) {
        showToast(`${pendingTaskUpdates.size}件の育成タスクを更新しました`)
      }
      
      // 保留リストをクリア
      setPendingTaskUpdates(new Set())
    }
  }, [isSidebarOpen, pendingTaskUpdates, trainingCandidates])




  // コンポーネント初期化時にLocalStorageからデータを復元（初回のみ）
  useEffect(() => {
    const savedFleetData = loadFleetDataFromStorage()
    if (savedFleetData && !fleetData) {
      setStoredFleetData(savedFleetData)
    }

    const savedComposition = loadFleetCompositionFromStorage()
    if (savedComposition) {
      setFleetName(savedComposition.name || '')
    }

    const formations = getSavedFormationsFromStorage()
    setSavedFormations(formations)
  }, []) // 初回のみ実行


  // 艦隊データが変更された時に艦娘リストを更新
  useEffect(() => {
    if (!isFullDataLoaded) return // データが読み込まれていない場合は処理しない
    
    const currentFleetData = fleetData || storedFleetData
    if (currentFleetData) {
      const parsedShips = parseFleetData(currentFleetData, getShipData)
      setShips(parsedShips)
      
      
      // 新しいAPIデータが来た場合のみ保存
      if (fleetData && fleetData !== storedFleetData) {
        saveFleetDataToStorage(fleetData)
        setStoredFleetData(fleetData)
      }
    }
  }, [fleetData, isFullDataLoaded, trainingCandidates])

  // 艦娘リストが更新されたときに保存された編成を復元（初回のみ）
  const [hasRestoredComposition, setHasRestoredComposition] = useState(false)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  // トースト通知を表示する関数
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
  }

  // トースト通知の自動非表示
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null)
      }, 3000) // 3秒後に非表示
      
      return () => clearTimeout(timer)
    }
  }, [toast])

  // 改修リストの初期読み込み
  useEffect(() => {
    if (admiralName) {
      try {
        // FleetAnalysisManagerと同じキーから読み込み（まずは統一キーを確認）
        const actualAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName') || admiralName
        const stored = localStorage.getItem(`${actualAdmiralName}_improvementCandidates`)
        if (stored) {
          const candidates = JSON.parse(stored)
          // FleetComposer形式に変換
          const items = candidates.map((c: any) => ({
            id: c.id,
            equipmentId: c.equipmentId,
            equipmentName: c.equipmentName,
            currentLevel: c.currentLevel,
            targetLevel: c.targetLevel || 10,
            materials: {},
            createdAt: c.addedAt
          }))
          setImprovementItems(items)
        } else {
          // 従来のキーからも確認（後方互換性）
          const legacyStored = localStorage.getItem(getImprovementItemsStorageKey(admiralName))
          if (legacyStored) {
            const items = JSON.parse(legacyStored) as ImprovementItem[]
            setImprovementItems(items)
            // 新しいキーに移行
            saveImprovementItemsToStorage(items, actualAdmiralName)
          }
        }
      } catch (error) {
        console.error('改修リストの読み込みに失敗:', error)
      }
    }
  }, [admiralName])

  // 改修リストの自動保存
  useEffect(() => {
    if (admiralName) {
      const actualAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName') || admiralName
      saveImprovementItemsToStorage(improvementItems, actualAdmiralName)
    }
  }, [improvementItems, admiralName])
  
  useEffect(() => {
    if (ships.length > 0 && !hasRestoredComposition) {
      const savedComposition = loadFleetCompositionFromStorage()
      if (savedComposition && savedComposition.slots) {
        const restoredSlots = savedComposition.slots.map((savedSlot: any) => {
          if (savedSlot.shipId) {
            const ship = ships.find(s => s.id === savedSlot.shipId)
            return { position: savedSlot.position, ship: ship || null }
          }
          return { position: savedSlot.position, ship: null }
        })
        setFleetSlots(restoredSlots)
        setHasRestoredComposition(true)
      }
    }
  }, [ships, hasRestoredComposition])

  // 編成またはフリート名が変更されたときに自動保存（遅延実行）
  useEffect(() => {
    if (ships.length > 0 && hasRestoredComposition) {
      const saveTimer = setTimeout(() => {
        saveFleetCompositionToStorage(fleetSlots, fleetName)
      }, 500) // 500ms遅延で保存
      
      return () => clearTimeout(saveTimer)
    }
  }, [fleetSlots, fleetName, hasRestoredComposition]) // shipsを除去して無限ループを防止

  // ソート関数
  const sortShips = (ships: Ship[], sortType: string): Ship[] => {
    return [...ships].sort((a, b) => {
      switch (sortType) {
        case 'level':
          return b.level - a.level // レベルの高い順
        case 'id':
          return a.id - b.id // 入手順(ID順)
        case 'shipId':
          return a.shipId - b.shipId // 艦種ID順
        default:
          return 0
      }
    })
  }

  // フィルタリング & ソートされた艦娘リスト
  const filteredAndSortedShips = (() => {
    const filtered = selectedType === 'all' 
      ? ships 
      : ships.filter(ship => ship.type === selectedType)
    return sortShips(filtered, sortType)
  })()

  // マウスホイールスクロール処理
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current && isDrawerOpen) {
        e.preventDefault()
        scrollContainerRef.current.scrollLeft += e.deltaY
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [isDrawerOpen])

  // 艦隊ステータス計算
  const calculateFleetStats = () => {
    const stats = fleetSlots.reduce((acc, slot) => {
      if (slot.ship) {
        acc.totalFirepower += slot.ship.currentStats.firepower
        acc.totalTorpedo += slot.ship.currentStats.torpedo
        acc.totalAA += slot.ship.currentStats.aa
        acc.totalArmor += slot.ship.currentStats.armor
        acc.totalHP += slot.ship.currentStats.hp
        acc.totalASW += slot.ship.currentStats.asw
        acc.totalLuck += slot.ship.currentStats.luck
        acc.totalEvasion += slot.ship.currentStats.evasion
        acc.totalLOS += slot.ship.currentStats.los
        acc.shipCount += 1
      }
      return acc
    }, {
      totalFirepower: 0,
      totalTorpedo: 0,
      totalAA: 0,
      totalArmor: 0,
      totalHP: 0,
      totalASW: 0,
      totalLuck: 0,
      totalEvasion: 0,
      totalLOS: 0,
      shipCount: 0
    })

    return stats
  }

  // 装備補正値計算関数
  const calculateEquipmentBonus = (equipments: (Equipment | null)[]): {
    firepower: number
    torpedo: number
    aa: number
    armor: number
    asw: number
    evasion: number
    accuracy: number
    los: number
  } => {
    const bonus = {
      firepower: 0,
      torpedo: 0,
      aa: 0,
      armor: 0,
      asw: 0,
      evasion: 0,
      accuracy: 0,
      los: 0
    }

    if (!equipments) return bonus

    equipments.forEach(equipment => {
      if (equipment) {
        bonus.firepower += equipment.api_houg || 0
        bonus.torpedo += equipment.api_raig || 0
        bonus.aa += equipment.api_tyku || 0
        bonus.armor += equipment.api_souk || 0
        bonus.asw += equipment.api_tais || 0
        bonus.evasion += equipment.api_houk || 0
        bonus.accuracy += equipment.api_houm || 0
        bonus.los += equipment.api_saku || 0
      }
    })

    return bonus
  }

  // 装備込みステータス計算関数
  const calculateFinalStats = (ship: Ship) => {
    const equipmentBonus = calculateEquipmentBonus(ship.equipments || [])
    
    return {
      hp: ship.currentStats.hp, // 耐久は装備で増加しない
      firepower: ship.currentStats.firepower + equipmentBonus.firepower,
      torpedo: ship.currentStats.torpedo + equipmentBonus.torpedo,
      aa: ship.currentStats.aa + equipmentBonus.aa,
      armor: ship.currentStats.armor + equipmentBonus.armor,
      evasion: ship.currentStats.evasion + equipmentBonus.evasion,
      asw: ship.currentStats.asw + equipmentBonus.asw,
      los: ship.currentStats.los + equipmentBonus.los,
      luck: ship.currentStats.luck, // 運は装備で変化しない（通常）
      range: ship.currentStats.range,
      speed: ship.currentStats.speed,
      aircraft: ship.currentStats.aircraft
    }
  }

  // 装備スロットクリックハンドラー
  const handleEquipmentSlotClick = (e: React.MouseEvent, position: number, slotIndex: number) => {
    e.stopPropagation() // 親要素のクリックイベントを停止
    setSelectedShipSlot({ position, slotIndex })
    setIsEquipmentPanelOpen(true)
  }

  // 装備選択ハンドラー
  const handleEquipmentSelect = (equipment: Equipment) => {
    if (!selectedShipSlot) return

    const updatedSlots = [...fleetSlots]
    const targetSlot = updatedSlots[selectedShipSlot.position]
    
    if (targetSlot.ship) {
      // 装備配列を初期化（未定義の場合）
      if (!targetSlot.ship.equipments) {
        targetSlot.ship.equipments = Array(targetSlot.ship.slotCount).fill(null)
      }
      
      // 装備を設定
      targetSlot.ship.equipments[selectedShipSlot.slotIndex] = equipment
      
      // 装備込みステータスを再計算
      const finalStats = calculateFinalStats(targetSlot.ship)
      targetSlot.ship.finalStats = finalStats
      
      setFleetSlots(updatedSlots)
      saveFleetCompositionToStorage(updatedSlots, fleetName)
    }
  }

  // 装備削除ハンドラー
  const handleEquipmentRemove = (position: number, slotIndex: number) => {
    const updatedSlots = [...fleetSlots]
    const targetSlot = updatedSlots[position]
    
    if (targetSlot.ship && targetSlot.ship.equipments) {
      targetSlot.ship.equipments[slotIndex] = null
      
      // 装備込みステータスを再計算
      const finalStats = calculateFinalStats(targetSlot.ship)
      targetSlot.ship.finalStats = finalStats
      
      setFleetSlots(updatedSlots)
      saveFleetCompositionToStorage(updatedSlots, fleetName)
    }
  }


  // ドラッグ開始
  const handleDragStart = (e: React.DragEvent, ship: Ship, fromSlot?: number) => {
    setDraggedShip(ship)
    setDraggedFromSlot(fromSlot ?? null)
    setIsDraggingShip(true)
    setIsDroppedOnTrainingCandidates(false) // 初期化
    setIsDraggingOverTrainingArea(false)
    
    // fromSlotがある場合、育成リストへのドロップも可能にする
    e.dataTransfer.effectAllowed = fromSlot !== undefined ? 'all' : 'copy'
    
    // 艦娘データとスロット情報を含むオブジェクトを作成
    const dragData = {
      ...ship,
      __fromSlot: fromSlot // スロット情報を追加
    }
    
    e.dataTransfer.setData('text/plain', ship.id.toString())
    e.dataTransfer.setData('application/json', JSON.stringify(dragData))
    document.body.classList.add('dragging-ship')

    // グローバルなドラッグ終了イベントを追加（画面外でドラッグが終了した場合の対策）
    const handleGlobalDragEnd = () => {
      setIsDraggingShip(false)
      setDraggedShip(null)
      setDraggedFromSlot(null)
      setDragOverSlot(null)
      setIsDroppedOnTrainingCandidates(false)
      setIsDraggingOverTrainingArea(false)
      document.body.classList.remove('dragging-ship')
      // イベントリスナーを削除
      document.removeEventListener('dragend', handleGlobalDragEnd)
      document.removeEventListener('mouseup', handleGlobalDragEnd)
    }
    
    // ドラッグ終了時とマウスアップ時の両方で確実にクリーンアップ
    document.addEventListener('dragend', handleGlobalDragEnd)
    document.addEventListener('mouseup', handleGlobalDragEnd)
  }

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault()
    setDragOverSlot(position)
    
    // draggedShipがある場合は艦娘のドラッグ
    if (draggedShip) {
      e.dataTransfer.dropEffect = draggedFromSlot !== null ? 'move' : 'copy'
      setIsDraggingFormation(false)
    } else {
      // draggedShipがない場合は編成データの可能性
      e.dataTransfer.dropEffect = 'copy'
      setIsDraggingFormation(true)
    }
  }

  // ドラッグリーブ
  const handleDragLeave = () => {
    setDragOverSlot(null)
    setIsDraggingFormation(false)
  }

  // ドロップ処理
  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault()
    e.stopPropagation() // イベントの伝播を停止
    setDragOverSlot(null)
    setIsDraggingFormation(false)


    // データの取得を試みる
    let dropData: any = null
    let isFormationData = false

    try {
      const jsonData = e.dataTransfer.getData('application/json')
      if (jsonData) {
        dropData = JSON.parse(jsonData)
        
        // 編成データかどうかを判定
        if (dropData.ships && dropData.name && Array.isArray(dropData.ships)) {
          isFormationData = true
        }
      }
    } catch (error) {
    }

    // 編成データのドロップ処理
    if (isFormationData && dropData) {
      handleLoadFormation(dropData)
      showToast(`編成「${dropData.name}」を読み込みました！`)
      return
    }

    // 艦娘のドロップ処理
    // まずdraggedShipの状態を確認
    let shipToDrop = draggedShip
    let fromSlot = draggedFromSlot
    
    // draggedShipがない場合は、dataTransferから艦娘データを取得
    if (!shipToDrop && dropData && dropData.id && dropData.name && dropData.shipId) {
      shipToDrop = dropData as Ship
      
      // dataTransferからfromSlot情報も取得
      if ((dropData as any).__fromSlot !== undefined) {
        fromSlot = (dropData as any).__fromSlot
      }
    }

    if (shipToDrop) {
      
      // __fromSlotプロパティを削除（艦娘データに含めない）
      const cleanShipData: Ship = { ...shipToDrop } as Ship
      delete (cleanShipData as any).__fromSlot
      
      // 配置時にfinalStatsを初期化（装備がない場合はcurrentStatsと同じ）
      if (!cleanShipData.finalStats) {
        cleanShipData.finalStats = { ...cleanShipData.currentStats }
      }
      
      if (fromSlot !== null && fromSlot !== undefined) {
        // スロット間の入れ替え（既存の編成済み艦娘の移動）
        setFleetSlots(prev => {
          const targetShip = prev[position].ship
          return prev.map(slot => {
            if (slot.position === position) {
              return { ...slot, ship: cleanShipData }
            } else if (slot.position === fromSlot) {
              return { ...slot, ship: targetShip }
            }
            return slot
          })
        })
      } else {
        // 下部ドロワーからの新規配置
        setFleetSlots(prev => prev.map(slot => 
          slot.position === position 
            ? { ...slot, ship: cleanShipData }
            : slot
        ))
      }
    } else {
    }
    
    // 状態をリセット
    setDraggedShip(null)
    setDraggedFromSlot(null)
    // ドラッグ終了時にクラスを削除
    document.body.classList.remove('dragging-ship')
  }

  // 画面外ドロップ処理（自動編成）
  const handleDropOutside = (dropData?: any) => {
    
    if (isDroppedOnTrainingCandidates) {
      return
    }
    
    // ドロップする艦娘を決定
    let shipToPlace = draggedShip || dropData
    
    if (shipToPlace && shipToPlace.id && shipToPlace.name && shipToPlace.shipId) {
      // 既に編成済みの艦娘（draggedFromSlotがある）の場合は自動配置しない
      if (draggedFromSlot !== null) {
        // 元のスロットに戻す処理は不要（ドラッグ中なので元の位置にそのまま残る）
      } else {
        // 下部ドロワーからの新規配置のみ実行
        const emptySlot = fleetSlots.find(slot => slot.ship === null)
        if (emptySlot) {
          setFleetSlots(prev => prev.map(slot => 
            slot.position === emptySlot.position 
              ? { ...slot, ship: shipToPlace }
              : slot
          ))
        } else {
        }
      }
    }
    // 必ずクリーンアップ
    setDraggedShip(null)
    setDraggedFromSlot(null)
    setDragOverSlot(null)
    document.body.classList.remove('dragging-ship')
  }

  // handleDragEnd function removed - replaced with inline implementation

  // 育成リストへの追加
  const handleAddToTrainingCandidates = (ship: Ship) => {
    
    const existing = trainingCandidates.find(c => c.instanceId === ship.id)
    if (existing) {
      // 既に存在する場合でもドロップフラグを設定
      setIsDroppedOnTrainingCandidates(true)
      showToast(`${ship.name} は既に育成リストに登録されています`, 'error')
      return
    }

    // 自動タスク作成を無効化 - シンプルな表示のみ
    // const mainTaskText = `${ship.name}を育成する`
    // const mainTaskId = addTaskToLatestFleetEntry(mainTaskText)
    
    const newCandidate: TrainingCandidate = {
      id: Date.now(),
      instanceId: ship.id, // 固有インスタンスIDを使用
      shipId: ship.shipId, // マスターデータ参照用
      name: ship.name,
      level: ship.level,
      addedAt: new Date().toISOString(),
      // mainTaskId: mainTaskId !== -1 ? mainTaskId : undefined
    }
    
    const updatedCandidates = [...trainingCandidates, newCandidate]
    setTrainingCandidates(updatedCandidates)
    saveTrainingCandidatesToStorage(updatedCandidates)
    
    
    // ドロップ成功を明示的にマーク
    setIsDroppedOnTrainingCandidates(true)
    
    showToast(`${ship.name} を育成リストに追加しました！`)
    
    // 新しい候補が見えるように自動スクロール
    setTimeout(() => {
      if (candidatesListRef.current) {
        candidatesListRef.current.scrollTop = candidatesListRef.current.scrollHeight
      }
    }, 100)
  }

  // 育成リストから削除（タスク連動を無効化）
  const handleRemoveFromTrainingCandidates = (candidateId: number) => {
    const candidate = trainingCandidates.find(c => c.id === candidateId)
    
    // 自動タスク削除を無効化
    // if (candidate?.mainTaskId) {
    //   removeTaskFromFleetEntry(candidate.mainTaskId)
    // }
    
    
    const updatedCandidates = trainingCandidates.filter(c => c.id !== candidateId)
    setTrainingCandidates(updatedCandidates)
    deleteTrainingCandidateFromStorage(candidateId)
    
    showToast(`${candidate?.name || '艦娘'}を育成リストから削除しました`)
  }


  // サイドバーを閉じる処理（タスク更新込み）
  const closeSidebar = () => {
    // 自動タスク更新を無効化
    // if (pendingTaskUpdates.size > 0) {
    //   pendingTaskUpdates.forEach(candidateId => {
    //     const candidate = trainingCandidates.find(c => c.id === candidateId)
    //     if (candidate && candidate.mainTaskId) {
    //       const newTaskText = createMainTaskText(candidate)
    //       updateTaskText(candidate.mainTaskId, newTaskText)
    //     }
    //   })
    //   
    //   showToast(`${pendingTaskUpdates.size}件の育成タスクを更新しました`)
    //   setPendingTaskUpdates(new Set())
    // }
    
    setIsSidebarOpen(false)
  }

  // 育成リストの目標値を更新（サイドバー閉じ時にタスク連動）
  const updateTrainingCandidateTargets = (candidateId: number, targets: { targetLevel?: number, targetHp?: number, targetAsw?: number, targetLuck?: number }) => {
    const candidate = trainingCandidates.find(c => c.id === candidateId)
    if (!candidate) return

    // 目標値だけを更新（タスクは更新しない）
    const updatedCandidates = trainingCandidates.map(existingCandidate => {
      if (existingCandidate.id !== candidateId) return existingCandidate
      
      // undefined の値は削除する
      const updatedCandidate = { ...existingCandidate }
      
      if (targets.targetLevel !== undefined) {
        updatedCandidate.targetLevel = targets.targetLevel
      } else if ('targetLevel' in targets) {
        delete updatedCandidate.targetLevel
      }
      
      if (targets.targetHp !== undefined) {
        updatedCandidate.targetHp = targets.targetHp
      } else if ('targetHp' in targets) {
        delete updatedCandidate.targetHp
      }
      
      if (targets.targetAsw !== undefined) {
        updatedCandidate.targetAsw = targets.targetAsw
      } else if ('targetAsw' in targets) {
        delete updatedCandidate.targetAsw
      }
      
      if (targets.targetLuck !== undefined) {
        updatedCandidate.targetLuck = targets.targetLuck
      } else if ('targetLuck' in targets) {
        delete updatedCandidate.targetLuck
      }
      
      return updatedCandidate
    })
    
    setTrainingCandidates(updatedCandidates)
    saveTrainingCandidatesToStorage(updatedCandidates)
    
  }

  // メインタスクテキストを生成
  const createMainTaskText = (candidate: TrainingCandidate): string => {
    const ship = ships.find(s => s.id === candidate.instanceId)
    if (!ship) return `${candidate.name}を育成する`
    
    const targets: string[] = []
    
    if (candidate.targetLevel && candidate.targetLevel > ship.level) {
      targets.push(`Lv${ship.level}→${candidate.targetLevel}`)
    }
    if (candidate.targetHp && candidate.targetHp > ship.currentStats.hp) {
      targets.push(`耐久${ship.currentStats.hp}→${candidate.targetHp}`)
    }
    if (candidate.targetAsw && candidate.targetAsw > ship.currentStats.asw) {
      targets.push(`対潜${ship.currentStats.asw}→${candidate.targetAsw}`)
    }
    if (candidate.targetLuck && candidate.targetLuck > ship.currentStats.luck) {
      targets.push(`運${ship.currentStats.luck}→${candidate.targetLuck}`)
    }
    
    if (targets.length === 0) {
      return `${candidate.name}を育成する`
    }
    
    return `${candidate.name}を育成する（${targets.join('、')}）`
  }



  // スロットクリア
  const clearSlot = (position: number) => {
    setFleetSlots(prev => prev.map(slot => 
      slot.position === position 
        ? { ...slot, ship: null }
        : slot
    ))
  }

  // 編成保存
  const handleSaveFormation = () => {
    if (!fleetName.trim()) {
      showToast('編成名を入力してください', 'error')
      return
    }

    const shipCount = fleetSlots.filter(slot => slot.ship !== null).length
    if (shipCount === 0) {
      showToast('編成が空です。艦娘を配置してから保存してください', 'error')
      return
    }

    // 同じ名前の編成があるかチェック
    const existingFormation = savedFormations.find(f => f.name === fleetName.trim())
    
    const formation: SavedFormation = {
      id: existingFormation ? existingFormation.id : Date.now().toString(),
      name: fleetName.trim(),
      ships: fleetSlots.map(slot => slot.ship?.id || null),
      createdAt: existingFormation ? existingFormation.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    saveFormationToStorage(formation)
    setSavedFormations(getSavedFormationsFromStorage())
    
    if (existingFormation) {
      showToast(`編成「${formation.name}」を更新しました！`)
    } else {
      showToast(`編成「${formation.name}」を保存しました！`)
    }
  }

  // 編成読み込み
  const handleLoadFormation = (formation: SavedFormation) => {
    const newSlots = fleetSlots.map((slot, index) => {
      const shipId = formation.ships[index]
      const ship = shipId ? ships.find(s => s.id === shipId) || null : null
      return { ...slot, ship }
    })
    setFleetSlots(newSlots)
    setFleetName(formation.name)
  }

  // 編成削除
  const handleDeleteFormation = (formationId: string) => {
    if (confirm('この編成を削除しますか？')) {
      deleteFormationFromStorage(formationId)
      setSavedFormations(getSavedFormationsFromStorage())
    }
  }

  // 編成全解散
  const handleClearAllFleet = () => {
    const shipCount = fleetSlots.filter(slot => slot.ship !== null).length
    if (shipCount === 0) {
      showToast('編成は既に空です', 'error')
      return
    }
    
    if (confirm(`現在の編成（${shipCount}隻）をすべて解散しますか？`)) {
      setFleetSlots(prev => prev.map(slot => ({ ...slot, ship: null })))
      setFleetName('')
      showToast('編成を全解散しました')
    }
  }

  const stats = calculateFleetStats()

  return (
    <div className="fleet-composer shipgirl">

      {/* メインエリア：艦隊編成画面 */}
      <div className="fleet-composition-area"
           onDragOver={(e) => {
             e.preventDefault()
             e.stopPropagation()
             
             // draggedShipがある場合は艦娘のドラッグ
             if (draggedShip) {
               e.dataTransfer.dropEffect = draggedFromSlot !== null ? 'move' : 'copy'
             }
             // サイドバーが開いていて育成タブが選択されている場合は、copy効果を維持
             else if (isSidebarOpen && sidebarActiveTab === 'training') {
               e.dataTransfer.dropEffect = 'copy'
             } else {
               // その他の場合（編成データなど）
               e.dataTransfer.dropEffect = 'copy'
             }
           }}
           onDrop={(e) => {
             e.preventDefault()
             e.stopPropagation()
             
             
             // データの取得を試みる
             let dropData: any = null
             let isFormationData = false
             
             try {
               const jsonData = e.dataTransfer.getData('application/json')
               if (jsonData) {
                 dropData = JSON.parse(jsonData)
                 
                 // 編成データかどうかを判定
                 if (dropData.ships && dropData.name && Array.isArray(dropData.ships)) {
                   isFormationData = true
                 }
               }
             } catch (error) {
             }
             
             // 編成データのドロップ処理
             if (isFormationData && dropData) {
               handleLoadFormation(dropData)
               showToast(`編成「${dropData.name}」を読み込みました！`)
               return
             }
             
             // 育成リストへの追加処理
             if (isDroppedOnTrainingCandidates) {
               return
             }
             
             // 艦娘の自動配置処理
             const isSidebarArea = (e.target as Element).closest('.formation-sidebar, .training-candidates-content, .drop-zone-tab, .candidates-list, .candidate-item')
             if (!isSidebarArea && (!e.target || !(e.target as Element).closest('.fleet-slot'))) {
               handleDropOutside()
             }
           }}>
        <h2>艦隊編成</h2>
        
        {/* 編成名入力エリア */}
        <div className="fleet-name-input-area">
          <div className="fleet-name-container">
            <label className="fleet-name-label">
              <span className="fleet-name-icon"><span className="material-icons">anchor</span></span>
              編成名
            </label>
            <div className="fleet-name-input-container">
              <input 
                type="text"
                className="fleet-name-input"
                placeholder="編成名を入力してください..."
                maxLength={30}
                value={fleetName}
                onChange={(e) => setFleetName(e.target.value)}
              />
              <div className="formation-action-buttons">
                <button 
                  className="save-formation-btn"
                  onClick={handleSaveFormation}
                  title="現在の編成を保存"
                >
                  <span className="material-symbols-outlined">save</span> 保存
                </button>
                <button 
                  className="clear-all-fleet-btn"
                  onClick={handleClearAllFleet}
                  title="編成をすべて解散"
                >
                  <span className="material-symbols-outlined">clear_all</span> 全解散
                </button>
              </div>
            </div>
            <div className="fleet-count-indicator">
              <span className="fleet-count-text">{stats.shipCount}/6隻</span>
            </div>
          </div>
        </div>

        {/* 編成スロット */}
        <div className="fleet-slots">
          {fleetSlots.map(slot => (
            <div
              key={slot.position}
              className={`fleet-slot ${slot.ship ? 'occupied' : 'empty'} ${dragOverSlot === slot.position ? (isDraggingFormation ? 'formation-drag-over' : 'drag-over') : ''}`}
              onDragOver={(e) => handleDragOver(e, slot.position)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, slot.position)}
              onClick={() => {
                // 艦娘スロットクリックで下部ドロワーを展開
                if (!isDrawerOpen) {
                  setIsDrawerOpen(true)
                  showToast('艦娘一覧を開きました', 'success')
                }
              }}
              style={{ cursor: 'pointer' }}
              title="クリックで艦娘一覧を開く"
            >
              {slot.ship ? (
                <div className={`ship-card-fleet-slot ${isDraggingShip && isSidebarOpen && sidebarActiveTab === 'training' ? 'dragging-to-training' : ''}`}
                     draggable
                     onDragStart={(e) => {
                       if (slot.ship) {
                         handleDragStart(e, slot.ship, slot.position)
                         
                         // 育成タブが開いている場合のヒント
                         if (isSidebarOpen && sidebarActiveTab === 'training') {
                           showToast('右の育成リストにドラッグして追加できます', 'success')
                         }
                       }
                     }}
                     onDragEnd={() => {
                       setDraggedShip(null)
                       setDraggedFromSlot(null)
                       setDragOverSlot(null)
                       setIsDraggingShip(false)
                       document.body.classList.remove('dragging-ship')
                     }}>
                  {/* 艦娘バナー画像 */}
                  <div className="ship-banner-container">
                    <div 
                      className="ship-background-fleet"
                      style={{
                        backgroundImage: `url(/FleetAnalystManager/images/banner/${slot.ship.shipId}.png)`,
                      }}
                    >
                      <div className="ship-overlay-fleet">
                        {/* 位置とタイプ */}
                        <div className="ship-header-fleet">
                          <span className="ship-position">#{slot.position + 1}</span>
                          <span className="ship-type-badge">{SHIP_TYPES[slot.ship.type as keyof typeof SHIP_TYPES] || slot.ship.type}</span>
                        </div>
                        
                        {/* 削除ボタン */}
                        <button 
                          className="remove-button-fleet"
                          onClick={() => clearSlot(slot.position)}
                          title="艦娘を外す"
                        >
                          ×
                        </button>
                        
                        {/* ケッコン指標 */}
                        {slot.ship.isMarried && (
                          <div className="married-indicator-fleet">♥</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* ステータス情報エリア */}
                  <div className="ship-info-area">
                    <div className="ship-name-fleet">{slot.ship.name}</div>
                    <div className="ship-level-fleet">Lv.{slot.ship.level}</div>
                    
                    {/* 装備スロット */}
                    <div className="equipment-slots-vertical">
                      {Array.from({ length: slot.ship?.slotCount || 0 }, (_, slotIndex) => {
                        const aircraftCount = slot.ship?.aircraftSlots[slotIndex] || 0;
                        const equipment = slot.ship?.equipments?.[slotIndex];
                        return (
                          <div 
                            key={slotIndex} 
                            className="equipment-slot-field clickable"
                            onClick={(e) => handleEquipmentSlotClick(e, slot.position, slotIndex)}
                            onDragOver={(e) => {
                              if (draggedEquipment) {
                                e.preventDefault()
                                e.dataTransfer.dropEffect = 'copy'
                              }
                            }}
                            onDrop={(e) => {
                              e.preventDefault()
                              if (draggedEquipment) {
                                handleEquipmentSelect(draggedEquipment)
                                setSelectedShipSlot({ position: slot.position, slotIndex })
                                setDraggedEquipment(null)
                              }
                            }}
                          >
                            <div className="equipment-slot-content">
                              {equipment ? (
                                <>
                                  <div className="equipment-icon equipped">
                                    <img 
                                      src={`/FleetAnalystManager/images/type/icon${equipment.api_type[3]}.png`}
                                      alt={equipment.api_name}
                                      className="equipment-slot-icon"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                  </div>
                                  <div className="equipment-name">
                                    {equipment.api_name}
                                  </div>
                                  {(equipment.improvement_level || 0) > 0 && (
                                    <div className="improvement-level">★{equipment.improvement_level}</div>
                                  )}
                                  <button 
                                    className="equipment-remove"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEquipmentRemove(slot.position, slotIndex)
                                    }}
                                  >
                                    ×
                                  </button>
                                </>
                              ) : (
                                <>
                                  <div className="equipment-icon">⚙</div>
                                  <div className="equipment-text">装備{slotIndex + 1}</div>
                                </>
                              )}
                              {aircraftCount > 0 && (
                                <div className="aircraft-count">{aircraftCount}</div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* fleethub式のステータス表示 */}
                    <div className="ship-stats-fleethub">
                      <ShipStatusDisplay 
                        ship={{
                          ...slot.ship,
                          // 装備込みステータスがあれば使用、なければ基本ステータス
                          currentStats: slot.ship.finalStats || slot.ship.currentStats
                        }}
                        className="fleet-slot-stats"
                        // 装備による補正値を計算してbonusとして渡す
                        bonus={calculateEquipmentBonus(slot.ship.equipments || [])}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-slot-enhanced">
                  <div className="empty-slot-content">
                    <div className="slot-number-enhanced">{slot.position + 1}</div>
                    <div className="slot-icon"><span className="material-icons">anchor</span></div>
                    <div className="slot-text-enhanced">艦娘をドロップ</div>
                    <div className="drop-hint">下から艦娘を<br/>ドラッグしてください</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 下部ナビゲーションドロワー */}
      <div className={`bottom-drawer ${isDrawerOpen ? 'open' : 'closed'}`}>
        {/* ドロワーハンドル */}
        <div 
          className="drawer-handle"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <div className="handle-bar"></div>
          <span className="handle-text">
            {isDrawerOpen ? '艦娘一覧を閉じる' : '艦娘一覧を開く'}
          </span>
        </div>

        {/* ドロワーコンテンツ */}
        <div className="drawer-content">
          {/* 上部ナビゲーション風艦種別フィルター */}
          <div className="ship-type-nav">
            <div className="nav-container">
              <button
                className={`nav-tab ${selectedType === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedType('all')}
              >
                全て
              </button>
              {Object.entries(SHIP_TYPES).map(([type, label]) => (
                <button
                  key={type}
                  className={`nav-tab ${selectedType === type ? 'active' : ''}`}
                  onClick={() => setSelectedType(type)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ソート選択 */}
          <div className="sort-controls">
            <button
              className={`sort-button ${sortType === 'level' ? 'active' : ''}`}
              onClick={() => setSortType('level')}
            >
              レベル順
            </button>
            <button
              className={`sort-button ${sortType === 'id' ? 'active' : ''}`}
              onClick={() => setSortType('id')}
            >
              入手順
            </button>
            <button
              className={`sort-button ${sortType === 'shipId' ? 'active' : ''}`}
              onClick={() => setSortType('shipId')}
            >
              艦種順
            </button>
          </div>

          {/* 艦娘一覧（横スクロール） */}
          <div className="ships-horizontal-container" ref={scrollContainerRef}>
            <div className="ships-horizontal-list">
              {!isFullDataLoaded ? (
                <div className="no-ships-message">
                  <div className="no-ships-icon">
                    <span className="material-icons loading-spin">sync</span>
                  </div>
                  <div className="no-ships-text">
                    艦娘データ読み込み中... {loadingProgress}%
                  </div>
                </div>
              ) : filteredAndSortedShips.length === 0 ? (
                <div className="no-ships-message">
                  <div className="no-ships-icon"><span className="material-icons">anchor</span></div>
                  <div className="no-ships-text">
                    {ships.length === 0 
                      ? (fleetData || storedFleetData) 
                        ? '艦隊データを処理中...'
                        : '艦隊データが読み込まれていません。分析管理で艦隊JSONデータを入力してください。'
                      : `${SHIP_TYPES[selectedType as keyof typeof SHIP_TYPES] || 'この艦種'}の艦娘はいません。`
                    }
                  </div>
                </div>
              ) : (
                filteredAndSortedShips.map((ship, index) => {
                  // 編成中かどうかをチェック
                  const isInFleet = fleetSlots.some(slot => slot.ship?.id === ship.id)
                  
                  return (
                    <LazyShipCard
                      key={ship.id}
                      ship={ship}
                      index={index}
                      draggedShip={draggedShip}
                      isInFleet={isInFleet}
                      onDragStart={handleDragStart}
                  onDragEnd={() => {
                    // ドラッグ終了処理（引数なしバージョン）
                    
                    setTimeout(() => {
                      
                      // 状態リセット
                      setDraggedShip(null)
                      setDraggedFromSlot(null)
                      setDragOverSlot(null)
                      setIsDraggingShip(false)
                      setIsDroppedOnTrainingCandidates(false)
                      document.body.classList.remove('dragging-ship')
                    }, 100)
                  }}
                />
                  )
                })
              )}
            </div>
          </div>
          
          {/* ローディング表示のみ保持 */}
          {!isFullDataLoaded && loadingProgress < 100 && (
            <div className="loading-status">
              <span className="loading-text">艦娘データ読み込み中... {loadingProgress}%</span>
            </div>
          )}
        </div>
      </div>

      {/* サイドバー開閉ボタン */}
      <button 
        className={`sidebar-toggle-btn ${isSidebarOpen ? 'open' : 'closed'}`}
        onClick={() => isSidebarOpen ? closeSidebar() : setIsSidebarOpen(true)}
        title={isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
        aria-label={isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
      >
        <span className="material-icons sidebar-toggle-icon">
          {isSidebarOpen ? 'close' : 'menu'}
        </span>
        <span className="sidebar-toggle-text">
          {isSidebarOpen ? '閉じる' : '編成管理'}
        </span>
      </button>

      {/* 統合サイドバー（編成管理 + 育成リスト） */}
      <div 
        className={`formation-sidebar ${isSidebarOpen ? 'open' : 'closed'} ${isDraggingShip && sidebarActiveTab === 'training' ? 'drag-over' : ''} ${isDraggingOverTrainingArea ? 'drag-highlight' : ''} ${isDragOverImprovementList && sidebarActiveTab === 'improvements' ? 'improvement-drag-over' : ''}`}
        onDragOver={(e) => {
          if (sidebarActiveTab === 'training') {
            e.preventDefault()
            e.stopPropagation()
            e.dataTransfer.dropEffect = 'copy'
            setIsDraggingOverTrainingArea(true)
          } else if (sidebarActiveTab === 'improvements') {
            e.preventDefault()
            e.stopPropagation()
            e.dataTransfer.dropEffect = 'copy'
            setIsDragOverImprovementList(true)
          }
        }}
        onDragLeave={(e) => {
          if (sidebarActiveTab === 'training') {
            const relatedTarget = e.relatedTarget as Element
            if (!relatedTarget || !relatedTarget.closest('.formation-sidebar')) {
              setIsDraggingOverTrainingArea(false)
            }
          } else if (sidebarActiveTab === 'improvements') {
            const relatedTarget = e.relatedTarget as Element
            if (!relatedTarget || !relatedTarget.closest('.formation-sidebar')) {
              setIsDragOverImprovementList(false)
            }
          }
        }}
        onDrop={(e) => {
          if (sidebarActiveTab === 'training') {
            e.preventDefault()
            e.stopPropagation()
            
            setIsDroppedOnTrainingCandidates(true)
            
            let shipToAdd = draggedShip
            
            if (!shipToAdd) {
              try {
                const shipData = e.dataTransfer.getData('application/json')
                if (shipData) {
                  shipToAdd = JSON.parse(shipData)
                }
              } catch (error) {
              }
            }
            
            if (shipToAdd) {
              handleAddToTrainingCandidates(shipToAdd)
            }
          } else if (sidebarActiveTab === 'improvements') {
            e.preventDefault()
            e.stopPropagation()
            
            try {
              const jsonData = e.dataTransfer.getData('application/json')
              if (jsonData) {
                const dropData = JSON.parse(jsonData)
                
                if (dropData.type === 'equipment-for-improvement' && dropData.equipment) {
                  const equipment = dropData.equipment
                  
                  // 装備から改修リストアイテムを作成
                  
                  const newItem: ImprovementItem = {
                    id: Date.now(),
                    equipmentId: equipment.original_id || equipment.api_id,
                    equipmentName: equipment.api_name,
                    equipmentIcon: equipment.api_type[3], // 装備アイコンIDを追加
                    currentLevel: equipment.improvement_level || 0,
                    targetLevel: 10,
                    materials: {},
                    notes: '',
                    createdAt: new Date().toISOString()
                  }
                  
                  // 改修リストに追加（useEffectで自動的に同期される）
                  setImprovementItems(prev => [...prev, newItem])
                  
                  showToast(`${equipment.api_name} ★${equipment.improvement_level || 0} を改修リストに追加しました`, 'success')
                }
              }
            } catch (error) {
              console.error('🔧 ERROR: Failed to parse drop data:', error)
            }
            
            setIsDragOverImprovementList(false)
          }
        }}
      >
        <div className="sidebar-header">
          <h3>
            {sidebarActiveTab === 'formations' ? '保存済み編成' : 
             sidebarActiveTab === 'training' ? '育成リスト' : '改修リスト'}
          </h3>
          <button 
            className="close-sidebar-btn"
            onClick={closeSidebar}
          >
            ×
          </button>
        </div>
        
        {/* タブナビゲーション */}
        <div className="sidebar-tabs">
          <button 
            className={`sidebar-tab ${sidebarActiveTab === 'formations' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('formations')}
          >
            <span className="material-icons">anchor</span> 編成管理
          </button>
          <button 
            className={`sidebar-tab ${sidebarActiveTab === 'training' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('training')}
          >
            <span className="material-icons">note_alt</span> 育成リスト
          </button>
          <button 
            className={`sidebar-tab ${sidebarActiveTab === 'improvements' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('improvements')}
          >
            <span className="material-icons">build</span> 改修リスト
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="sidebar-content">
          {/* ドラッグ中のオーバーレイヒント */}
          {isDraggingShip && sidebarActiveTab === 'training' && (
            <div className="sidebar-drag-overlay">
              <div className="sidebar-drag-content">
                <span className="material-icons sidebar-drag-icon">add_notes</span>
                <div className="sidebar-drag-text">
                  {draggedShip?.name}を<br/>育成リストに追加
                </div>
              </div>
            </div>
          )}
          
          {sidebarActiveTab === 'formations' ? (
            <div className="formation-list">
              {savedFormations.length === 0 ? (
                <div className="no-formations">
                  保存された編成がありません
                </div>
              ) : (
                savedFormations.map(formation => (
                  <div 
                    key={formation.id} 
                    className="formation-item"
                    draggable
                    onDragStart={(e) => {
                      const formationData = JSON.stringify(formation)
                      e.dataTransfer.setData('application/json', formationData)
                      e.dataTransfer.setData('text/plain', `formation:${formation.name}`)
                      e.dataTransfer.effectAllowed = 'copy'
                      e.currentTarget.style.opacity = '0.5'
                    }}
                    onDragEnd={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                  >
                    <div className="formation-info">
                      <div className="formation-header">
                        <span className="material-icons formation-drag-icon">drag_indicator</span>
                        <div className="formation-name">{formation.name}</div>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteFormation(formation.id)}
                          title="この編成を削除"
                        >
                          <span className="material-icons">close</span>
                        </button>
                      </div>
                      <div className="formation-meta">
                        <div className="formation-date">
                          {new Date(formation.updatedAt).toLocaleDateString()}
                        </div>
                        <div className="formation-ships">
                          {formation.ships.filter(id => id !== null).length}/6隻
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : sidebarActiveTab === 'training' ? (
            <div 
              className="training-candidates-content"
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
                e.dataTransfer.dropEffect = 'copy'
                setIsDraggingOverTrainingArea(true)
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsDraggingOverTrainingArea(true)
              }}
              onDragLeave={(e) => {
                const relatedTarget = e.relatedTarget as Element
                if (!relatedTarget || !relatedTarget.closest('.formation-sidebar')) {
                  setIsDroppedOnTrainingCandidates(false)
                }
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                
                // ドロップされたデータを確認
                let dropData: any = null
                try {
                  const jsonData = e.dataTransfer.getData('application/json')
                  if (jsonData) {
                    dropData = JSON.parse(jsonData)
                  }
                } catch (error) {
                }
                
                // 装備のドロップは拒否
                if (dropData && dropData.type === 'equipment-for-improvement') {
                  showToast('装備は育成リストに追加できません', 'error')
                  return
                }
                
                setIsDroppedOnTrainingCandidates(true)
                
                let shipToAdd = draggedShip
                
                if (!shipToAdd && dropData) {
                  // dropDataが艦娘データかどうか確認
                  if (dropData.id && dropData.name && dropData.shipId) {
                    shipToAdd = dropData
                  }
                }
                
                if (shipToAdd) {
                  handleAddToTrainingCandidates(shipToAdd)
                }
              }}
            >
              
              <div className="candidates-list" ref={candidatesListRef}>
                {trainingCandidates.length === 0 ? (
                  <div className="no-candidates">
                    <div className="no-candidates-icon"><span className="material-icons">anchor</span></div>
                    <div className="no-candidates-text">
                      育成リストがありません<br/>
                      艦娘をここにドラッグして追加してください
                    </div>
                  </div>
                ) : (
                  trainingCandidates.map(candidate => {
                    const ship = ships.find(s => s.id === candidate.instanceId)
                    return (
                      <div key={candidate.id} className="training-candidate-banner">
                        <div 
                          className="candidate-banner-full"
                          style={{
                            backgroundImage: `url(/FleetAnalystManager/images/banner/${candidate.shipId}.png)`,
                          }}
                        >
                          {/* オーバーレイ */}
                          <div className="candidate-banner-overlay-full">
                            {/* 上部：艦娘名と削除ボタン */}
                            <div className="candidate-top-bar">
                              <div className="candidate-name-full">{candidate.name}</div>
                              <button 
                                className="remove-candidate-btn-banner"
                                onClick={() => handleRemoveFromTrainingCandidates(candidate.id)}
                                title="育成リストから削除"
                              >
                                <span className="material-icons">close</span>
                              </button>
                            </div>

                            {/* 下部：ステータス情報 */}
                            <div className="candidate-stats-overlay">
                              {/* レベル */}
                              <div className="stat-overlay-item">
                                <div className="stat-overlay-label">Lv</div>
                                <input 
                                  type="number"
                                  className="target-overlay-input"
                                  placeholder="目標"
                                  min={ship?.level || candidate.level || 1}
                                  max="185"
                                  step="1"
                                  value={candidate.targetLevel !== undefined ? candidate.targetLevel : (ship?.level || candidate.level || '')}
                                  onKeyDown={(e) => e.preventDefault()}
                                  onPaste={(e) => e.preventDefault()}
                                  onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (inputValue === '') {
                                      // 空の場合は目標値を削除（undefined設定）
                                      updateTrainingCandidateTargets(candidate.id, {
                                        targetLevel: undefined
                                      })
                                    } else {
                                      const value = parseInt(inputValue)
                                      const minValue = ship?.level || candidate.level || 1
                                      if (!isNaN(value) && value >= minValue && value <= 185) {
                                        updateTrainingCandidateTargets(candidate.id, {
                                          targetLevel: value
                                        })
                                      }
                                    }
                                  }}
                                  // 自動タスク更新を無効化
                                  // onBlur={() => {
                                  //   if (candidate.mainTaskId) {
                                  //     const newTaskText = createMainTaskText(candidate)
                                  //     updateTaskText(candidate.mainTaskId, newTaskText)
                                  //     showToast(`${candidate.name}の育成目標を更新しました（${newTaskText.replace(candidate.name + 'を育成する', '').replace('（', '').replace('）', '')}）`)
                                  //   }
                                  // }}
                                />
                              </div>

                              {/* 耐久 */}
                              <div className="stat-overlay-item">
                                <div className="stat-overlay-label">耐久</div>
                                <input 
                                  type="number"
                                  className="target-overlay-input"
                                  placeholder="目標"
                                  min={ship?.currentStats.hp || 0}
                                  max={(() => {
                                    const currentHp = ship?.currentStats.hp || 0
                                    const hpImprovement = ship?.improvements?.hp || 0
                                    const baseHp = currentHp - hpImprovement
                                    if (baseHp <= 0) return currentHp
                                    return baseHp + 2 // 耐久は通常+2まで改修可能
                                  })()}
                                  step="1"
                                  value={candidate.targetHp !== undefined ? candidate.targetHp : (ship?.currentStats.hp !== undefined ? ship.currentStats.hp : '')}
                                  onKeyDown={(e) => e.preventDefault()}
                                  onPaste={(e) => e.preventDefault()}
                                  onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (inputValue === '') {
                                      // 空の場合は目標値を削除（undefined設定）
                                      updateTrainingCandidateTargets(candidate.id, {
                                        targetHp: undefined
                                      })
                                    } else {
                                      const value = parseInt(inputValue)
                                      const minValue = ship?.currentStats.hp || 0
                                      const currentHp = ship?.currentStats.hp || 0
                                      const hpImprovement = ship?.improvements?.hp || 0
                                      const baseHp = currentHp - hpImprovement
                                      let maxValue = currentHp
                                      if (baseHp > 0) {
                                        maxValue = baseHp + 2 // 耐久は通常+2まで改修可能
                                      }
                                      if (!isNaN(value) && value >= minValue && value <= maxValue) {
                                        updateTrainingCandidateTargets(candidate.id, {
                                          targetHp: value
                                        })
                                      }
                                    }
                                  }}
                                  // 自動タスク更新を無効化
                                  // onBlur={() => {
                                  //   if (candidate.mainTaskId) {
                                  //     const newTaskText = createMainTaskText(candidate)
                                  //     updateTaskText(candidate.mainTaskId, newTaskText)
                                  //     showToast(`${candidate.name}の育成目標を更新しました（${newTaskText.replace(candidate.name + 'を育成する', '').replace('（', '').replace('）', '')}）`)
                                  //   }
                                  // }}
                                />
                              </div>

                              {/* 対潜 */}
                              <div className="stat-overlay-item">
                                <div className="stat-overlay-label">対潜</div>
                                <input 
                                  type="number"
                                  className="target-overlay-input"
                                  placeholder="目標"
                                  min={ship?.currentStats.asw || 0}
                                  max={(() => {
                                    const currentAsw = ship?.currentStats.asw || 0
                                    const aswImprovement = ship?.improvements?.asw || 0
                                    const baseAsw = currentAsw - aswImprovement
                                    if (baseAsw <= 0) return 0
                                    return baseAsw + 9
                                  })()}
                                  step="1"
                                  value={candidate.targetAsw !== undefined ? candidate.targetAsw : (ship?.currentStats.asw !== undefined ? ship.currentStats.asw : '')}
                                  onKeyDown={(e) => e.preventDefault()}
                                  onPaste={(e) => e.preventDefault()}
                                  onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (inputValue === '') {
                                      // 空の場合は目標値を削除（undefined設定）
                                      updateTrainingCandidateTargets(candidate.id, {
                                        targetAsw: undefined
                                      })
                                    } else {
                                      const value = parseInt(inputValue)
                                      const minValue = ship?.currentStats.asw || 0
                                      const currentAsw = ship?.currentStats.asw || 0
                                      const aswImprovement = ship?.improvements?.asw || 0
                                      const baseAsw = currentAsw - aswImprovement
                                      let maxValue = 0
                                      if (baseAsw > 0) {
                                        maxValue = baseAsw + 9
                                      }
                                      if (!isNaN(value) && value >= minValue && value <= maxValue) {
                                        updateTrainingCandidateTargets(candidate.id, {
                                          targetAsw: value
                                        })
                                      }
                                    }
                                  }}
                                  // 自動タスク更新を無効化
                                  // onBlur={() => {
                                  //   if (candidate.mainTaskId) {
                                  //     const newTaskText = createMainTaskText(candidate)
                                  //     updateTaskText(candidate.mainTaskId, newTaskText)
                                  //     showToast(`${candidate.name}の育成目標を更新しました（${newTaskText.replace(candidate.name + 'を育成する', '').replace('（', '').replace('）', '')}）`)
                                  //   }
                                  // }}
                                />
                              </div>

                              {/* 運 */}
                              <div className="stat-overlay-item">
                                <div className="stat-overlay-label">運</div>
                                <input 
                                  type="number"
                                  className="target-overlay-input"
                                  placeholder="目標"
                                  min={ship?.currentStats.luck || 0}
                                  max={(() => {
                                    const masterData = getShipData(candidate.shipId)
                                    return masterData.initialStats.luckMax || 100
                                  })()}
                                  step="1"
                                  value={candidate.targetLuck !== undefined ? candidate.targetLuck : (ship?.currentStats.luck !== undefined ? ship.currentStats.luck : '')}
                                  onKeyDown={(e) => e.preventDefault()}
                                  onPaste={(e) => e.preventDefault()}
                                  onChange={(e) => {
                                    const inputValue = e.target.value
                                    if (inputValue === '') {
                                      // 空の場合は目標値を削除（undefined設定）
                                      updateTrainingCandidateTargets(candidate.id, {
                                        targetLuck: undefined
                                      })
                                    } else {
                                      const value = parseInt(inputValue)
                                      const minValue = ship?.currentStats.luck || 0
                                      const masterData = getShipData(candidate.shipId)
                                      const maxValue = masterData.initialStats.luckMax || 100
                                      if (!isNaN(value) && value >= minValue && value <= maxValue) {
                                        updateTrainingCandidateTargets(candidate.id, {
                                          targetLuck: value
                                        })
                                      }
                                    }
                                  }}
                                  // 自動タスク更新を無効化
                                  // onBlur={() => {
                                  //   if (candidate.mainTaskId) {
                                  //     const newTaskText = createMainTaskText(candidate)
                                  //     updateTaskText(candidate.mainTaskId, newTaskText)
                                  //     showToast(`${candidate.name}の育成目標を更新しました（${newTaskText.replace(candidate.name + 'を育成する', '').replace('（', '').replace('）', '')}）`)
                                  //   }
                                  // }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          ) : sidebarActiveTab === 'improvements' ? (
            /* 改修リストコンテンツ - ドロップ処理はサイドパネル全体で処理 */
            <div className="improvement-list-wrapper"
              onDragOver={(e) => {
                if (draggedEquipment) {
                  e.preventDefault()
                  e.stopPropagation()
                  e.dataTransfer.dropEffect = 'copy'
                }
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                
                if (draggedEquipment) {
                  // 分析管理画面と共有する改修リストに追加
                  const actualAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName') || '提督'
                  
                  // ベースライン記録のために現在の装備データを取得
                  const getBaselineLevels = () => {
                    try {
                      const fleetData = localStorage.getItem('fleetComposer_fleetData')
                      if (fleetData) {
                        const parsedData = JSON.parse(fleetData)
                        if (parsedData.gear_api) {
                          const distribution: Record<number, number> = {}
                          parsedData.gear_api
                            .filter((gear: any) => gear.api_slotitem_id === (draggedEquipment.original_id || draggedEquipment.api_id))
                            .forEach((gear: any) => {
                              const level = gear.api_level || 0
                              distribution[level] = (distribution[level] || 0) + 1
                            })
                          return distribution
                        }
                      }
                      return {}
                    } catch (error) {
                      console.error('ベースライン取得エラー:', error)
                      return {}
                    }
                  }
                  
                  // 装備選択パネルと完全に同じアイコンIDを使用
                  const equipmentIconId = draggedEquipment.api_type[3]
                  
                  // 詳細デバッグログ
                  
                  const newCandidate = {
                    id: Date.now(),
                    equipmentId: draggedEquipment.original_id || draggedEquipment.api_id,
                    equipmentName: draggedEquipment.api_name,
                    currentLevel: draggedEquipment.improvement_level || 0,
                    targetLevel: 10,
                    addedAt: new Date().toISOString(),
                    equipmentType: draggedEquipment.api_type[2],
                    equipmentIcon: equipmentIconId,
                    // ベースライン記録を追加
                    baselineLevels: getBaselineLevels(),
                    requiredCount: 1,
                    achievedCount: 0,
                    isAchieved: false,
                    wasAchieved: false
                  }
                  
                  // LocalStorageから既存の改修リストを読み込み
                  const stored = localStorage.getItem(`${actualAdmiralName}_improvementCandidates`)
                  const existingCandidates = stored ? JSON.parse(stored) : []
                  
                  // 同じ装備が既に存在するかチェック
                  const isDuplicate = existingCandidates.some((c: any) => 
                    c.equipmentId === newCandidate.equipmentId && 
                    c.currentLevel === newCandidate.currentLevel
                  )
                  
                  if (isDuplicate) {
                    showToast(`${draggedEquipment.api_name}★${draggedEquipment.improvement_level || 0}は既に改修リストに登録されています`, 'error')
                  } else {
                    // 新しい候補を追加
                    const updatedCandidates = [...existingCandidates, newCandidate]
                    localStorage.setItem(`${actualAdmiralName}_improvementCandidates`, JSON.stringify(updatedCandidates))
                    
                    showToast(`${draggedEquipment.api_name}を改修リストに追加しました`, 'success')
                    
                    // FleetComposer内の改修リストも更新（旧形式互換）
                    
                    const newItem: ImprovementItem = {
                      id: newCandidate.id, // 同じIDを使用して同期を保つ
                      equipmentId: draggedEquipment.original_id || draggedEquipment.api_id,
                      equipmentName: draggedEquipment.api_name,
                      equipmentIcon: equipmentIconId, // アイコンIDを追加
                      currentLevel: draggedEquipment.improvement_level || 0,
                      targetLevel: 10,
                      materials: {},
                      createdAt: new Date().toISOString()
                    }
                    setImprovementItems(prev => [...prev, newItem])
                  }
                  
                  setDraggedEquipment(null)
                }
              }}
            >
              <div className="improvement-list-content">
              {/* 改修リスト */}
              <div className="improvement-items">
                {improvementItems.length === 0 ? (
                  <div className="no-improvements">
                    <div className="no-improvements-icon">
                      <span className="material-icons">build</span>
                    </div>
                    <div className="no-improvements-text">
                      改修予定がありません<br/>
                      装備パネルから装備をドラッグして改修計画を作成
                    </div>
                  </div>
                ) : (
                  improvementItems.map((item) => {
                    return (
                    <div key={item.id} className="improvement-item">
                      <div className="improvement-item-header">
                        <div className="improvement-equipment-icon">
                          <img 
                            src={`/FleetAnalystManager/images/type/icon${item.equipmentIcon !== null && item.equipmentIcon !== undefined ? item.equipmentIcon : 1}.png`}
                            alt={item.equipmentName}
                            className="equipment-type-icon"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const fallback = e.currentTarget.nextElementSibling;
                              if (fallback) fallback.classList.remove('hidden');
                            }}
                          />
                          <span className="equipment-icon-fallback hidden">🔧</span>
                        </div>
                        <div className="improvement-equipment-name">{item.equipmentName || item.name}</div>
                        <div className="improvement-levels-container">
                          <div className="level-input-group">
                            <span className="level-prefix">現在★</span>
                            <input 
                              type="number"
                              min="0"
                              max="10"
                              value={item.currentLevel}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0
                                if (value >= 0 && value <= 10) {
                                  // 分析管理画面と同期
                                  const actualAdmiralName = localStorage.getItem('fleetAnalysisAdmiralName') || '提督'
                                  const stored = localStorage.getItem(`${actualAdmiralName}_improvementCandidates`)
                                  if (stored) {
                                    const candidates = JSON.parse(stored)
                                    const updatedCandidates = candidates.map((c: any) => 
                                      c.id === item.id ? { ...c, currentLevel: value } : c
                                    )
                                    localStorage.setItem(`${actualAdmiralName}_improvementCandidates`, JSON.stringify(updatedCandidates))
                                  }
                                  
                                  setImprovementItems(prev => prev.map(i => 
                                    i.id === item.id 
                                      ? { ...i, currentLevel: value }
                                      : i
                                  ))
                                }
                              }}
                              className="level-input current-level-input"
                            />
                          </div>
                          <div className="level-input-group">
                            <span className="level-prefix">目標★</span>
                            <input 
                              type="number"
                              min={item.currentLevel + 1}
                              max="10"
                              value={item.targetLevel}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 10
                                if (value > item.currentLevel && value <= 10) {
                                  updateImprovementTargetLevel(item.id, value)
                                }
                              }}
                              className="level-input target-level-input"
                            />
                          </div>
                        </div>
                        <button 
                          className="remove-button-fleet"
                          onClick={() => {
                            // useEffectで自動的に同期されるため、状態更新のみ実行
                            setImprovementItems(prev => prev.filter(i => i.id !== item.id))
                          }}
                          title="改修予定を削除"
                        >
                          ×
                        </button>
                      </div>

                      {item.materials && Object.keys(item.materials).length > 0 && (
                        <div className="improvement-materials">
                          {item.materials.fuel && (
                            <span className="material-item">
                              <span className="material-icon">⛽</span>{item.materials.fuel}
                            </span>
                          )}
                          {item.materials.ammo && (
                            <span className="material-item">
                              <span className="material-icon">🔫</span>{item.materials.ammo}
                            </span>
                          )}
                          {item.materials.steel && (
                            <span className="material-item">
                              <span className="material-icon">🔧</span>{item.materials.steel}
                            </span>
                          )}
                          {item.materials.bauxite && (
                            <span className="material-item">
                              <span className="material-icon">✈️</span>{item.materials.bauxite}
                            </span>
                          )}
                          {item.materials.screw && (
                            <span className="material-item">
                              <span className="material-icon">🔩</span>{item.materials.screw}
                            </span>
                          )}
                        </div>
                      )}

                      {item.notes && (
                        <div className="improvement-notes">
                          <span className="material-icons notes-icon">sticky_note_2</span>
                          {item.notes}
                        </div>
                      )}

                    </div>
                    );
                  })
                )}
              </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>



      {/* オーバーレイ（ドラッグ中は無効） */}
      {isDrawerOpen && !draggedShip && (
        <div 
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* トースト通知 */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* 装備選択パネル */}
      <div className={`equipment-panel ${isEquipmentPanelOpen ? 'open' : 'closed'}`}>
        {/* 装備パネル用ドロワーハンドル */}
        <div 
          className="equipment-drawer-handle"
          onClick={() => setIsEquipmentPanelOpen(!isEquipmentPanelOpen)}
        >
          <div className="equipment-handle-bar"></div>
          <span className="equipment-handle-text">
            装備
          </span>
        </div>
        
        <div className="equipment-panel-header">
          <h3 className="equipment-panel-title">
            装備選択
            {selectedShipSlot && fleetSlots[selectedShipSlot.position]?.ship && (
              <span className="equipment-panel-ship-info">
                - {fleetSlots[selectedShipSlot.position].ship?.name} 装備{selectedShipSlot.slotIndex + 1}
              </span>
            )}
          </h3>
          <button 
            className="equipment-panel-close"
            onClick={() => setIsEquipmentPanelOpen(false)}
          >
            <span className="material-icons">close</span>
          </button>
        </div>

        {/* タブナビゲーション */}
        <div className="equipment-panel-tabs">
          <button
            className={`equipment-tab-btn ${equipmentCategoryTab === 'gun' ? 'active' : ''}`}
            onClick={() => {
              setEquipmentCategoryTab('gun')
              setEquipmentTypeFilter('all')
            }}
          >
            主砲
          </button>
          <button
            className={`equipment-tab-btn ${equipmentCategoryTab === 'torpedo' ? 'active' : ''}`}
            onClick={() => {
              setEquipmentCategoryTab('torpedo')
              setEquipmentTypeFilter('all')
            }}
          >
            魚雷
          </button>
          <button
            className={`equipment-tab-btn ${equipmentCategoryTab === 'aircraft' ? 'active' : ''}`}
            onClick={() => {
              setEquipmentCategoryTab('aircraft')
              setEquipmentTypeFilter('all')
            }}
          >
            艦載機
          </button>
          <button
            className={`equipment-tab-btn ${equipmentCategoryTab === 'radar' ? 'active' : ''}`}
            onClick={() => {
              setEquipmentCategoryTab('radar')
              setEquipmentTypeFilter('all')
            }}
          >
            電探
          </button>
          <button
            className={`equipment-tab-btn ${equipmentCategoryTab === 'other' ? 'active' : ''}`}
            onClick={() => {
              setEquipmentCategoryTab('other')
              setEquipmentTypeFilter('all')
            }}
          >
            その他
          </button>
        </div>

        {/* フィルターボタン */}
        <div className="equipment-panel-filters">
          <button
            className={`equipment-filter-btn ${equipmentTypeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setEquipmentTypeFilter('all')}
          >
            全て
          </button>
          {(() => {
            let filterIds: number[] = []
            switch (equipmentCategoryTab) {
              case 'gun':
                filterIds = [1, 2, 3, 4, 18, 19] // 小口径主砲、中口径主砲、大口径主砲、副砲、対空強化弾、対艦強化弾
                break
              case 'torpedo':
                filterIds = [5, 32] // 魚雷、潜水艦魚雷
                break
              case 'aircraft':
                filterIds = [6, 7, 8, 9, 10, 11, 45, 47, 48, 57] // 各種艦載機
                break
              case 'radar':
                filterIds = [12, 13, 14, 15, 51] // 小型電探、大型電探、ソナー、爆雷、潜水艦電探
                break
              case 'other':
                filterIds = [17, 21, 22, 23, 24, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43, 44, 46, 50, 52, 53, 54] // その他装備
                break
            }
            return filterIds.map(typeId => (
              <button
                key={typeId}
                className={`equipment-filter-btn ${equipmentTypeFilter === typeId ? 'active' : ''}`}
                onClick={() => setEquipmentTypeFilter(typeId)}
              >
                {EQUIPMENT_TYPES[typeId as keyof typeof EQUIPMENT_TYPES]}
              </button>
            ))
          })()}
        </div>


        <div className="equipment-panel-content">
          {(() => {
            // 装備をフィルタリング
            const filteredEquipment = equipmentList.filter(eq => {
              // タブによる大分類フィルター
              let tabFilter = false
              switch (equipmentCategoryTab) {
                case 'gun':
                  tabFilter = [1, 2, 3, 4, 18, 19].includes(eq.api_type[2])
                  break
                case 'torpedo':
                  tabFilter = [5, 32].includes(eq.api_type[2])
                  break
                case 'aircraft':
                  tabFilter = [6, 7, 8, 9, 10, 11, 45, 47, 48, 57].includes(eq.api_type[2])
                  break
                case 'radar':
                  tabFilter = [12, 13, 14, 15, 51].includes(eq.api_type[2])
                  break
                case 'other':
                  tabFilter = [17, 21, 22, 23, 24, 27, 28, 29, 30, 31, 33, 34, 35, 36, 37, 39, 40, 41, 42, 43, 44, 46, 50, 52, 53, 54].includes(eq.api_type[2])
                  break
              }
              
              // 詳細フィルター（タブフィルターが通った装備の中で更に詳細フィルタリング）
              const typeFilter = equipmentTypeFilter === 'all' || eq.api_type[2] === equipmentTypeFilter
              
              // デバッグログ（問題の原因確認用）
              if (equipmentCategoryTab === 'gun' && !tabFilter) {
              }
              
              return tabFilter && typeFilter
            })
            
            // 装備をグループ化（同じoriginal_idと改修値でグループ化）
            const groupedEquipment = filteredEquipment.reduce((groups, equipment) => {
              const key = `${equipment.original_id || equipment.api_id}_${equipment.improvement_level || 0}`
              if (!groups[key]) {
                groups[key] = {
                  equipment: equipment,
                  count: 0,
                  items: []
                }
              }
              groups[key].count += 1
              groups[key].items.push(equipment)
              return groups
            }, {} as Record<string, { equipment: Equipment; count: number; items: Equipment[] }>)
            
            // 装備使用数をカウントして残り個数を計算
            const equipmentUsageCount = new Map<string, number>()
            fleetSlots.forEach(slot => {
              if (slot.ship && slot.ship.equipments) {
                slot.ship.equipments.forEach(equipment => {
                  if (equipment) {
                    const key = `${equipment.original_id || equipment.api_id}_${equipment.improvement_level || 0}`
                    equipmentUsageCount.set(key, (equipmentUsageCount.get(key) || 0) + 1)
                  }
                })
              }
            })
            
            // 装備グループに残り個数を設定
            Object.values(groupedEquipment).forEach(group => {
              const key = `${group.equipment.original_id || group.equipment.api_id}_${group.equipment.improvement_level || 0}`
              const usedCount = equipmentUsageCount.get(key) || 0
              group.count = Math.max(0, group.count - usedCount)
            })
            
            // 残り個数が0の装備グループを除外
            const availableGroupedEquipment = Object.fromEntries(
              Object.entries(groupedEquipment).filter(([_, group]) => group.count > 0)
            )
            
            // グループ化された装備を表示
            return Object.values(availableGroupedEquipment).map(group => (
              <div 
                key={`${group.equipment.original_id || group.equipment.api_id}_${group.equipment.improvement_level || 0}`}
                className="equipment-item"
                draggable
                onDragStart={(e) => {
                  setDraggedEquipment(group.equipment)
                  e.dataTransfer.effectAllowed = 'copy'
                  
                  // 改修リスト用のデータも設定
                  const equipmentForImprovement = {
                    type: 'equipment-for-improvement',
                    equipment: group.equipment
                  }
                  e.dataTransfer.setData('application/json', JSON.stringify(equipmentForImprovement))
                  e.dataTransfer.setData('text/plain', `equipment:${group.equipment.api_name}`)
                  
                }}
                onDragEnd={() => setDraggedEquipment(null)}
                onClick={() => {
                  if (group.count > 0) {
                    handleEquipmentSelect(group.equipment)
                    setIsEquipmentPanelOpen(false)
                  }
                }}
              >
                <div className="equipment-item-icon">
                  <img 
                    src={`/FleetAnalystManager/images/type/icon${group.equipment.api_type[3]}.png`}
                    alt={group.equipment.api_name}
                    className="equipment-type-icon"
                    onError={(e) => {
                      // 画像が読み込めない場合は代替アイコンを表示
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <span className="equipment-fallback-icon hidden">⚙</span>
                </div>
                <div className="equipment-item-info">
                  <div className="equipment-item-name">
                    {group.equipment.api_name}
                    {(group.equipment.improvement_level || 0) > 0 && (
                      <span className="improvement-level">★{group.equipment.improvement_level}</span>
                    )}
                    {group.count > 1 && (
                      <span className="equipment-count">×{group.count}</span>
                    )}
                  </div>
                  <div className="equipment-item-stats">
                    {group.equipment.api_houg > 0 && <span className="stat-tag">火力+{group.equipment.api_houg}</span>}
                    {group.equipment.api_raig > 0 && <span className="stat-tag">雷装+{group.equipment.api_raig}</span>}
                    {group.equipment.api_tyku > 0 && <span className="stat-tag">対空+{group.equipment.api_tyku}</span>}
                    {group.equipment.api_tais > 0 && <span className="stat-tag">対潜+{group.equipment.api_tais}</span>}
                    {group.equipment.api_souk > 0 && <span className="stat-tag">装甲+{group.equipment.api_souk}</span>}
                    {group.equipment.api_houm > 0 && <span className="stat-tag">命中+{group.equipment.api_houm}</span>}
                    {group.equipment.api_houk > 0 && <span className="stat-tag">回避+{group.equipment.api_houk}</span>}
                    {group.equipment.api_saku > 0 && <span className="stat-tag">索敵+{group.equipment.api_saku}</span>}
                  </div>
                </div>
              </div>
            ))
          })()}
        </div>
      </div>

    </div>
  )
}

// 遅延読み込み対応の艦娘カードコンポーネント
const LazyShipCard: React.FC<{
  ship: any
  index: number
  draggedShip: any
  isInFleet: boolean
  onDragStart: (e: React.DragEvent, ship: any) => void
  onDragEnd: () => void
}> = ({ ship, index, draggedShip, isInFleet, onDragStart, onDragEnd }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px' // 50px手前から読み込み開始
      }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 画像の事前読み込み
  useEffect(() => {
    if (isVisible && ship.avatarUrl && !imageLoaded) {
      const img = new Image()
      img.onload = () => setImageLoaded(true)
      img.src = ship.avatarUrl
    }
  }, [isVisible, ship.avatarUrl, imageLoaded])

  return (
    <div
      ref={cardRef}
      className={`ship-card-container ${draggedShip?.id === ship.id ? 'dragging' : ''} ${isInFleet ? 'in-fleet' : ''}`}
      draggable={!isInFleet}
      onDragStart={(e) => !isInFleet && onDragStart(e, ship)}
      onDragEnd={!isInFleet ? onDragEnd : undefined}
      style={{ 
        animationDelay: `${index * 0.05}s`,
        cursor: isInFleet ? 'not-allowed' : 'grab'
      }}
      title={isInFleet ? 'この艦娘は既に編成に含まれています' : ''}
    >
      {/* 上部ラベル */}
      <div className="ship-label">
        <span className="ship-name-label">{ship.name}</span>
        <span className="ship-level-label">Lv.{ship.level}</span>
        {isInFleet && <span className="in-fleet-badge">編成中</span>}
      </div>
      
      {/* カード本体 */}
      <div className={`ship-card-ac rarity-${ship.rarity}`}>
        {/* 背景画像 */}
        <div 
          className="ship-card-background"
          style={{
            backgroundImage: isVisible && imageLoaded 
              ? `url(${ship.avatarUrl || `/api/placeholder/280/320`})`
              : 'none',
            backgroundColor: !imageLoaded ? 'rgba(100, 181, 246, 0.1)' : 'transparent'
          }}
        >
          {/* ローディング表示 */}
          {isVisible && !imageLoaded && (
            <div className="ship-card-loading">
              <span className="material-icons loading-spin">sync</span>
            </div>
          )}
          
          {/* オーバーレイとコンテンツ */}
          <div className="ship-card-overlay">
            <div className="ship-stats-inline">
              <span className="stat-inline">
                耐{ship.currentStats.hp}
                {ship.improvements.hp > 0 && <span className="improvement">+{ship.improvements.hp}</span>}
              </span>
              <span className="stat-inline">
                潜{ship.currentStats.asw}
                {ship.improvements.asw > 0 && <span className="improvement">+{ship.improvements.asw}</span>}
              </span>
              <span className="stat-inline">
                運{ship.currentStats.luck}
                {ship.improvements.luck > 0 && <span className="improvement">+{ship.improvements.luck}</span>}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FleetComposer