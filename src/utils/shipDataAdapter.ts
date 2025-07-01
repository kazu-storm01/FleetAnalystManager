// Adapter to convert between FleetComposer ship data and ShipStatusDisplay data formats

import type { ShipData, MasterShipData } from './shipCalculations';

// Existing FleetComposer ship interface
interface FleetComposerShip {
  id: number;
  shipId: number;
  name: string;
  type: string;
  rarity: number;
  level: number;
  slotCount: number;
  currentStats: {
    hp: number;
    firepower: number;
    torpedo: number;
    aa: number;
    armor: number;
    evasion: number;
    asw: number;
    los: number;
    luck: number;
    range: number;
    speed: number;
    aircraft: number;
  };
  improvements: {
    firepower: number;
    torpedo: number;
    aa: number;
    armor: number;
    luck: number;
    hp: number;
    asw: number;
  };
  isMarried: boolean;
  avatarUrl?: string;
}

// Convert FleetComposer ship to ShipData format for calculations
export const convertToShipData = (ship: FleetComposerShip): ShipData => {
  return {
    id: ship.shipId,
    lv: ship.level,
    exp: [0], // Placeholder - would need to calculate from level
    slotnum: ship.slotCount,
    slot: [], // Placeholder - would need equipment data
    kyouka: [
      ship.improvements.hp,
      ship.improvements.firepower,
      ship.improvements.torpedo,
      ship.improvements.armor,
      ship.improvements.aa,
      ship.improvements.asw,
      0, // LOS improvements not tracked in current system
      ship.improvements.luck
    ],
    kaihi: ship.currentStats.evasion,
    taiku: ship.currentStats.aa
  };
};

// Convert current ship data to MasterShipData format
export const convertToMasterData = (ship: FleetComposerShip): MasterShipData => {
  return {
    shipId: ship.shipId,
    name: ship.name,
    slotCount: ship.slotCount,
    initialStats: {
      hp: ship.currentStats.hp - ship.improvements.hp,
      firepower: ship.currentStats.firepower - ship.improvements.firepower,
      armor: ship.currentStats.armor - ship.improvements.armor,
      torpedo: ship.currentStats.torpedo - ship.improvements.torpedo,
      evasion: ship.currentStats.evasion,
      aa: ship.currentStats.aa - ship.improvements.aa,
      aircraft: ship.currentStats.aircraft,
      speed: ship.currentStats.speed,
      los: ship.currentStats.los,
      range: ship.currentStats.range,
      luck: ship.currentStats.luck - ship.improvements.luck,
      asw: ship.currentStats.asw - ship.improvements.asw
    }
  };
};

// Helper function to create adapter data for ShipStatusDisplay
export const createShipStatusData = (ship: FleetComposerShip) => {
  return {
    shipData: convertToShipData(ship),
    masterData: convertToMasterData(ship)
  };
};