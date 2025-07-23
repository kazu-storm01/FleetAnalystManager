// 高精度ポインターベースドラッグシステム

import { useState, useCallback, useRef, useEffect } from 'react'

interface DragState {
  isDragging: boolean
  draggedItem: any | null
  startPosition: { x: number; y: number }
  currentPosition: { x: number; y: number }
  offset: { x: number; y: number }
}

interface DropZone {
  id: string
  element: HTMLElement
  bounds: DOMRect
  onDrop: (item: any) => void
  onDragOver?: (item: any) => void
  onDragLeave?: () => void
}

interface UsePrecisionDragOptions {
  onDragStart?: (item: any) => void
  onDragEnd?: (item: any, success: boolean) => void
  dragThreshold?: number // ピクセル単位の最小ドラッグ距離
  snapDistance?: number // スナップ効果の距離
}

export function usePrecisionDrag(options: UsePrecisionDragOptions = {}) {
  const {
    onDragStart,
    onDragEnd,
    dragThreshold = 5,
    snapDistance = 20
  } = options

  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItem: null,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
    offset: { x: 0, y: 0 }
  })

  const dropZonesRef = useRef<Map<string, DropZone>>(new Map())
  const activeDropZoneRef = useRef<string | null>(null)
  const dragPreviewRef = useRef<HTMLElement | null>(null)

  // ドロップゾーン登録
  const registerDropZone = useCallback((dropZone: DropZone) => {
    dropZonesRef.current.set(dropZone.id, dropZone)
    
    return () => {
      dropZonesRef.current.delete(dropZone.id)
    }
  }, [])

  // 最適なドロップゾーン検出
  const findDropZone = useCallback((x: number, y: number): DropZone | null => {
    let bestMatch: DropZone | null = null
    let bestDistance = Infinity

    for (const dropZone of dropZonesRef.current.values()) {
      const bounds = dropZone.element.getBoundingClientRect()
      
      // ポイントが境界内にあるかチェック
      if (x >= bounds.left && x <= bounds.right && 
          y >= bounds.top && y <= bounds.bottom) {
        
        // 中心からの距離を計算（より正確なマッチング）
        const centerX = bounds.left + bounds.width / 2
        const centerY = bounds.top + bounds.height / 2
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        )
        
        if (distance < bestDistance) {
          bestDistance = distance
          bestMatch = dropZone
        }
      }
    }

    // スナップ距離内の場合、境界外でもマッチ
    if (!bestMatch) {
      for (const dropZone of dropZonesRef.current.values()) {
        const bounds = dropZone.element.getBoundingClientRect()
        const centerX = bounds.left + bounds.width / 2
        const centerY = bounds.top + bounds.height / 2
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        )
        
        if (distance <= snapDistance && distance < bestDistance) {
          bestDistance = distance
          bestMatch = dropZone
        }
      }
    }

    return bestMatch
  }, [snapDistance])

  // ドラッグプレビュー更新
  const updateDragPreview = useCallback((x: number, y: number) => {
    if (dragPreviewRef.current) {
      dragPreviewRef.current.style.transform = `translate(${x}px, ${y}px)`
      dragPreviewRef.current.style.pointerEvents = 'none'
      dragPreviewRef.current.style.zIndex = '9999'
    }
  }, [])

  // アクティブドロップゾーン管理
  const updateActiveDropZone = useCallback((newZoneId: string | null) => {
    const oldZone = activeDropZoneRef.current
    
    if (oldZone !== newZoneId) {
      // 前のゾーンから退出
      if (oldZone) {
        const zone = dropZonesRef.current.get(oldZone)
        zone?.onDragLeave?.()
        zone?.element.classList.remove('precision-drag-over')
      }
      
      // 新しいゾーンに入場
      if (newZoneId) {
        const zone = dropZonesRef.current.get(newZoneId)
        zone?.onDragOver?.(dragState.draggedItem)
        zone?.element.classList.add('precision-drag-over')
      }
      
      activeDropZoneRef.current = newZoneId
    }
  }, [dragState.draggedItem])

  // ポインター移動処理
  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragState.isDragging) return

    const newPosition = {
      x: e.clientX - dragState.offset.x,
      y: e.clientY - dragState.offset.y
    }

    setDragState(prev => ({
      ...prev,
      currentPosition: newPosition
    }))

    // ドラッグプレビュー更新
    updateDragPreview(newPosition.x, newPosition.y)

    // ドロップゾーン検出
    const dropZone = findDropZone(e.clientX, e.clientY)
    updateActiveDropZone(dropZone?.id || null)
  }, [dragState.isDragging, dragState.offset, updateDragPreview, findDropZone, updateActiveDropZone])

  // ポインター終了処理（フォールバック機能付き）
  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!dragState.isDragging) return

    const dropZone = findDropZone(e.clientX, e.clientY)
    let success = false

    if (dropZone && dragState.draggedItem) {
      try {
        dropZone.onDrop(dragState.draggedItem)
        success = true
        
        // 成功時の視覚的フィードバック
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Precision drop successful')
        }
      } catch (error) {
        console.error('❌ Precision drop failed:', error)
        
        // フォールバック: 最寄りのドロップゾーンを再検索
        let fallbackZone: DropZone | null = null
        let minDistance = Infinity
        
        for (const zone of dropZonesRef.current.values()) {
          const bounds = zone.element.getBoundingClientRect()
          const centerX = bounds.left + bounds.width / 2
          const centerY = bounds.top + bounds.height / 2
          const distance = Math.sqrt(
            Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
          )
          
          if (distance < minDistance && distance <= snapDistance * 2) {
            minDistance = distance
            fallbackZone = zone
          }
        }
        
        if (fallbackZone) {
          try {
            fallbackZone.onDrop(dragState.draggedItem)
            success = true
            if (process.env.NODE_ENV === 'development') {
              console.log('✅ Fallback drop successful')
            }
          } catch (fallbackError) {
            console.error('❌ Fallback drop also failed:', fallbackError)
          }
        }
      }
    }

    // アニメーション付きクリーンアップ
    updateActiveDropZone(null)
    
    if (dragPreviewRef.current) {
      // フェードアウトアニメーション
      dragPreviewRef.current.style.transition = 'opacity 0.2s ease, transform 0.2s ease'
      dragPreviewRef.current.style.opacity = '0'
      dragPreviewRef.current.style.transform += ' scale(0.8)'
      
      setTimeout(() => {
        if (dragPreviewRef.current) {
          dragPreviewRef.current.remove()
          dragPreviewRef.current = null
        }
      }, 200)
    }

    onDragEnd?.(dragState.draggedItem, success)

    setDragState({
      isDragging: false,
      draggedItem: null,
      startPosition: { x: 0, y: 0 },
      currentPosition: { x: 0, y: 0 },
      offset: { x: 0, y: 0 }
    })

    // イベントリスナー削除
    document.removeEventListener('pointermove', handlePointerMove)
    document.removeEventListener('pointerup', handlePointerUp)
    document.removeEventListener('pointercancel', handlePointerUp)
  }, [dragState, findDropZone, updateActiveDropZone, onDragEnd, handlePointerMove, snapDistance])

  // ドラッグ開始
  const startDrag = useCallback((
    item: any,
    sourceElement: HTMLElement,
    pointerEvent: React.PointerEvent
  ) => {
    const rect = sourceElement.getBoundingClientRect()
    const offset = {
      x: pointerEvent.clientX - rect.left,
      y: pointerEvent.clientY - rect.top
    }

    const startPos = {
      x: pointerEvent.clientX - offset.x,
      y: pointerEvent.clientY - offset.y
    }

    // ドラッグプレビュー作成
    const preview = sourceElement.cloneNode(true) as HTMLElement
    preview.style.position = 'fixed'
    preview.style.top = '0'
    preview.style.left = '0'
    preview.style.width = `${rect.width}px`
    preview.style.height = `${rect.height}px`
    preview.style.pointerEvents = 'none'
    preview.style.opacity = '0.8'
    preview.style.transform = `translate(${startPos.x}px, ${startPos.y}px)`
    preview.style.zIndex = '9999'
    preview.classList.add('precision-drag-preview')
    
    document.body.appendChild(preview)
    dragPreviewRef.current = preview

    setDragState({
      isDragging: true,
      draggedItem: item,
      startPosition: startPos,
      currentPosition: startPos,
      offset
    })

    onDragStart?.(item)

    // グローバルイベントリスナー追加
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerUp)

    // ポインターキャプチャ
    sourceElement.setPointerCapture(pointerEvent.pointerId)
  }, [onDragStart, handlePointerMove, handlePointerUp])

  // ドラッグ可能要素用のハンドラー（パフォーマンス最適化版）
  const createDragHandlers = useCallback((item: any) => {
    let dragStartTimer: number | null = null
    let isDragStarting = false
    
    return {
      onPointerDown: (e: React.PointerEvent) => {
        e.preventDefault()
        
        // 既にドラッグ中の場合は無視
        if (dragState.isDragging || isDragStarting) return
        
        isDragStarting = true
        const startX = e.clientX
        const startY = e.clientY
        const element = e.currentTarget as HTMLElement
        
        // ドラッグ開始の視覚的フィードバック
        element.classList.add('precision-drag-starting')
        
        const moveHandler = (moveEvent: PointerEvent) => {
          const distance = Math.sqrt(
            Math.pow(moveEvent.clientX - startX, 2) +
            Math.pow(moveEvent.clientY - startY, 2)
          )
          
          if (distance >= dragThreshold) {
            cleanup()
            startDrag(item, element, e)
          }
        }
        
        const upHandler = () => {
          cleanup()
        }
        
        const cleanup = () => {
          isDragStarting = false
          element.classList.remove('precision-drag-starting')
          document.removeEventListener('pointermove', moveHandler)
          document.removeEventListener('pointerup', upHandler)
          document.removeEventListener('pointercancel', upHandler)
          if (dragStartTimer) {
            clearTimeout(dragStartTimer)
            dragStartTimer = null
          }
        }
        
        // 長押しでもドラッグ開始（タッチデバイス対応）
        dragStartTimer = window.setTimeout(() => {
          if (isDragStarting) {
            cleanup()
            startDrag(item, element, e)
          }
        }, 200)
        
        document.addEventListener('pointermove', moveHandler, { passive: false })
        document.addEventListener('pointerup', upHandler)
        document.addEventListener('pointercancel', upHandler)
      },
      
      // タッチデバイス用の追加ハンドラー
      onTouchStart: (e: React.TouchEvent) => {
        // タッチデバイスでのスクロール防止
        if (e.touches.length === 1) {
          e.preventDefault()
        }
      }
    }
  }, [dragThreshold, startDrag, dragState.isDragging])

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (dragPreviewRef.current) {
        dragPreviewRef.current.remove()
      }
      updateActiveDropZone(null)
    }
  }, [updateActiveDropZone])

  return {
    dragState,
    registerDropZone,
    createDragHandlers,
    isDragging: dragState.isDragging
  }
}