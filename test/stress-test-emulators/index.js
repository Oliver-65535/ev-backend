const {
  BootNotificationRequest,
  BootNotificationResponse,
  OcppClient,
  OcppError,
} = require("ocpp-ts");

const chargingPointSimple = new OcppClient("CP1111");
chargingPointSimple.on("error", (err) => {
  console.log(err.message);
});
chargingPointSimple.on("close", () => {
  console.log("Connection closed");
});

chargingPointSimple.on("connect", async () => {
  const boot = {
    chargePointVendor: "eParking",
    chargePointModel: "NECU-T2",
  };

  try {
    const bootResp = await chargingPointSimple.callRequest(
      "BootNotification",
      boot
    );
    if (bootResp.status === "Accepted") {
      console.log("Bootnotification accepted");
    }
  } catch (e) {
    if (e instanceof Error || e instanceof OcppError) {
      console.error(e.message);
    }
  }
});
chargingPointSimple.connect("ws://localhost:3017/");
