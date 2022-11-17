import { Connection } from '@planetscale/database';
import { Device } from '../types';
import { getRiskAssessment } from '../util';

const ONE_MONTH_INTERVAL = '(NOW() - INTERVAL 1 MONTH)';

export const getDevicesCheckin = async (conn: Connection) => {
  const result = await conn.execute('SELECT * FROM DeviceCheckin');

  return result.rows as Device[];
};

export const getDevicesCheckinById = async (
  conn: Connection,
  deviceId: number | string,
  otherParams = ''
) => {
  const result = await conn.execute(
    `SELECT * FROM DeviceCheckin WHERE deviceId = ? 
     AND createdAt > ${ONE_MONTH_INTERVAL}
     ORDER BY createdAt DESC
     ${otherParams}`,
    [deviceId]
  );

  return result.rows as Device[];
};

export const createDevice = async (conn: Connection, device: Device) => {
  if (!device) {
    throw new Error('Body is missing');
  }

  const { deviceId, timestamp, deviceMetadata, latitude, longitude } = device;

  if (!deviceId || !latitude || !longitude) {
    throw new Error('Device, Latitude or Longitude is missing');
  }

  const devices = await getDevicesCheckinById(conn, deviceId, 'LIMIT 2');

  const score = getRiskAssessment(devices);

  const result = await conn.execute(
    `INSERT INTO DeviceCheckin (deviceId, deviceMetadata, latitude, longitude, score, createdAt) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [deviceId, deviceMetadata, latitude, longitude, score, new Date(timestamp)]
  );

  return result.rowsAffected;
};
