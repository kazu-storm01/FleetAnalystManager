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
      
      // 対潜値計算サイト準拠の正確な計算式
      // 公式: Math.floor((aswMax - aswMin) * level / 99 + aswMin)
      const calculateAswFromLevel = (level: number, aswMin: number, aswMax: number): number => {
        if (aswMin === 0 && (!aswMax || aswMax === 0)) {
          // 初期値も最大値も0なら対潜能力なし
          return 0
        }
        if (aswMax === undefined || aswMax === 0) {
          // 最大値が不明な場合は初期値のまま（成長しない）
          return aswMin
        }
        // 線形補間による対潜値計算
        return Math.floor((aswMax - aswMin) * level / 99 + aswMin)
      }
      
      // その他のステータス計算（従来通り）
      const calculateStatusFromLevel = (level: number, max: number, min: number): number => {
        if (level === 99 && max > 0) {
          return max
        } else if (max > 0) {
          return Math.floor((max - min) * (level / 99) + min)
        }
        return min
      }
      
      // マスターデータから最大値を取得、なければ推定
      const aswMax = masterData.initialStats.aswMax || (
        masterData.initialStats.asw > 0 ? masterData.initialStats.asw + 20 : 0
      )
      const maxFirepower = masterData.initialStats.firepowerMax || Math.max(masterData.initialStats.firepower * 1.2, masterData.initialStats.firepower + 15)
      const maxTorpedo = masterData.initialStats.torpedoMax || Math.max(masterData.initialStats.torpedo * 1.2, masterData.initialStats.torpedo + 15)
      const maxArmor = masterData.initialStats.armorMax || Math.max(masterData.initialStats.armor * 1.2, masterData.initialStats.armor + 10)
      
      // レベルに応じたステータス計算
      const levelBasedAsw = calculateAswFromLevel(level, masterData.initialStats.asw, aswMax)
      const levelBasedFirepower = calculateStatusFromLevel(level, maxFirepower, masterData.initialStats.firepower)
      const levelBasedTorpedo = calculateStatusFromLevel(level, maxTorpedo, masterData.initialStats.torpedo)
      const levelBasedArmor = calculateStatusFromLevel(level, maxArmor, masterData.initialStats.armor)
      const levelBasedLuck = masterData.initialStats.luck  // 運はレベル成長しない
      
      // 改修値から最終ステータスを計算（レベル成長 + 改修値）
      const currentStats = {
        hp: baseHp + (improvements.hp || 0),
        firepower: levelBasedFirepower + (improvements.firepower || 0),
        torpedo: levelBasedTorpedo + (improvements.torpedo || 0),
        aa: masterData.initialStats.aa + (improvements.aa || 0),
        armor: levelBasedArmor + (improvements.armor || 0),
        evasion: masterData.initialStats.evasion,
        asw: levelBasedAsw + (improvements.asw || 0),
        los: masterData.initialStats.los,
        luck: levelBasedLuck + (improvements.luck || 0),
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
  const [sortType, setSortType] = useState<'level' | 'id' | 'shipId' | 'shipType'>('level')
  const [fleetSlots, setFleetSlots] = useState<FleetSlot[]>(
    Array.from({ length: 6 }, (_, i) => ({ position: i, ship: null }))
  )
  const [draggedShip, setDraggedShip] = useState<Ship | null>(null)
  const [dragOverSlot, setDragOverSlot] = useState<number | null>(null)
  const [fleetName, setFleetName] = useState<string>('')
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
    // ドラッグ中はbodyにクラスを追加
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
    if (draggedShip) {
      // 最初の空いているスロットを探す
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
    // ドロップエフェクトが'none'の場合、ドロップ先が無効だったので自動編成する
    if (e.dataTransfer.dropEffect === 'none' && draggedShip) {
      handleDropOutside()
    } else {
      setDraggedShip(null)
      setDragOverSlot(null)
      document.body.classList.remove('dragging-ship')
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
             // スロット以外の場所へのドロップのみ処理
             if (!e.target || !(e.target as Element).closest('.fleet-slot')) {
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
            <input 
              type="text"
              className="fleet-name-input"
              placeholder="編成名を入力してください..."
              maxLength={30}
              value={fleetName}
              onChange={(e) => setFleetName(e.target.value)}
            />
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
                    <div className="equipment-slots">
                      {Array.from({ length: slot.ship.slotCount }, (_, slotIndex) => (
                        <div key={slotIndex} className="equipment-slot">
                          <div className="equipment-icon">⚙</div>
                          <div className="equipment-text">装備{slotIndex + 1}</div>
                        </div>
                      ))}
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