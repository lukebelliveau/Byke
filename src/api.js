// @flow
export const url = 'http://byke-graphql.herokuapp.com/graphql?query=';

const googleMapsAPIKey = 'AIzaSyAQhawlRtPkYdpC4VHgaB1n3yLOVOEZbYE';

const getAllStations = (stationParams: string) =>
  fetch(`${url}{allStations${stationParams}}`)
    .then(response => {
      return response.json().then(res => {
        return res.data.allStations;
      });
    })
    .catch(e => console.log(e));

const searchPlaces = (searchQuery: string, latitude, longitude) =>
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleMapsAPIKey}&location=${latitude},${longitude}&radius=10000&keyword=${searchQuery}`
  )
    .then(response => {
      response.json().then(json => json.results);
    })
    .catch(e => console.log(e));

export default {
  getAllStations,
  searchPlaces,
};
