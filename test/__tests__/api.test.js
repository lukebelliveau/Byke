import React from 'react';

import api from '../../src/api';
import { url as serverURL } from '../../src/api';

import mockGraphQLServer from '../fetchMockGraphQLServer';

describe('graphQL client', () => {
    it('should return the correct params', done => {
        const mocks = {
            Station: () => ({
                latitude: () => 99,
                longitude: () => 99,
            })
        }

        mockGraphQLServer(serverURL, mocks);

        api.getAllStations(`{latitude, longitude}`)
            .then(response => {
                expect(response).toMatchSnapshot();
                done();
            });
    });
})

