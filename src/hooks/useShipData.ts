import { useState, useEffect } from 'react'
import type { ShipMasterData } from '../data/shipMasterDataCore'
import { 
  getShipMasterDataSync, 
  CORE_SHIP_MASTER_DATA
} from '../data/shipMasterDataCore'

// 全データの遅延ローディング管理
let fullDataPromise: Promise<{ [key: number]: ShipMasterData }> | null = null
let fullDataCache: { [key: number]: ShipMasterData } | null = null

// 全データを非同期でロード
const loadFullShipData = async (): Promise<{ [key: number]: ShipMasterData }> => {
  if (fullDataCache) {
    return fullDataCache
  }
  
  if (!fullDataPromise) {
    fullDataPromise = import('../data/shipMasterDataFull').then(module => {
      fullDataCache = module.SHIP_MASTER_DATA
      return fullDataCache!
    }).catch(() => {
      fullDataPromise = null
      return {}
    })
  }
  
  return fullDataPromise
}

// Ship dataを取得するカスタムフック
export const useShipData = () => {
  const [isFullDataLoaded, setIsFullDataLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // バックグラウンドで全データをロード
    const loadData = async () => {
      try {
        setLoadingProgress(10)
        await new Promise(resolve => setTimeout(resolve, 100)) // UI応答性確保
        setLoadingProgress(50)
        
        await loadFullShipData()
        setLoadingProgress(100)
        setIsFullDataLoaded(true)
        
      } catch {
        setIsFullDataLoaded(false)
      }
    }

    // 少し遅延してからバックグラウンドロード開始
    const timer = setTimeout(loadData, 1000)
    return () => clearTimeout(timer)
  }, [])

  // 艦娘データを取得（高速版）
  const getShipData = (shipId: number): ShipMasterData => {
    // まずコアデータから高速取得
    if (CORE_SHIP_MASTER_DATA[shipId]) {
      return CORE_SHIP_MASTER_DATA[shipId]
    }
    
    // 全データがロード済みなら使用
    if (fullDataCache && fullDataCache[shipId]) {
      return fullDataCache[shipId]
    }
    
    // フォールバック
    return getShipMasterDataSync(shipId)
  }

  // 艦娘データを非同期で取得（完全版）
  const getShipDataAsync = async (shipId: number): Promise<ShipMasterData> => {
    // コアデータから即座に取得可能
    if (CORE_SHIP_MASTER_DATA[shipId]) {
      return CORE_SHIP_MASTER_DATA[shipId]
    }
    
    // 全データから取得
    try {
      const fullData = await loadFullShipData()
      return fullData[shipId] || getShipMasterDataSync(shipId)
    } catch {
      return getShipMasterDataSync(shipId)
    }
  }

  return {
    getShipData,
    getShipDataAsync,
    isFullDataLoaded,
    loadingProgress,
    coreDataSize: Object.keys(CORE_SHIP_MASTER_DATA).length,
    hasFullData: fullDataCache !== null
  }
}

// プリロード関数
export const preloadShipData = () => {
  loadFullShipData()
}