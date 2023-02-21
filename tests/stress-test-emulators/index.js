const { RPCClient } = require("ocpp-rpc");
const stations = require("./stations.json");

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const chargePointRun = async (chargePointId) => {
  const cli = new RPCClient({
    endpoint: "ws://35.236.79.246:3017", // the OCPP endpoint URL
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

    const statusNotif = async () => {
      cli.call("StatusNotification", {
        connectorId: 1,
        errorCode: "NoError",
        status: "Available",
      });
    };

    // send a StatusNotification request for the controller

    const statusResponse = await delay(getRandomInt(10000)).then(
      cli.call("StatusNotification", {
        connectorId: 1,
        errorCode: "NoError",
        status: "Available",
      })
    );

    const status1 = await delay(getRandomInt(10000)).then(
      cli.call("StatusNotification", {
        connectorId: 1,
        errorCode: "NoError",
        status: "Charging",
      })
    );

    const status2 = await delay(getRandomInt(10000)).then(
      cli.call("StatusNotification", {
        connectorId: 1,
        errorCode: "NoError",
        status: "Finishing",
      })
    );

    const status3 = await delay(getRandomInt(10000)).then(
      cli.call("StatusNotification", {
        connectorId: 1,
        errorCode: "NoError",
        status: "Unavailable",
      })
    );

    console.log("StatusNotification:", statusResponse);
  }

  await cli.close();
};

const st = [
  "TESTCHARGEPOINTID9",
  "TESTCHARGEPOINTID8",
  "TESTCHARGEPOINTID5",
  "TESTCHARGEPOINTID7",
  "TESTCHARGEPOINTID3",
  "TESTCHARGEPOINTID6",
  "TESTCHARGEPOINTID10",
  "TESTCHARGEPOINTID11",
  "TESTCHARGEPOINTID4",
  "TESTCHARGEPOINTID2",
  "TESTCHARGEPOINTID16",
  "TESTCHARGEPOINTID12",
  "TESTCHARGEPOINTID13",
  "TESTCHARGEPOINTID18",
  "TESTCHARGEPOINTID19",
  "TESTCHARGEPOINTID17",
  "TESTCHARGEPOINTID15",
  "TESTCHARGEPOINTID14",
];

const statuses = ["Available", "Charging", "Finishing", "Unavailable"];
const connectors = [1, 2];

const chargeBoxRunFunctions = st.map((e) => {
  chargePointRun(e);
});

const main = async () => {
  // chargePointRun("FAKECHARGEBOXID81");
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
  // await Promise.all(chargeBoxRunFunctions);
};

main();
