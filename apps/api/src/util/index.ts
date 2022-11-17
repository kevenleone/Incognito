import { Device, DistanceOptions, FraudScore } from '../types';

const DAILY_COMMON_DISTANCE = 10;
const DAILY_RISK_DISTANCE = 30;
const MAX_RISK_PERCENT_ACCEPTED = 20;

const DISTANCE_UNIT_COVERT = {
  kilometer: 1.609344,
  nautical_miles: 0.8684,
};

// Code extracted from: https://www.geodatasource.com/developers/javascript

export function getDistance(distanceOptions: DistanceOptions) {
  const [positionA, positionB] = distanceOptions;

  let radlat1 = (Math.PI * positionA.latitude) / 180;
  let radlat2 = (Math.PI * positionB.latitude) / 180;

  let theta = positionA.longitude - positionB.longitude;
  let radtheta = (Math.PI * theta) / 180;

  let distance =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (distance > 1) {
    distance = 1;
  }

  distance = Math.acos(distance);
  distance = (distance * 180) / Math.PI;
  distance = distance * 60 * 1.1515;

  return DISTANCE_UNIT_COVERT.kilometer * distance;
}

export function getRiskAssessment(devices: Device[]) {
  const [locationA, locationB] = devices;

  if (!locationA || !locationB) {
    return FraudScore.LOW;
  }

  const distance = getDistance([locationA, locationB]);

  if (distance < DAILY_COMMON_DISTANCE) {
    return FraudScore.LOW;
  }

  if (distance < DAILY_RISK_DISTANCE) {
    return FraudScore.UNKNOWN;
  }

  return FraudScore.HIGH;
}

export function getIsTrustableDevice(devices: Device[]) {
  let untrustableScore = 0;

  const fraudScores = devices.map((device, index) => {
    if (index === 0) {
      return FraudScore.LOW;
    }

    return getRiskAssessment([device, devices[index - 1]]);
  });

  for (const fraudScore of fraudScores) {
    if ([FraudScore.HIGH, FraudScore.UNKNOWN].includes(fraudScore)) {
      untrustableScore++;
    }
  }

  const isTrustable =
    Math.floor((100 * untrustableScore) / fraudScores.length) <
    MAX_RISK_PERCENT_ACCEPTED;

  return isTrustable;
}
