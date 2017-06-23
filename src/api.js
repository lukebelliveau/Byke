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

export default {
  getAllStations,
};
