import { useState, useEffect, useRef } from 'react'
import { 
  SHIP_TYPES, 
  getShipType, 
  calculateRarity
} from '../data/shipMasterDataCore'
import { useShipData } from '../hooks/useShipData'
import { parseImprovements } from '../utils/shipStatsCalculator'

// 艦娘データの型定義
interface Ship {
  id: number
  shipId: number
  name: string
  type: string
  rarity: number
  level: number
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
      
      // 改修値から最終ステータスを計算（マスターデータ初期値 + 改修値）
      const currentStats = {
        hp: masterData.initialStats.hp + (improvements.hp || 0),
        firepower: masterData.initialStats.firepower + (improvements.firepower || 0),
        torpedo: masterData.initialStats.torpedo + (improvements.torpedo || 0),
        aa: masterData.initialStats.aa + (improvements.aa || 0),
        armor: masterData.initialStats.armor + (improvements.armor || 0),
        evasion: masterData.initialStats.evasion,
        asw: masterData.initialStats.asw + (improvements.asw || 0),
        los: masterData.initialStats.los,
        luck: masterData.initialStats.luck + (improvements.luck || 0),
        range: masterData.initialStats.range,
        speed: masterData.initialStats.speed,
        aircraft: masterData.initialStats.aircraft
      }
      
      // 艦種の取得（マスターデータのshipClassから）
      const shipType = getShipType(masterData.shipClass)
      
      // ケッコン判定
      const isMarried = level >= 100
      
      return {
        id: ship.api_id || ship.id || index + 1,
        shipId,
        name: masterData.name,
        type: shipType,
        rarity: calculateRarity(level),
        level,
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

const FleetComposer: React.FC<FleetComposerProps> = ({ theme, fleetData }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [sortType, setSortType] = useState<'level' | 'id' | 'shipId'>('level')
  const [fleetSlots, setFleetSlots] = useState<FleetSlot[]>(
    Array.from({ length: 6 }, (_, i) => ({ position: i, ship: null }))
  )
  const [draggedShip, setDraggedShip] = useState<Ship | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [ships, setShips] = useState<Ship[]>([])

  // 高速化されたShipDataフック
  const { getShipData, isFullDataLoaded, loadingProgress } = useShipData()

  // 艦隊データが変更された時に艦娘リストを更新
  useEffect(() => {
    if (fleetData) {
      const parsedShips = parseFleetData(fleetData, getShipData)
      setShips(parsedShips)
    }
  }, [fleetData, getShipData])

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

  // ドラッグ開始
  const handleDragStart = (ship: Ship) => {
    setDraggedShip(ship)
  }

  // ドロップ処理
  const handleDrop = (position: number) => {
    if (draggedShip) {
      setFleetSlots(prev => prev.map(slot => 
        slot.position === position 
          ? { ...slot, ship: draggedShip }
          : slot
      ))
      setDraggedShip(null)
    }
  }

  // スロットクリア
  const clearSlot = (position: number) => {
    setFleetSlots(prev => prev.map(slot => 
      slot.position === position 
        ? { ...slot, ship: null }
        : slot
    ))
  }

  const stats = calculateFleetStats()

  return (
    <div className={`fleet-composer ${theme}`}>
      {/* メインエリア：艦隊編成画面 */}
      <div className="fleet-composition-area">
        <h2>艦隊編成</h2>
        
        {/* 艦隊ステータス表示 */}
        <div className="fleet-stats-panel">
          <div className="stat-item">
            <span className="stat-label">火力:</span>
            <span className="stat-value">{stats.totalFirepower}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">雷装:</span>
            <span className="stat-value">{stats.totalTorpedo}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">対空:</span>
            <span className="stat-value">{stats.totalAA}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">装甲:</span>
            <span className="stat-value">{stats.totalArmor}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">耐久:</span>
            <span className="stat-value">{stats.totalHP}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">回避:</span>
            <span className="stat-value">{stats.totalEvasion}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">索敵:</span>
            <span className="stat-value">{stats.totalLOS}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">艦数:</span>
            <span className="stat-value">{stats.shipCount}/6</span>
          </div>
        </div>

        {/* 編成スロット */}
        <div className="fleet-slots">
          {fleetSlots.map(slot => (
            <div
              key={slot.position}
              className={`fleet-slot ${slot.ship ? 'occupied' : 'empty'}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(slot.position)}
            >
              {slot.ship ? (
                <div className="ship-card-slot">
                  <img 
                    src={slot.ship.avatarUrl || `/api/placeholder/60/60`} 
                    alt={slot.ship.name}
                    className="ship-avatar"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/placeholder/60/60`;
                    }}
                  />
                  <div className="ship-info">
                    <div className="ship-name">{slot.ship.name}</div>
                    <div className="ship-level">Lv.{slot.ship.level}</div>
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => clearSlot(slot.position)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="empty-slot">
                  <span className="slot-number">{slot.position + 1}</span>
                  <span className="slot-text">ドロップ</span>
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
                  className="ship-card-container"
                  draggable
                  onDragStart={() => handleDragStart(ship)}
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
                          火{ship.currentStats.firepower}
                        </span>
                        <span className="stat-inline">
                          雷{ship.currentStats.torpedo}
                        </span>
                        <span className="stat-inline">
                          空{ship.currentStats.aa}
                        </span>
                        <span className="stat-inline">
                          甲{ship.currentStats.armor}
                        </span>
                        <span className="stat-inline">
                          耐{ship.currentStats.hp}
                          {ship.improvements.hp > 0 && <span className="improvement">+{ship.improvements.hp}</span>}
                        </span>
                        <span className="stat-inline">
                          避{ship.currentStats.evasion}
                        </span>
                        <span className="stat-inline">
                          索{ship.currentStats.los}
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

      {/* オーバーレイ */}
      {isDrawerOpen && (
        <div 
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  )
}

export default FleetComposer