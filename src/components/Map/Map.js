// @flow
import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
import MapView from 'react-native-maps';

import Markers from './subcomponents/Markers';
import api from '../../api';
import { modes } from '../../redux/reducers';
import { Location, Station, Trip } from '../../Types';
import utils from '../../utils';

type Props = {
  stations: Array<Station>,
  trip: Trip,
  loadingStarted: () => void,
  loadingFinished: () => void,
  locationUpdated: Location => void,
  stationsFetched: (Array<Station>) => void,
  currentLocation: Location,
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
    this.map.animateToRegion(
      this.props.mode === modes.tripDisplay
        ? utils.computeRegionThatFitsAllPoints([
            this.props.currentLocation,
            this.props.trip.destination,
          ])
        : utils.centerRegionOnUser(this.props.currentLocation)
    );
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
    const stations = this.props.stations;
    const mode = this.props.mode;
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
            <Markers
              mode={mode}
              trip={trip}
              stations={stations}
              currentLocation={currentLocation}
            />
          </MapView>
        }
      </View>
    );
  }
}

export default Map;
