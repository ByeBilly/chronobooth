export enum EraId {
  ROARING_20S = 'ROARING_20S',
  VICTORIAN = 'VICTORIAN',
  CYBERPUNK = 'CYBERPUNK',
  ANCIENT_ROME = 'ANCIENT_ROME',
  WILD_WEST = 'WILD_WEST',
  EIGHTIES_ARCADE = 'EIGHTIES_ARCADE'
}

export interface Era {
  id: EraId;
  name: string;
  description: string;
  promptModifier: string;
  icon: string;
}

export interface AnalysisResult {
  description: string;
  timestamp: number;
}
