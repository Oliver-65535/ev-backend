const createStatiosFetch = async (chargeBoxId, chargeBoxName, lat,long) => {
    const query = JSON.stringify({
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
      `
    });
  
    const response = await fetch("http://45.147.176.223:3012/graphql", {
      headers: {'content-type': 'application/json'},
      method: 'POST',
      body: query,
    });
    
    const responseJson = await response.json();
    console.log(responseJson)
    return responseJson.data;
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

let chargeBoxIds = []  
const  generateStations = async() => {

  for (let i = 0; i < 1000; i++) {
    console.log("FAKECHARGEBOXID"+i,"FAKECHARGEBOXNAME"+i,37+Math.random(),122+Math.random())
    chargeBoxIds.push("FAKECHARGEBOXID"+i)  
  }
    console.log(chargeBoxIds)
}



generateStations()


