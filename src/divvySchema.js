export default`
type Query {
  allStations: [Station]
}

type Station {
  id: ID,
  stationName: String,
  availableDocks: Int,
  totalDocks: Int,
  availableBikes: Int,
  latitude: Float,
  longitude: Float,
}`