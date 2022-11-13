import { Router } from "worktop";
import { listen } from "worktop/cache";
import { preflight } from "worktop/cors";
import { connect } from "@planetscale/database";
import { Device } from "./types";
import { getIsTrustableDevice } from "./util";
import { planetScaleConfig } from "./database/config";
import {
  createDevice,
  getDevicesCheckin,
  getDevicesCheckinById,
} from "./database/queries";

const routes = new Router();

routes.prepare = preflight({
  origin: "*",
  methods: ["GET", "POST"],
});

routes.add("GET", "/api/device", async (request, response) => {
  try {
    const conn = connect(planetScaleConfig);

    const devices = await getDevicesCheckin(conn);

    response.send(200, devices);
  } catch (error) {
    console.error(error);
    return response.send(400, error);
  }
});

routes.add("GET", "/api/device/:deviceId", async (request, response) => {
  const { deviceId } = request.params;
  try {
    const conn = connect(planetScaleConfig);

    const devices = await getDevicesCheckinById(conn, deviceId);

    response.send(200, devices);
  } catch (error) {
    console.error(error);
    return response.send(400, error);
  }
});

routes.add(
  "GET",
  "/api/device/:deviceId/trustable",
  async (request, response) => {
    const { deviceId } = request.params;

    try {
      const conn = connect(planetScaleConfig);

      const devices = await getDevicesCheckinById(conn, deviceId);

      response.send(200, {
        trustableDevice: getIsTrustableDevice(devices),
      });
    } catch (error) {
      console.error(error);
      return response.send(400, error);
    }
  }
);

routes.add("POST", "/api/device", async (request, response) => {
  const body = (await request.body<Device>()) as Device;

  body.deviceMetadata = request.headers.get("user-agent") as string;

  const conn = connect(planetScaleConfig);

  try {
    await createDevice(conn, body as Device);

    response.send(201, {
      message: "ok",
    });
  } catch (error) {
    response.send(400, error);
  }
});

listen(routes.run);
