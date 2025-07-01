import { useState, useEffect, useRef } from 'react'
import { 
  SHIP_TYPES, 
  getShipTypeByShipType,
  calculateRarity
} from '../data/shipMasterDataCore'
import { SHIP_TYPES as SHIP_TYPE_NAMES } from '../data/shipMasterData'
import { useShipData } from '../hooks/useShipData'
import { parseImprovements } from '../utils/shipStatsCalculator'
import ShipStatusDisplay from './ShipStatusDisplay'

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
  theme: 'shipgirl' | 'abyssal'
  fleetData?: string // JSONデータを受け取る
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
        if (statMax <= statMin) {
          return statMin
        }
        return Math.floor((statMax - statMin) * level / 99 + statMin)
      }
      
      const aswMax = masterData.initialStats.aswMax || (
        masterData.initialStats.asw > 0 ? masterData.initialStats.asw + 20 : 0
      )
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
      
      return {
        id: ship.api_id || ship.id || index + 1,
        shipId,
        name: masterData.name,
        type: shipType,
        rarity: calculateRarity(level),
        level,
        slotCount: masterData.slotCount || 2, // マスターデータから取得
        aircraftSlots: masterData.aircraft || [], // 搭載数配列を追加
        currentStats,
        improvements,
        isMarried,
        avatarUrl: `/FleetAnalystManager/images/ships/card/${shipId}.png`
      }
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
const TRAINING_CANDIDATES_STORAGE_KEY = 'fleetComposer_trainingCandidates'

// 保存された編成の型定義
interface SavedFormation {
  id: string
  name: string
  ships: (number | null)[] // 艦娘IDの配列（6要素）
  createdAt: string
  updatedAt: string
}

// 育成候補の型定義
interface TrainingCandidate {
  id: number
  shipId: number
  name: string
  level: number
  addedAt: string
}

