// @flow
import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';

import api from './api';
import Map from './Map';
import EnterDestination from './EnterDestination';
import getLocation from './geolocation';

import LocationList from './LocationList';

const initialState = {
  region: null,
  stations: [],
  results: [],
};

class Byke extends React.Component {
  state = initialState;
  constructor() {
    super();

    this.searchDestination = this.searchDestination.bind(this);
  }

  componentDidMount() {
    this.updateLocation();

    this.loadStations();
    // setInterval(() => this.updateLocation(), 1000);
  }

  updateLocation() {
    getLocation(location => {
      this.setState(prevState => ({
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
      }));
    });
  }

  loadStations() {
    const stations = AsyncStorage.getItem('@Byke:stations')
      .then(stations => {
        if (stations !== null) {
          console.log('Loading stations from cache...');
          this.setState({
            stations: JSON.parse(stations),
          });
        } else {
          this.fetchStationInfo();
        }
      })
      .catch(e => {
        console.log('error fetching stations!');
        console.log(e);
      });
  }

  fetchStationInfo = () => {
    console.log('Fetching stations from web...');
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

  searchDestination = (searchQuery: string) => {
    api
      .searchPlaces(
        searchQuery,
        this.state.region.latitude,
        this.state.region.longitude
      )
      .then(response =>
        response.json().then(json => {
          this.setState({
            results: json.results,
          });
        })
      );
  };

  render() {
    return this.state.region == null
      ? <View />
      : <View style={styles.container}>
          <EnterDestination
            onSubmit={this.searchDestination}
            style={styles.destination}
          />
          <View style={styles.map}>
            <Map region={this.state.region} stations={this.state.stations} />
            <LocationList results={this.state.results} />
          </View>
        </View>;
  }
}

const station = [
  {
    geometry: {
      location: {
        lat: 41.9142524,
        lng: -87.63496320000002,
      },
      viewport: {
        northeast: {
          lat: 41.91560243029149,
          lng: -87.6335381197085,
        },
        southwest: {
          lat: 41.91290446970849,
          lng: -87.63623608029151,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: '30641ea8c9fb9214198d05efd057a4cfc640ecfd',
    name: 'Nookies',
    opening_hours: {
      open_now: true,
      weekday_text: [],
    },
    photos: [
      {
        height: 1840,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108226039997578764114/photos">Nookies</a>',
        ],
        photo_reference:
          'CmRaAAAA6yqIas-EmNRsZd6gHDI1t3XXb3BkPOOrwi2cElfc8F_FBiFwI2sY0aIonR6ARKoob7SlHTiXlmQvvAKibJwZ2dGp44MA4yu52-zQUCGVRHdrDE2TLcjAPjnJ8WQltPDGEhDSEaLF6OXnwPmNVld7Yvo7GhQjbeCgQV0UddQhFt2bFwANAyvrfA',
        width: 1840,
      },
    ],
    place_id: 'ChIJW0L9w0HTD4gR4yyzCYfFgOY',
    price_level: 2,
    rating: 4.4,
    reference:
      'CmRSAAAADGZvz2KUSbZmr_ZGQd8Qp6I7QwWWCpx33R3HKYysbnrmhmYaQIPlPxvaHTpndXEEvNSAgWOEKpEH2xR8P7tSGPmzQqW2P6rOgokooZzuDh9GxGPUjFqZmQnSME9QojZ0EhD1JBCp6Cem_mI-SsEbDiBrGhSDcQGEn6PJrdP5FnC7aYwJVb05oA',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    vicinity: '1746 North Wells Street, Chicago',
  },
  {
    geometry: {
      location: {
        lat: 41.98395379999999,
        lng: -87.65822860000002,
      },
      viewport: {
        northeast: {
          lat: 41.9851574802915,
          lng: -87.6568742697085,
        },
        southwest: {
          lat: 41.9824595197085,
          lng: -87.6595722302915,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: '12b7ce2c82a5389006040268ed27c0b7c4457a2c',
    name: 'Nookies Edgewater',
    opening_hours: {
      open_now: true,
      weekday_text: [],
    },
    photos: [
      {
        height: 3096,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116915583265893886933/photos">Raul Maldonado</a>',
        ],
        photo_reference:
          'CmRaAAAA67DSq2tGIgW0zluumR9_JMv2DseC2BJxMOclFObAchH_6QaNGzluVinsNYqK7322fNLQrbVX1lr5d6uGtKYc740rSXX-JJ1mKQV3o6p_Gdedzm_eMny6p22tJA3v8Qk8EhAnBfvcjNraBVUqsBpPXe3AGhQn6bM8_gtFajK6Ah-WN1tcWC8RDQ',
        width: 4128,
      },
    ],
    place_id: 'ChIJHdAqnoLRD4gRSUC2D0ckvaA',
    price_level: 2,
    rating: 4.3,
    reference:
      'CmRSAAAAECbHIl4JzhH7XFw9nAswXZCl4jHoZaO3PGjKbO8IVCAuAwIWBl0QP_U6MbQJC8k7Nqp1D_t_nmDe-e9gvh2D3_4dld9HP1gGoW3jEbvnoClMwZJ4V1RhP_7Y382QtxFgEhAnoCzTZhKK5_5Rv8yo8kHlGhSwUox3CoqQ7aufqilEqj25pJwFkQ',
    scope: 'GOOGLE',
    types: ['bar', 'restaurant', 'food', 'point_of_interest', 'establishment'],
    vicinity: '1100 West Bryn Mawr Avenue, Chicago',
  },
  {
    geometry: {
      location: {
        lat: 41.9428851,
        lng: -87.6496229,
      },
      viewport: {
        northeast: {
          lat: 41.94423658029149,
          lng: -87.6481375697085,
        },
        southwest: {
          lat: 41.9415386197085,
          lng: -87.6508355302915,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: 'dfa38120700d8b320cc6418cb20e17c38bd28e57',
    name: 'Nookies Tree',
    opening_hours: {
      open_now: false,
      weekday_text: [],
    },
    photos: [
      {
        height: 2160,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108197829028002257121/photos">Dalal Musa</a>',
        ],
        photo_reference:
          'CmRaAAAAr_dO0SUp8xBFjyhZvUwZUvgPVtJC0SilADXXQcijiZmnuFGgG-KY1EM1a5qTyoZmjsnBHWy5TtVduYgrNvbl4hrbGnkd8dWZzeWZlV6FGHHKhJcq71HznyY1VbIxDI1oEhCG1rR3CbBCpsT6F8161qi_GhRj3v7eAX0NTvKMI6aUnsZxTA5ctg',
        width: 3840,
      },
    ],
    place_id: 'ChIJwcMQoK_TD4gRA_2Hx7qSuu4',
    price_level: 2,
    rating: 4.5,
    reference:
      'CmRSAAAA-Ispy7U72qHQIN-usqM9tk-XyBIpk6_wPCRnjwx_tLwmGyXv-h-of0AKZgVlik35mOuYR68DpLa3IDcUcS2tCJam3gve1VM_q-HxNLp5iZeyLauEBGneWFyeZrnTfn0VEhBviNUNoNDZOteLJUpmTJKEGhSfpEYSGMErj0nUjnpMICuJaPZeSg',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    vicinity: '3334 North Halsted Street, Chicago',
  },
  {
    geometry: {
      location: {
        lat: 41.9204642,
        lng: -87.64871950000001,
      },
      viewport: {
        northeast: {
          lat: 41.9218145302915,
          lng: -87.64730186970849,
        },
        southwest: {
          lat: 41.9191165697085,
          lng: -87.64999983029149,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: '9080e44dedb4da5adc85bd248dda0f16de38845e',
    name: 'Nookies Too',
    opening_hours: {
      open_now: false,
      weekday_text: [],
    },
    photos: [
      {
        height: 1374,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102614239299270822127/photos">Nookies Too</a>',
        ],
        photo_reference:
          'CmRaAAAApMs6BR-nCye58h8WUVJPMT9b9VxaA96CYmRCabE4R_VlhOTnMgEbrbBm2l2xdeAyTmF-Yu4oWFRHXN1BhY2l0Ank3ejZXUgn6t5ZF8zUC0J3QH6m-RityIq2RuhWtLpiEhBg4VrJXvIoEWdbwm-FOeyQGhSIOdVA29ZsS0nnL9OvPu_zd4Zxhg',
        width: 1367,
      },
    ],
    place_id: 'ChIJXcQRAhrTD4gRfcPwds0Tx60',
    price_level: 2,
    rating: 4.3,
    reference:
      'CmRSAAAAu76OLl_UFQz-CD_Hw4ZK-qqEhMqIeQF3PNk9sgHIIGPMTJj9QgFaGcKtxw6haN9qG4atbPYru6jZiySUkOh9WN7vM0mzc-nv-fN_sznP-hPKkoG4VqA6vRC-zMfMmzl_EhD4URXjK53dqKG3Gi0m-MmwGhTIAOcDQh3fO5SNXQWxVFkXQxqabw',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    vicinity: '2114 North Halsted Street, Chicago',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  destination: {
    flex: 1,
  },
  map: {
    flex: 6,
  },
  stationInfo: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 50,
    height: 50,
  },
});

export default Byke;
