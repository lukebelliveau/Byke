const url = 'http://localhost:4000/graphql?query=';
const query = `{
                allStations {
                  latitude,
                  longitude
                }
              }`

const getAllStations = (fetch) => fetch(`${url}${query}`)
  .then(response =>
    response.json()
      .then(res => {
        return res.data.allStations;
      })
  )

export default {
  getAllStations
}