export interface Device {
  deviceId: string;
  deviceMetadata?: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

export type DistanceOptions = [GeoLocation, GeoLocation];

export enum FraudScore {
  LOW = "LOW",
  HIGH = "HIGH",
  UNKNOWN = "UNKNOWN",
}

interface GeoLocation {
  latitude: number;
  longitude: number;
}
