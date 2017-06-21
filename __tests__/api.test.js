import React from 'react';
import api from '../src/api';
import fetch from 'node-fetch';

  it('runs', done => {
    const res = api.getAllStations(fetch)
      .then(res => {
        console.log(res);
        done();
      })
  })