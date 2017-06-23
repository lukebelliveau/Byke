// @flow
export const url = 'http://byke-graphql.herokuapp.com/graphql?query=';

const getAllStations = (stationParams: string) =>
  fetch(`${url}{allStations${stationParams}}`)
    .then(response => {
      return response.json().then(res => {
        return res.data.allStations;
      });
    })
    .catch(e => console.log(e));

const searchPlaces = (searchQuery: string) =>
  fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAQhawlRtPkYdpC4VHgaB1n3yLOVOEZbYE&location=41.917547,-87.635919&radius=10000&keyword=${searchQuery}`
  ).then(response => {
    response.json().then(res => console.log(res));
  });

export default {
  getAllStations,
  searchPlaces,
};
