// @flow
import React, { Component } from 'react';
import { Keyboard, View, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';

import StationMarker from './StationMarker';
import api from './api';

type Station = {
  latitude: number,
  longitude: number,
  stationName: string,
  availableBikes: number,
};

type Props = {
  region: { number: string },
  stations: Array<Station>,
  style: Object,
  trip: Object,
};

const initialState = {
  stations: [],
};
class Map extends Component {
  state = initialState;
  constructor(props: Props) {
    super(props);

    this.props = props;
  }

  componentDidMount() {
    this.fetchStationInfo();
  }

  loadStations() {
    const stations = AsyncStorage.getItem('@Byke:stations')
      .then(stations => {
        if (stations !== null) {
          this.setState({
            stations: JSON.parse(stations),
          });
        } else {
          this.fetchStationInfo();
        }
      })
      .catch(e => {
        Error('error fetching stations!' + e);
      });
  }

  fetchStationInfo = () => {
    api
      .getAllStations(`{ stationName, availableBikes, latitude, longitude }`)
      .then(stations => {
        AsyncStorage.setItem(
          '@Byke:stations',
          JSON.stringify(stations)
        ).catch(e => console.log('error:' + e));
        this.setState({
          stations,
        });
      });
  };

  render() {
    const trip = this.props.trip;
    const region = this.props.region;
    const stations = this.state.stations;

    return (
      <MapView
        style={{ flex: 1 }}
        region={region}
        initialRegion={region}
        onPress={Keyboard.dismiss}
      >
        {trip
          ? <View>
              <MapView.Marker
                coordinate={trip.currentLocation}
                pinColor="blue"
              />
              <MapView.Marker coordinate={trip.destination} />
            </View>
          : <MapView.Marker coordinate={region} />}

        {stations.map((station, index) =>
          <StationMarker
            testId={station.stationName}
            coordinate={station}
            availableBikes={station.availableBikes}
            key={index}
          />
        )}
      </MapView>
    );
  }
}

export default Map;
