interface IncognitoClass {
  init: () => void;
  getDeviceId: () => string;
}

declare var Incognito: {
  prototype: Incognito;
  new (applicationId: string, incognitoApiHost?: string): IncognitoClass;
};

export default Incognito;
