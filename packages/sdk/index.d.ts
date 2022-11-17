interface IncognitoClass {
  init: () => void;
  getDeviceId: () => string;
  getDeviceIsTrustable: () => { trustableDevice: boolean };
}

declare var Incognito: {
  prototype: Incognito;
  new (applicationId: string, incognitoApiHost?: string): IncognitoClass;
};

export default Incognito;
