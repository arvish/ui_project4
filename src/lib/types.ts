export type RiskLevel = 'high' | 'medium' | 'low';
export type SupportNeed = 'cooling' | 'water' | 'ride' | 'visit' | 'medical';

export interface Neighbor {
  id: number;
  name: string;
  age: number;
  location: string;
  phone: string;
  livingAlone: boolean;
  risk: RiskLevel;
  needs: SupportNeed[];
  notes: string;
  lastCheckIn?: string;
  nextCheckIn?: string;
  lastNote?: string;
}

export interface CheckInLog {
  id: number;
  neighborId: number;
  note: string;
  timestamp: string;
}

export interface SupportSummaryItem {
  need: SupportNeed;
  count: number;
  label: string;
}
