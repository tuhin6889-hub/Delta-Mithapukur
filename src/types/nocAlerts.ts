export interface NocAiAlert {
  id: string;
  timestamp: string;
  nodeId: string;
  nodeName: string;
  oltCode: string;
  severity: 'CRITICAL' | 'HIGH' | 'WARNING';
  metricType: 'LATENCY_SPIKE' | 'JITTER_BURST' | 'OPTICAL_LOSS' | 'BDIX_CONGESTION';
  currentValue: number;
  baselineValue: number;
  unit: string;
  aiDiagnosis: string;
  aiRecommendation: string;
  suggestedSquad: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  notifiedManager: boolean;
  notifiedManagerAt?: string;
  ticketIdCreated?: string;
}

export const STORAGE_KEY_NOC_AI_ALERTS = 'DELTA_MITHAPUKUR_NOC_AI_ALERTS_V1';
export const STORAGE_KEY_AUTO_NOTIFY_MANAGER = 'DELTA_MITHAPUKUR_AUTO_NOTIFY_MANAGER_V1';
