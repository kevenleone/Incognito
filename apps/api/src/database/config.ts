declare global {
  var PLANET_SCALE_HOST: string;
  var PLANET_SCALE_PASSWORD: string;
  var PLANET_SCALE_USERNAME: string;
}

export const planetScaleConfig = {
  host: PLANET_SCALE_HOST,
  username: PLANET_SCALE_USERNAME,
  password: PLANET_SCALE_PASSWORD,
};
