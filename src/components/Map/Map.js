// @flow
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import MapView from 'react-native-maps';

import StationMarker from './StationMarker';
import api from '../../api';
import { Region, Location, Station, Trip } from '../../Types';

type Props = {
  stations: Array<Station>,
  region: Region,
  trip: Trip,
  loadingStarted: () => void,
  loadingFinished: () => void,
  locationUpdated: Location => void,
  stationsFetched: (Array<Station>) => void,
};

const positionError = error => {
  throw Error(error.message);
};

const positionOptions = {
  timeout: Number.POSITIVE_INFINITY,
  maximumAge: 0,
  enableHighAccuracy: false,
};

class Map extends Component {
  map: {
    animateToRegion: Region => void,
  };
  constructor(props: Props) {
    super(props);

    this.props = props;
    this.fetchStationInfo();
    this.watchLocation();
  }

  watchLocation() {
    navigator.geolocation.watchPosition(
      location => {
        this.props.locationUpdated(location.coords), null, {};
      },
      positionError,
      positionOptions
    );
  }

  componentDidUpdate() {
    this.map.animateToRegion(this.props.region);
  }

  fetchStationInfo = () => {
    this.props.loadingStarted();
    api
      .getAllStations(
        `{ stationName, availableBikes, availableDocks, latitude, longitude }`
      )
      .then(stations => {
        this.props.stationsFetched(stations);
        this.props.loadingFinished();
      });
  };

  render() {
    const trip = this.props.trip;
    const region = this.props.region;
    const stations = this.props.stations;
    const currentLocation = this.props.currentLocation;

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
            {trip
              ? <View>
                  <MapView.Marker
                    coordinate={currentLocation}
                    pinColor="blue"
                  />
                  <MapView.Marker coordinate={trip.destination} />
                </View>
              : <MapView.Marker coordinate={currentLocation} />}

            {stations.map((station, index) => {
              return (
                <StationMarker
                  testId={station.stationName}
                  stationName={station.stationName}
                  coordinate={station}
                  currentLocation={currentLocation}
                  availableBikes={station.availableBikes}
                  availableDocks={station.availableDocks}
                  key={index}
                />
              );
            })}
          </MapView>
        }
      </View>
    );
  }
}

export default Map;
