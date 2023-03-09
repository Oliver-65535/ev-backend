var cron = require("node-cron");
const { RPCClient } = require("ocpp-rpc");

const endpoint = "ws://35.236.79.246:3017";

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class ChargePoint {
  constructor(chargePointId) {
    this.cli = new RPCClient({
      endpoint: endpoint, // the OCPP endpoint URL
      identity: chargePointId, // the OCPP identity
      protocols: ["ocpp1.6"], // client understands ocpp1.6 subprotocol
      strictMode: true, // enable strict validation of requests & responses
    });
    this.cli.connect();

    this.bootResponse = this.cli.call("BootNotification", {
      chargePointVendor: "ocpp-rpc",
      chargePointModel: "ocpp-rpc",
    });
  }

  boot() {
    return this.bootResponse;
  }

  async sendConnectorStatus(id, status) {
    return await this.cli.call("StatusNotification", {
      connectorId: id,
      errorCode: "NoError",
      status: status,
    });
  }
}

const st = [
  "TESTCHARGEPOINTID14",
  "TESTCHARGEPOINTID5",
  "TESTCHARGEPOINTID11",
  "TESTCHARGEPOINTID13",
  "TESTCHARGEPOINTID7",
  "TESTCHARGEPOINTID3",
  "TESTCHARGEPOINTID10",
  "TESTCHARGEPOINTID8",
  "TESTCHARGEPOINTID16",
  "TESTCHARGEPOINTID17",
  "TESTCHARGEPOINTID4",
  "TESTCHARGEPOINTID12",
  "TESTCHARGEPOINTID6",
  "TESTCHARGEPOINTID19",
  "TESTCHARGEPOINTID18",
  "TESTCHARGEPOINTID15",
  "TESTCHARGEPOINTID2",
  "TESTCHARGEPOINTID9",
];

const statuses = ["Available", "Charging", "Finishing", "Unavailable"];
const connectors = [1, 2, 3, 4, 5, 6];

const chpoints = st.map((e) => new ChargePoint(e));

// init();

var task = cron.schedule("* * * * * *", async () => {
  const res1 = await chpoints[getRandomInt(17)].sendConnectorStatus(
    connectors[getRandomInt(5)],
    statuses[getRandomInt(4)]
  );
  // const res2 = await chpoints[1].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res3 = await chpoints[2].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res4 = await chpoints[3].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res5 = await chpoints[4].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res6 = await chpoints[5].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res7 = await chpoints[6].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res8 = await chpoints[7].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res9 = await chpoints[8].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res10 = await chpoints[9].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res11 = await chpoints[10].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res12 = await chpoints[11].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res13 = await chpoints[12].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res14 = await chpoints[13].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res15 = await chpoints[14].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res16 = await chpoints[15].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res17 = await chpoints[16].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  // const res18 = await chpoints[17].sendConnectorStatus(
  //   connectors[getRandomInt(6)],
  //   statuses[getRandomInt(4)]
  // );
  console.log(res1);
});
