import "./style.css";
import IncognitoSDK from "incognito-sdk";

const incognito = new IncognitoSDK(
  "incognito-id-fff",
  "https://incognito-api.incognito-poc.workers.dev"
);

incognito.init();

document.getElementById("device-id")!.innerText = incognito.getDeviceId();
