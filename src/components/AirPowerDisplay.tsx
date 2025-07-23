import React from 'react'
import { calculateFleetAirPower } from '../utils/airPowerCalculator'

interface Ship {
  aircraftSlots: number[]
  equipments?: (Equipment | null)[]
}

interface Equipment {
  api_type: number[]
  api_tyku: number
  improvement_level?: number
}

interface AirPowerDisplayProps {
  ships: Ship[]
  className?: string
}

const AirPowerDisplay: React.FC<AirPowerDisplayProps> = ({ 
  ships, 
  className = '' 
}) => {
  const fleetAirPower = calculateFleetAirPower(ships)

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg ${className}`}>
      <span className="text-sm font-medium text-gray-700">制空値</span>
      <span className="text-lg font-bold text-sky-700">{fleetAirPower}</span>
    </div>
  )
}

export default AirPowerDisplay