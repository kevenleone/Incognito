import './style.css';
import IncognitoSDK from '@incognito/sdk';

const incognito = new IncognitoSDK(
  'incognito-id-fff',
  'https://incognito-api.incognito-poc.workers.dev'
);

incognito.init();

document.getElementById('device-id')!.innerText = incognito.getDeviceId();

const button = document.querySelector('button');
const isTrustableDeviceSpan = document.getElementById('is-trustable-device');

button!.onclick = async () => {
  const { trustableDevice } = await incognito.getDeviceIsTrustable();

  isTrustableDeviceSpan!.textContent = trustableDevice ? 'yes' : 'no';
};
