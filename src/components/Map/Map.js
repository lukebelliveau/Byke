// @flow
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import MapView from 'react-native-maps';

import StationMarker from './StationMarker';
import api from '../../api';
import getLocation from '../../geolocation';

type Station = {
  latitude: number,
  longitude: number,
  stationName: string,
  availableBikes: number,
};

type Props = {
  locationUpdated: Object => void,
};

class Map extends Component {
  constructor(props: Props) {
    super(props);

    this.props = props;
    this.fetchStationInfo();
    this.watchLocation();
  }

  watchLocation() {
    navigator.geolocation.watchPosition(
      location => {
        this.props.locationUpdated(location.coords),
          null,
          {}
      }
    );
  }

  componentDidUpdate() {
    this.map.animateToRegion(this.props.region);
  }

  fetchStationInfo = () => {
    this.props.loadingStarted();
    api
      .getAllStations(`{ stationName, availableBikes, latitude, longitude }`)
      .then(stations => {
        this.props.stationsFetched(stations);
        this.props.loadingFinished();
      });
  };

  render() {
    const trip = this.props.trip;
    const region = this.props.region;
    const stations = this.props.stations;

    return (
      <View style={{ flex: 1 }}>
        {
          <MapView
            style={{ flex: 1 }}
            onPress={Keyboard.dismiss}
            ref={ref => {
              this.map = ref;
            }}
          >
            <MapContents region={region} stations={stations} trip={trip} />
          </MapView>
        }
      </View>
    );
  }
}

const MapContents = ({ region, stations, trip }) =>
  <View>
    {trip
      ? <View>
          <MapView.Marker coordinate={trip.currentLocation} pinColor="blue" />
          <MapView.Marker coordinate={trip.destination} />
        </View>
      : <MapView.Marker coordinate={region} />}

    {stations.map((station, index) =>
      <StationMarker
        testId={station.stationName}
        stationName={station.stationName}
        coordinate={station}
        availableBikes={station.availableBikes}
        key={index}
      />
    )}
  </View>;
export default Map;
