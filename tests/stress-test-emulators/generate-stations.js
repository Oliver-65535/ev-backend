const stations = require("./stations.json");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// const endpointGql = "http://35.236.79.246:3012/graphql";
const endpointGql = "http://localhost:3012/graphql";

const createSitesFetch = async (siteName, siteArea, lat, long) => {
  const queryCreateStation = JSON.stringify({
    query: `mutation{
      createOneSite(input:{
        site:{
          site:"${siteName}"
          site_area:"${siteArea}",
          dynamic_asset:"Yes",
          location:{
            type: "Point", 
            coordinates: [${lat}, ${long}]
          }
        }
      }){
        id
      }
    }`,
  });

  const response = await fetch(endpointGql, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateStation,
  });

  const responseJson = await response.json();
  // console.log(responseJson);
  return responseJson.data;
};

const createChargePointFetch = async (chargeBoxId, chargeBoxName, siteId) => {
  const queryCreateStation = JSON.stringify({
    query: `mutation{
      createOneChargePoint(input:{
        chargePoint:{
          chargePointHardwareId:"${chargeBoxId}",
          chargePointName:"${chargeBoxName}",
          public:true,
          status:"Disconnected",
          siteId:${siteId}
        }
      }){
        id
        siteId
        chargePointHardwareId
       }
    }`,
  });

  const response = await fetch(endpointGql, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateStation,
  });

  const responseJson = await response.json();
  // console.log(responseJson);
  return responseJson.data;
};

const createConnectorFetch = async ({
  connectorId,
  connectorTypeId,
  connectorTypeName,
  chargePointHardwareId,
  siteId,
  chargePointId,
}) => {
  const queryCreateConnector = JSON.stringify({
    query: `mutation{
        createOneConnector(input:{
          connector:{
            connectorId:${connectorId},
            chargePointHardwareId:"${chargePointHardwareId}",
            connectorTypeId:"${connectorTypeId}",
            connectorTypeName:"${connectorTypeName}",
            statusId:1,
            statusName:"Faulted",
            price:3,
            priceUnit:"$/kWh",
            power:6,
            maxPower:8,
            siteId:${siteId},
            chargePointId:${chargePointId},
          }
        }){
          id
        }
      }`,
  });

  const response = await fetch(endpointGql, {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateConnector,
  });

  const responseJson = await response.json();
  // console.log(responseJson);
  return responseJson.data;
};

async function generateSitewithstation(num) {
  const site = await createSitesFetch(
    `SiteName${num}`,
    `SiteArea1${num}`,
    parseFloat(37 + Math.random()),
    -(121 + Math.random())
  );
  console.log(site.createOneSite.id);

  const chargePoint = await createChargePointFetch(
    `TESTCHARGEPOINTID${num}`,
    `TESTCHARGEPOINTNAME${num}`,
    site.createOneSite.id
  );
  console.log(chargePoint.createOneChargePoint);

  const connector = await createConnectorFetch({
    connectorId: 1,
    connectorTypeId: "J1772",
    connectorTypeName: "Type 1",
    chargePointHardwareId:
      chargePoint.createOneChargePoint.chargePointHardwareId,
    siteId: chargePoint.createOneChargePoint.siteId,
    chargePointId: chargePoint.createOneChargePoint.id,
  });
  console.log(connector);

  const connector2 = await createConnectorFetch({
    connectorId: 2,
    connectorTypeId: "Mennekes",
    connectorTypeName: "Type 2",
    chargePointHardwareId:
      chargePoint.createOneChargePoint.chargePointHardwareId,
    siteId: chargePoint.createOneChargePoint.siteId,
    chargePointId: chargePoint.createOneChargePoint.id,
  });
  console.log(connector2);
}

for (let index = 2; index < 20; index++) {
  generateSitewithstation(index);
}
