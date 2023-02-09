const stations = require("./stations.json");

const createStatiosFetch = async (chargeBoxId, chargeBoxName, lat, long) => {
  const queryCreateConnector = JSON.stringify({
    query: `mutation{
        createOneStation(
          input:{
            station:{
              station_id:"${chargeBoxId}",
              station_name:"${chargeBoxName}"
              location:{
                type:"Point",
                  coordinates:[${lat},${long}]
              }
            }
          })
        {
          location
        }
      }
      `,
  });

  const response = await fetch("http://45.147.176.223:3012/graphql", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateConnector,
  });

  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson.data;
};

const createConnectorFetch = async (id) => {
  const queryCreateConnector = JSON.stringify({
    query: `mutation{
      createOneConnector(
        input:{
          connector:{
            connector:"1"
            connector_type:"2",
            consumption:"7"
            status:"Available",
            stationId:${id}
          }
        }
      )
      {
        status
        station{
          station_id
        }
      }
    }`,
  });

  const response = await fetch("http://45.147.176.223:3012/graphql", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateConnector,
  });

  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson.data;
};

let chargeBoxIds = [];
const generateStations = async () => {
  for (let i = 0; i < 1000; i++) {
    createStatiosFetch(
      "FAKECHARGEBOXID" + i,
      "FAKECHARGEBOXNAME" + i,
      37 + Math.random(),
      122 + Math.random()
    );
    chargeBoxIds.push("FAKECHARGEBOXID" + i);
  }
  console.log(stations);
};

const generateConnectors = async () => {
  for (let i = 22; i < 1021; i++) {
    createConnectorFetch(i);
  }
};

// generateStations();
generateConnectors();
