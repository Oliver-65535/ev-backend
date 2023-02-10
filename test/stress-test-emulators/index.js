const { RPCClient } = require("ocpp-rpc");
const stations = require("./stations.json");

const chargePointRun = async (chargePointId) => {
  const cli = new RPCClient({
    endpoint: "ws://45.147.176.223:3017", // the OCPP endpoint URL
    identity: chargePointId, // the OCPP identity
    protocols: ["ocpp1.6"], // client understands ocpp1.6 subprotocol
    strictMode: true, // enable strict validation of requests & responses
  });

  // connect to the OCPP server
  await cli.connect();

  // send a BootNotification request and await the response
  const bootResponse = await cli.call("BootNotification", {
    chargePointVendor: "ocpp-rpc",
    chargePointModel: "ocpp-rpc",
  });

  // check that the server accepted the client
  if (bootResponse.status === "Accepted") {
    // send a Heartbeat request and await the response
    const heartbeatResponse = await cli.call("Heartbeat", {});

    // read the current server time from the response
    console.log("Server time is:", heartbeatResponse.currentTime);

    // send a StatusNotification request for the controller
    const statusResponse = await cli.call("StatusNotification", {
      connectorId: 0,
      errorCode: "NoError",
      status: "Available",
    });

    console.log("StatusNotification:", statusResponse);
  }

  await cli.close();
};

const chargeBoxRunFunctions = stations.map((e) => {
  chargePointRun(e);
});

const main = async () => {
  await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
  // await Promise.all(chargeBoxRunFunctions);
};

main();
