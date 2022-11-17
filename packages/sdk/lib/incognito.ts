class Incognito {
  private readonly applicationId: string;
  private readonly deviceStorageKey = '@incognito/device';
  private readonly incognitoApiHost: string;

  constructor(
    applicationId: string,
    incognitoApiHost = 'http://localhost:8787'
  ) {
    this.applicationId = applicationId;
    this.incognitoApiHost = incognitoApiHost;
  }

  /**
   * @description To simulate the deviceId, we generate an UUID
   * and save it's value to localStorage, in a device, unless the user
   * clears App Data.
   * @returns string
   */

  public getDeviceId(): string {
    let deviceId = localStorage.getItem(this.deviceStorageKey);

    if (!deviceId) {
      deviceId = crypto.randomUUID();

      localStorage.setItem(this.deviceStorageKey, deviceId);
    }

    return deviceId;
  }

  public async getDeviceIsTrustable(): Promise<{ trustableDevice: boolean }> {
    const deviceId = this.getDeviceId();

    const response = await fetch(
      `${this.incognitoApiHost}/api/device-checkin/${deviceId}/trustable`,
      {
        headers: {
          'Incognito-Application-ID': this.applicationId,
        },
      }
    );

    return response.json();
  }

  private async getDeviceProperties() {
    const { latitude, longitude } = await this.getGeoLocation();

    return {
      deviceId: this.getDeviceId(),
      latitude,
      longitude,
      timestamp: new Date(),
    };
  }

  private async getGeoLocation(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    const getGeoLocationPromised = (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

    const location = await getGeoLocationPromised();

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  }

  /**
   * @description Collects the Metadata from Device and Send it to
   * Server, that will process and save the data.
   *
   * An error may occur, if the user doesn't allow geolocation access
   * since we are not handling with retries, retry condition isn't needed
   */

  public async init(): Promise<void> {
    const deviceProperties = await this.getDeviceProperties();

    await fetch(`${this.incognitoApiHost}/api/device-checkin`, {
      body: JSON.stringify(deviceProperties),
      headers: {
        'Content-Type': 'application/json',
        'Incognito-Application-ID': this.applicationId,
      },
      method: 'POST',
    });

    console.info('Incognito Metadata Sent to the Server');
  }
}

export default Incognito;
