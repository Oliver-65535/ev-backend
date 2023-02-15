const stations = require("./stations.json");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const createStatiosFetch = async (chargeBoxId, chargeBoxName, lat, long) => {
  const queryCreateStation = JSON.stringify({
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

  const response = await fetch("http://35.236.79.246:3012/graphql", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateStation,
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

  const response = await fetch("http://35.236.79.246:3012/graphql", {
    headers: { "content-type": "application/json" },
    method: "POST",
    body: queryCreateConnector,
  });

  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson.data;
};

let chargeBoxCreateFunctions = [];
const generateStations = async () => {
  for (let i = 1; i < 100; i++) {
    chargeBoxCreateFunctions.push(
      createStatiosFetch(
        "FAKECHARGEBOXID" + i,
        "FAKECHARGEBOXNAME" + i,
        parseFloat(37 + Math.random()),
        -(121 + Math.random())
      )
    );
  }
  Promise.all(chargeBoxCreateFunctions);
  console.log(stations);
};

const generateConnectors = async () => {
  for (let i = 1; i < 100; i++) {
    chargeBoxCreateFunctions.push(createConnectorFetch(i));
  }
};

//generateStations();
generateConnectors();