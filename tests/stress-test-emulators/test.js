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

const chpoints = st.map((e) => new ChargePoint(e));

// init();

var task = cron.schedule("* * * * * *", async () => {
  const res = await chpoints[getRandomInt(18)].sendConnectorStatus(
    connectors[getRandomInt(2)],
    statuses[getRandomInt(4)]
  );
  console.log(res);
});
