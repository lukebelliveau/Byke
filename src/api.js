// const url = 'http://localhost:4000/graphql?query=';
const url = 'http://10.0.0.215:4000/graphql?query=';
const query = `{
                allStations {
                  latitude,
                  longitude
                }
              }`

const getAllStations = () => fetch(`${url}${query}`)
  .then(response =>
    response.json()
      .then(res => {
        return res.data.allStations;
      })
  )
  .catch(e => console.log(e))

export default {
  getAllStations
}