// 育成候補リスト管理
const getTrainingCandidatesFromStorage = (): TrainingCandidate[] => {
  try {
    const stored = localStorage.getItem(TRAINING_CANDIDATES_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('育成候補リスト読み込みエラー:', error)
    return []
  }
}

const saveTrainingCandidatesToStorage = (candidates: TrainingCandidate[]) => {
  try {
    localStorage.setItem(TRAINING_CANDIDATES_STORAGE_KEY, JSON.stringify(candidates))
  } catch (error) {
    console.error('育成候補リスト保存エラー:', error)
  }
}

const deleteTrainingCandidateFromStorage = (candidateId: number) => {
  const candidates = getTrainingCandidatesFromStorage()
  const filtered = candidates.filter(c => c.id !== candidateId)
  saveTrainingCandidatesToStorage(filtered)
}

// LocalStorageユーティリティ関数
const saveFleetDataToStorage = (data: any) => {
  try {
    localStorage.setItem(FLEET_DATA_STORAGE_KEY, JSON.stringify(data))
    console.log('艦隊データをLocalStorageに保存しました')
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
    console.log('編成を保存しました:', formation.name)
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
    console.log('編成を削除しました:', formationId)
  } catch (error) {
    console.error('編成の削除に失敗:', error)
  }
}

const FleetComposer: React.FC<FleetComposerProps> = ({ theme, fleetData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [sortType, setSortType] = useState<'level' | 'id' | 'shipId' | 'shipType'>('level')
  const [fleetSlots, setFleetSlots] = useState<FleetSlot[]>(
    Array.from({ length: 6 }, (_, i) => ({ position: i, ship: null }))
  )
  const [draggedShip, setDraggedShip] = useState<Ship | null>(null)
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null)
  const [fleetName, setFleetName] = useState<string>('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [ships, setShips] = useState<Ship[]>([])
  const [storedFleetData, setStoredFleetData] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [savedFormations, setSavedFormations] = useState<SavedFormation[]>([])
  const [trainingCandidates, setTrainingCandidates] = useState<TrainingCandidate[]>(getTrainingCandidatesFromStorage())
  const [isDroppedOnTrainingCandidates, setIsDroppedOnTrainingCandidates] = useState(false)
  const [sidebarActiveTab, setSidebarActiveTab] = useState<'formations' | 'training'>('formations')

  // 高速化されたShipDataフック
  const { getShipData, isFullDataLoaded, loadingProgress } = useShipData()

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
  }, [fleetData, isFullDataLoaded]) // getShipDataとstoredFleetDataを除去して無限ループを防止

  // 艦娘リストが更新されたときに保存された編成を復元（初回のみ）
  const [hasRestoredComposition, setHasRestoredComposition] = useState(false)
  
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
        console.log('編成を復元しました')
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
        case 'shipType':
          // 艦種で並び替え（駆逐艦→軽巡→重巡→戦艦→空母の順）
          const getShipTypePriority = (type: string): number => {
            const priorities: { [key: string]: number } = {
              'destroyer': 1,
              'escort': 2,
              'light_cruiser': 3,
              'torpedo_cruiser': 4,
              'heavy_cruiser': 5,
              'training_cruiser': 6,
              'aviation_cruiser': 7,
              'battleship': 8,
              'fast_battleship': 9,
              'aviation_battleship': 10,
              'light_carrier': 11,
              'carrier': 12,
              'armored_carrier': 13,
              'submarine': 14,
              'submarine_carrier': 15,
              'submarine_tender': 16,
              'seaplane_tender': 17,
              'supply_ship': 18,
              'repair_ship': 19,
              'landing_ship': 20
            }
            return priorities[type] || 999
          }
          const priorityA = getShipTypePriority(a.type)
          const priorityB = getShipTypePriority(b.type)
          if (priorityA !== priorityB) {
            return priorityA - priorityB
          }
          // 同じ艦種内ではレベル順
          return b.level - a.level
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

  // ドラッグ開始
  const handleDragStart = (e: React.DragEvent, ship: Ship) => {
    setDraggedShip(ship)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', ship.id.toString())
    e.dataTransfer.setData('application/json', JSON.stringify(ship))
    document.body.classList.add('dragging-ship')
  }

  // ドラッグオーバー
  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSlot(position)
  }

  // ドラッグリーブ
  const handleDragLeave = () => {
    setDragOverSlot(null)
  }

  // ドロップ処理
  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault()
    e.stopPropagation() // イベントの伝播を停止
    setDragOverSlot(null)
    if (draggedShip) {
      setFleetSlots(prev => prev.map(slot => 
        slot.position === position 
          ? { ...slot, ship: draggedShip }
          : slot
      ))
      setDraggedShip(null)
    }
    // ドラッグ終了時にクラスを削除
    document.body.classList.remove('dragging-ship')
  }

  // 画面外ドロップ処理（自動編成）
  const handleDropOutside = () => {
    if (isDroppedOnTrainingCandidates) {
      return
    }
    
    if (draggedShip) {
      const emptySlot = fleetSlots.find(slot => slot.ship === null)
      if (emptySlot) {
        setFleetSlots(prev => prev.map(slot => 
          slot.position === emptySlot.position 
            ? { ...slot, ship: draggedShip }
            : slot
        ))
      }
    }
    // 必ずクリーンアップ
    setDraggedShip(null)
    setDragOverSlot(null)
    document.body.classList.remove('dragging-ship')
  }

  // ドラッグ終了
  const handleDragEnd = (e: React.DragEvent) => {
    setTimeout(() => {
      if (isDroppedOnTrainingCandidates) {
        setIsDroppedOnTrainingCandidates(false)
      } else if (e.dataTransfer.dropEffect === 'none' && draggedShip) {
        handleDropOutside()
      }
      
      setDraggedShip(null)
      setDragOverSlot(null)
      document.body.classList.remove('dragging-ship')
    }, 50) // 50ms待つ
  }

  // 育成候補への追加
  const handleAddToTrainingCandidates = (ship: Ship) => {
    const existing = trainingCandidates.find(c => c.shipId === ship.id)
    if (existing) {
      alert(`${ship.name} は既に育成候補に登録されています`)
      return
    }

    const newCandidate: TrainingCandidate = {
      id: Date.now(),
      shipId: ship.id,
      name: ship.name,
      level: ship.level,
      addedAt: new Date().toISOString()
    }
    
    const updatedCandidates = [...trainingCandidates, newCandidate]
    setTrainingCandidates(updatedCandidates)
    saveTrainingCandidatesToStorage(updatedCandidates)
    
    console.log('✅ 育成候補に追加:', ship.name)
    alert(`${ship.name} を育成候補に追加しました！`)
  }

  // 育成候補から削除
  const handleRemoveFromTrainingCandidates = (candidateId: number) => {
    const updatedCandidates = trainingCandidates.filter(c => c.id !== candidateId)
    setTrainingCandidates(updatedCandidates)
    deleteTrainingCandidateFromStorage(candidateId)
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
      alert('編成名を入力してください')
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
      console.log('編成を更新しました:', formation.name)
    } else {
      console.log('新しい編成を保存しました:', formation.name)
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
    console.log('編成を読み込みました:', formation.name)
  }

  // 編成削除
  const handleDeleteFormation = (formationId: string) => {
    if (confirm('この編成を削除しますか？')) {
      deleteFormationFromStorage(formationId)
      setSavedFormations(getSavedFormationsFromStorage())
    }
  }

  const stats = calculateFleetStats()

  return (
    <div className={`fleet-composer ${theme}`}>
      {/* ドラッグ中のヒント表示 */}
      {draggedShip && (
        <div className="drag-hint-overlay">
          <div className="drag-hint-content">
            <div className="drag-hint-icon">⚓</div>
            <div className="drag-hint-text">
              自動配置
            </div>
            <div className="drag-hint-ship">
              {draggedShip.name} を編成中...
            </div>
          </div>
        </div>
      )}

      {/* メインエリア：艦隊編成画面 */}
      <div className="fleet-composition-area"
           onDragOver={(e) => {
             e.preventDefault()
             e.dataTransfer.dropEffect = 'move'
           }}
           onDrop={(e) => {
             e.preventDefault()
             
             if (isDroppedOnTrainingCandidates) {
               return
             }
             
             const isSidebarArea = (e.target as Element).closest('.formation-sidebar, .training-candidates-content, .drop-zone-tab')
             if (!isSidebarArea && (!e.target || !(e.target as Element).closest('.fleet-slot'))) {
               handleDropOutside()
             }
           }}>
        <h2>艦隊編成</h2>
        
        {/* 編成名入力エリア */}
        <div className="fleet-name-input-area">
          <div className="fleet-name-container">
            <label className="fleet-name-label">
              <span className="fleet-name-icon">⚓</span>
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
              <button 
                className="save-formation-btn"
                onClick={handleSaveFormation}
                title="現在の編成を保存"
              >
                💾 保存
              </button>
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
              className={`fleet-slot ${slot.ship ? 'occupied' : 'empty'} ${dragOverSlot === slot.position ? 'drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, slot.position)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, slot.position)}
            >
              {slot.ship ? (
                <div className="ship-card-fleet-slot">
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
                          <span className="ship-type-badge">{SHIP_TYPE_NAMES[slot.ship.type as keyof typeof SHIP_TYPE_NAMES] || slot.ship.type}</span>
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
                        return (
                          <div key={slotIndex} className="equipment-slot-field">
                            <div className="equipment-slot-content">
                              <div className="equipment-icon">⚙</div>
                              <div className="equipment-text">装備{slotIndex + 1}</div>
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
                        ship={slot.ship}
                        className="fleet-slot-stats"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-slot-enhanced">
                  <div className="empty-slot-content">
                    <div className="slot-number-enhanced">{slot.position + 1}</div>
                    <div className="slot-icon">⚓</div>
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
            <span className="sort-label">ソート:</span>
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
              艦種ID順
            </button>
            <button
              className={`sort-button ${sortType === 'shipType' ? 'active' : ''}`}
              onClick={() => setSortType('shipType')}
            >
              艦種順
            </button>
          </div>

          {/* 艦娘一覧（横スクロール） */}
          <div className="ships-horizontal-container" ref={scrollContainerRef}>
            <div className="ships-horizontal-list">
              {filteredAndSortedShips.length === 0 ? (
                <div className="no-ships-message">
                  <div className="no-ships-icon">⚓</div>
                  <div className="no-ships-text">
                    {ships.length === 0 
                      ? '艦隊データが読み込まれていません。分析管理で艦隊JSONデータを入力してください。'
                      : `${SHIP_TYPES[selectedType as keyof typeof SHIP_TYPES] || 'この艦種'}の艦娘はいません。`
                    }
                  </div>
                </div>
              ) : (
                filteredAndSortedShips.map((ship, index) => (
                <div
                  key={ship.id}
                  className={`ship-card-container ${draggedShip?.id === ship.id ? 'dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, ship)}
                  onDragEnd={handleDragEnd}
                  style={{ 
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  {/* 上部ラベル */}
                  <div className="ship-label">
                    <span className="ship-name-label">{ship.name}</span>
                    <span className="ship-level-label">Lv.{ship.level}</span>
                  </div>
                  
                  {/* カード本体 */}
                  <div className={`ship-card-ac rarity-${ship.rarity}`}>
                    {/* 背景画像 */}
                    <div 
                      className="ship-card-background"
                      style={{
                        backgroundImage: `url(${ship.avatarUrl || `/api/placeholder/280/320`})`,
                      }}
                    >
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
                ))
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

      {/* フローティングサイドバー開閉アイコン */}
      <span 
        className={`floating-sidebar-icon ${isSidebarOpen ? 'open' : 'closed'}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        title={isSidebarOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
      >
        »
      </span>

      {/* 統合サイドバー（編成管理 + 育成候補） */}
      <div 
        className={`formation-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
        onDragOver={(e) => {
          if (sidebarActiveTab === 'training') {
            e.preventDefault()
            e.dataTransfer.dropEffect = 'copy'
          }
        }}
        onDrop={(e) => {
          if (sidebarActiveTab === 'training') {
            e.preventDefault()
            e.stopPropagation()
            
            setIsDroppedOnTrainingCandidates(true)
            
            if (draggedShip) {
              handleAddToTrainingCandidates(draggedShip)
            } else {
              try {
                const shipData = e.dataTransfer.getData('application/json')
                if (shipData) {
                  const ship = JSON.parse(shipData)
                  handleAddToTrainingCandidates(ship)
                }
              } catch (error) {
                console.log('❌ dataTransferからの艦娘データ取得に失敗:', error)
              }
            }
          }
        }}
      >
        <div className="sidebar-header">
          <h3>
            {sidebarActiveTab === 'formations' ? '保存済み編成' : '育成候補リスト'}
          </h3>
          <button 
            className="close-sidebar-btn"
            onClick={() => setIsSidebarOpen(false)}
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
            ⚓ 編成管理
          </button>
          <button 
            className={`sidebar-tab ${sidebarActiveTab === 'training' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('training')}
          >
            📚 育成候補
          </button>
        </div>
        
        {/* タブコンテンツ */}
        <div className="sidebar-content">
          {sidebarActiveTab === 'formations' ? (
            <div className="formation-list">
              {savedFormations.length === 0 ? (
                <div className="no-formations">
                  保存された編成がありません
                </div>
              ) : (
                savedFormations.map(formation => (
                  <div key={formation.id} className="formation-item">
                    <div className="formation-info">
                      <div className="formation-name">{formation.name}</div>
                      <div className="formation-date">
                        {new Date(formation.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="formation-ships">
                        {formation.ships.filter(id => id !== null).length}/6隻
                      </div>
                    </div>
                    <div className="formation-actions">
                      <button 
                        className="load-btn"
                        onClick={() => handleLoadFormation(formation)}
                        title="この編成を読み込み"
                      >
                        📂
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteFormation(formation.id)}
                        title="この編成を削除"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div 
              className="training-candidates-content"
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'copy'
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsDroppedOnTrainingCandidates(true)
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
                console.log('🐛 DEBUG: Drop event on training tab')
                
                setIsDroppedOnTrainingCandidates(true)
                
                let shipToAdd = draggedShip
                
                if (!shipToAdd) {
                  try {
                    const shipData = e.dataTransfer.getData('application/json')
                    if (shipData) {
                      shipToAdd = JSON.parse(shipData)
                    }
                  } catch (error) {
                    console.log('❌ Failed to parse ship data:', error)
                  }
                }
                
                if (shipToAdd) {
                  handleAddToTrainingCandidates(shipToAdd)
                }
              }}
            >
              {/* テストボタン */}
              <div style={{ padding: '10px', borderBottom: '1px solid rgba(100, 181, 246, 0.3)', marginBottom: '10px' }}>
                <button 
                  onClick={() => {
                    if (ships.length > 0) {
                      handleAddToTrainingCandidates(ships[0])
                    } else {
                      alert('艦娘データが読み込まれていません。先に艦隊データを入力してください。')
                    }
                  }}
                  style={{ 
                    background: 'rgba(46, 125, 50, 0.3)', 
                    border: '1px solid rgba(76, 175, 80, 0.5)',
                    color: '#e8f5e8',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}
                >
                  ✅ テスト: 最初の艦娘を追加
                </button>
              </div>
              
              <div className="candidates-list">
                {trainingCandidates.length === 0 ? (
                  <div className="no-candidates">
                    <div className="no-candidates-icon">⚓</div>
                    <div className="no-candidates-text">
                      育成候補がありません<br/>
                      艦娘をここにドラッグして追加してください
                    </div>
                  </div>
                ) : (
                  trainingCandidates.map(candidate => {
                    const ship = ships.find(s => s.id === candidate.shipId)
                    return (
                      <div key={candidate.id} className="candidate-item">
                        <div className="candidate-info">
                          <div className="candidate-name">{candidate.name}</div>
                          <div className="candidate-level">Lv.{candidate.level}</div>
                          <div className="candidate-date">
                            {new Date(candidate.addedAt).toLocaleDateString()}
                          </div>
                          {ship && (
                            <div className="candidate-current-level">
                              現在: Lv.{ship.level}
                            </div>
                          )}
                        </div>
                        <div className="candidate-actions">
                          <button 
                            className="remove-candidate-btn"
                            onClick={() => handleRemoveFromTrainingCandidates(candidate.id)}
                            title="育成候補から削除"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              
              {/* ドロップゾーン */}
              <div 
                className="drop-zone-tab"
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  e.dataTransfer.dropEffect = 'copy'
                }}
                onDragEnter={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsDroppedOnTrainingCandidates(true)
                }}
                onDrop={(e) => {
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
                      console.log('❌ Failed to parse ship data:', error)
                    }
                  }
                  
                  if (shipToAdd) {
                    handleAddToTrainingCandidates(shipToAdd)
                  }
                }}
              >
                <div className="drop-zone-content">
                  <div className="drop-zone-icon">📚</div>
                  <div className="drop-zone-text">
                    育成したい艦娘を<br/>ここにドロップ
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>



      {/* オーバーレイ（ドラッグ中は無効） */}
      {isDrawerOpen && !draggedShip && (
        <div 
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  )
}

export default FleetComposer